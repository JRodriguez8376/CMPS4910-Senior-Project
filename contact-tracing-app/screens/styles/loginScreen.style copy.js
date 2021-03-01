import {StyleSheet} from 'react-native';
import AuthContext from '../../context/authContext';

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#48B3FA',
        alignItems: 'stretch',
        //paddingTop: '100',
        borderColor: "black",
        borderWidth: 5
    },
    formContainer: {
        flex: 1,
        //justifyContent: 'center',
        //flexDirection: 'column',
        //paddingBottom: 150,
        //paddingTop: '100',
        //alignItems: 'stretch',
        borderColor: "green",
        borderWidth: 5
    },
    formElement: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 10,
        borderColor: "black",
        borderWidth: 5
    },
    backgroundImage: {
        flex: 1,
        
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    inputView: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgba(131, 200, 235, 0.6)',
        borderRadius: 5,
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
        textAlign: 'left',
    },
    loginButton: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 100,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2}
    },
    buttonText: {
        color: '#269BEB',
        fontSize: 26,
        paddingBottom: 5,
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
        paddingBottom: 5,
    },
    name: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        borderColor: "black",
        borderWidth: 5
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        paddingBottom: 20,
        //paddingTop: 100
        
    }
});
export default styles;