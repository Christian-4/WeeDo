import axios from "axios";

class FriendsService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }

  addFriend = id => {
    return this.service
      .post(`/addfriend/${id}`)
      .then(response => response.data);
  };

  deleteFriend = () => {
    return this.service
      .delete("/deletefriend/:_id")
      .then(response => response.data);
  };

  acceptFriend = () => {
    return this.service
      .post("/acceptfriend/:_id")
      .then(response => response.data);
  };

  declineFriend = () => {
    return this.service
      .post("/declinefriend/:_id")
      .then(response => response.data);
  };

  getAllUsers = sessionId => {
      
    let res = {
      users: [],
      userSession: []
    };
    return this.service.get("/allusers").then(response => {
      response.data.users.forEach(function(user) {
        if (user._id !== sessionId) {
            res.users.push(user)
        }else{
            res.userSession.push(user)
        }
      });

        return res;
    });
  };

  getFriends = () => {
    return this.service.get("/friends").then(response => response.data);
  };
}

export default FriendsService;
