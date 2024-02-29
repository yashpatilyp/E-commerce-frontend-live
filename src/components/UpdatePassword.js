import axios from 'axios';
import React, { useState } from 'react'
import { API_BASE_URL } from '../config';

export default function UpdatePassword() {
           //........................................................................
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updatePassword = async () => {
    const authToken = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    try {
      const response = await axios.put(
        `${API_BASE_URL}/userinfo/update-password`,
        {
          currentPassword: current,
          newPassword: newPassword,
        },
        {
          headers,
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.result);
        setCurrent("");
        setNewPassword("");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } else {
        setErrorMessage("Failed to update password");
      }
    } catch (error) {
      if (error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    }
  };
  return (
    <div>
      <div className="row">
                <div className="col-sm-12 mb-2">
                  <>
                    <p>
                      <p
                        className=" mb-2 "
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWidthExample"
                        aria-expanded="false"
                        aria-controls="collapseWidthExample"
                        style={{ color: "red" }}
                      >
                        Update Password
                      </p>
                    </p>
                    <div style={{ minHeight: "10px" }}>
                      <div
                        className="collapse collapse-horizontal"
                        id="collapseWidthExample"
                      >
                        <div
                          className="card card-body"
                          style={{ width: 300, padding: "20px" }}
                        >
                          <input
                            type="password"
                            required
                            value={current}
                            onChange={(e) => setCurrent(e.target.value)}
                            placeholder="Current Password"
                            style={{ marginBottom: "10px", padding: "5px" }}
                          />
                          <input
                            type="password"
                            required
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ marginBottom: "10px", padding: "5px" }}
                          />
                          {errorMessage && (
                            <div
                              className="alert alert-danger p-1"
                              role="alert"
                            >
                              {errorMessage}
                            </div>
                          )}
                          {successMessage && (
                            <div
                              className="alert alert-success p-1"
                              role="alert"
                            >
                              {successMessage}
                            </div>
                          )}
                          <button
                            className="btn btn-primary "
                            onClick={updatePassword}
                          >
                            Update <i class="fa-regular fa-thumbs-up"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
    </div>
  )
}
