import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getUsers() {
            return fetch(`http://localhost:3030/apiVentes/users`)
            .then(res=>res.json())
        }
    }
}