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
    // const [selectedUsername, setSelectedUsername] = useState('');
    // const [selectedName, setSelectedName] = useState('');
    // const [selectedAssignment, setSelectedAssignment] = useState('');
    // const [filteredAssignmentAnswerList, setFilteredAssignmentAnswerList] = useState([]);
    // const [selectedTaskAnswer, setSelectedTaskAnswer] = useState('');
    
    const callApiGetBookList = async () => {
        
        try {
            const url = process.env.REACT_APP_API_URL + 'getbook/getbooklists';
            const response = await axios.get(url, {
                params: {
                    status: check ? 1 : 0
                }
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
            })
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
            })
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
      

    // const handleUsernameFilterChange = (e) => {
    //     const selectedUsername= e.target.value;
    //     setSelectedUsername(selectedUsername);
    //     setSelectedName('')
    // };
    // const handleNameFilterChange = (e) => {
    //     const selectedName = e.target.value;
    //     setSelectedName(selectedName);
    //     setSelectedUsername('')
    // };

    // const handleAssignmentFilterChange = (e) => {
    //     const selectedAssignment = e.target.value;
    //     setSelectedAssignment(selectedAssignment);
    // };

//     useEffect(() => {
//     const filteredList = assignmentAnswerList.filter(item => {
//         const userFilter = selectedUsername === '' || item.username === selectedUsername;
//         const nameFilter = selectedName === '' || item.name === selectedName;
//         const assignmentFilter = selectedAssignment === '' || item.taskname === selectedAssignment;

//         return userFilter && nameFilter && assignmentFilter;
//     });

//     setFilteredAssignmentAnswerList(filteredList);
// }, [assignmentAnswerList, selectedUsername, selectedName, selectedAssignment]);


    // const getUsernameOptions = () => {
       
    //     const uniqueUsernames = new Set();
    //     assignmentAnswerList.forEach((user) => {
    //         uniqueUsernames.add(user.username);
    //     });
    //     const uniqueUsernamesArray = Array.from(uniqueUsernames);
    
    //     if (uniqueUsernamesArray.length === 0) {
    //         return (
    //             <option value="">Loading Users...</option>
    //         );
    //     } else {
    //         return uniqueUsernamesArray.map((username) => (
    //             <option key={username} value={username} style={{ fontWeight: selectedUsername === username ? 'bold' : 'normal', }}>
    //                 {username}
    //             </option>
    //         ));
    //     }
    // }
    // const getNameOptions = () => {
       
    //     const uniqueNames = new Set();
    //     assignmentAnswerList.forEach((user) => {
    //         uniqueNames.add(user.name);
    //     });
    //     const uniqueNamesArray = Array.from(uniqueNames);
    
    //     if (uniqueNamesArray.length === 0) {
    //         return (
    //             <option value="">Loading Users...</option>
    //         );
    //     } else {
    //         return uniqueNamesArray.map((uname) => (
    //             <option key={uname} value={uname} style={{ fontWeight: selectedName === uname ? 'bold' : 'normal', }}>
    //                 {uname}
    //             </option>
    //         ));
    //     }
    // }
    // const getAssignmentOptions = () => {
        
    //     const uniqueTaskNames = new Set();

    //     assignmentAnswerList.forEach((assignment) => {
    //         uniqueTaskNames.add(assignment.taskname);
    //     });
    
    //     const uniqueTaskNamesArray = Array.from(uniqueTaskNames);
    
    //     if (uniqueTaskNamesArray.length === 0) {
    //         return (
    //             <option value="">Loading Assignments...</option>
    //         );
    //     } else {
    //         return uniqueTaskNamesArray.map((taskname) => (
    //             <option key={taskname} value={taskname} style={{ fontWeight: selectedAssignment === taskname ? 'bold' : 'normal' }}>
    //                 {taskname}
    //             </option>
    //         ));
    //     }
    // }
    
    // const clearFilters = () => {
    //     setSelectedUsername('');
    //     setSelectedName('');
    //     setSelectedAssignment('');
    // }
   
    
    //   const handleSubmit = async (values) => {
    //     try {
    //         const url = process.env.REACT_APP_API_URL + 'leaderboard/marksforTaskSubmission';
    //         const response = await axios.post(url, values);
    //         if(response.status===200){
    //             successNotify();
    //         }
    //         else{
    //             errNotify();
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    //    setShow(false);
    //   };
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
                {/* <button onClick={clearFilters} className="btn btn-primary" style={{ marginLeft: '50px' }} >Clear Filters</button> */}

            </div>
            <table className='table table-striped' >
                <thead>
                    <tr>
                        <th>Sr No</th>
                        {/* <th>
                            <select value={selectedUsername} onChange={handleUsernameFilterChange} >
                                <option value="" style={{ fontWeight: 'bold' }}>User Name</option>
                                {getUsernameOptions()}
                            </select>
                        </th>
                        <th>
                            <select value={selectedName} onChange={handleNameFilterChange} >
                                <option value="" style={{ fontWeight: 'bold' }}>Name</option>
                                {getNameOptions()}
                            </select>
                        </th>
                        <th>
                            <select value={selectedAssignment} onChange={handleAssignmentFilterChange}  >
                                <option value="" style={{ fontWeight: 'bold' }}>Assignment Name</option>
                                {getAssignmentOptions()}
                            </select>
                        </th> */}
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




