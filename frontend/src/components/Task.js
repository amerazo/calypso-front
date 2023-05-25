// import the things we need
import { Card, Button } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import './Task.css';


// create component, pass props
const Task = ({ cardId, boardId, task }) => {

    // this allows the component to be draggable.
    const [{isDragging},  drag] = useDrag(() => ({
        type: "task",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    // delete task
    const handleDeleteTask = async (taskId) => {
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
            <Card key={task._id} ref={drag} style={{"border": isDragging ? "5px solid pink" : "1px solid"}}>
                <Card.Text>{task.title}</Card.Text>
                <Button variant="outline-secondary" size="sm" onClick={() => handleDeleteTask(task._id)} className="mt-2 btn-tiny btn-corner">
                    -
                </Button>
            </Card>
        </div> 
    )
};

export default Task;