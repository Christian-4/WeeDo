import axios from "axios";

class PlansService {
    constructor() {
        this.service = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }


    createNewPlan = () => {
        return this.service.post('/newplan')
            .then(response => response.data)
    }


    deletePlan = () => {
        return this.service.delete('/deleteplan/:_id')
            .then(response => response.data)
    }

    editPlan = () => {
        return this.service.put("/editplan/:_id")
            .then(response => response.data)
    }

    planRequest = () => {
        return this.service.post("/planrequest/:_id")
            .then(response => response.data)
    }

    acceptPlan = () => {
        return this.service.post("/acceptplan/:_id")
            .then(response => response.data)
    }

    declinePlan = () => {
        return this.service.post("/declineplan/:_id")
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

    addPlanFav = () => {
        return this.service.post("/addplanfav/:_id")
            .then(response => response.data)
    }

    delPlanFav = () => {
        return this.service.delete("/delplanfav/:_id")
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

    getPlan = () => {
        return this.service.get("/plan/:_id")
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

}



export default PlansService;