let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1' :
        APIURL = 'http://localhost:3000';
        break;

    case 'photogram-client.herokuapp.com' : 
        APIURL = 'https://photogram-client.herokuapp.com';
        break;
}

export default APIURL;