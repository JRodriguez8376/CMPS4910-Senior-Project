import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        paddingBottom: 100,
        alignItems: 'stretch'
    },
    formElement: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    inputView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    input: {
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: 'gray',

    },
    loginButton: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',

        fontSize: 30,
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
    },

    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 100
    }
});

export default styles;