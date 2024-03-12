import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment({ nextStep }) {
  const navigate = useNavigate();

  const payment = () => {
    // Your payment logic goes here

    // After processing the payment, navigate to the next step or page
    navigate('/placeorder');
  };

  return (
    <>
      <div className="container mt-2 mb-2">
        <div style={{ height: "450px" }}>
          <div className="col-md-12 d-flex justify-content-center mt-5 mb-5 p-3 ">
            <div className="card m-3 shadow ">
              <h2 className="p-2 m-1">Payment Method</h2>
              <div className="card-body card-bodyy ">
                <div>
                  <div className="form__group p-2">
                    <div className="form__radio-group">
                      <input
                        type="radio"
                        name="size"
                        id="small"
                        className="form__radio-input"
                        checked
                      />
                      <label className="form__label-radio" htmlFor="small">
                        <span className="form__radio-button" /> Stripe
                      </label>
                    </div>
                    <br />

                    <div className="form__radio-group">
                     
                     
                      <div className="row p-3 m-2">
                        <div className="col-sm-12">
                          <button
                            className="btn btn-info m-2"
                            onClick={payment}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
