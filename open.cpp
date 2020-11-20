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
static GLfloat move = 0.0;

int winX = GLUT_WINDOW_WIDTH;
int winY = GLUT_WINDOW_HEIGHT;

double pos[3] = {0.0, 0.0, 0.0};

GLfloat shelfLoc[3][3] = {{10.0, winY - 20.0, 0.0}, {0.0, -20.0, 0.0}, {0.0, -20.0, 0.0}};


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
    for (int i = 0; i < 3; i++) {
        glColor3f(0.3, 0.3, 0.3);
        glTranslatef(shelfLoc[i][0], shelfLoc[i][1], shelfLoc[i][2]);
        glBegin(GL_POLYGON);
            glVertex2f(0.0, 8.0);
            glVertex2f(20.0, 8.0);
            glVertex2f(20.0, 0.0);
            glVertex2f(0.0, 0.0);
        glEnd();
    }
    glPopMatrix();

    glPushMatrix();
    drawPerson();
    glutSwapBuffers();
    
}

void drawPerson()
{
    float xpos = pos[0];
    float ypos = pos[1];
    float radius = 5.0;
    const int SZ = 20;
    static float points[SZ][2];
    static int firstime = 1;
    if (firstime) {
        float ang = 0.0, inc = (2.0 * 3.14158265) / float(SZ);
        for (int i = 0; i < SZ; i++) {
            points[i][0] = xpos + (cos(ang) * radius);
			points[i][1] = ypos + (sin(ang) * radius);
            ang += inc;
        }
    }
    //glColor3f(1.0, 1.0, 1.0);
    glColor3f(1.0, 0.0, 0.0);
    glBegin(GL_TRIANGLE_FAN);
        for(int i = 0; i < SZ; i++) {
            glVertex2f(points[i][0],points[i][1]);
        }
    glEnd();
    glPopMatrix();

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
    printf("Window width: %d\n", GLUT_WINDOW_WIDTH);
    printf("Window height: %d\n", GLUT_WINDOW_HEIGHT);
    //glOrtho(-50.0, 50.0, -50.0, 50.0, -1.0, 1.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
}

void movePerson(float x, float y)
{
    float speed = 2.0;
    float delta = 0.4;
    int reached = 0;
    if (x > 0) {
        printf("X value was inserted\n");
        reached = 1;
    }
    else {
        printf("Y value was inserted\n");
        reached = 2;
    }
    if (reached == 1) {

    }
///*
    float dx = (pos[0] + x) - pos[0];
    float dy = (pos[1] + y) - pos[1];
    float dist = sqrt(dx*dx + dy*dy);
    if (dist > speed * delta) {
        dx /= dist;
        dy /= dist;
        pos[0] += dx * speed * delta;
        pos[1] += dy * speed * delta;
    }
    else {
        pos[0] = x;
        pos[1] = y;
    }
//*/
}

void keyInput(unsigned char Key, int x, int y)
{
    switch(Key)
    {
        case 'w':
            printf("w pressed\n");
            movePerson(0.0, 15.0);
            //pos[1] += 2;
            break;
        case 's':
            printf("s pressed\n");
            movePerson(0.0, -5.0);
            //pos[1] -= 2;
            break;
        case 'a':
            printf("s pressed\n");
            movePerson(-5.0, 0.0);
            //pos[1] -= 2;
            break;
        case 'd':
            printf("s pressed\n");
            movePerson(5.0, 0.0);
            //pos[1] -= 2;
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

/* 
 *  Request double buffer display mode.
 *  Register mouse input callback functions
 */
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