import React from 'react';

export default function Footer() {
  return (
    <div className="footer container-fluid ">
      <>
        {/* <!-- Footer Section --> */}
        <div className="Hline text-center">
          {/* <!-- Social Icons Section --> */}
          <ul className="social-icons">
            {/* <!-- Social media icons with links --> */}
            <li className='mt-2'>
            <a href="mailto:yashpatilyp2001@gmail.com" title="Send an email">
  <i className="fa-regular fa-envelope" />
</a>

            </li>
            <li>
    <a className="twitter" href="https://github.com/yashpatilyp" target="_blank" title="follow us on Github">
        <i className="fa-brands fa-github" />
    </a>
</li>

            <li>
              <a className="instagram" href="https://www.instagram.com/y_a_s_h_04_30/?hl=en" target="_blank" title="follow us on Instagram">
                <i className="fa-brands fa-instagram" />
              </a>
            </li>
          </ul>
          <hr />
          <p>Copyright @E-Commerce 2023-24</p>
        </div>
      </>
    </div>
  );
}
