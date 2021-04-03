import {StyleSheet} from 'react-native';
import AuthContext from '../../context/authContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height: '70%',
        //width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#f2f2f2',
        alignItems: 'stretch'
    },
    formContainer: {
        //flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        //height: "100%",
        //paddingBottom: 100,
        paddingTop: 50,
        alignItems: 'stretch'
    },
    formElement: {
        //paddingLeft: 40,
        //paddingRight: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        
    },
    backgroundImage: {
        flex: 1,
        //width: '100%',
        //height: '100%',
        resizeMode: 'contain',
        justifyContent: 'flex-start',
        
    },
    inputView: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 1,
        shadowOffset: {width: 1, height: 2}
    },
    input: {
        height: 50,
        fontSize: 16,
        borderBottomWidth: 0,
        borderColor: 'gray',
        paddingLeft: 10,
        textAlign: 'left'

    },
    signInButton: {
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        //maxWidth: '60%',
        marginHorizontal: 40,
        backgroundColor: '#FF0000',
        borderColor: 'white',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2}
    },
    signInText: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingBottom: 3
    },
    signUpPageButton: {
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        marginHorizontal: 40,
        backgroundColor: '#FFFFFF',
        borderColor: 'red',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2}
        },
    signUpPageText: {
        color: '#000000',
        fontSize: 16,
        paddingBottom: 3
    },
    titles: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
        justifyContent: 'center',
        paddingBottom: 5
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
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 30,
        //padding: 30,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2
    }
});
export default styles;