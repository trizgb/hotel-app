let base64 = require('base-64');

// API que permite las CORS
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const URL = 'https://api.mirai.com/MiraiWebService/availableRate/get';

const URL_CORS = proxyURL + URL;

let headers = new Headers();
let username = 'user1';
let password = 'user1Pass';

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
headers.append('Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');


const requestAPI = (hotelId, checkin, nights) =>
    // Si no funcionase URL_CORS, utilizar en su defecto URL y añadir extensión en Chrome que permita las CORS (Allow CORS: Access-Control-Allow-Origin. Autor: Muyor)
    fetch(`${URL_CORS}?hotelId=${hotelId}&checkin=${checkin}&nights=${nights}`, {
        // mode: 'cors',
        // credentials: 'include',
        method: 'GET',
        headers: headers,
    }).then(response => response.json());

export default requestAPI;

