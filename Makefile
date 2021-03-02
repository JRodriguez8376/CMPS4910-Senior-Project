all: test

test:
	g++ -std=c++17 testPQLIB.cpp -lpqxx -lpq -o testPQLIB
	g++ -std=c++17 testNotify.cpp -lpqxx -lpq -o testNotify

clean:
	rm testPQLIB
	rm testNotify