import React, { useState, useEffect } from 'react';
import api from './constants';
const fetchTestData = () => {


        fetch(api + '/test/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {return response.json()})
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.error(JSON.stringify(error));
            });
};


export {
    fetchTestData
};

