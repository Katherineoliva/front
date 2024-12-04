import axios from "axios";

const BASE_URL = 'https://backend-nfna0rvtf-katherines-projects-8be5cda4.vercel.app/api';

export const AuthConecction = async (data) => {

    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        throw error.response;
    }

}
