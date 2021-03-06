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
        alignItems: 'center',
        color: 'black',
    },
    userInfo: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
    alertOthers: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
        width: '97%',
        //margin: 10,
        marginHorizontal: 0,
        padding: 10,
        borderRadius: 5,
        //borderColor: 'red',
        borderWidth: 2,
        shadowOffset: { width: 4, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
    },
    confirmationBox: {
        marginVertical: 15,
        padding: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'rgba(184, 7, 7, .5)',
        shadowOffset: { width: 4, height: 4 },
        shadowColor: 'black',
    },
    passwordText: {
        padding: 5,
        fontSize: 16, 
        color: 'black', 
        //fontWeight: 'bold',
    },
    startAlert: {
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        width: '99%',
        paddingHorizontal: 40,
        backgroundColor: '#FF0000',
        borderColor: 'red',
        borderWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 8,
    },
    notifyButton: {
        //paddingLeft: 40,
        //paddingRight: 40,
        //marginTop: 30,
        //paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 10
    },
    noteText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginHorizontal: 10, 
        paddingHorizontal: 10,  
        fontSize: 12, 
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'rgb(38, 38, 38)',
        color: 'black',
        //borderWidth: 0.5,
        //borderColor: 'blue',
        //textAlign: 'center',
    },
    cancelElement: {
        //paddingLeft: 40,
        //paddingRight: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 0,
        //width: '95%'
        //flex: 1,
    },
    cancelButton: {
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 30,
        //marginBottom: 30,
        width: '99%',
        paddingHorizontal: 40,
        backgroundColor: '#FFFFFF',
        borderColor: 'red',
        borderWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'red',
        shadowOpacity: 1,
        elevation: 8,
    },
    howitworksTextBox: {
        //flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: 20,
        color: 'black',
        //marginTop: 15,
        //backgroundColor: '#00FFFF',
        //borderWidth: 0.5,
        //borderColor: 'blue',
    },
    
    howitworksTitleText: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        marginHorizontal: 10, 
        paddingHorizontal: 10,  
        fontSize: 14, 
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'black',
        //borderWidth: 0.5,
        //borderColor: 'blue',
        //textAlign: 'left',
    },
    howitworksText: {
        marginHorizontal: 10, 
        paddingHorizontal: 10, 
        fontSize: 14, 
        fontStyle: 'italic',
        textAlign: 'left',
        color: 'black',
    },
    formElement: {
        //paddingLeft: 40,
        //paddingRight: 40,
        marginTop: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 0,
        //width: '95%'
        //flex: 1,
    },
    inputView: {
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
        shadowOffset: {width: 1, height: 2},
        width: '95%',
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
});
export default styles;