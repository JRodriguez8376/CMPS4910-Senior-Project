all: test

test:
	g++ -std=c++17 testPQLIB.cpp -lpqxx -lpq -o testPQLIB
	g++ -std=c++17 testNotify.cpp -lpqxx -lpq -o testNotify
	g++ -std=c++17 infectedNotify.cpp -lpqxx -lpq -o infectedNotify

clean:
	rm -f testPQLIB
	rm -f testNotify
	rm -f infectedNotify