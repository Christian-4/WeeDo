import axios from "axios";

class FriendsService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  addFriend = id => {
    return this.service
      .post(`/addfriend/${id}`)
      .then(response => response.data);
  };

  deleteFriend = (id) => {
    return this.service
      .delete(`/deletefriend/${id}`)
      .then(response => response.data);
  };

  acceptFriend = (id) => {
    return this.service
      .post(`/acceptfriend/${id}`)
      .then(response => response.data);
  };

  declineFriend = (id) => {
    return this.service
      .post(`/declinefriend/${id}`)
      .then(response => response.data);
  };

  getAllUsers = sessionId => {

    let res = {
      users: [],
      userSession: []
    };
    return this.service.get("/allusers").then(response => {
      response.data.users.forEach(function (user) {
        if (user._id !== sessionId) {
          res.users.push(user)
        } else {
          res.userSession.push(user)
        }
      });

      return res;
    });
  };

  getFriends = () => {
    return this.service.get("/friends").then(response => response.data);
  };

  getNotifications = () => {
    return this.service.get("/friendnotifications").then(response => response.data);
  }
}

export default FriendsService;
