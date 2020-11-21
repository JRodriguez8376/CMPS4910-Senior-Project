#include <stdio.h>
#include <math.h>
#include <bits/stdc++.h>

//OpenGL
#include <GL/gl.h>
#include <GL/glu.h>
#include <GL/glut.h>
#include <stdlib.h>

using namespace std;

static GLfloat spin = 0.0;

const int numShelf = 6; //num of shelves
const int NUM_PEOPLE = 2;


//Debugging code
int personChoice = 0;

//static GLfloat move = 0.0;

//int winX = GLUT_WINDOW_WIDTH;
//int winY = GLUT_WINDOW_HEIGHT;

//double pos[3] = {0.0, 0.0, 0.0};

//num of Shelves, shelf location, shelf size

//GLfloat shelfLoc[3][3] = {{10.0, winY - 20.0, 0.0}, {0.0, -20.0, 0.0}, {0.0, -20.0, 0.0}};
//GLfloat shelfSZ[2] = {10.0, 4.0};


struct Shape {
    float width, height;
    float center[3];
};

struct Person {
    float pos[3];
};

class Global {
    public:
        float width = 10.0;
        float height = 4.0;
        int winX = GLUT_WINDOW_WIDTH;
        int winY = GLUT_WINDOW_HEIGHT;
        //int numShelf = 3;
        Shape shelf[numShelf];
        Person person[NUM_PEOPLE];
        Global();
} gl;

Global::Global()
{
    float x[numShelf] = {10.0, 10.0, 10.0, 40.0, 40.0, 40.0};
    float y[numShelf] = {((float)gl.winY-10.0f), ((float)gl.winY-30.0f), ((float)gl.winY-50.0f),
                         ((float)gl.winY-10.0f), ((float)gl.winY-30.0f), ((float)gl.winY-50.0f)};
    for (int i = 0; i < numShelf; i++) {
        shelf[i].width = width;
        shelf[i].height = height;
        shelf[i].center[0] = x[i];
        shelf[i].center[1] = y[i];
        shelf[i].center[2] = 0.0;
    } 
    //float xpos[2] = {90.0, 10.0};
    //float ypos[2] = {90.0, 10.0};
    for (int i = 0; i < NUM_PEOPLE; i++) {
        person[i].pos[0] = rand() % 100; // 0 - 99
        person[i].pos[1] = rand() % 100;
        //person[i].pos[0] = xpos[i]; // 0 - 99
        //person[i].pos[1] = ypos[i];
        person[i].pos[2] = 0.0;
    }
}


void drawPerson();

void init(void) 
{
    glClearColor (0.0, 0.0, 0.0, 0.0);
    glShadeModel (GL_FLAT);
}

void display(void)
{
    glClear(GL_COLOR_BUFFER_BIT);
    glPushMatrix();
    glColor3f(0.0, 0.0, 1.0);
    //glTranslatef(pos[0], pos[1], pos[2]);
    glTranslatef(0.0, 0.0, 0.0);
    glBegin(GL_POLYGON);
        glVertex2f(0.0, 50.0);
        glVertex2f(50.0, 50.0);
        glVertex2f(50.0, 0.0);
        glVertex2f(0.0, 0.0);
    glEnd();
    glPopMatrix();

    //Shelves
    glPushMatrix();
    for (int i = 0; i < numShelf; i++) {
        glColor3f(0.3, 0.3, 0.3);
        glPushMatrix();
        glTranslatef(gl.shelf[i].center[0], gl.shelf[i].center[1], gl.shelf[i].center[2]);
        glBegin(GL_POLYGON);
            glVertex2f(-gl.shelf[i].width, gl.shelf[i].height); //left top
            glVertex2f(gl.shelf[i].width, gl.shelf[i].height); //right top
            glVertex2f(gl.shelf[i].width, -gl.shelf[i].height); //right bottom
            glVertex2f(-gl.shelf[i].width, -gl.shelf[i].height); //left bottom
        glEnd();
        glPopMatrix();
    }
    glPopMatrix();

    drawPerson();

    glutSwapBuffers();
    
}

void drawPerson()
{
    float radBT = 15.0;
    float rad6ft = 6.0;
    float radPer = 1.0;
    const int SZ = 20;
    static float points[SZ][2];
    static int firstime = 1;
    if (firstime) {
        float ang = 0.0, inc = (2.0 * 3.14158265) / float(SZ);
        for (int i = 0; i < SZ; i++) {
            points[i][0] = cos(ang);
			points[i][1] = sin(ang);
            ang += inc;
        }
    }
    for (int i = 0; i < NUM_PEOPLE; i++) {
        //This draws bluetooth radius
        glPushMatrix();
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        glEnable(GL_BLEND);
        glColor4f(0.0, 1.0, 0.0, 0.3);
        glBegin(GL_TRIANGLE_FAN);
            for(int j = 0; j < SZ; j++) {
                //printf("gl.person[%d].pos[0]: %f\n", i, (gl.person[i].pos[0] + points[j][0]*radBT));
                glVertex2f(gl.person[i].pos[0] + points[j][0]*radBT, gl.person[i].pos[1] + points[j][1]*radBT);
            }
        glEnd();
        //glPopMatrix();
        //This draws 6ft social distancing
        //glPushMatrix();
        glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        glEnable(GL_BLEND);
        glColor4f(0.0, 1.0, 1.0, 0.3);
        glBegin(GL_TRIANGLE_FAN);
            for(int j = 0; j < SZ; j++) {
                glVertex2f(gl.person[i].pos[0] + points[j][0]*rad6ft, gl.person[i].pos[1] + points[j][1]*rad6ft);
            }
        glEnd();
        //glPopMatrix();
        //This draws the person circle
        //glPushMatrix();
        glColor3f(1.0, 1.0, 1.0);
        glBegin(GL_TRIANGLE_FAN);
            for(int j = 0; j < SZ; j++) {
                glVertex2f(gl.person[i].pos[0] + points[j][0]*radPer, gl.person[i].pos[1] + points[j][1]*radPer);
            }
        glEnd();
        glPopMatrix();

    }
    /*
    //This draws bluetooth radius
    glPushMatrix();
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glEnable(GL_BLEND);
    glColor4f(0.0, 1.0, 0.0, 0.3);
    glBegin(GL_TRIANGLE_FAN);
        for(int i = 0; i < SZ; i++) {
            glVertex2f(gl.person[0].pos[0] + points[i][0]*radBT, gl.person[0].pos[1] + points[i][1]*radBT);
        }
    glEnd();
    //This draws 6ft social distancing
    glPushMatrix();
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glEnable(GL_BLEND);
    glColor4f(0.0, 1.0, 1.0, 0.3);
    glBegin(GL_TRIANGLE_FAN);
        for(int i = 0; i < SZ; i++) {
            glVertex2f(gl.person[0].pos[0] + points[i][0]*rad6ft, gl.person[0].pos[1] + points[i][1]*rad6ft);
        }
    glEnd();
    glPopMatrix();
    //This draws the person circle
    glPushMatrix();
    glColor3f(1.0, 1.0, 1.0);
    glBegin(GL_TRIANGLE_FAN);
        for(int i = 0; i < SZ; i++) {
            glVertex2f(gl.person[0].pos[0] + points[i][0]*radPer, gl.person[0].pos[1] + points[i][1]*radPer);
        }
    glEnd();
    glPopMatrix();
    */
}

void movePerson(float x, float y, int p)
{
    float speed = 2.0;
    float delta = 0.4;
    int reached = 0;
    //Collison Detection:
    for (int i = 0; i < numShelf; i++) {
        if (gl.person[p].pos[1]-1 < (gl.shelf[i].center[1] + gl.shelf[i].height) && 
            gl.person[p].pos[1]+1 > (gl.shelf[i].center[1] - gl.shelf[i].height)) {
                //printf("collision on y deteced\n");
                if (gl.person[p].pos[0]-1 < (gl.shelf[i].center[0] + gl.shelf[i].width) &&
                    gl.person[p].pos[0]+1 > (gl.shelf[i].center[0] - gl.shelf[i].width)) {
                        //printf("collision deteced\n");
                        if (x > 0.0) {
                            gl.person[p].pos[0] = gl.shelf[i].center[0] - gl.shelf[i].width-2;
                        }
                        if (x < 0.0) {
                            gl.person[p].pos[0] = gl.shelf[i].center[0] + gl.shelf[i].width+2;
                        }
                        if (y > 0.0) {
                            gl.person[p].pos[1] = gl.shelf[i].center[1] - gl.shelf[i].height-2;
                        }
                        if (y < 0.0) {
                            gl.person[p].pos[1] = gl.shelf[i].center[1] + gl.shelf[i].height+2;
                        }
                        
                    }
        }
    }

    if (x > 0) {
        //printf("X value was inserted\n");
        reached = 1;
    }
    else {
        //printf("Y value was inserted\n");
        reached = 2;
    }
    if (reached == 1) {

    }
///*
    float dx = (gl.person[p].pos[0] + x) - gl.person[p].pos[0];
    float dy = (gl.person[p].pos[1] + y) - gl.person[p].pos[1];
    float dist = sqrt(dx*dx + dy*dy);
    if (dist > speed * delta) {
        dx /= dist;
        dy /= dist;
        gl.person[p].pos[0] += dx * speed * delta;
        gl.person[p].pos[1] += dy * speed * delta;
    }
    else {
        gl.person[p].pos[0] = x;
        gl.person[p].pos[1] = y;
    }
//*/
}

void spinDisplay(void)
{
    spin = spin + 2.0;
    if (spin > 360.0)
        spin = spin - 360.0;
    glutPostRedisplay();
}

void reshape(int w, int h)
{
    glViewport (0, 0, (GLsizei) w, (GLsizei) h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(0.0, GLUT_WINDOW_WIDTH, 0.0, GLUT_WINDOW_HEIGHT, -1.0, 1.0);
    //printf("Window width: %d\n", GLUT_WINDOW_WIDTH);
    //printf("Window height: %d\n", GLUT_WINDOW_HEIGHT);
    //glOrtho(-50.0, 50.0, -50.0, 50.0, -1.0, 1.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void keyInput(unsigned char Key, int x, int y)
{
    switch(Key)
    {
        case 'w':
            //printf("w Pressed\n");
            movePerson(0.0, 15.0, personChoice);
            //pos[1] += 2;
            break;
        case 's':
            //printf("s Pressed\n");
            movePerson(0.0, -5.0, personChoice);
            //pos[1] -= 2;
            break;
        case 'a':
            //printf("s Pressed\n");
            movePerson(-5.0, 0.0, personChoice);
            //pos[1] -= 2;
            break;
        case 'd':
            //printf("s Pressed\n");
            movePerson(5.0, 0.0, personChoice);
            //pos[1] -= 2;
            break;
        case 'p':
            printf("Changed Person\n");
            personChoice = (personChoice+1)%NUM_PEOPLE;
            break;
        case 27:
            exit(1);
        default:
            break;
    }
}

void mouse(int button, int state, int x, int y) 
{
    switch (button) {
        case GLUT_LEFT_BUTTON:
            if (state == GLUT_DOWN)
                glutIdleFunc(spinDisplay);
            break;
        case GLUT_MIDDLE_BUTTON:
            if (state == GLUT_DOWN)
                glutIdleFunc(NULL);
            break;
        default:
            break;
    }
}

int main(int argc, char** argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode (GLUT_DOUBLE | GLUT_RGB);
    glutInitWindowSize (720, 720); 
    glutInitWindowPosition (100, 100);
    glutCreateWindow ("Micro Environment");
    //glutFullScreen();
    init ();
    glutDisplayFunc(display); 
    glutReshapeFunc(reshape); 
    glutMouseFunc(mouse);
    glutKeyboardFunc(keyInput);
    glutMainLoop();
    return 0;
}