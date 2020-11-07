//grab infected person and all of their contacts
//compare with each contact by most recent
//grab infected persons gps list and contacted gps list
//grab the timestamp from initial point of contact
//match IPOC timestamp with each users gps list
//then compare the following 10 gps coordinates with each and calculate distance between two users.

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <iomanip>
//#include <bits10_1.h>
#include <math.h>
#include <bits/stdc++.h>
#define M_PI 3.14159265358979323846

using namespace std;

long double toRadians(const long double degree);
long double distance(long double lat1, long double long1,
                    long double lat2, long double long2);

int main()
{
    long double test2d1[20][3] = {{11.01, 35.369103, -119.025842},
                                {11.02, 35.369102, -119.025979},
                                {11.03, 35.369104, -119.026107},
                                {11.04, 35.369104, -119.026248},
                                {11.05, 35.369102, -119.026377},
                                {11.06, 35.369245, -119.026377},
                                {11.07, 35.369145, -119.026262},
                                {11.08, 35.369146, -119.026113},
                                {11.09, 35.369144, -119.025963},
                                {11.10, 35.369145, -119.025842},
                                {11.45, 35.369187, -119.025845},
                                {11.46, 35.369185, -119.025975},
                                {11.47, 35.369185, -119.026105},
                                {11.48, 35.369185, -119.026247},
                                {11.49, 35.369186, -119.026378},
                                {11.50, 35.369227, -119.026378},
                                {11.51, 35.369229, -119.026265},
                                {11.52, 35.369229, -119.026117},
                                {11.53, 35.369229, -119.025991},
                                {11.54, 35.369226, -119.025844}};


    long double test2d2[20][3] = {{11.01, 35.369103, -119.026376},
                                {11.46, 35.369103, -119.026242},
                                {11.47, 35.369105, -119.026106},
                                {11.48, 35.369103, -119.025995},
                                {11.49, 35.369104, -119.025842},
                                {11.50, 35.369144, -119.025843},
                                {11.51, 35.369146, -119.025951},
                                {11.52, 35.369145, -119.026108},
                                {11.53, 35.369145, -119.026244},
                                {11.54, 35.369145, -119.026376},
                                {12.10, 35.369185, -119.026376},
                                {12.11, 35.369187, -119.026241},
                                {12.12, 35.369185, -119.026123},
                                {12.13, 35.369184, -119.025985},
                                {12.14, 35.369186, -119.025843},
                                {12.15, 35.369228, -119.025843},
                                {12.16, 35.369227, -119.025975},
                                {12.17, 35.369227, -119.026120},
                                {12.18, 35.369227, -119.026236},
                                {12.19, 35.369228, -119.026375}};

    for(int j = 0; j < 20; j++)
    {
        for(int i = 0; i < 3; i++)
        {
            printf("%Lf ",test2d1[j][i]);
        }
        printf("\t");
        for(int i = 0; i < 3; i++)
        {
            printf("%Lf ",test2d2[j][i]);
        }
        printf("\n");
    }

    int loop1 = 0;
    int loop2 = 0;
    int start1;
    int start2;
    bool found1 = false;
    bool found2 = false;
    bool bothFound = false;
    long double timestamp = 11.01;
    printf("This is timestamp: %Lf\n", timestamp);
    printf("%Lf\n", test2d2[0][0]);
    // find the row where they first made contact
    while(!bothFound)
    {
        if (timestamp == test2d1[loop1][0] && found1 == false)
        {
            start1 = loop1;
            found1 = true;
        }
        else if (found1 == false)
        {
            loop1++;
        }
        if (timestamp == test2d2[loop2][0] && found2 == false)
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
    for(int i = start1; i < start1 + 10; i++)
    {
        long double diff = distance(test2d1[i][1], test2d1[i][2], test2d2[start2][1], test2d2[start2][2]);
        start2++;
        printf("diff %d: %Lf\n", i, diff);
    }
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

