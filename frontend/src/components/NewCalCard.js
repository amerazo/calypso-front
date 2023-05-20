// // import all the things you need
// import { Form, Button } from 'react-bootstrap';
// import { useState } from 'react';


// const NewCalCard = ({ id }) => {

//     console.log('id: ', id);

//     // set up cards and states
//     const [titleState, setTitleState] = useState("");
//     // const [taskState, setTaskState] = useState("");

//     // state updater
//     const onChangeHandler = (e, setValue) => {
//       console.log(e.target);
//       setValue(e.target.value);
//     };

//     // on submit
//     const onSubmitHandler = async (e) => {
//       e.preventDefault();
//       const newCalCard = {
//           title: titleState,
//           // tasks: taskState
//       };
//       console.log("New Card, yo: ", newCalCard);

//       // post backend
//       const options = {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         }, 
//         body: JSON.stringify(newCalCard)
//       };

//       const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${id}/cards`, options);
//       const newCardObj = {'title': titleState, 'tasks': []};

//       const newCardObj = await responseData.json();
//       console.group(newCardObj);
//     }; // end submit
    
//     // form to create new Card
//     return (
//       <div className="newcard">
//         <Form onSubmit={onSubmitHandler}>
//           <Form.Group>
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               value={titleState}
//               name="card-title"
//               placeholder="Enter Card Title"
//               onChange={(e) => onChangeHandler(e, setTitleState)}
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             Create a New Card
//           </Button>
//         </Form>
//       </div>
//     );
// };

// export default NewCalCard;

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewCalCard = ({ id }) => {
  const [titleState, setTitleState] = useState("");

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newCalCard = {
      title: titleState,
    };
    console.log("New Card: ", newCalCard);

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCalCard)
    };

    try {
      const responseData = await fetch(`https://calypso-back-end.onrender.com/boards/${id}/cards`, options);
      console.log(responseData, "this is response data");
      if (responseData.ok) {
        const newCardObj = await responseData.json();
        console.log(newCardObj);
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
