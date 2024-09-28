import { useEffect, useState } from "react";
import { useAuth } from "./store";
import { getClinics } from "../utils/httpClient";

const useClinics = () => {

    const { token } = useAuth();
    const [clinics, setClinics] = useState([]);

    console.log('before useEffect: ',clinics);

    useEffect(() => {
    
        getClinics(token)
            .then(response => setClinics(response.data.clinics))
            .catch(error => console.error('Error fetching data:', error));

            console.log('after useEffect: ',clinics);
    }, []);

    return { clinics, setClinics };
}

export { useClinics };