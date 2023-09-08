import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineShop } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar
        expand='lg'
        className='bg-body-tertiary'
        bg='dark'
        data-bs-theme='dark'
      >
        <Container fluid>
          <Navbar.Brand href='/'>
            <AiOutlineShop className='icon-v' />
            Vendinha da Vó
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='ms-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavLink to='/login' className='nav-link'>Login</NavLink>
              <NavLink to='/register' className='nav-link'>Register</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
