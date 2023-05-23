// import the things we need
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

// create component, pass props
const NewTask = ({ cardId, boardId, handleAddTask, handleCloseModal }) => {

  // in case cardId is undefined
  console.log('NewTask cardId: ', cardId)
  console.log('New Task boardId: ', boardId);

  // set up tasks and states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  // when typing into form
  const onChangeHandler = (e, setValue) => {
      setValue(e.target.value);
  };

  // when form is submitted
  const onSubmitHandler = async (e) => {
    // don't reload
    e.preventDefault();
    const newTask = {
        title: taskTitle,
        description: taskDesc
    };
    console.log('cardId: ', cardId)
    console.log("New Task, yo: ", newTask);
  // set the task title state
  setTaskTitle('');
  // close the modale
  handleCloseModal();
  // and post
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  };
  try {
    const responseData = await fetch (`http://localhost:4000/boards/${boardId}/cards/${cardId}/tasks`, options);
    console.log(responseData, 'this is response data');
    if (responseData.ok) {
      const newTaskObj = await responseData.json();
      console.log(newTaskObj);
    } else {
      console.log('Failed to create task', responseData.status);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

  // form to create new task
  return (
    <div className="newtask">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            value={taskTitle}
            name="task-title"
            placeholder="Enter Task Title"
            onChange={(e) => onChangeHandler(e, setTaskTitle)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            value={taskDesc}
            name="task-description"
            placeholder="Enter Task Description"
            onChange={(e) => onChangeHandler(e, setTaskDesc)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create a New Task
        </Button>
      </Form>
    </div>
  );
};

export default NewTask;