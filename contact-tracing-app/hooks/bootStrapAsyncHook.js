import * as React from 'react';
const handleToken = () => {
    React.useEffect(() => {

        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
    
            } catch (e) {
                //restore failed token later once I know what I am doing fully
            }
            //Validate token here
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        bootstrapAsync();
    
    }, []);
}

export default handleToken;
