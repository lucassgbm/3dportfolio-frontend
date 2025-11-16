import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const get = (url) => {
    return api.get(url)
        .then((res) =>
            res.data
        )
        .catch(error => 
            console.log(error)
        );
}

export default api;