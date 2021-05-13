all: simulation

simulation: simulation.cpp
	g++ simulation.cpp -Wall -osimulation -lGL -lGLU -lglut -lm

clean:
	rm -f simulation
