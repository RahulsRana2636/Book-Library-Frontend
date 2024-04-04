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
const successNotify = () => toast.success("Book Submited Successfully!", notifydata);
const errNotify = () => toast.error("Book not Submited!", notifydata);
const GetBookList = () => {
    // fetch  getbooklist from database
     const [bookList, setBookList] = useState([]);
     const userId = localStorage.getItem('id');
     const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd.MM.yyyy');
    };
     const callApiGetBookList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'getbook/getbooklist/' + userId;
      const response = await axios.get(url);
      setBookList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiGetBookList();
  }, [])

// submit a book 
  const callApiSubmitBook = async (id) => {
    try {
        
        const url = process.env.REACT_APP_API_URL + 'getbook/approvegetbook/' +id;
        const response = await axios.put(url,{
         status: 2
        })
        successNotify();
        callApiGetBookList();
    } catch (err) {
        console.log(err);
        errNotify();
    }
}
const [show, setShow] = useState(false);
const [submitBookId, setSubmitBookId] = useState('');
  const handleClose = () => {
        setShow(false);
        errNotify();
      };
  const handleShowModal = (id) => {
        setSubmitBookId(id)
        setShow(true);
      };
  const handleSubmitBook = () => {
    callApiSubmitBook(submitBookId);

    setShow(false);
  };

  return (
    <div>
        <h1>My Books</h1>
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
                <Link onClick={() => handleShowModal(item._id)}className='btn btn-warning'>Submit Book</Link>
             
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
    
    <br></br>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Submit Book?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit Book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitBook}>
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

export default GetBookList;
