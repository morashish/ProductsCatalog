import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark myShadow'>
      <div className='container-fluid p-2'>
            <div className='d-flex'>
              <ul className='navbar-nav mb-lg-0 mx-3'>
                <li className='nav-item'>
                  <Link className='nav-link' to='products'>
                    Products
                  </Link>
                </li>
              </ul>
            </div>
      </div>
    </nav>
  );
};

export default NavBar;
