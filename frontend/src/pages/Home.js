// import the things we need
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container } from 'react-bootstrap'; 

// create component, pass props
const Home = (props) => {

    // home page
    return (
        <Container style={{ display: 'flex', flexDirection: 'row' }}>
            <Card style={{ flex: 1, width: '20rem' }}>
                <Card.Body>
                    <Card.Title>About Calypso</Card.Title>
                    <Card.Text>
                        Thanks for visiting Calypso! We'd love to share more about our project and us. 
                    </Card.Text>
                    <Button href="/about" variant="primary">About</Button>
                </Card.Body>
            </Card>
            <Card style={{ flex: 1, width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Log In</Card.Title>
                    <Card.Text>
                        Please login to see your projects, or to create a new one. 
                    </Card.Text>
                    <Button href="/boards" variant="primary">Log In</Button>
                </Card.Body>
            </Card>
        </Container>
    )
  };
  
  export default Home;