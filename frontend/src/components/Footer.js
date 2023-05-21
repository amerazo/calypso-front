import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer  style={{backgroundColor: '#efebff'}}>
      <Container>
        <Row style={{color: '#1f628e', fontSize: "20px"}}>
          <Col xs={12} className="text-center">
            <p className="footer-blurb">Calypso - Your Task Management App</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <a href="https://www.linkedin.com/in/chloe-rodriguez1/" target="_blank" style={{color: '#1f628e', textDecoration: 'none'}}>
              <FaLinkedin size={30} />
              <p>Chloe</p>
            </a>
          </Col>
          <Col xs="auto" className="text-center">
            <a href="https://www.linkedin.com/in/angelicaerazo/" target="_blank" style={{color: '#1f628e', textDecoration: 'none'}}>
              <FaLinkedin size={30} />
              <p>Angelica</p>
            </a>
          </Col>
          <Col xs="auto" className="text-center">
            <a href="https://www.linkedin.com/in/laura-ostering-2141a315a/" target="_blank" style={{color: '#1f628e', textDecoration: 'none'}}>
              <FaLinkedin size={30} />
              <p>Laura</p>
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <p className="footer-blurb" style={{color: '#1f628e'}}>Copyright © 2023 Chloe, Angelica, & Laura.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
