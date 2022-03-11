import axios from "axios";

const instance = axios.create({
    // You can visit https://dog.ceo/ if you wonder what it is.
    baseURL: 'https://api.frankfurter.app/',
    timeout: 1000
});

export default instance;