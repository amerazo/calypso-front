// import the things we need
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// create component, pass props
const NewCalCard = ({ boardId, handleAddCard, handleCloseModal }) => {

  // in case boardId is undefined
  console.log('NewCalCard boardId: ', boardId)

  // set up states
  const [titleState, setTitleState] = useState("");

  // on changes in the form
  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  // when the form is submitted
  const onSubmitHandler = async (e) => {
    // don't reload
    e.preventDefault();
    const newCalCard = {
      title: titleState,
      boardId: boardId,
      tasks: []
    };
    console.log('boardId: ', boardId);
    console.log("New Card: ", newCalCard);
    // set the card title state
    setTitleState('');
    // close the modal
    handleCloseModal();
    // and post
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCalCard)
    };
    try {
      const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${boardId}/cards`, options);
      console.log(responseData, "this is response data");
      if (responseData.ok) {
        const newCardObj = await responseData.json();
        console.log(newCardObj);
        // updates the cards with new card
        handleAddCard(newCardObj);
      } else {
        console.log('Failed to create card:', responseData.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // new card form
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
