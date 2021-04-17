import {StyleSheet} from 'react-native';
import AuthContext from '../../context/authContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#FBFBFBFB',
        alignItems: 'stretch',
        color: 'black',
    },
    userInfo: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        color: 'black',
    },
    shadownotificationBox: {
        //
        flex: 1,
        margin: 5,
        padding: 2,
        borderRadius: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
        // background color must be set
        backgroundColor : "#0000" // invisible color
    },
    notificationBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        //margin: 10,
        padding: 10,
        paddingHorizontal: 10, 
        borderRadius: 5,
        backgroundColor : "white"
    },
    notificationText: {
        flex: 1,
        color: 'black',
        alignItems: "flex-start",
        fontSize: 16,
        //backgroundColor : "purple"
    },
    notificationTime: {
        //flex: 1,
        paddingLeft: 5,
        justifyContent: 'flex-start',
        alignItems: "flex-end",
        color: 'black',
        fontStyle: 'italic',
        fontSize: 14,
        //backgroundColor : "aqua"
    },
    emptyNotificationsText: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        paddingTop: 40,
        //backgroundColor: 'cyan'
    },  
    alertOthers: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
        width: '95%',
        margin: 10,
        marginHorizontal: 0,
        padding: 5,
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 2,
        shadowOffset: { width: 4, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 4,
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
        borderColor: 'white',
        borderWidth: 0.5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 8,
    },
    formContainer: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        //flexDirection: 'column',
        //height: "100%",
        //paddingBottom: 100,
        paddingTop: 0,
        
    },
    formElement: {
        //paddingLeft: 40,
        //paddingRight: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        
    },
});
export default styles;