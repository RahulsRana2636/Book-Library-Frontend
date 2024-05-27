import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Modal, Button } from "react-bootstrap";
import { format } from 'date-fns';

const notifydata = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
}
const successNotify = () => toast.success("Book deleted Successfully!", notifydata);
const errNotify = () => toast.error("Book not deleted!", notifydata);
const AdminBooklist = () => {
    const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd.MM.yyyy');
    };
    // this api code for fetch books from booklist 
    const [bookList, setBookList] = useState([]);
     const callApiBookList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'books/booklist';
      const response = await axios.get(url,{
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
        },
      });
      setBookList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiBookList();
  }, [])

  // this api for delete a book from booklist
  const deleteBook = async (id) => { 
    try{
    if (id) {
      const url = process.env.REACT_APP_API_URL + 'books//deletebook/' + id;
      const response = await axios.delete(url,{
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
        },
      });
      successNotify();
    } else {
      errNotify();
    }
  }
  catch(err){
    console.log(err);
    errNotify();
  }
    callApiBookList();
  }
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    errNotify();
    callApiBookList();
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const handleDeleteItem = () => {
    deleteBook(deleteId);
    setShow(false);
  };

  return (
    <div>
        <h1>Available Books</h1>
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>Sr No</th>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          bookList.length > 0 ? (  bookList.map((item, index) => (
           
            <tr key={index + item._id}>
              <td>{index + 1}</td>
              <td>{item.bookname}</td>
              <td>{item.author}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                <Link to={`/bookupdate/${item._id}`} className='btn btn-warning'>Edit</Link>
             
              </td>
              <td>
                  <button onClick={() => handleClickDelete(item._id)} className='btn btn-danger'>Delete</button>
                </td>
            </tr>
          )))
          : (
            <tr>
              <td colSpan="6">No Result Found</td>
            </tr>
          )}
      </tbody>
    </table>
    <Link to="/bookadd" className='btn btn-primary'>Create New Book</Link> 
    <br></br>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to delete Book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteItem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
           No
          </Button>
        </Modal.Footer>
      </Modal>
    <ToastContainer />
    
  </div>
  )
}

export default AdminBooklist;
