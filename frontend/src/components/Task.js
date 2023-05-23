// import the things we need
import { Card, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';


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
            console.log("TasksData: ", tasksData);
            setTaskState(tasksData);
        } catch (error) {
            console.log('Error fetching tasks: ', error);
        }
    };

    // fetch tasks data
    useEffect(() => {
        console.log('tasks useEffect ran');
        fetchTasksData();
    }, []);

    // // delete task
    // const handleDeleteTask = async (taskId) => {
    //     // in case taskId is undefined
    //     console.log('Task taskId: ', taskId);
    //     try {
    //         const options = {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         const responseData = await fetch(`http://localhost:4000/boards/${boardId}/cards/${cardId}/tasks/${taskId}`, options);
    //         console.log('task deleted')
    //         if (!responseData.ok) {
    //             throw new Error('Failed to delete task');
    //         }
    //         // refresh page after successful deletion
    //         window.location.reload();
    //     } catch (error) {
    //         console.log('Error deleting card: ', error);
    //     }
    // };

    // display task
    return (
        <div>
            {/* map over existing tasks */}
            {taskState.map((task, index) => (
                <Col xs={12} md={4} key={task._id}>
                <Card>
                    <Card.Text>{task.title}</Card.Text>
                </Card>
                </Col>
            ))}
            {/* task hardcode example card */}
            {/* <Card style={{ align: "center", padding: "10px", width: "290px"}}>
                <Card.Text>{task}</Card.Text>
            </Card> */}
        </div> 
    )
};

export default Task;