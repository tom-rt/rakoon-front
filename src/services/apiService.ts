import axios from "axios";

export default class ApiService {

    constructor() {
    }

    async ping() {
        return await axios.post('http://localhost:8081/ping')
    }

    async connect(user, password) {
        console.log(user);
        console.log(password);
        return await axios.post('http://localhost:8081/login')
    }

    async subscribe(user, password) {
        console.log(user);
        console.log(password);
        return await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    }
}
