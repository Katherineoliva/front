import axios from "axios";

const BASE_URL = 'https://backend-nfna0rvtf-katherines-projects-8be5cda4.vercel.app/api/role';

const getToken = () => JSON.parse(localStorage.getItem('token')).token;


export const GetRoles = async () => {
    try{
        const res = await axios.get(`${BASE_URL}/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return res.data;
    }catch(error){
        throw error.response
    }
}
