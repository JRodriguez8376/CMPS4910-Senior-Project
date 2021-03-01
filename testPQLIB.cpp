#include <iostream>
#include <pqxx/pqxx>

using namespace std;
using namespace pqxx;

int main()
{
    char *sql;
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

        sql = "SELECT * FROM users";

        nontransaction N(C);

        result R(N.exec(sql));

        for (result::const_iterator c = R.begin(); c != R.end(); ++c)
        {
            cout << "DeviceID = " << c[0].as<int>() << endl;
            cout << "UserType = " << c[1].as<string>() << endl;
        }
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