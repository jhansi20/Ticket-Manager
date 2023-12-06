import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../Navbar/Navbar';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { array } from 'joi';
const _ = require('lodash');

library.add(faUser, faEdit, faCheck, faXmark);

const TicketDetails = () => {
    const location = useLocation();
    const { ticketData } = location.state;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingComment, setEditingComment] = useState(null); // Track which comment is being edited
    const [editedComment, setEditedComment] = useState('');
    const [userid] = useState(sessionStorage.getItem('userid'));
    const [editingDescription, setEditingDescription] = useState(false); // Track whether description is being edited
    console.log(ticketData.data)
    const [editedDescription, setEditedDescription] = useState(ticketData.data.description);
    let attachments = ticketData.data['attachments[]'] || [];
    let currStatus = ticketData.data.status;
    const [status, setEditedStatus] = useState(currStatus);
    const [isEditingAssignee, setIsEditingAssignee] = useState(false);
    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [users, setUsers] = useState([]);


    if (!_.isArray(attachments))
        attachments = [attachments]
    useEffect(() => {
        fetchUsersData();
        fetchComments();
    }, [ticketData.id]);

    const handleEditAssigneeClick = () => {
        setIsEditingAssignee(true);
    };



    const handleSaveAssignee = async () => {
        // Add logic to save the selectedAssignee to the backend or perform other actions
        console.log('Selected Assignee:', selectedAssignee);
        try {
            // console.log(setEditedStatus)
            await fetch(`http://localhost:3003/updateTicket/${ticketData.ticketid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assignee: selectedAssignee
                }),
            });
            const updatedTicketResponse = await fetch(`http://localhost:3003/getTicket?ticketid=${ticketData.ticketid}`);
            const updatedTicketData = await updatedTicketResponse.json();
            setSelectedAssignee(selectedAssignee)
            // Update ticketData in the component state
            location.state.ticketData = updatedTicketData;
        } catch (error) {
            console.error('Error updating description:', error);
        }
        // Reset the editing state
        setIsEditingAssignee(false);
    };
    const handleCancelAssignee = () => {
        setIsEditingAssignee(false);
    };
    const fetchUsersData = async () => {
        try {
            const response = await fetch('http://localhost:3003/getUser');
            const userData = await response.json();
            const extractedUserNames = userData.map((user) => user['?column?']);

            setUsers(extractedUserNames);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const getDataUrl = (data, type) => {
        const uint8Array = new Uint8Array(data);

        // Convert Uint8Array to binary string
        let binaryString = '';
        uint8Array.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });

        // Convert binary string to base64
        const base64 = btoa(binaryString);

        // Create data URL
        const dataUrl = `data:${type};base64,${base64}`;
        return dataUrl;
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3003/getComment?ticketid=${ticketData.ticketid}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send the new comment along with the ticket ID and user ID to the backend
            await fetch('http://localhost:3003/createComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketid: ticketData.ticketid,
                    userid,
                    comment: newComment,
                }),
            });

            // Refresh comments after submitting a new one
            fetchComments();

            // Clear the comment box
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    const handleEditClick = (comment) => {
        setEditingComment(comment.id);
        setEditedComment(comment.data.comment);
    };
    const handleSaveClick = async () => {
        try {
            // Send the edited comment to the backend
            await fetch(`http://localhost:3003/updateComment/${editingComment}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: editedComment
                }),
            });
            // Refresh comments after saving the edited comment
            fetchComments();

            // Reset editing state
            setEditingComment(null);
            setEditedComment('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };
    const handleCancelClick = () => {
        setEditingComment(null);
        setEditedComment('');
    };
    const handleEditDescriptionClick = () => {
        setEditingDescription(true);
    };
    const handleSaveDescriptionClick = async () => {
        try {
            await fetch(`http://localhost:3003/updateTicket/${ticketData.ticketid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: editedDescription,
                }),
            });
            const updatedTicketResponse = await fetch(`http://localhost:3003/getTicket?ticketid=${ticketData.ticketid}`);
            const updatedTicketData = await updatedTicketResponse.json();

            // Update ticketData in the component state
            location.state.ticketData = updatedTicketData;
            setEditingDescription(false);
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };
    const handleStatusClick = async (newStatus) => {
        try {
            // console.log(setEditedStatus)
            await fetch(`http://localhost:3003/updateTicket/${ticketData.ticketid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                }),
            });
            const updatedTicketResponse = await fetch(`http://localhost:3003/getTicket?ticketid=${ticketData.ticketid}`);
            const updatedTicketData = await updatedTicketResponse.json();
            setEditedStatus(newStatus)
            // Update ticketData in the component state
            location.state.ticketData = updatedTicketData;
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };
    const handleCancelDescriptionClick = () => {
        // Reset editing state
        setEditingDescription(false);
        setEditedDescription(ticketData.data.description);
    };


    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    {/* Ticket Details */}
                    <div className="col-md-8">
                        <h3>{ticketData.data.title} - {ticketData.ticketid}</h3>
                        {status === 'open' && (
                            <button className="btn btn-secondary btn-sm" onClick={() => handleStatusClick('In Progress')}>Start Work</button>
                        )}
                        {status === 'In Progress' && (
                            <button className="btn btn-secondary btn-sm" onClick={() => handleStatusClick('Completed')}>Work Done</button>
                        )}
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Details</h5>
                                <p className="card-text">Status: {status}</p>
                                <p className="card-text">Category: {ticketData.data.category}</p>
                                <p className="card-text">Sub Category: {ticketData.data.subCategory}</p>
                                <p className="card-text">Priority: {ticketData.data.priority}</p>
                                <p className="card-text">Type: {ticketData.data.type}</p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Description</h5>
                                {editingDescription ? (
                                    <div>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={editedDescription}
                                            onChange={(e) => setEditedDescription(e.target.value)}
                                        />
                                        <div className="d-flex justify-content-end mt-2">
                                            <FontAwesomeIcon icon="fa-solid fa-check" onClick={handleSaveDescriptionClick} />
                                            <FontAwesomeIcon icon="fa-solid fa-xmark" className='ms-2' onClick={handleCancelDescriptionClick} />

                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="card-text">{ticketData.data.description}</p>
                                        {/* <div className="d-flex justify-content-end"> */}
                                        <FontAwesomeIcon icon="edit" className="position-absolute top-0 end-0 m-2" onClick={handleEditDescriptionClick} />
                                        {/* </div> */}
                                    </div>

                                )}
                            </div>
                        </div>
                        <div className='col -mb-4'>
                            <div className="card-body">
                                <h5>Attachments</h5>
                                {attachments.length > 0 ? (
                                    <ul>
                                        {attachments.map((attachment, index) => (
                                            <li key={index}>
                                                {attachment._data ? (
                                                    // Display the image using a data URL
                                                    <img src={getDataUrl(attachment._data.data, attachment._data.type)} alt={`Attachment ${index + 1}`} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                                                ) : (
                                                    // If '_data' is not available, display a placeholder or handle accordingly
                                                    <p>Invalid Attachment</p>
                                                )}
                                                {/* You can display additional information about the attachment */}
                                                <p>{attachment.hapi.filename}</p>
                                            </li>
                                        ))}
                                    </ul>) : (<p>No attachments</p>)}

                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    {/* People, Dates, and Description */}
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">People</h5>
                                <p className="card-text">
                                    Assignee: {ticketData.data.assignee}{' '}
                                    {isEditingAssignee ? (
                                        <>
                                            <select
                                                id="assignee"
                                                name="assignee"
                                                class="form-control"
                                                value={selectedAssignee}
                                                required
                                                onChange={(e) => setSelectedAssignee(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Choose Assignee
                                                </option>
                                                {users.map((userName, index) => (
                                                    <option key={index} value={userName}>
                                                        {userName}
                                                    </option>
                                                ))}
                                            </select>
                                            <>
                                                <FontAwesomeIcon icon="fa-solid fa-check" onClick={handleSaveAssignee} />
                                                <FontAwesomeIcon icon="fa-solid fa-xmark" className='ms-2' onClick={handleCancelAssignee} />
                                            </>
                                        </>
                                    ) : (
                                        <FontAwesomeIcon
                                            icon="edit"
                                            onClick={handleEditAssigneeClick}
                                        />
                                    )}
                                </p>
                                {/* <p className="card-text">Assignee: {ticketData.data.assignee} <FontAwesomeIcon icon="edit" /></p> */}
                                <p className="card-text">Reporter: {ticketData.data.reporter}</p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Dates</h5>
                                <p className="card-text">Created On: {format(new Date(ticketData.created_on), 'dd/MMM/yy, p')}</p>
                                <p className="card-text">Modified On: {format(new Date(ticketData.modified_on), 'dd/MMM/yy, p')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5>Comments</h5>
                        {comments.length > 0 ? (
                            <div>
                                {comments.map((comment) => (
                                    <div key={comment.id} className="card mb-3">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <FontAwesomeIcon icon="user" />
                                                </div>
                                                <div className="col">
                                                    {editingComment === comment.id ? (
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                        />
                                                    ) : (
                                                        <>
                                                            <p className="card-title">{comment.data.userid} added a comment on {format(new Date(comment.created_on), 'dd/MMM/yy, p')}</p>
                                                            <p className="card-text">{comment.data.comment}</p>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="col-auto text-end">
                                                    {editingComment === comment.id ? (
                                                        <>
                                                            <FontAwesomeIcon icon="fa-solid fa-check" onClick={handleSaveClick} />
                                                            <FontAwesomeIcon icon="fa-solid fa-xmark" className='ms-2' onClick={handleCancelClick} />
                                                        </>
                                                    ) : (
                                                        <FontAwesomeIcon icon="edit" onClick={() => handleEditClick(comment)} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No comments</p>
                        )}

                        <form onSubmit={handleCommentSubmit}>
                            <div className="mb-3">
                                <label htmlFor="newComment" className="form-label">
                                    Add a comment:
                                </label>
                                <textarea
                                    className="form-control"
                                    id="newComment"
                                    rows="3"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit Comment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;
