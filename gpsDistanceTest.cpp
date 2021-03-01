#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <iomanip>
#include <bits10_1.h>
#include <math.h>
//#include <bits/stdc++.h>
#define M_PI 3.14159265358979323846

using namespace std;

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

int main()
{
    long double wascoLat0 = 35.5967722;
    long double wascoLong0 = -119.348693;
    long double wascoLat5 = 35.596722;
    long double wascoLong5 = -119.348642;
    long double bhsLat0 = 35.369103;
    long double bhsLong0 = -119.026377;
    long double bhsLat5 = 35.369145;
    long double bhslong5 = -119.026377;
    long double filLat0 = 34.402685;
    long double filLong0 = -118.917725;
    long double filLat5 = 34.402726;
    long double filLong5 = -118.917734;

    long double alonsoStartlat = 35.59713916;
    long double alonsoStartlong = 119.35177712;
    long double alonsoPoint1lat = 35.59722720;
    long double alonosPoint1long = 119.35184582;
    cout << setprecision(5) << fixed;
    cout << distance(alonsoStartlat, alonsoStartlong, alonsoPoint1lat, alonosPoint1long) << " Feet\n";
    return 0; 
}