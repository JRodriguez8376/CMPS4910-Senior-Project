all: open

open: open.cpp
	g++ open.cpp -Wall -oopen -lGL -lGLU -lglut -lm

clean:
	rm -f open
