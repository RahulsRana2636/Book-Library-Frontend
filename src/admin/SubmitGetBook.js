import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifydata = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }
const successNotify = () => toast.success("Book Submited!", notifydata);
const errNotify = () => toast.error("Book Not Submited!", notifydata);
const SubmitGetBook = () => {
    // fetch  submitbooks from datdabase 
    const [submitBookList, setSubmitBookList] = useState([]);
    
    const callApiSubmitBookList = async () => {
        
        try {
            const url = process.env.REACT_APP_API_URL + 'getbook/submitbooks';
            const response = await axios.get(url,{
                headers: {
                  authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                },
              }); 
            setSubmitBookList(response.data);
        } catch (err) {
            errNotify();
            console.log(err);
        }
    };

        useEffect(() => {
            callApiSubmitBookList();
        }, []);

        // this api for submit a book 
    const callBookSubmit = async (id) => {
        try {
            
            const url = process.env.REACT_APP_API_URL + 'getbook/approvegetbook/' +id;
            const response = await axios.put(url,{
                status: -1
               }, {
                 headers: {
                   authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                 },
               });
            successNotify();
            callApiSubmitBookList();
        } catch (err) {
            console.log(err);
            errNotify();
        }
    }

    // this api add book in booklist 
    const callAddBook = async (id) => {
        try {
            
            const url = process.env.REACT_APP_API_URL + 'getbook/removebook/' +id;
            const response = await axios.put(url,{
                status: 1
               }, {
                 headers: {
                   authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                 },
               });
        } catch (err) {
            console.log(err);
        }
    }
    const [submitID, setSubmitID] = useState('');
    const [removedBookID, setRemovedBookID] = useState('');
        const [show, setShow] = useState(false);

        const handleClose = () => {
            errNotify();
            setShow(false); 
        };
      const showSubmitModal = (submitid, removebook) => {
        setSubmitID(submitid)
        setRemovedBookID(removebook);
        setShow(true);
      };
      const bookSubmit = () => {
        callBookSubmit(submitID);
        callAddBook(removedBookID);
        setShow(false)
      }

    return (
        <div>
            <h1>Submit Book List</h1>
            <div>
            </div>
            <table className='table table-striped' >
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Student Name</th>
                        <th>Student Email ID</th>
                        <th>Verified Status</th>
                    </tr>
                </thead>
                <tbody>
                    {submitBookList.length > 0 ? (  submitBookList.map((item, index) => (
                        <tr key={index + item._id}>
                            <td>{index + 1}</td>
                            <td>{item.bookname}</td>
                            <td>{item.author}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.status}</td>
                            {item.status === 2 && (
                                    <td>
                                        <button onClick={() => showSubmitModal(item._id, item.bookID)} className='btn btn-primary'>Submit</button>
                                    </td>
                                )}
                        </tr>
                    )))
                    : (
                        <tr>
                          <td colSpan="6">No Result Found</td>
                        </tr>
                      )}
                </tbody>
            </table>
            <br />
            <Modal show={show}>
                <Modal.Header>
                <Modal.Title>Confirm Submit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Are you sure to submit this book?</div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="secondary" onClick={bookSubmit}>
                    Submit
                </Button>
                </Modal.Footer>
             </Modal>
            <ToastContainer />
        </div>
    );
}

export default SubmitGetBook;
