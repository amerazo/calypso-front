// import the things we need
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// create component, pass props
const NewTask = ({ cardId, boardId, handleAddTask, handleCloseModal }) => {

  // set up states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [localCardId, setLocalCardId] = useState(cardId);

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
        description: taskDesc,
        cardId: localCardId
    };
    console.log("New Task, yo: ", newTask);
  // set the task title state
  setTaskTitle('');
  // close the modal
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
    if (responseData.ok) {
      const newTaskObj = await responseData.json();
      // updates the tasks with new task
      handleAddTask(newTaskObj, cardId);
    } else {
      console.log('Failed to create task', responseData.status);
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}

  // new task form
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