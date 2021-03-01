all: test

test:
	g++ -std=c++17 testPQLIB.cpp -lpqxx -lpq

clean:
	rm a.out