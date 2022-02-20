import React from 'react';

const xmlData = React.createContext({
    isLoaded: false,
    global: null,
    stages: null,
    potentials: null,
    cycles: null,
    proteins: null,
});
export default xmlData;