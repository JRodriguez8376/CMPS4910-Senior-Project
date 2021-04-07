#include <iostream>
#include <pqxx/pqxx>

using namespace std;
using namespace pqxx;


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

        //Deletes old location data
        C.prepare("sql_clean_locations",
            "DELETE FROM locations WHERE time_recorded < now() - INTERVAL '14 days'");

        //Deletes old potential contacts
        C.prepare("sql_clean_potential_contacts",
            "DELETE FROM potential_contact WHERE time_met < now() - INTERVAL '14 days'");

        //Reset old threat levels
        C.prepare("sql_clean_threat_levels",
            "UPDATE users SET threat_level = 0 WHERE threat_level != 0 AND threat_date < now() - INTERVAL '14 days'");

        nontransaction N(C);

        N.exec_prepared("sql_clean_locations");
        N.exec_prepared("sql_clean_potential_contacts");
        N.exec_prepared("sql_clean_threat_levels");

        cout << "DB clean done successfully" << endl;
        C.close();
        
    }
    catch(const exception& e)
    {
        cerr << e.what() << '\n';
        return 1;
    }
    return 0;
}