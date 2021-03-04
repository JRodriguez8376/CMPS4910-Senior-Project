import {StyleSheet} from 'react-native';
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
    },
    tips: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        justifyContent: 'center',
        paddingBottom: 5,
    }
});
export default styles;