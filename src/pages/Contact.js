import React from 'react'
import emailjs from 'emailjs-com';
export default function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'your_service_id' and 'your_template_id' with your EmailJS Service ID and Template ID
    emailjs.sendForm('service_0h3n19d', 'template_m1dnilb', e.target,'RIQKfqnvvKwwisXVQ')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
          <div className='profilee'>
<div className='text-center'>
<img src="https://static.vecteezy.com/system/resources/previews/036/290/311/non_2x/contact-us-form-on-laptop-screen-flat-illustration-for-web-banner-mobile-app-landing-page-business-presentation-website-banner-customer-support-customer-service-online-support-help-desk-vector.jpg" alt="" srcset="" />
</div>
    <div className=' container mt-2 mb-2'>
      <div className="wrapper mt-4 mb-4">
  <h2>CONTACT US</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group fg">
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        name="from_name"
        id="name"
       value={'Admin (E-commerce )'}
        required=""
        minLength={3}
        maxLength={25}
      />
    </div>
    <div className="form-group fg">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        name="Email"
        id="email"
        placeholder="Enter User Email ID"
        required=""
      />
    </div>
    <div className="form-group fg">
      <label htmlFor="message">Message</label>
      <textarea
        name="message"
        id="message"
        rows={5}
        placeholder="Type your message here...."
        defaultValue={""}
      />
    </div>
    <div className="form-group fg">
      <button type="submit" className="submit">
        <i className="far fa-paper-plane" />
        Send
      </button>
    </div>
  </form>
</div>

    </div>
    </div>
  )
}
