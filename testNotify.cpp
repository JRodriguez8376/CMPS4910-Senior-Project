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

class notifListener : public notification_receiver
{
    bool m_done;
    public:
    explicit notifListener(connection &conn, string name) :
        notification_receiver(conn, name), m_done(false)
    {}
    void operator()(string const &message, int be_pid) override
    {
        m_done = true;
        //PQXX_CHECK_EQUAL( be_pid, conn().backendpid(),
        //    "Got notification from wrong backend process.");
        cout << "Received notification: " << channel() << " pid = " << be_pid << endl;
        cout << message << "..." << endl;
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

        string const notifName = "algorithm";
        notifListener NL{C, notifName};

        perform([&C, &NL] {
            work tx{C};
            tx.exec0("NOTIFY" + tx.quote_name(NL.channel()));
            tx.commit();
        });

        int notifs = 0;
        for (int i = 0; i < 20; ++i)
        {
            //PQXX_CHECK_EQUAL(notifs, 0, "Got unexpected notifications.");
            cout << ".";
            notifs = C.await_notification();
            usleep(2000);
        }
        cout << endl;

        //PQXX_CHECK(NL.done(), "No notifications received.");
        //PQXX_CHECK_EQUAL(notifs, 1, "Got unexpected number of notifications.");

        //nontransaction N(C);
        //notification_receiver(C, "algorithm");

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