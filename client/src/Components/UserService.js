import axios from "axios";

class UserService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }

    editProfile = () => {
        return this.service.put('/editprofile/:_id')
            .then(response => response.data)
    }

    getProfile = () => {
        return this.service.get('/profile/:_id')
            .then(response => response.data)
    }

    getUser = () => {
        return this.service.get('/getuser')
            .then(response => response.data)
    }

}



export default UserService;