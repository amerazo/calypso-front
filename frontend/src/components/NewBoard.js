import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const NewBoard = () => {
    const [titleState, setTitleState] = useState("");
    const [backgroundState, setBackgroundState] = useState("");

    // state updater
    const onChangeHandler = (e, setValue) => {
        console.log(e.target);
        setValue(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newBoard = {
            title: titleState,
            background: backgroundState
    };
    console.log("New Board, yo: ", newBoard);
    }
    // form to create new Board
    return (
      <div className="newboard">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={titleState}
              name="title"
              placeholder="Enter title"
              onChange={(e) => onChangeHandler(e, setTitleState)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Background</Form.Label>
            <Form.Control
              type="text"
              value={backgroundState}
              name="background"
              placeholder="Enter background"
              onChange={(e) => onChangeHandler(e, setBackgroundState)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create a New Board
          </Button>
        </Form>
      </div>
    );
};

export default NewBoard;