import axios from 'axios'

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params:{
        key : "40429b2d10994b67b07a3013d7346756"
    }
})