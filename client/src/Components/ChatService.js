import axios from "axios";


class ChatService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }

    getChats = () => {
        return this.service.get("/getchats")
            .then(response => response.data)
    }

    getChat = (id) => {
        return this.service.get(`/getchat/${id}`)
            .then(response => response.data)
    }
    addMessage = (id, message) => {
        return this.service.post(`/addmessage/${id}`, message)
            .then(response => response.data)
    }
}

export default ChatService;