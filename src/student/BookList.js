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

const successNotify = () => toast.success(" Wait for Book approval!", notifydata);
const errNotify = () => toast.error("Get book cancelled", notifydata);
const BookList = () => {
     //for boolist data
     const [bookList, setBookList] = useState([]);

     const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd.MM.yyyy');
    };

     const callApiBookList = async () => {
    try {
    const url= process.env.REACT_APP_API_URL + 'books/booklist';
      const response = await axios.get(url);
      setBookList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiBookList();
  }, [])

  // for get book
  const [updateData, setUpdateData] = useState({
    bookname: '',
    author: '',
  });
  const handleSubmit = async (bookdata, userdata) => {
    const dataToSend = {
        ...bookdata,
        ...userdata,
        user: userId 
      };
    const url = process.env.REACT_APP_API_URL + 'getbook/addgetbook';
    try {
      const response = await axios.post(url, dataToSend);
      successNotify();

    } catch (error) {
      console.error(error);
      errNotify();
    }
  };

  // searh book from bookllist database 
  const getBookByid = async (id) => {
    const url= process.env.REACT_APP_API_URL + 'books/book/' + id;
    try {
      const response = await axios.get(url);
    return response.data;
    } catch (error) {
      return userId;
    }
  };
  // searh user from users database 
  const userId = localStorage.getItem('id');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const getUserByid = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'user/' + userId;
      const response = await axios.get(url,{
        headers: {
          authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
        },
      });
      return response.data;
    } catch (error) {
      return userId;
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
        setShow(false);
        errNotify();
      };
  const handleShowModal = (id) => {
        const fetchData = async () => {
          const bookData = await getBookByid(id);
          const userData = await getUserByid();
          
          const { bookname, author, _id } = bookData;
          const { name, email} = userData;
          setUpdateData({
            bookname: bookname,
            author: author, 
            bookID : _id
          });
          setUserData({
            name: name,
            email: email
          });
        };
        fetchData();
        setShow(true);
      };
  const handleGetBook = () => {
    handleSubmit(updateData,userData);
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
       bookList.length > 0 ? ( bookList.map((item, index) => (
           
            <tr key={index + item._id}>
              <td>{index + 1}</td>
              <td>{item.bookname}</td>
              <td>{item.author}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                <Link onClick={() => handleShowModal(item._id)} className='btn btn-warning'>Get Book</Link>
             
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
          <Modal.Title>Get Book?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to this Book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleGetBook}>
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

export default BookList;
