import axios from "axios";
const array = require('lodash/array');


class PlansService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }


    createNewPlan = (dataPlan) => {
        return this.service.post('/newplan', dataPlan)
            .then(response => response.data)
    }


    deletePlan = (id) => {
        return this.service.delete(`/deleteplan/${id}`)
            .then(response => response.data)
    }

    editPlan = () => {
        return this.service.put("/editplan/:_id")
            .then(response => response.data)
    }

    planRequest = (id) => {
        return this.service.post(`/planrequest/${id}`)
            .then(response => response.data)
    }

    acceptPlan = (id) => {
        return this.service.post(`/acceptplan/${id}`)
            .then(response => response.data)
    }

    declinePlan = (id) => {
        return this.service.post(`/declineplan/${id}`)
            .then(response => response.data)
    }

    addFriendToPlan = () => {
        return this.service.post("/addfriendtoplan")
            .then(response => response.data)
    }

    leavePlan = () => {
        return this.service.post("/leaveplan/:_id")
            .then(response => response.data)
    }

    kickUserOfPlan = () => {
        return this.service.post("/kickuserofplan")
            .then(response => response.data)
    }

    addPlanFav = (id) => {
        return this.service.post(`/addplanfav/${id}`)
            .then(response => response.data)
    }

    delPlanFav = (id) => {
        return this.service.delete(`/delplanfav/${id}`)
            .then(response => response.data)
    }

    getAllPlans = () => {

        return this.service.get("/allplans")
            .then(response => response.data)
    }

    getFriendPlans = () => {
        return this.service.get("/friendplans")
            .then(response => response.data)
    }

    getPlan = (id) => {
        return this.service.get(`/plan/${id}`)
            .then(response => response.data)
    }

    getPlansToGo = () => {
        return this.service.get("/planstogo")
            .then(response => response.data)
    }

    getFavouritePlans = () => {
        return this.service.get("/favouriteplans")
            .then(response => response.data)
    }

    getOwnPlans = () => {
        return this.service.get("/userplans")
            .then(response => response.data)
    }

    getNotifications = (id) => {
        return this.service.get(`/plannotifications/${id}`)
            .then(response => response.data);
    }

}



export default PlansService;