import { useState } from 'react'
import axios from 'axios'
import '../styles/style.css'
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_BACKEND_URL + "/user/pet/add";
const token = localStorage.getItem('token');

const AddPetForm = () => {
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
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(apiUrl, formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                navigate(`/user/home`)
            })
            .catch((err) => {
                if (!err.response) {
                    setError('There was a network error');
                } else {
                    setError('There was an error saving new pet...' + err.response.data);
                }
            })
    }

    return (
        <>
            <div className='prettybackground-box-add-pet'>
                <div className='form-bg'></div>
                <div className="addPetForm">
                    <h1>Add Pet</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="petName">Name:</label>
                            <input type="text" id="petName" name="petName" value={formData.petName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="petBreed">Breed:</label>
                            <input type="text" id="petBreed" name="petBreed" value={formData.petBreed} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="petSex">Sex:</label>
                            <select id="petSex" name="petSex" value={formData.petSex} onChange={handleChange} required>
                                <option value="">Select Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="petBirthDate">Birth Date:</label>
                            <input type="date" id="petBirthDate" name="petBirthDate" value={formData.petBirthDate} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="lastCheckUp">Last Check-Up Date:</label>
                            <input type="date" id="lastCheckUp" name="lastCheckUp" value={formData.lastCheckUp} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="nextCheckUp">Next Check-Up Date:</label>
                            <input type="date" id="nextCheckUp" name="nextCheckUp" value={formData.nextCheckUp} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="specialCondition">Special Condition:</label>
                            <textarea id="specialCondition" name="specialCondition" value={formData.specialCondition} onChange={handleChange} rows="4" cols="50" placeholder="Enter any special conditions or notes about the pet..." />
                        </div>
                        <button type="submit" className="formButton">Add</button>
                    </form>
                </div>
                <p style={{ color: 'red' }}>{error ? error : ""}</p>
            </div>
        </>
    );
};

export default AddPetForm;