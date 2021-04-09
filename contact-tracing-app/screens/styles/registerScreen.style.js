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
        //flex: 1,
        //paddingLeft: 40,
        //paddingRight: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
    },
    inputView: {
        //flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        flex: 1,
        height: 50,
        fontSize: 16,
        borderBottomWidth: 0,
        borderColor: 'gray',
        paddingLeft: 10,
        textAlign: 'left'
    },
    revealIcon: {
        justifyContent: 'center',
        marginLeft: 5,
        padding: 10,
        paddingRight: 10,
        //borderColor: 'red',
        //borderWidth: 1,
        borderLeftWidth: 1,
        borderLeftColor: 'rgb(237, 88, 88)',
    },
    signUpButton: {
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
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
    signUpText: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingBottom: 3
    },
    signInPageButton: {
        borderRadius: 25,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        paddingHorizontal: 5,
        marginHorizontal: 40,
        backgroundColor: '#FFFFFF',
        borderColor: 'red',
        borderWidth: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
        shadowOffset: {width: 1, height: 2},
        flexDirection: 'row',
        },
    signInPageText: {
        color: '#000000',
        fontSize: 12,
        paddingBottom: 3,
        flexShrink: 1,
    },
    titles: {
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
        fontSize: 28,
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