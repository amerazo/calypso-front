// import all the things you need
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const NewCalCard = () => {

    // set up cards and states
    const [titleState, setTitleState] = useState("");
    const [columnState, setColumnState] = useState("");

    // state updater
    const onChangeHandler = (e, setValue) => {
        console.log(e.target);
        setValue(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newCalCard = {
            title: titleState,
            column: columnState
    };
    console.log("New Card, yo: ", newCalCard);
    }
    
    // form to create new Card
    return (
      <div className="newcard">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={setTitleState}
              name="calCard"
              placeholder="Enter Card Title"
              onChange={(e) => onChangeHandler(e, setTitleState)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create a New Card
          </Button>
        </Form>
      </div>
    );
};

export default NewCalCard;