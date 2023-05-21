// import all the things you need
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';


const NewBoard = () => {

  // set up board and state
  const [titleState, setTitleState] = useState("");
  // const [backgroundState, setBackgroundState] = useState("");

  // state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target);
    setValue(e.target.value);
  }

  // on submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newBoard = {
        title: titleState,
        // image: backgroundState
    };

    console.log("New Board, yo: ", newBoard);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(newBoard)
    };

    const responseData = await fetch("http://localhost:4000/boards", options);

    const newBoardObj = await responseData.json();
    console.group(newBoardObj);

  };
  // form to create new Board
  return (
    <div className="newboard">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={titleState}
            name="board-title"
            placeholder="Enter title"
            onChange={(e) => onChangeHandler(e, setTitleState)}
          />
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Background</Form.Label>
          <Form.Control
            type="text"
            value={backgroundState}
            name="background"
            placeholder="Enter background"
            onChange={(e) => onChangeHandler(e, setBackgroundState)}
          />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Create a New Board
        </Button>
      </Form>
    </div>
  );
};

export default NewBoard;