import axios from "axios"

const url = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/?limit=100',
});

function GetApiSuggestions (word)  {

    let result = url
        .get(`/results?name=${word}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
    console.log(result)

    return result;
};

// const url1 = axios.create({
//     baseURL:  'https://api.publicapis.org/',
// });



export default GetApiSuggestions