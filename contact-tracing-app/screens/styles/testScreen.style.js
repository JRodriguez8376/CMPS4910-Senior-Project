import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#FBFBFBFB',
        alignItems: 'center'
    },
    quizQuestion: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#FF0000',
        alignItems: "center",
        padding: '10px',
        width: "100%",
        borderRadius: 10,
    },
    questionCard: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        margin: 0,
        paddingHorizontal: 10,
        width: "100%",
        //borderRadius: 10,
        backgroundColor: '#FBFBFBFB',
    },
    items: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
        //marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 4,
        elevation: 10,
        shadowOffset: {width: 1, height: 3},

    },
    showResults: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        marginBottom: Dimensions.get('window').height/3,
        borderRadius: 10,
    },
    resultsButton: {
        flex: 1,
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        width: '60%',
        marginHorizontal: 40,
        backgroundColor: '#FF0000',
        borderColor: 'white',
        borderWidth: 0.5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
        color: 'black',
    },



});

export default styles;