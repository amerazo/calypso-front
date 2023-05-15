// import react stuff
import { useState } from "react";
// import bootstrap stuff
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';

function Boards({boards}) {
    return (
        <div>
            <h1>Boards Page</h1>
            <h1>Add New</h1>
            <h1>My Boards</h1>
            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
                <Card style={{ flex: 1 }}>
                <Card.Title>Board Name</Card.Title>
                    <Card.Img src="" />
                <h3>image</h3>
                </Card>
            </Container>
        </div>
    )
};

export default Boards;