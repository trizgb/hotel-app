let base64 = require('base-64');

const URL = 'https://api.mirai.com/MiraiWebService/availableRate/get';

let headers = new Headers();
let username = 'user1';
let password = 'user1Pass';

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
headers.append('Origin', 'http://localhost:3000');


const requestAPI = (hotelId, checkin, nights) =>
    fetch(`${URL}?hotelId=${hotelId}&checkin=${checkin}&nights=${nights}`, {
        method: 'GET',
        headers: headers,
    }).then(response => response.json());

export default requestAPI;

