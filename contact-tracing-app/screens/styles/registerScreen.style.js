import {StyleSheet} from 'react-native';
import AuthContext from '../../context/authContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //height: '70%',
        //width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#FBFBFBFB',
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
        paddingHorizontal: 40,
        paddingVertical: 10,
        
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
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
        fontSize: 24,
        borderBottomWidth: 0,
        borderColor: 'gray',
        paddingLeft: 10,
        textAlign: 'left'

    },
    loginButton: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        marginHorizontal: 100,
        backgroundColor: '#FF0000',
        borderColor: 'white',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2}
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: 24,
        paddingBottom: 3
    },
    registerButton: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        marginHorizontal: 100,
        backgroundColor: '#FFFFFF',
        borderColor: 'red',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2}
        },
    registerText: {
        color: '#000000',
        fontSize: 24,
        paddingBottom: 3
    },
    titles: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    paragraph: {
        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        justifyContent: 'center',
        paddingBottom: 5
    },
    name: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 5
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