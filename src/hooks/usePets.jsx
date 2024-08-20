import { useEffect,useState } from "react";
import axios from 'axios'

const usePets = (dataUrl) => {

    const token = localStorage.getItem('token')
    
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get(dataUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setPets(response.data.pets);
            console.log(response);

        }).catch(error => console.error('Error fetching data:', error));
    }, []);

    return (pets);
}

export default usePets;