// Payment.js

import React from 'react';
import { Link } from 'react-router-dom';

export default function Payment({nextStep}) {
  const payment=()=>{
    nextStep()
  }
  
  return (
    <>
      <div className="container mt-2 mb-2">
       
        <div style={{ height: "450px" }}>
          <div className="col-md-12 d-flex justify-content-center mt-5 mb-5 p-3 ">
            <div className="card m-3 shadow ">
              <h2 className="p-2 m-1">Payment Method</h2>
              <div className="card-body card-bodyy ">
                <form action="#">
                  <div className="form__group p-2">
                    <div className="form__radio-group">
                      <input
                        type="radio"
                        name="size"
                        id="small"
                        className="form__radio-input"
                        
                      />
                      <label className="form__label-radio" htmlFor="small">
                        <span className="form__radio-button" /> PayPal
                      </label>
                    </div>
                    <br />

                    <div className="form__radio-group">
                      <input
                        type="radio"
                        name="size"
                        id="large"
                        className="form__radio-input"
                        
                      />
                      <label className="form__label-radio" htmlFor="large">
                        <span className="form__radio-button" /> Cash
                      </label>
                      <div className="row p-3 m-2">
                <div className="col-sm-12">
                  <Link className="btn btn-info  m-2" onClick={payment}
                  >
                    Submit
                  </Link>
                </div>
              </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
