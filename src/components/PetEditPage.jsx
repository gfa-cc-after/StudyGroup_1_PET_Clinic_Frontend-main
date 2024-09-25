import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePets from '../hooks/usePets'
import { useAuth } from '../hooks/store'

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/api/v1/user/pet/edit";

const PetEditPage = () => {
    const { pets } = usePets(); // Load pets from your custom hook
    const [selectedPetIndex, setSelectedPetIndex] = useState(null); // Index of the selected pet
    const [formData, setFormData] = useState({
        petName: '',
        petBreed: '',
        petSex: '',
        petBirthDate: '',
        lastCheckUp: '',
        nextCheckUp: '',
        specialCondition: ''
    })

    const navigate = useNavigate()
    const { token } = useAuth()

    // Handle when a user selects a pet from the dropdown
    const handlePetSelect = (e) => {
        const index = e.target.value;
        setSelectedPetIndex(index);

        if (index !== '') {
            const pet = pets[index];
            // Set form data to the selected pet's data
            setFormData({
                petName: pet.petName || '',
                petBreed: pet.petBreed || '',
                petSex: pet.petSex || '',
                petBirthDate: pet.petBirthDate || '',
                lastCheckUp: pet.lastCheckUp || '',
                nextCheckUp: pet.nextCheckUp || '',
                specialCondition: pet.specialCondition || ''
            });
        } else {
            // Reset form data if no pet is selected
            setFormData({
                petName: '',
                petBreed: '',
                petSex: '',
                petBirthDate: '',
                lastCheckUp: '',
                nextCheckUp: '',
                specialCondition: ''
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Ensure a pet is selected
        if (selectedPetIndex === null) {
            toast.error('Please select a pet to edit');
            return;
        }

        const selectedPetId = pets[selectedPetIndex].id; // Assuming each pet has a unique `id`

        axios.patch(`${apiUrl}/${selectedPetId}`, formData, // Send the selected pet ID in the API call
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success('Pet Changed successfully');
                setTimeout(() => navigate(`/user/home`), 1500);
            })
            .catch((err) => {
                if (!err.response) {
                    toast.error('There was a network error');
                } else {
                    toast.error('There was an error changing a pet... ' + err.response.data?.error || '');
                }
            });
    }

    return (
        <>
            <div className='prettybackground-box-add-pet'>
                <div className='form-bg'></div>
                <div className="addPetForm">
                    <h1>Edit Pet</h1>

                    {/* Dropdown to select the pet */}
                    <div>
                        <label htmlFor="selectPet">Select Pet to Edit:*</label>
                        <select id="selectPet" onChange={handlePetSelect}>
                            <option value="">Select Pet</option>
                            {pets.map((pet, index) => (
                                <option key={index} value={index}>
                                    {pet.petName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Only show form if a pet is selected */}
                    {selectedPetIndex !== null && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="petName">Name:*</label>
                                <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="petBreed">Breed:*</label>
                                <input type="text" id="petBreed" name="petBreed" value={formData.petBreed} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="petSex">Sex:*</label>
                                <select id="petSex" name="petSex" value={formData.petSex} onChange={handleChange} required>
                                    <option value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="petBirthDate">Birth Date:*</label>
                                <input type="date" id="petBirthDate" name="petBirthDate" value={formData.petBirthDate} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="lastCheckUp">Last Check-Up Date:</label>
                                <input type="date" id="lastCheckUp" name="lastCheckUp" value={formData.lastCheckUp} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="nextCheckUp">Next Check-Up Date:</label>
                                <input type="date" id="nextCheckUp" name="nextCheckUp" value={formData.nextCheckUp} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="specialCondition">Special Condition:</label>
                                <textarea id="specialCondition" name="specialCondition" value={formData.specialCondition} onChange={handleChange} rows="4" cols="50" placeholder="Enter any special conditions or notes about the pet..." />
                            </div>
                            <button type="submit" className="formButton">Edit</button>
                        </form>
                    )}
                </div>
                <ToastContainer
                    autoClose={1000}
                />
            </div>
        </>
    );
};

export default PetEditPage;
