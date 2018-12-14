import axios from "axios";

class FriendsService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }

    addFriend = () => {
        return this.service.post('/addfriend/:_id')
            .then(response => response.data)
    }

    deleteFriend = () => {
        return this.service.delete('/deletefriend/:_id')
            .then(response => response.data)
    }

    acceptFriend = () => {
        return this.service.post('/acceptfriend/:_id')
            .then(response => response.data)
    }

    declineFriend = () => {
        return this.service.post('/declinefriend/:_id')
            .then(response => response.data)
    }

    getAllUsers = () => {
        return this.service.get('/allusers')
            .then(response => response.data)
    }

    getFriends = () => {
        return this.service.get('/friends')
            .then(response => response.data)
    }

}



export default FriendsService;