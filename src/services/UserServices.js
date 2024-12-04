import axios from "axios";
const BASE_URL = 'https://backend-ten-kappa-16.vercel.app/api/user';


const getToken = () => JSON.parse(localStorage.getItem('token')).token;


export const GetUserData = async () => {

    try {
        const res = await axios.get(`${BASE_URL}/one`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return res.data;
    } catch (error) {
        throw error.response;
    }
}