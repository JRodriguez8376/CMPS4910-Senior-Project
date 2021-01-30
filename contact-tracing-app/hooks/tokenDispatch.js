
import * as React from 'react';
const tokenDispatch = () => {
    const authContext = React.useMemo(
        () => (
            {
                signIn: async data => {
                    //send sign in data here
                    savedID = data.id
    
                    fetch('http://localhost:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            saveTokenAsync(data.accessToken);
                            accessToken = data.accessToken;
                            console.log("Success: ", data);
    
                        })
                        .catch((error) => {
                            console.error('Error: ', error);
                        });
                    dispatch({ type: 'SIGN_IN', token: accessToken });
                },
                signOut: () => dispatch({ type: 'SIGN_OUT' }),
                signUp: async data => {
                    dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
                },
            }),
        []
    );
}


export default tokenDispatch;