import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FBFBFBFB',
        color: 'black',
        marginTop: 5,
        //paddingTop: 50,
        //backgroundColor: 'cyan',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //flexDirection: 'column',
        //height: "100%",
        paddingHorizontal: 10,
        //paddingTop: 50,
        color: 'black',
        //backgroundColor: 'purple'
    },
    formElement: {
        //paddingLeft: 40,
        //paddingRight: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        //width: '100%',
        //height: '100%',
        resizeMode: 'contain',
        justifyContent: 'flex-start',
    },
    titles: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    name: {
        //fontfamily: 'sans-serif',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        color: 'black',
    },
    tips: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    generalText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        margin: 10,
        color: 'black',
        textAlign: 'center',
    },
    textBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
        //height: 250,
        width: '95%',
        margin: 0,
        marginTop: 0,
        marginHorizontal: 0,
        padding: 0,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 2,
        shadowOffset: { width: 4, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
    },
    generalText1: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        //fontWeight: 'bold',
        margin: 10,
        color: 'black',
        textAlign: 'left',
    },
    unorderedText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
        marginTop: 20,
        color: 'black',
        textAlign: 'center',
    },
    unorderedText1: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        //margin: 10,
        color: 'black',
        textAlign: 'left',
    },
    disclaimerTextBox: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: 20,
        marginTop: 50,
        color: 'black'
        },
    disclaimerTitleText: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        marginHorizontal: 10, 
        paddingHorizontal: 10,  
        fontSize: 14, 
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'black'
    },
    disclaimerText: {
        marginHorizontal: 10, 
        paddingHorizontal: 10, 
        fontSize: 14, 
        fontStyle: 'italic',
        textAlign: 'left',
        color: 'black'
    },
});
export default styles;