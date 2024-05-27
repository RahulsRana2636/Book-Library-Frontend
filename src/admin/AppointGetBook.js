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
const successNotify = () => toast.success("Book Approved!", notifydata);
const errNotify = () => toast.error("Book Not Approved!", notifydata);
const ApppointGetBook = () => {
    // fetch  getbooks from datdabase 
    const [getBookList, setGetBookList] = useState([]);
    
    const [check, setCheck] = useState(true);
    
    const callApiGetBookList = async () => {
        
        try {
            const url = process.env.REACT_APP_API_URL + 'getbook/getbooklists';
            const response = await axios.get(url, {
                params: {
                    status: check ? 1 : 0
                },
                headers: {
                    authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                  },
            });
            setGetBookList(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    
        useEffect(() => {
            callApiGetBookList();
        }, [check]);

        useEffect(() => {
            callApiGetBookList();
        }, []);

        const handleCheckboxChange = () => {
            setCheck(prev => !prev);
        };

        // this api for approve a book for student
    const callBookApproved = async (id) => {
        try {
            
            const url = process.env.REACT_APP_API_URL + 'getbook/approvegetbook/' +id;
            const response = await axios.put(url,{
                status: 1
               }, {
                 headers: {
                   authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                 },
               });
            successNotify();
            callApiGetBookList();
        } catch (err) {
            console.log(err);
        }
    }

    // this api remove book from booklist 
    const callRemoveBook = async (id) => {
        try {
            
            const url = process.env.REACT_APP_API_URL + 'getbook/removebook/' +id;
            const response = await axios.put(url,{
                status: 0
               }, {
                 headers: {
                   authtoken: `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with the token
                 },
               });
        } catch (err) {
            console.log(err);
        }
    }
    const [approvedID, setApprovedID] = useState('');
    const [removedBookID, setRemovedBookID] = useState('');
        const [show, setShow] = useState(false);

        const handleClose = () => {
            errNotify();
            setShow(false); 
        };
      const showApproveModal = (approvedid, removebook) => {
        setApprovedID(approvedid);
        setRemovedBookID(removebook);
        setShow(true);
      };
      const bookApproved = () => {
        callBookApproved(approvedID);
        callRemoveBook(removedBookID);
        setShow(false)
      }
      

    return (
        <div>
            <h1>Get Book List</h1>
            <div>
                <label>
                    Show Verified Book:
                    <input
                        type="checkbox"
                        checked={check}
                        onChange={handleCheckboxChange} 
                    />
                </label>

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
                    {getBookList.length > 0 ? (  getBookList.map((item, index) => (
                        <tr key={index + item._id}>
                            <td>{index + 1}</td>
                            <td>{item.bookname}</td>
                            <td>{item.author}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.status}</td>
                            {item.status === 0 && (
                            <td>
                            <button onClick={() => showApproveModal(item._id, item.bookID)} className='btn btn-primary'>Approve Book</button>
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
                <Modal.Title>Confirm Apporve</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Are you sure to approve this book?</div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="secondary" onClick={bookApproved}>
                    Approved
                </Button>
                </Modal.Footer>
             </Modal>
            <ToastContainer />
        </div>
    );
}

export default ApppointGetBook;




