import { useState } from "react";
import { useAuth } from "./store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addPet as addPetHttp } from "../utils/httpClient";

const useAddPet = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [petDetails, setPetDetails] = useState({
        petName: '',
        petBreed: '',
        petSex: '',
        petBirthDate: '',
        lastCheckUp: '',
        nextCheckUp: '',
        specialCondition: ''
    })

    const addPet = (pet) => {
        addPetHttp(token, pet)
            .then(() => {
                toast.success('Pet added successfully ');
                setTimeout(() => navigate(`/user/home`), 3000);
            })
            .catch((err) => {
                if (!err.response) {
                    toast.error('There was a network error');
                } else {
                    toast.error('There was an error adding a pet...' + err.response.data);
                }
            })
    }

    return { petDetails, setPetDetails, addPet };
}

export { useAddPet };