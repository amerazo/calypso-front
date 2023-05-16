import { Card } from 'react-bootstrap';


function Task({ task }) {
    return (
        <div>
            <Card style={{ align: "center", padding: "10px", width: "290px"}}>
                <Card.Text>{task}</Card.Text>
                    <Card.Img src="" />
            </Card>
        </div> 
    )
};

export default Task;