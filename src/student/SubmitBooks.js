import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const SubmitBookList = () => {
    // fetch  frombooklist from database by user
     const [bookList, setBookList] = useState([]);
     const userId = localStorage.getItem('id');
     const formatDate = (dateString) => {
      return format(new Date(dateString), 'dd.MM.yyyy');
    };
     const callSubmitBookList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'getbook/submitbooklist/' + userId;
      const response = await axios.get(url);
      setBookList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callSubmitBookList();
  }, [])


  return (
    <div>
        <h1>Submit Books</h1>
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
            </tr>
          )))
          : (
            <tr>
              <td colSpan="6">No Result Found</td>
            </tr>
          )}
      </tbody>
    </table>   
  </div>
  )
}

export default SubmitBookList;
