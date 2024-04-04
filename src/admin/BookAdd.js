import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const _ = require('lodash');
const notifydata = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
}
const successNotify = () => toast.success("Book Added Successfully!", notifydata);
const errNotify = () => toast.error("Book not Added!", notifydata);
const BookAdd = () => {

  const [bookname, setBookname] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + 'books/addbook';
    try {
      const response = await axios.post(url, {
        bookname,
        author,    
      });
      successNotify();
      setTimeout(() => {
        navigate('/booklist');
      }, 1200);
    } catch (error) {
      errNotify();
    }
  };

  return (
    <>
      <div>
        <h1>Add Book</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Book Name : </label>
            <input required type="text" value={bookname} onChange={(e) => setBookname(e.target.value)} />
          </div>
          <div>
            <label>Author Name : </label>
            <input required type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
         
          <button type="submit" className='btn btn-success'>Add New Book</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
export default BookAdd;


