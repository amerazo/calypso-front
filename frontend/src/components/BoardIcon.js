// import the things we need
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// create component, pass props
const BoardIcon = ({ boards }) => {
    
    // delete board
    const handleDeleteBoard = async (boardId) => {
        // in case boardId is undefined
        console.log('BoardIcon boardId: ', boardId)
        try {
        const options = {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const responseData = await fetch(`http://localhost:4000/boards/${boardId}`, options);
        console.log('board deleted');
        if (!responseData.ok) {
            throw new Error('Failed to delete board');
        }
        // refresh page after successful deletion
        window.location.reload();
       } catch (error) {
        console.log('Error deleting board: ', error);
       }
    };

    // display board icon
    return (
        <Container>
            <Row>
            {/* map through boards, display title and make each board icon linkable to its id (show page) */}
            {boards.map((board, index) => (
                <Col xs={12} md={4} key={index}>
                    <Card>
                        <Link to={`/boards/${board._id}`} style={{ textDecoration: 'none' }}>
                            <Card.Title>{board.title}</Card.Title>
                        </Link>
                            <h3>image</h3>
                        <Button onClick={() => handleDeleteBoard(board._id)} className="mt-2">
                                Delete
                        </Button>
                    </Card>
                 </Col>
             ))}
            </Row>
        </Container>
    )
};

export default BoardIcon;