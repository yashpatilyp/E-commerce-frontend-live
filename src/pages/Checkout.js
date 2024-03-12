import React, { useState } from 'react';
import ShippingAddress from '../components/ShippingAddress';
import Payment from '../components/Payment';
import PlaceOrder from '../components/PlaceOrder';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container mt-2 mb-2">
      <div className="row">
        <div className="col-md-12">
          <form id="msform">
            {/* progressbar */}
            <ul id="progressbar" className="nav nav-tabs status-bar">
              <li className={step === 1 ? 'active' : ''}>Shipping Address</li>
              <li className={step === 2 ? 'active' : ''}>Payment</li>
              <li className={step === 3 ? 'active' : ''}>Place Order</li>
            </ul>
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Back
                
              </button>
              
            )}
            {/* fieldsets */}
            {step === 1 && <ShippingAddress nextStep={nextStep} />}
            
            {step === 2 && <Payment  />}
            {step === 3 && <PlaceOrder  />}
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
