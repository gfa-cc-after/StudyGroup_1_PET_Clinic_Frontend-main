import { useEffect, useState } from "react";
import { useAuth } from "./store";
import { getPets } from "../utils/httpClient";

const usePets = () => {
  const { token } = useAuth();

  const [pets, setPets] = useState([]);
  useEffect(() => {
    getPets(token)
      .then(({ data }) => {
        setPets(data.pets);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, [token]);

  return { pets };
}

export default usePets;