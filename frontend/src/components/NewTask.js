// import all the things you need
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const NewTask = () => {
    
    // set up tasks and states
    const [task, setTask] = useState("");
    const [cardID, setCardID] = useState("")
    const [rowState, setRowState] = useState("");

    // state updater
    const onChangeHandler = (e, setValue) => {
        console.log(e.target);
        setValue(e.target.value);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newTask = {
            task: task,
            row: rowState,
            card: cardID
    };
    console.log("New Task, yo: ", newTask);
    }

    // form to create new Task
    return (
      <div className="newtask">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              value={setTask}
              name="task"
              placeholder="Enter Task"
              onChange={(e) => onChangeHandler(e, setTask)}
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