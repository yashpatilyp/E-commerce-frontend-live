import React from 'react'

export default function Footer() {
  return (
    <div >
     <>
     {/* <!-- Footer Section --> */}
<div className="footer container-fluid   ">

  {/* <!-- Social Icons Section --> */}
  <div className="Hline text-center">
    <ul className="social-icons">
      {/* <!-- Social media icons with links --> */}
      <li>
        <a className="facebook mt-3" href="#" title="follow us on Facebook">
          <i className="fa-brands fa-facebook-f" />
        </a>
      </li>
      <li>
        <a className="twitter "  href="#" title="follow us on Twitter">
          <i className="fa-brands fa-github" />
        </a>
      </li>
      <li>
        <a className="instagram" href="#" title="follow us on Instagram">
          <i className="fa-brands fa-instagram" />
        </a>
      </li>
    </ul>
    <hr />
  
    <p>Copyright @E-Commerce 2023-24</p>
  </div>
</div>
</>

    </div>
  )
}
