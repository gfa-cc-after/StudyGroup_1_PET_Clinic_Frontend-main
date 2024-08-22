import { useEffect, useState } from "react";
import axios from 'axios'

const usePets = () => {
    const dataUrl = import.meta.env.VITE_API_BACKEND_URL + "/user/pets"
    const token = localStorage.getItem('token')

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
    }, [0]);
    console.log(`pets: ${pets}`);
    return (pets);
}

export default usePets;