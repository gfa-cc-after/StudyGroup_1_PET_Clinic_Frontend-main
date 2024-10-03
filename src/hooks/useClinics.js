import { useEffect, useState } from "react";
import { useAuth } from "./store";
import { getClinics } from "../utils/httpClient";

const useClinics = () => {

  const { token } = useAuth();
  const [clinics, setClinics] = useState([]);


  useEffect(() => {

    getClinics(token)
      .then(response => setClinics(response.data.clinics))
      .catch(error => console.error('Error fetching data:', error));
  }, [token]);

  return { clinics, setClinics };
}

export { useClinics };