import React, { useState, useEffect } from 'react';
import api from './constants';
const fetchTestData = async () => {

    try {
        fetch(api + '/test/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('JSON here we go babey: ');
                console.log(json);
                return (json);
            })
            .catch((error) => {
                console.error(error)
            })
    } catch (error) {
        console.error(error);
    }

};


export {
    fetchTestData
};

