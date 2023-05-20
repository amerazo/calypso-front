// import what you need
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const BoardIcon = ({ boards }) => {
    
    // display board icon
    return (
        <Container>
            <Row>
            {/* map through boards, display title and make each board icon linkable to its id (show page) */}
            {boards.map((board, index) => (
                <Col xs={12} md={4} key={index}>
                    <Link to={`/boards/${board._id}`} style={{ textDecoration: 'none' }}>
                        <Card>
                        <Card.Title>{board.title}</Card.Title>
                        <Card.Img src="" />
                        <h3>image</h3>
                        </Card>
                    </Link>
                 </Col>
             ))}
            </Row>
        </Container>
    )
};

export default BoardIcon;