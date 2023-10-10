import axios from "axios";


export default axios.create({
    baseURL:'https://api.pexels.com/',
    headers:{
        Authorization:
        'Z0gg3evDVxtye7DITVOkdySkoCqQ9NIaDzWy7WlbuGQY5Kb0by0WAw9E'
    }
})