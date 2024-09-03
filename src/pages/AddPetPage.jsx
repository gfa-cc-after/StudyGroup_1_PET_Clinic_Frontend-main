import '../styles/style.css'
import 'react-toastify/dist/ReactToastify.css';
import { useAddPet } from '../hooks/addPet';

const AddPetPage = () => {
  const { petDetails, setPetDetails, addPet } = useAddPet();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetDetails({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addPet(petDetails);
  }

  return (
    <>
      <div className='prettybackground-box-add-pet'>
        <div className='form-bg'></div>
        <div className="addPetForm">
          <h1>Add Pet</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="petName">Name:*</label>
              <input type="text" id="petName" name="petName" value={petDetails.petName} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="petBreed">Breed:*</label>
              <input type="text" id="petBreed" name="petBreed" value={petDetails.petBreed} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="petSex">Sex:*</label>
              <select id="petSex" name="petSex" value={petDetails.petSex} onChange={handleChange} required>
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="petBirthDate">Birth Date:*</label>
              <input type="date" id="petBirthDate" name="petBirthDate" value={petDetails.petBirthDate} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="lastCheckUp">Last Check-Up Date:</label>
              <input type="date" id="lastCheckUp" name="lastCheckUp" value={petDetails.lastCheckUp} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="nextCheckUp">Next Check-Up Date:</label>
              <input type="date" id="nextCheckUp" name="nextCheckUp" value={petDetails.nextCheckUp} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="specialCondition">Special Condition:</label>
              <textarea id="specialCondition" name="specialCondition" value={petDetails.specialCondition} onChange={handleChange} rows="4" cols="50" placeholder="Enter any special conditions or notes about the pet..." />
            </div>
            <button type="submit" className="formButton">Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddPetPage };