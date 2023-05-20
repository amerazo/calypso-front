import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

const EditBoard = ({board}) => {
    const [titleState, setTitleState] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
    
    const fetchBoard = async () => {
      try {
        const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${board._id}`);
        const boardData = await responseData.json();
        console.log(boardData);
        const { title } = boardData;
        setTitleState(title);
      } catch (error) {}
    };

    fetchBoard();
  }, [board._id]);

  //Here we are making a dynamic onChangeHandler that'll accept a state updater
  const onChangeHandler = (e, setValue) => {
    console.log(e.target.value);
    setValue(e.target.value); //this represents any state updater (setName) that we passed in
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedBoard = {
      title: titleState,
    };

    console.log("This is our updated board: ", updatedBoard);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBoard),
    };

    const responseData = await fetch(
        `https://calypso-back-end.onrender.com/boards/${board._id}`, options
    );

    const updatedBoardObj = await responseData.json();
    console.log(updatedBoardObj);

    navigate(`/boards/${board._id}`);
  }; //end of submit

  return (
    <div className="editboard">
    <Form onSubmit={onSubmitHandler}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={titleState}
          name="board-title"
          placeholder="Title"
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
        Edit Board
      </Button>
    </Form>
  </div>
  );
}

export default EditBoard;