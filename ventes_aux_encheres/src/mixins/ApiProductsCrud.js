import apiConfigs from "../configs/api.configs";

export default {
    methods: {
        getProducts() {
            return fetch(`http://localhost:3030/apiVentes/products`)
            .then(res=>res.json())
        },
        // etc //
    }
}