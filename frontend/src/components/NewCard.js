import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const NewCalCard = () => {
    const [titleState, setTitleState] = useState("");
    const [columnState, setColummState] = useState("");

    // state updater
    const onChangeHandler = (e, setValue) => {
        console.log(e.target);
        setValue(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newCalCard = {
            title: calCardState,
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
              value={calCardState}
              name="calCard"
              placeholder="Enter Card Title"
              onChange={(e) => onChangeHandler(e, setCalCardState)}
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