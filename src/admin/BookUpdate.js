import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

const notifydata = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const successNotify = () => toast.success('Book updated Successfully!', notifydata);
const errNotify = () => toast.error('Book not updated!', notifydata);

const BookUpdate = () => {
  const { id } = useParams();

  const userDataInitialState = {
    bookname: '',
    author: '',  
  };
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState(userDataInitialState);
  // this api code for update a book in booklist
  const callBookUpdateApi = async (data) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'books/updatebook/'+ id;
      const response = await axios.put(url, data);
      successNotify();
      setTimeout(() => {
        navigate('/booklist');
      }, 1200);
    } catch (error) {
        console.log("This is error " +error)
      errNotify();
    }
  };
// this api code for search a book from boolist by bookid
  const getBookByid = async (id) => {
    const url = process.env.REACT_APP_API_URL + 'books/book/' + id;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return userDataInitialState;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getBookByid(id);
      setUpdateData(bookData);
    };
    fetchData();
  }, [id]);


  const [updateBook, setUpdateBook] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    errNotify();
  };

  const handleClickUpdate = (values) => {
    setUpdateBook(values)
    setShow(true);
  };

  const handleUpdateItem = () => {
    callBookUpdateApi(updateBook);
    setShow(false);
  };



  return (
    <div>
      <h4 className="">Update Book Details</h4>
      <Formik
        enableReinitialize={true}
        initialValues={updateData}
        onSubmit={async (values) => {
          handleClickUpdate(values);
        }}
      >
        <div className="form-container">
          <Form>
            <label htmlFor="bookname">Book Name:</label>
             <Field required name="bookname" type="text" maxLength={100} />
            <br />
            <label htmlFor="author">Author Name:</label>
             <Field required name="author" type="text" maxLength={100} />
            <br />
            <button type="submit" className="btn btn-warning">
              Update Book
            </button>
          </Form>
        </div>
      </Formik>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Update?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to Update Book ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateItem}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default BookUpdate;
