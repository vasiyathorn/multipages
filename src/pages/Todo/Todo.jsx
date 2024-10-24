import { useState,useEffect, useRef } from 'react'
import { fetchTodos } from '../../data/todos'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Todo.css'
import { Form } from 'react-bootstrap';

function Todo() {

    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [numPages, setNumPages] = useState(1)
    const [curPage, setCurPage] = useState(1)


    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, [])

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter( (todo) => {return todo.completed === false})) 
        } else {
            setTodos(todosRaw)
        }
    }, [todosRaw, onlyWaiting,itemsPerPage])

    useEffect(() => {
        console.log('onlyWaiting: ${onlyWaiting}')
    },[onlyWaiting]) 

    useEffect(() => {
        console.log('itemsPerPage: ${itemsPerPage}')
        setNumPages(Math.ceil(todosRaw.length / itemsPerPage))
    }, [itemsPerPage, todosRaw])

    useEffect(() => {
        setCurPage(1)  
    }, [numPages])

    function deleteClick(id) {
        const todosRemain = todosRaw.filter((todo) => {
            return todo.id !== id
        })
        
        setTodosRaw(todosRemain)
    }

    function waitingClick(id) {
        
        const todoSelected = todosRaw.find((todo) => {
            return todo.id === id

        })

        todoSelected.completed = true

        setTodosRaw( [...todosRaw] )

    }

    function addClick(id, title) {
        const newItem = {
            id,
            title,
            completed: false,
            userId: 1,
        }

        setTodosRaw( [...todosRaw, newItem] )
    }

    // Model Handler
    const [show, setShow] = useState(false);

    const newIdRef = useRef()
    const newTitleRef = useRef()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <div className='todo-container'>


            {/* Table*/}
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><span className='bi bi-plus-lg'>&nbsp;Add todo</span></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                       
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                disabled value={
                                    Number(
                                        todosRaw.reduce((prev,todo) => {
                                        return todo.id > prev ? todo.id : prev
                                    }, 0)) + 1
                                }
                                ref={newIdRef}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newTitleRef}
                            />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        <span className='bi bi-x-lg'>&nbsp;Cancel</span>
                    </button>
                    <button variant="primary" onClick={ () => {
                        const id = newIdRef.current.value
                        const title = newTitleRef.current.value.trim()
                        if (title === '') {
                            alert('Title cannot be empty')
                            newTitleRef.current.value = ''
                            newTitleRef.current.focus()
                        } else {
                            addClick(id, title)
                            handleClose()
                        }
                        
                    }}>
                        <span className='bi bi-plus-lg'>&nbsp;Add</span>
                    </button>
                    </Modal.Footer>
                </Modal>


            {/* Filters*/}
            <div className='todo-filters-container'>
                <div className='form-check form-switch'>
                    <input 
                        className= 'form-check-input' 
                        type="checkbox"
                        role='switch'
                        id='flexSwitchCheckChecked'
                        // checked 
                        onClick={(e) => {setOnlyWaiting(e.target.checked)}}
                        />

                    <label 
                        className='form-check-label' 
                        htmlFor='flexSwitchCheckChecked'>
                        Show only&nbsp;
                        <button 
                            className='btn btn-warning'>
                        
                            waiting&nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>

                <select 
                    className="form-select" 
                    aria-label="Default select example" 
                    defaultValue={5}
                    style={{width: '200px'}}
                    onChange={  (e) => {setItemsPerPage(e.target.value)}}>
                <option value={5}>5 items per page</option>
                <option value={10}>10 items per page</option>
                <option value={50}>50 items per page</option>
                <option value={100}>100 items per page</option>
                </select>
            </div>

            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th style={{width: '10%'}}>ID</th>
                        <th>Title</th>
                        <th style={{textAlign: 'right', width: '20%'}}>
                            Completed&nbsp;
                            <button
                                className='btn btn-primary'
                                onClick={() => {
                                    handleShow()
                                }}>
                                <span className='bi bi-plus-lg'></span>
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                   
                    
                    { todos.filter((todo, index) => {
                        const min = (curPage - 1) * itemsPerPage
                        const max = curPage * itemsPerPage - 1
                        return index >= min && index <= max
                    }).map((todo) => { return (
                        <tr key={todo.id}>
                         <td>
                             <span className='badge bg-secondary' style={{width: '3rem'}}>{todo.id}</span>
                         </td>
                         <td style={{textAlign: 'left'}}>{todo.title}</td>
                         <td style={{textAlign: 'right'}}>

                            <span className={'badge ' + (todo.completed ? 'bg-success' : 'bg-warning')} 
                                onClick={ () => {
                                    waitingClick(todo.id)
                                }}> 
                             { todo.completed ? "done" : "waiting"} 

                             <span className={'bi ' + (todo.completed ? 'bi-check' : 'bi-clock')}></span>
                            </span>

                             <button 
                                className='btn btn-danger' 
                                onClick={ () => {
                                    deleteClick(todo.id)
                                }}>
                                <span className='bi bi-trash3'></span>
                             </button> 
                         </td>
                        </tr>
                     )} 
                    )}

                </tbody>

            </table>

            <div>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => {setCurPage(1)}} 
                    disabled={curPage === 1}
                    >First</button>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => {curPage > 1 && setCurPage(curPage - 1)}}>Prev</button>
                <span className='todo-space'> {curPage}&nbsp;/&nbsp;{numPages}</span>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => {curPage < numPages && setCurPage(curPage + 1)}}>Next</button>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => {setCurPage(numPages)}}
                    disabled={curPage === numPages}
                    >Last</button>
            </div>



        </div>
     )
}

export default Todo