// import the things we need
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

// create component, pass props
const NewTask = (props) => {
    
    // set up tasks and states
    const [task, setTask] = useState("");

    // when typing into form
    const onChangeHandler = (e, setValue) => {
        setValue(e.target.value);
    }
    // when submitting form
    const onSubmitHandler = async (e) => {
      // don't reload
      e.preventDefault();
      const newTask = {
          task: task
      };
      console.log("New Task, yo: ", newTask);
    }

    // form to create new task
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