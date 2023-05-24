// import the things we need
import { Card, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './Task.css';


// create component, pass props
const Task = ({ cardId, boardId, tasks }) => {

    // tasks URL
    const tasksURL = `http://localhost:4000/boards/${boardId}/cards/${cardId}/tasks`;

    // set up states
    const [taskState, setTaskState] = useState([]);

    // function to fetch task data 
    const fetchTasksData = async () => {
        try {
            const response = await fetch(tasksURL);
            if (!response.ok) {
                throw new Error ('Failed to get tasks.');
            }
            const tasksData = await response.json();
            setTaskState(tasksData);
        } catch (error) {
            console.log('Error fetching tasks: ', error);
        }
    };

    // fetch tasks data
    useEffect(() => {
        fetchTasksData();
    }, []);

    // delete task
    const handleDeleteTask = async (taskId) => {
        // in case taskId is undefined
        console.log('Task taskId: ', taskId);
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const responseData = await fetch(`http://localhost:4000/boards/${boardId}/cards/${cardId}/tasks/${taskId}`, options);
            console.log('task deleted')
            if (!responseData.ok) {
                throw new Error('Failed to delete task');
            }
            // refresh page after successful deletion
            window.location.reload();
        } catch (error) {
            console.log('Error deleting card: ', error);
        }
    };

    // display task
    return (
        <div>
            {/* map over existing tasks */}
            {taskState.map((task, index) => (
                // <Col xs={12}  key={task._id}>
                <Card key={task._id}>
                    <Card.Text>{task.title}</Card.Text>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleDeleteTask(task._id)} className="mt-2 btn-tiny btn-corner">
                        -
                    </Button>
                </Card>
                // </Col>
            ))}
        </div> 
    )
};

export default Task;