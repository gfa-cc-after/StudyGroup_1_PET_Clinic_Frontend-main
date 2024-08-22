import { useEffect, useState } from "react";
import axios from 'axios'

const usePets = (dataUrl) => {

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
    },[0]);

    return (pets);
}

export default usePets;