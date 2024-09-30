import { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import '../styles/profileDeletion.css'
import { useAuth } from '../hooks/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProfileDeletion() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationRef = useRef(null); // Reference to the confirmation message
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()

  const apiUrl = `${import.meta.env.VITE_API_BACKEND_URL}/api/v1/user/${user.id}`;

  // Function to handle the deletion process
  const handleDeleteProfile = () => {
    // Logic for deleting the profile goes here
    axios.delete(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        logout();
        navigate('/');
      })
      .catch((err) => {
        if (!err.response) {
          toast.error('There was a network error.');
        } else {
          toast.error(`Error deleting your profile: ${err.response.data?.error}` || '');
        }
      });
  };

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  // Function to handle the confirmation
  const handleConfirmDelete = () => {
    handleDeleteProfile();
    setShowConfirmation(false);
  };

  // Function to handle the cancellation of deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    navigate('/profile')
  };

  // Scroll into view when the confirmation dialog is shown
  useEffect(() => {
    if (showConfirmation && confirmationRef.current) {
      confirmationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showConfirmation]);

  return (
    <div>
      <button type='button' onClick={handleDeleteClick} className="delete-button">Delete Profile</button>

      {showConfirmation && (
        <div className="confirmation-dialog" ref={confirmationRef}>
          <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
          <button type='button' onClick={handleConfirmDelete} className="delete-button">Yes, delete my profile</button>
          <button type='button' onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDeletion;