all: files

files:
	g++ -std=c++17 infectedNotify.cpp -lpqxx -lpq -o infectedNotify
	g++ -std=c++17 dbClean.cpp -lpqxx -lpq -o dbClean

clean:
	rm -f infectedNotify
	rm -f dbClean