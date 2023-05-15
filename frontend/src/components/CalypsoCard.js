import { Card } from 'react-bootstrap';

function CalypsoCard({ title }) {
    return (
        <div>
            <Card style={{ flex: 1 }}>
                <Card.Title>{title}</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
            </Card>
        </div> 
    )
};

export default CalypsoCard;