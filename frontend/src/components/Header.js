// import the things you need
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

// home and hamburger menu navbar
function Header(props) {
  return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to ="/">
                <Navbar.Brand>HOME</Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to="/boards">
                <Nav.Link>My Boards</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
            </LinkContainer>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
  );
}

export default Header;