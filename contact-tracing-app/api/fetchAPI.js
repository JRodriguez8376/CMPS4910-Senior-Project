import React, { useState, useEffect } from 'react';
import api from './constants';
const fetchTestData = () => {
    var data;
    fetch(api+'/test/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            data = response.json();
            console.log(data); 
        })
        .then((json) => {
            console.log('JSON here we go babey: ');
            console.log(json);
            return(json);
        })
        .catch((error) => {
            console.error(error)
        }).finally(() => {
            console.log("Fuck you");
        })
};


export {
    fetchTestData
};

