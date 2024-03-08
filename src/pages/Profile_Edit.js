import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../components/UpdatePassword";

export default function Profile_Edit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      try {
        const response = await axios.get(`${API_BASE_URL}/userinfo`, {
          headers,
        });

        if (response.status === 200) {
          const userData = response.data.user;
          setFirstName(userData.firstname);
          setLastName(userData.lastname);
          setEmail(userData.email);
          setMobile(userData.mobilenumber);
          setAddress(userData.address);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  //..................................................................................................
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const authToken = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/userinfo/update`,
        {
          firstname: firstName,
          lastname: lastName,
          email: email,
          mobilenumber: mobile,

          address: address,
        },
        { headers }
      );

      if (response.status === 200) {
        toast.success("User information updated successfully", {
          autoClose: 1000,
          onClose: () => navigate("/profile"),
        });
        navigate("/profile");
        // Optionally, you can update the state or perform other actions upon successful update
      } else {
        toast.error("Error in Updating userInfo", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

 

  return (
    <div style={{height:"80vh"}}>
      <ToastContainer />

      <div className="col-md-12 d-flex justify-content-center mt-5 mb-5">
        <div className="card m-3 shadow">
          <h2 className="p-2 m-1">Profile Info</h2>
          <div className="card-body card-bodyy  p-4">
            <>
              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">First Name</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Last Name</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <input
                  type="email"
                  className="col-sm-8 text-secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Mobile</h6>
                </div>
                <input
                  type="number"
                  className="col-sm-8 text-secondary"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="row mb-3">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <input
                  type="text"
                  className="col-sm-8 text-secondary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <UpdatePassword/>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <button className="btn btn-info" onClick={handleUpdate}>
                    Update <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
