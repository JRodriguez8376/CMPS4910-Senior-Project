import {StyleSheet, Dimensions} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'stretch'
    },
    /*
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    */
    
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-75,

    },
    userRadius: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderColor: 'rgba(0, 122, 255, 0.3)',
        borderWidth: 1,
        borderRadius: 50 / 2,
        overflow: 'hidden',
    },
    userMarker: {
        height: 20,
        width: 20,
        borderWidth: 3, 
        borderColor: 'white',
        borderRadius: 20 / 2,
        overflow: 'hidden',
        backgroundColor: '#007Aff',
        
        
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