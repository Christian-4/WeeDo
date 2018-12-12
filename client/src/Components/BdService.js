import axios from "axios";

class BdService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }


    newPlan = () =>{
        return this.service.get('/new-plan')
            .then(response => response.data)
    }   


    deletePlan = () =>{
        return this.service.get('/delete-plan')
            .then(response => response.data)
    } 


    getFriends = () =>{
        return this.service.get('/getFriends')
            .then(response => response.data)
    }  
    
}



export default BdService;