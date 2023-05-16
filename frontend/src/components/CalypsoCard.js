import { Container, Card } from 'react-bootstrap';
import Task from './Task';


function CalypsoCard({ title }) {
    return (
        <div>
            <Container>
            <Card style={{width: "300px"}}>
                <Card.Title>{title}</Card.Title>
                    <Card.Img src="" />
                <Task task="this is a task" />
            </Card>
            </Container>
        </div> 
    )
};

export default CalypsoCard;