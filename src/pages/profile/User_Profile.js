import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function User_Profile() {
const [user, SetUser]=useState([]);
const [loading,setLoading] = useState(true);



  useEffect(() => {
    const authToken = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    
    };
   

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers,
        });
       
        SetUser(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };

    fetchUser();
  }, []);


  const handleToggleAdmin = async (userId) => {
    try {
      const authToken = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      // Example API call to update the admin status
      const response = await axios.patch(
        `${API_BASE_URL}/users/${userId}`,
        { isAdmin: !user.find((u) => u._id === userId).isAdmin },
        { headers }
      );

      // Update the user state with the updated data
      SetUser((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u
        )
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error updating admin status:', error.response);
    }
  };

  //.........................................................................................

  const handleDeleteUser = async (userId) => {
    try {
      const authToken = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      // Send DELETE request to the server
      const response = await axios.delete(
        `${API_BASE_URL}/users/${userId}`,
        { headers }
      );

      SetUser((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error deleting user:', error);
      
    }
  };
  
  return (
    <div className='container summary mt-2 mb-2'>
    <ToastContainer/>
    <h1 className=''>User Profiles</h1>
    {loading ? (
     <div className="text-center d-flex justify-content-center align-items-center" style={{height:"400px"}}>
     <i className="fa fa-spinner fa-spin fa-3x" aria-hidden="true"></i>
     
   </div>
    ) : (
    <div className="table-responsive container">
      <table className="table table-striped">
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "#f5f5f5",
          }}>
          <tr>
            <th scope="col">SR</th>
            <th scope="col"> NAME</th>
          
            <th scope="col">EMAIL</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">MOBILE N0.</th>
           
            <th scope="col">ISADMIN</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {user.map((profile, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{profile.firstname} {profile.lastname}</td>
              
              <td className="">{profile.email}</td>
              <td >{profile.address}</td>
             
              <td>{profile.mobilenumber}</td>
           
              <td>
              <button
                className={`btn btn-${profile.isAdmin ? 'danger' : 'success'}`}
                onClick={() => handleToggleAdmin(profile._id)}
                style={{ fontSize: '12px', padding: '5px 10px' }}
              >
                {profile.isAdmin ? 'Revoke Admin' : 'Make Admin'}
              </button>
            </td>

              <td>
             

                <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} 
                  onClick={() => handleDeleteUser(profile._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </div>
  )
}
