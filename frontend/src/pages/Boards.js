// import the stuff you need
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Button, Modal } from 'react-bootstrap';
import Board from "../components/Board";
import NewBoard from "../components/NewBoard";
import BoardIcon from '../components/BoardIcon';

const Boards = () => {
    
    // get the boards
    const [boards, setBoards] = useState(null);
    const URL = "https://calypso-back-end.onrender.com/boards/";
    useEffect(() => {
        console.log("boards useEffect ran");
        const fetchBoards = async() => {
            try {
                let responseData = await fetch(URL);
                let allBoards = await responseData.json();
                console.log(responseData);
                console.log(allBoards);
                setBoards(allBoards);
            } catch (error) {}
        };
        fetchBoards()
    }, []);

    // list the boards
    // let boardList;

    // if (boards) {
    //     console.log('boards! ', boards)
    //     // boardList = boards.map((board, index) => {
    //       return (
    //           <BoardIcon boards={boards} />
    //       );
    //     // });
    // };
    // console.log(boardList)

    // for add new board modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // boards page
    return (
        <div>
            <h1>Boards Page</h1>
            <h3>My Boards</h3>
            
            {/* existing boards */}
            {boards ? <BoardIcon boards={boards} /> : <h2>LOADING.. </h2>}

            {/* new board form */}
            <Button variant="primary" onClick={handleShowModal}>
                Add New Board
            </Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New Board</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <NewBoard />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                </Button>
            </Modal.Footer>
            </Modal>       
        </div>
    )
};

export default Boards;