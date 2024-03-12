import React from 'react'
import { Link } from 'react-router-dom'

export default function Cancel() {
  return (
    <section className='sec'>
       <div className="container_s p-2">
  <div className="printer-top" />
  <div className="paper-container">
    <div className="printer-bottom" />
    <div className="paper">
   
      <div className="main-contents">
        <div className="success-icon "style={{backgroundColor:"red"}}><i class="fa-solid fa-xmark m-0"></i></div>
        <div className="success-title"style={{color:"red"}}>Payment Failed</div>
       
       
        <div className="order-details">
          <div className="order-number-label"></div>
          <div className="order-number"style={{fontSize:"12px"}}>Netwrok error ....!</div>
        </div>
        <div className="order-footer"><Link to={'/'}>GO TO HOME PAGE !</Link></div>
      </div>
       
      <div className="jagged-edge" />
      
    </div>
    
  </div>
</div>
    </section>
  
  )
}
