// import the things we need
import { Card, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Task from './Task';
import NewTask from './NewTask';

// create component, pass props
const CalypsoCard = ({ boardId, card, handleRemoveCard}) => {
    
    // set up states
    const [tasks, setTasks] = useState([]);
    // state for specific card modal
    const [modalVisible, setModalVisible] = useState({});
    // for editing card title
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');

    const cardsURL = `https://calypso-back-end.onrender.com/boards/${boardId}/cards`;

    // this allows the component to be draggable
    // const [{isDragging},  drag] = useDrag(() => ({
    //     type: "task",
    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     })
    // }))

    // this allows the card to be droppable (take tasks)
    const [{isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addTaskToCard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    const addTaskToCard = (task) => {
        if (card._id !== task.cardId) {
            console.log(`dropping task "${task.title}" onto card with card "${card.title}"`)
            setTasks((prev) => {
                return [...prev, task]
            })
            // make a put request to update the card's task state to equal the task's state
            task.cardId = card._id;
            moveTask(card._id, task);
        }
        return {cardId: card._id};
    }

    // remove task from old card
    const removeTask = (task) => {
        setTasks((current) => 
        current.filter((t) => t._id !== task._id))
        console.log("Removed Task: ", task.title);
    }

    const moveTask = async (cardId, task) => {
        console.log('card id: ', cardId);
        console.log('old card id: ', task.cardId);
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cardId: cardId })
            };
            const responseData = await fetch(`${cardsURL}/${task.cardId}/tasks/${task._id}`, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update tasks card id');
            }
        } catch (error) {
            console.log('Error updating tasks card id: ', error);
        }
    };

    // handle entering edit mode
    const enterEditMode = (cardId) => {
        setEditMode(cardId);
        setEditedTitle('');
    };
  
    // handle exiting edit mode
    const exitEditMode = () => {
        setEditMode('');
        setEditedTitle('');
    };

    // handle card title update
    const handleUpdateCardTitle = async (cardId) => {
        try {
            console.log(editedTitle);
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: editedTitle })
            };
            const responseData = await fetch(`${cardsURL}/${cardId}`, options);
            if (!responseData.ok) {
                throw new Error ('Failed to update card title');
            }
            exitEditMode();
            card.title = editedTitle;
        } catch (error) {
            console.log('Error updating  title: ', error);
        }
    };

    // delete card
    const handleDeleteCard = async (cardId) => {
        try {
         const options = {
             method: 'DELETE', 
             headers: {
                 'Content-Type': 'application/json'
             }
         };
         const responseData = await fetch(`${cardsURL}/${cardId}`, options);
         console.log('card deleted');
         if (!responseData.ok) {
             throw new Error('Failed to delete card');
         }
         // refresh page after successful deletion
         handleRemoveCard(cardId);
        } catch (error) {
         console.log('Error deleting card: ', error);
        }
     };

    // new task handle
    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
        // refresh page after adding new task
    };
    
    // add new task modal
    const handleShowModal = (cardId) => {
        // Set the modal visibility for the specific cardId to true
        setModalVisible((prevModalVisible) => ({
        ...prevModalVisible,
        [cardId]: true,
        }));
    };
    const handleCloseModal = (cardId) => {
        // Set the modal visibility for the specific cardId to false
        setModalVisible((prevModalVisible) => ({
        ...prevModalVisible,
        [cardId]: false,
      }));
    };

    // function to fetch task data 
    const fetchTasksData = async (cardId) => {
        const tasksURL = `https://calypso-back-end.onrender.com/boards/${boardId}/cards/${cardId}/tasks`;
        try {
            const response = await fetch(tasksURL);
            if (!response.ok) {
                throw new Error ('Failed to get tasks.');
            }
            const tasksData = await response.json();
            setTasks(tasksData);
        } catch (error) {
            console.log('Error fetching tasks: ', error);
        }
    };

    // fetch tasks data
    useEffect(() => {
        fetchTasksData(card._id);
    }, []);

    // display card
    return (
        <div> 
        {tasks ? (
            <>
           <Card key={card._id} ref={drop}>
            <Card.Title>
                {editMode === card._id ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                ) : (
                <span onClick={() => enterEditMode(card._id)}>
                    {card.title}
                </span> )}
                {editMode === card._id && (
                <Button variant='primary' onClick={() => handleUpdateCardTitle(card._id)}>
                    Save
                </Button> )}
                </Card.Title>
                {tasks.map((task) => (
                        <Task key={task._id} boardId={boardId} cardId={card._id} task={task} 
                        removeTask={removeTask}/>
                ))}
                {/* buttons in footer */}
                <Card.Footer>
                <Button onClick={() => handleDeleteCard(card._id)} className="mt-2">
                    Delete Card
                </Button>
                <Button variant="primary" onClick={() => handleShowModal(card._id)}>
                    Add New Task
                </Button>
                </Card.Footer>
            </Card>

            {/* create NewTask modal */}
            <Modal show={modalVisible[card._id]} onHide={() => handleCloseModal(card._id)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewTask cardId={card._id} boardId={boardId} handleAddTask={handleAddTask} handleCloseModal={() => handleCloseModal(card._id)} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal(card._id)}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal> </>
    ) : <h2>...LOADING</h2> } 
    </div>
    )
};

export default CalypsoCard;