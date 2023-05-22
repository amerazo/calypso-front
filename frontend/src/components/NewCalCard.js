// import all the things you need
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewCalCard = ({ boardId, handleAddCard, handleCloseModal }) => {
  console.log('NewCalCard boardId: ', boardId)
  const [titleState, setTitleState] = useState("");

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newCalCard = {
      title: titleState,
      boardId: boardId,
      tasks: []
    };
    console.log('boardId: ', boardId);
    console.log("New Card: ", newCalCard);
    
    setTitleState('');
    handleCloseModal();
    
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCalCard)
    };

    try {
      const responseData = await fetch(`http://localhost:4000/boards/${boardId}/cards`, options);
      console.log(responseData, "this is response data");
      if (responseData.ok) {
        const newCardObj = await responseData.json();
        console.log(newCardObj);
        handleAddCard(newCardObj);
      } else {
        console.log('Failed to create card:', responseData.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="newcard">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={titleState}
            name="card-title"
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
