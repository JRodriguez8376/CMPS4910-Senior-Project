#include <cerrno>
#include <cstring>
#include <iostream>
#include <iomanip>
#include <unistd.h>
#include <math.h>
#include <bits/stdc++.h>
#include <pqxx/pqxx>
#include <pqxx/notification>

#define M_PI 3.14159265358979323846

using namespace std;
using namespace pqxx;

long double distance(long double lat1, long double long1,
                    long double lat2, long double long2);
long double toRadians(const long double degree);

class notifListener : public notification_receiver
{
    bool m_done;
    public:
    int ID = 0;
    int buffID[50];
    int buffCount = 0;
    
    explicit notifListener(connection &conn, string name) :
        notification_receiver(conn, name), m_done(false)
    {}
    void operator()(string const &message, int be_pid) override
    {
        m_done = true;
        //cout << endl << "Received notification: " << channel()
        //    << " pid = " << be_pid << endl;
        //cout << message << " ..." << endl;
        buffID[buffCount] = stoi(message);
        buffCount++;
    }
    int getID()
    {
        return buffID[ID];
    }
    void nextID()
    {
        ID++;
    }
    int getCount()
    {
        return ID;
    }
    int getBuffCount()
    {
        return buffCount;
    }
    void resetCounters()
    {
        ID = 0;
        buffCount = 0;
    }
    bool done() const { return m_done; }
};

int main()
{
    try
    {
        connection C("dbname = contacttracing user = contacttracing password = cmps4910 hostaddr = 178.128.150.158 port = 5432");
        if (C.is_open())
        {
            cout << "Opened database successfully: " << C.dbname() << endl;
        }
        else
        {
            cout << "Can't open database" << endl;
            return 1;
        }

//=============================================================================
//Prepared SQL Statements
//=============================================================================
        //Returns count of potential_contact users
        C.prepare("sql_potential_contact_count",
            "SELECT count(*) AS exact_potential_contact_count FROM potential_contact WHERE device_id_1 = $1 AND compared = 0");

        //Returns potential_contact users and time met
        C.prepare("sql_potential_contact_IDs",
            "SELECT device_id_2, time_met FROM potential_contact WHERE device_id_1 = $1 AND compared = 0");
        
        //Updates potential contact compared value
        C.prepare("sql_update_potential_contact_compared",
            "UPDATE potential_contact SET compared = 1 WHERE device_id_1 = $1 AND device_id_2 = $2");

        //Returns count of a infected users locations
        C.prepare("sql_infected_locations_count",
            "SELECT count(*) AS exact_infected_locations_count FROM locations WHERE fk_device_id = $1");

        //Returns infected users locations
        C.prepare("sql_infected_locations",
            "SELECT time_recorded, latitude, longitude FROM locations WHERE fk_device_id = $1");

        //Deletes infected users locations
        C.prepare("sql_delete_infected_locations",
            "DELETE FROM locations WHERE fk_device_id = $1");

        //Returns count of a potential_contact users locations
        C.prepare("sql_potential_contact_locations_count",
            "SELECT count(*) AS exact_potential_contact_locations_count FROM locations WHERE fk_device_id = $1");

        //Returns a potential_contact users locations
        C.prepare("sql_potential_contact_locations",
            "SELECT time_recorded, latitude, longitude FROM locations WHERE fk_device_id = $1");

        //Deletes potential contact users locations
        //C.prepare("sql_delete_pc_locations",
        //    "DELETE FROM locations WHERE fk_device_id = $1 AND time_recorded::DATE BETWEEN '$2' AND ('$2'::DATE + INTERVAL '15 minutes')");

        //Updates potential contact users threat level
        C.prepare("sql_update_threat_level",
            "UPDATE users SET threat_level = $1, threat_date = now() WHERE device_id = $2");

        //Returns potential contact users threat level
        C.prepare("sql_potential_contact_threat_level",
            "SELECT threat_level FROM users WHERE device_id = $1");
//=============================================================================
//Notification Listener
//=============================================================================
        string const notifName = "algorithm";
        notifListener NL{C, notifName};

        perform([&C, &NL] {
            work tx{C};
            tx.exec0("NOTIFY" + tx.quote_name(NL.channel()));
            tx.commit();
        });

        int notifs = 0;
        int infected = 0;
        int potential_contact_count = 0;
        int index = 0;
        
        while(C.is_open())
        {
            notifs = C.await_notification();
            while(NL.getCount() != NL.getBuffCount())
            {
                cout << "counter: " << NL.getCount() << endl
                << "Buff count: " << NL.getBuffCount() << endl;
                infected = NL.getID();
                //cout << "Infected ID: " << infected << endl;
//=============================================================================
//SQL Query
//=============================================================================
                nontransaction N(C);
                if (infected != 0)
                {   
                    //Finds potential_contact users count
                    result R3(N.exec_prepared("sql_potential_contact_count", infected));
                    for (result::const_iterator c = R3.begin(); c != R3.end(); ++c)
                    {
                        potential_contact_count = c[0].as<int>();
                        cout << "User " << infected << " has potentially contacted "
                            << potential_contact_count << " people" << endl;
                    }

                    //Finds all potential_contact users
                    index = 0;
                    int potential_contact_id[potential_contact_count];
                    string potential_contact_time_met[potential_contact_count];
                    result R4(N.exec_prepared("sql_potential_contact_IDs", infected));
                    for (result::const_iterator c = R4.begin(); c != R4.end(); ++c)
                    {
                        potential_contact_id[index] = c[0].as<int>();
                        potential_contact_time_met[index] = c[1].as<string>();
                        cout << "Contact ID: " << potential_contact_id[index]
                            << " Time met: " << potential_contact_time_met[index] << endl;
                        N.exec_prepared("sql_update_potential_contact_compared", infected, potential_contact_id[index]);
                        N.exec_prepared("sql_update_potential_contact_compared", potential_contact_id[index], infected);
                        index++;
                    }

                    //Deals with infected user locations
                    index = 0;
                    int infected_locations_count = 0;
                    result R5(N.exec_prepared("sql_infected_locations_count", infected));
                    for (result::const_iterator c = R5.begin(); c != R5.end(); ++c)
                    {
                        infected_locations_count = c[0].as<int>();
                        cout << "User " << infected << " has " << infected_locations_count << " coordinates" << endl;
                        string infected_time_recorded[infected_locations_count];
                        long double infected_locations[infected_locations_count][2];
                        result R6(N.exec_prepared("sql_infected_locations", infected));
                        for (result::const_iterator cc = R6.begin(); cc != R6.end(); ++cc)
                        {
                            infected_time_recorded[index] = cc[0].as<string>();
                            infected_locations[index][0] = cc[1].as<long double>();
                            infected_locations[index][1] = cc[2].as<long double>();
                            index++;
                        }

                        //Deals with potential_contact users locations
                        index = 0;
                        int potential_contact_locations_count = 0;
                        for (int j = 0; j < potential_contact_count; j++)
                        {
                            result R7(N.exec_prepared("sql_potential_contact_locations_count", potential_contact_id[j]));
                            for (result::const_iterator c = R7.begin(); c != R7.end(); ++c)
                            {
                                index = 0;
                                potential_contact_locations_count = c[0].as<int>();
                                string potential_contact_time_recorded[potential_contact_locations_count];
                                long double potential_contact_locations[potential_contact_locations_count][2];
                                result R8(N.exec_prepared("sql_potential_contact_locations", potential_contact_id[j]));
                                for (result::const_iterator cc = R8.begin(); cc != R8.end(); ++cc)
                                {
                                    potential_contact_time_recorded[index] = cc[0].as<string>();
                                    potential_contact_locations[index][0] = cc[1].as<long double>();
                                    potential_contact_locations[index][1] = cc[2].as<long double>();
                                    index++;
                                }
//=============================================================================
//Infected and Potential Contact Distance Comparison
//=============================================================================
                                int loop1 = 0;
                                int loop2 = 0;
                                int start1 = 0;
                                int start2 = 0;
                                bool found1 = false;
                                bool found2 = false;
                                bool bothFound = false;
                                string timestamp = potential_contact_time_met[j];
                                while(!bothFound)
                                {
                                    if (timestamp == infected_time_recorded[loop1] && found1 == false)
                                    {
                                        start1 = loop1;
                                        found1 = true;
                                    }
                                    else if (found1 == false)
                                    {
                                        loop1++;
                                    }
                                    if (timestamp == potential_contact_time_recorded[loop2] && found2 == false)
                                    {
                                        start2 = loop2;
                                        found2 = true;
                                    }
                                    else if (found2 == false)
                                    {
                                        loop2++;
                                    }
                                    if (found1 == true && found2 == true)
                                        bothFound = true;
                                }
                                int diffAvg = 0;
                                for(int k = start1, l = start2; k < start1 + 15; k++, l++)
                                {
                                    long double diff = distance(infected_locations[k][0],
                                                        infected_locations[k][1],
                                                        potential_contact_locations[l][0],
                                                        potential_contact_locations[l][1]);
                                    diffAvg += diff;
                                }
                                diffAvg /= 15;
                                cout << "Average distance between user: " << infected
                                    << " and user: " << potential_contact_id[j]
                                    << " is " << diffAvg << " feet." << endl;
                                int threatLevel = 0;
                                result R9(N.exec_prepared("sql_potential_contact_threat_level", potential_contact_id[j]));
                                for (result::const_iterator cc = R9.begin(); cc != R9.end(); ++cc)
                                {
                                    threatLevel = cc[0].as<int>();
                                }
                                if (diffAvg < 7)
                                {
                                    threatLevel = 3;
                                }
                                else if(diffAvg >= 7 && diffAvg < 16 && threatLevel < 3)
                                {
                                    threatLevel = 2;
                                }
                                else if(threatLevel < 2)
                                {
                                    threatLevel = 1;
                                }
                                N.exec_prepared("sql_update_threat_level", threatLevel, potential_contact_id[j]);
                                //N.exec_prepared("sql_delete_pc_locations", potential_contact_id[j], timestamp);
                            }
                        }
                    }
                }
                N.exec_prepared("sql_delete_infected_locations", infected);
                NL.nextID();
                infected = 0;
            }
            NL.resetCounters();
        }

        cout << endl;

        cout << "Operation done successfully" << endl;
        C.close();
    }
    catch(const exception& e)
    {
        cerr << e.what() << '\n';
        return 1;
    }
    return 0;
}

long double toRadians(const long double degree)
{
    long double one_deg = (M_PI) / 180;
    return (one_deg * degree);
}

long double distance(long double lat1, long double long1,
                    long double lat2, long double long2)
{
    lat1 = toRadians(lat1);
    long1 = toRadians(long1);
    lat2 = toRadians(lat2);
    long2 = toRadians(long2);

    long double dlong = long2 - long1;
    long double dlat = lat2 - lat1;

    long double ans = pow(sin(dlat/2),2)
                    + cos(lat1) * cos(lat2)
                    * pow(sin(dlong/2),2);

    ans = 2 * asin(sqrt(ans));

    long double R = 3956;

    ans = ans * R;
    ans = ans * 5280;

    return ans;
}