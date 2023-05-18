// import the things you need
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

// home and hamburger menu navbar
function Header(props) {
  return (
    <header style={{backgroundColor: '#efebff', color: '#1f628e'}}>
        <Navbar expand="lg">
            <LinkContainer to ="/" style={{color: '#1f628e'}}>
                <Navbar.Brand >HOME</Navbar.Brand>
            </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to="/boards" style={{color: '#1f628e'}}>
                <Nav.Link>My Boards</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" style={{color: '#1f628e'}}>
                <Nav.Link>About</Nav.Link>
            </LinkContainer>
        </Nav>
        </Navbar.Collapse>
        </Navbar>
        </header>
  );
}

export default Header;