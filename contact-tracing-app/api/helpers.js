//Module for helper API functions such as GET, and POST

import { api } from './constants';

//Example Test Code to handle GET fetch requests
const fetchTestData = () => {

    return fetch(api + '/test/users', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.error("Returned Status code was not 200(OK)!\n ");
        });
};

const getAPIData = (route, authorization) => {
    return fetch(api + route, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authorization}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.error("Returned Status code was not 200(OK)!\n ");
        });
}
const postAPIData = (route, data, authorization) => {
    fetch(api + route, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authorization}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch((error) => {
            console.error("Returned Status code was not 200(OK)!\n ");
        });
}
const getPostAPIData = (route, data, authorization) => {
    return fetch(api + route, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authorization}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.error("Returned Status code was not 200(OK)!\n ");
        });
}
export {
    fetchTestData,
    getAPIData,
    postAPIData,
    getPostAPIData,
};

