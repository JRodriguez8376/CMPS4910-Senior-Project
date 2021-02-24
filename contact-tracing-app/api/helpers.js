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
            console.error(JSON.stringify(error));
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
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.error(JSON.stringify(error));
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
        .then(response => response.json())
        .catch((error) => {
            console.error(JSON.stringify(error));
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
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch((error) => {
            console.error(JSON.stringify(error));
        });
}
export {
    fetchTestData,
    getAPIData,
    postAPIData,
    getPostAPIData,
};

