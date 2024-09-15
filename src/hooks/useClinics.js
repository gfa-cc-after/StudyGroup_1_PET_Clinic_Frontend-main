import { useEffect, useState } from "react";
import { useAuth } from "./store";
import { getClinics } from "../utils/httpClient";

const useClinics = () => {

    const { token } = useAuth();
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        getClinics(token)
            .then(data => setClinics(data))
            .catch(error => console.error('Error fetching data:', error));

    }, [token]);

    return { clinics };
}

export { useClinics };