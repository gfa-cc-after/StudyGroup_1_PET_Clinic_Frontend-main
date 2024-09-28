import '../../styles/style.css'
import { Link } from 'react-router-dom'
import { useClinics } from "../../hooks/useClinics";
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const ClinicManagement = () => {
    const { clinics } = useClinics();

    return (
        <>
            <section className='page-title'>
                <h1 data-testid="tableTitle">Clinics in the Alliance</h1>
                <Link className="colored-button" to="/admin/clinic/add" >Registrate New Clinic</Link>
            </section>
            <section className='adminhome-content'>
                <table className="home-table" data-testid="clinic-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(clinics.length > 0) && clinics.map((clinic, index) => (
                            <tr key={index} data-testid="pet-row">
                                <td>{index + 1}</td>
                                <td>{clinic.name}</td>
                                <td>{clinic.address}</td>
                                <td>
                                    <IconButton aria-label="update-clinic" href='/admin/clinic/update'>
                                        <EditNoteOutlinedIcon />
                                    </IconButton></td>
                                <td>
                                    <IconButton aria-label="delete-clinic" href='/admin/clinic/delete'>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export { ClinicManagement };