#include <iostream>
#include <iomanip>
#include <math.h>
#include <bits/stdc++.h>
#include <pqxx/pqxx>
#define M_PI 3.14159265358979323846

using namespace std;
using namespace pqxx;

long double distance(long double lat1, long double long1,
                    long double lat2, long double long2);
long double toRadians(const long double degree);

class notifListener : public notification_reciever
{
    bool m_done;
    public:
    explicit notifListener(connection &conn, string name) :
        notification_receiver(conn, name), m_done(false)
    {}
    void operator()(string const &, int be_pid) override
    {
        m_done = true;
        PQXX_CHECK_EQUAL( be_pid, conn().backendpid(),
            "Got notification from wrong backend process.");
        cout << "Received notification: " << channel() << " pid = " << be_pid << endl;
    }
    bool done() const { return m_done; }
};

int main()
{
    char *sql_infected_count;
    char *sql_infected_IDs;
    char *sql_potential_contact_count;

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

        string const notifName{"algorithm"};
        notifListener NL{C, notifName};

        perform([&C, &NL] {
            work tx{C};
            tx.exec0("NOTIFY" + tx.quote_name(NL,channel()));
            tx.commit();
        });
        //sql = "SELECT * FROM locations JOIN (SELECT device_id_2 FROM contact WHERE device_id_1 = (SELECT fk_device_id FROM infected) LIMIT 1) as clTest ON fk_device_id = device_id_2 LIMIT 15";

        //Returns row count for infected table (Use once table exceeds 100 rows)
        //sql_infected_count = "SELECT reltuples::bigint AS estimate FROM pg_class WHERE relname='infected'";

        nontransaction N(C);

        //Returns row count for infected table
        sql_infected_count = "SELECT count(*) AS exact_infected_count FROM infected";
        result R1(N.exec(sql_infected_count));
        int infected_count = 0;
        for (result::const_iterator c = R1.begin(); c != R1.end(); ++c)
        {
            infected_count = c[0].as<int>();
            cout << "infected count: " << infected_count << endl;
            //cout << "DeviceID = " << c[0].as<int>() << endl;
            //cout << "UserType = " << c[1].as<string>() << endl;
        }

        //Returns infected IDs
        sql_infected_IDs = "SELECT fk_device_id FROM infected";
        result R2(N.exec(sql_infected_IDs));
        int infected[infected_count];
        int index = 0;
        for (result::const_iterator c = R2.begin(); c != R2.end(); ++c)
        {
            infected[index] = c[0].as<int>();
            cout << "infected ID: " << infected[index] << endl;
            index++;
        }

        //Returns count of potential_contact users
        C.prepare("sql_potential_contact_count", "SELECT count(*) AS exact_potential_contact_count FROM potential_contact WHERE device_id_1 = $1");

        //Returns potential_contact users and time met
        C.prepare("sql_potential_contact_IDs", "SELECT device_id_2, time_met FROM potential_contact WHERE device_id_1 = $1");

        //Returns count of a infected users locations
        C.prepare("sql_infected_locations_count", "SELECT count(*) AS exact_infected_locations_count FROM locations WHERE fk_device_id = $1");

        //Returns infected users locations
        C.prepare("sql_infected_locations", "SELECT time_recorded, latitude, longitude FROM locations WHERE fk_device_id = $1");

        //Returns count of a potential_contact users locations
        C.prepare("sql_potential_contact_locations_count", "SELECT count(*) AS exact_potential_contact_locations_count FROM locations WHERE fk_device_id = $1");

        //Returns a potential_contact users locations
        C.prepare("sql_potential_contact_locations", "SELECT time_recorded, latitude, longitude FROM locations WHERE fk_device_id = $1");

        int potential_contact_count[infected_count];
        for (int i = 0; i < infected_count; i++)
        {
            //Finds potential_contact users count
            result R3(N.exec_prepared("sql_potential_contact_count", infected[i]));
            for (result::const_iterator c = R3.begin(); c != R3.end(); ++c)
            {
                potential_contact_count[i] = c[0].as<int>();
                cout << "User " << infected[i] << " has potentially contacted " << potential_contact_count[i] << " people" << endl;
            }

            //Finds all potential_contact users
            index = 0;
            int potential_contact_id[potential_contact_count[i]];
            string potential_contact_time_met[potential_contact_count[i]];
            result R4(N.exec_prepared("sql_potential_contact_IDs", infected[i]));
            for (result::const_iterator c = R4.begin(); c != R4.end(); ++c)
            {
                potential_contact_id[index] = c[0].as<int>();
                potential_contact_time_met[index] = c[1].as<string>();
                cout << "Contact ID: " << potential_contact_id[index] << " Time met: " << potential_contact_time_met[index] << endl;
                index++;
            }

            //Deals with infected user locations
            index = 0;
            int infected_locations_count = 0;
            result R5(N.exec_prepared("sql_infected_locations_count", infected[i]));
            for (result::const_iterator c = R5.begin(); c != R5.end(); ++c)
            {
                infected_locations_count = c[0].as<int>();
                cout << "User " << infected[i] << " has " << infected_locations_count << " coordinates" << endl;
                string infected_time_recorded[infected_locations_count];
                long double infected_locations[infected_locations_count][2];
                result R6(N.exec_prepared("sql_infected_locations", infected[i]));
                for (result::const_iterator cc = R6.begin(); cc != R6.end(); ++cc)
                {
                    infected_time_recorded[index] = cc[0].as<string>();
                    infected_locations[index][0] = cc[1].as<long double>();
                    infected_locations[index][1] = cc[2].as<long double>();
                    //printf("Time: %s lat: %lf long: %lf\n", infected_time_recorded[index], infected_locations[index][0], infected_locations[index][1]);
                    cout << setprecision(6) << fixed;
                    //cout << "Time: " << infected_time_recorded[index] << " lat: " << infected_locations[index][0] << " long: " << infected_locations[index][1] << endl;
                    index++;
                }
                //}

                //Deals with potential_contact users locations
                index = 0;
                int potential_contact_locations_count = 0;
                for (int j = 0; j < potential_contact_count[i]; j++)
                {
                    result R7(N.exec_prepared("sql_potential_contact_locations_count", potential_contact_id[j]));
                    for (result::const_iterator c = R7.begin(); c != R7.end(); ++c)
                    {
                        index = 0;
                        potential_contact_locations_count = c[0].as<int>();
                        cout << "User " << potential_contact_id[j] << " has " << potential_contact_locations_count << " coordinates" << endl;
                        string potential_contact_time_recorded[potential_contact_locations_count];
                        long double potential_contact_locations[potential_contact_locations_count][2];
                        result R8(N.exec_prepared("sql_potential_contact_locations", potential_contact_id[j]));
                        for (result::const_iterator cc = R8.begin(); cc != R8.end(); ++cc)
                        {
                            potential_contact_time_recorded[index] = cc[0].as<string>();
                            potential_contact_locations[index][0] = cc[1].as<long double>();
                            potential_contact_locations[index][1] = cc[2].as<long double>();
                            //printf("Time: %s lat: %Lf long: %Lf\n", potential_contact_time_recorded[index], potential_contact_locations[index][0], potential_contact_locations[index][1]);
                            cout << setprecision(6) << fixed;
                            //cout << "Time: " << potential_contact_time_recorded[index] << " lat: " << potential_contact_locations[index][0] << " long: " << potential_contact_locations[index][1] << endl;
                            index++;
                        }

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
                            //printf("Inside while loop1 %d: \n", loop1);
                            //printf("Inside while loop2 %d: \n", loop2);
                        }
                        for(int k = start1, l = start2; k < start1 + 15; k++, l++)
                        {
                            long double diff = distance(infected_locations[k][0], infected_locations[k][1], potential_contact_locations[l][0], potential_contact_locations[l][1]);
                            //start2++;
                            cout << "Diff " << k << ": " << diff
                            << " I User: " << infected[i] << " lat: " << infected_locations[k][0] << " long: " << infected_locations[k][1]
                            << " PC User: " << potential_contact_id[j] << " lat: " << potential_contact_locations[l][0] << " long: " << potential_contact_locations[l][1] << endl;
                            //printf("diff %d: %Lf User: %d lat: \n", k, diff, potential_contact_id[j], );
                        }
                        //cout << distance(alonsoStartlat, alonsoStartlong, alonsoPoint1lat, alonosPoint1long) << " Feet\n";
                        
                    }
                }
            }
        }

        /*
        for (int i = 0; i < infected_count; i++)
        {
            //Returns potential_contact ID and time met
            sql_potential_contact_IDs = "SELECT device_id_2, time_met FROM contact WHERE device_id_1 = " + infected[i] + "";
        }
        */

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

//Checks for a received NOTIFY and returns it.

/*
bool checkNotify(notification &no)
{
    PGnotify *notify;
    PGconsumeInput(connection_);
    if ((notify = PQnotifies(connection_)) != NULL)
    {
        no.channel = notify->relname;
        no.sending_pid = notify->be_pid;
        no.payload = notify->extra;
        PQfreemem(notify);
        return true;
    }
    else
    {
        no.channel = "";
        no.sending_pid = 0;
        no.payload = "";
        PQfreemem(notify);
        return false;
    }
}

//Listens to a specified channel using the Postgresql LISTEN-function.
bool PostgresqlDatabase::listenToChannel(std::string channel) {
  //look, if we're already listening to the channel in our list
    if (std::find(channels_.begin(),channels_.end(),channel) == channels_.end() )
    {
        std::string query = "LISTEN " + channel;
        PGresultAutoPtr result = PQexec(connection_,query.c_str());
        if (PQresultStatus(*result) != PGRES_COMMAND_OK)
        {
            ROS_WARN("LISTEN command failed: %s", PQerrorMessage(connection_));
            return false;
        }
        ROS_INFO("Now listening to channel \"%s\"",channel.c_str());
        channels_.push_back(channel);
        return true;
    }
    ROS_INFO("We are already listening to channel \"%s\" - nothing to be done",channel.c_str());
    return true;
}
*/
/*
SELECT * 
FROM infected

SELECT *
FROM locations
JOIN (
    SELECT device_id_2
    FROM contact
    WHERE device_id_1 = (
        SELECT fk_device_id
        FROM infected
    )
    LIMIT 1
) as clTest
ON fk_device_id = device_id_2
LIMIT 15
*/
