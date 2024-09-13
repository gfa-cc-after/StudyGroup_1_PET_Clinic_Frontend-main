import { useEffect, useState } from "react";
import axios from 'axios'
import { useAuth } from "./store";

const usePets = () => {
    const dataUrl = import.meta.env.VITE_API_BACKEND_URL + "/api/v1/user/pets"
    const { token } = useAuth();

    const [pets, setPets] = useState([]);
    useEffect(() => {

        const getPets = async () => {
            const response = await axios.get(
                dataUrl,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

            return response;
        }

        getPets()
            .then(response => setPets(response.data.pets))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return { pets, setPets };
}

export default usePets;