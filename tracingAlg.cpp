//grab infected person and all of their contacts
//compare with each contact by most recent
//grab infected persons gps list and contacted gps list
//grab the timestamp from initial point of contact
//match IPOC timestamp with each users gps list
//then compare the following 10 gps coordinates with each and calculate distance between two users.

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int test2d1[3][20];
    int test2d2[3][20];
    int val1 = 10;
    int val2 = 1;
    int timestamp = 3;
    for(int i = 0; i < 2; i++)
    {
        for(int j = 0; j < 20; j++)
        {
            if (i == 0) {
                test2d1[i][j] = i+j+1;
                test2d2[i][j] = i+j+2;
            }
            else
            {
                test2d1[i][j] = val1;
                val1 = val1 + 5;
                test2d2[i][j] = val2;
                val2++;
            }
        }
    }
    for(int j = 0; j < 20; j++)
    {
        for(int i = 0; i < 2; i++)
        {
            printf("%d ",test2d1[i][j]);
        }
        printf("\t");
        for(int i = 0; i < 2; i++)
        {
            printf("%d ",test2d2[i][j]);
        }
        printf("\n");
    }
    for(int i = timestamp; i < timestamp + 10; i++)
    {
        int diff = abs(test2d1[1][i] - test2d2[1][i]);
        printf("diff %d: %d\n", i+1, diff);
    }
}

/*
t g     t g
0 1     2 11
1 2     3 12  
2 3     4 13
3 4     5 14
4 5     6 15
*/