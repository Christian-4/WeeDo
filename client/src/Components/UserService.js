import axios from "axios";

class UserService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }

    editProfile = (user) => {

        const formData = new FormData();
        Object.keys(user).forEach(key => formData.append(key, user[key]));

        return this.service.put('/editprofile', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }    
        })
            .then(response => response.data)
            .catch((error) => error.response.data)
    }

    getProfile = (id) => {
        return this.service.get(`/profile/${id}`)
            .then(response => response.data)
    }

    getUser = () => {
        return this.service.get('/getuser')
            .then(response => response.data)
    }

  

   

}



export default UserService;