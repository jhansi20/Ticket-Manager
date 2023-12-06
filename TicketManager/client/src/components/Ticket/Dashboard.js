import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate, Link } from 'react-router-dom';

async function fetchAssignedTickets(userId) {
    const response = await fetch(`http://localhost:3003/getTicket?assignee=${userId}`);
    const assignedTickets = await response.json();
    return assignedTickets;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userid')
    if (!userId)
        navigate('/login')
    const [assignedTickets, setAssignedTickets] = useState([]);
    useEffect(() => {
        const fetchTickets = async () => {
            const tickets = await fetchAssignedTickets(userId);
            setAssignedTickets(tickets);
        };

        fetchTickets();
    }, [userId]);
    return (
        <div>
            <Navbar />
            <div className="dashboard">
                <h4>Assigned Tickets</h4>
                <br />
                {assignedTickets.length > 0 ? (
                    <div>
                        {assignedTickets.map((ticket) => (
                            <div key={ticket.id}>
                                {/* <p>Ticket ID: {ticket.data.ticketid}</p>
                            <p>Title: {ticket.data.title}</p> */}
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Ticket ID: {ticket.ticketid}</h5>
                                        <p class="card-text">Title: {ticket.data.title}</p>
                                        {/* <a href="#" class="btn btn-primary">View</a> */}
                                        <Link to={`/ticket/`} state={{ ticketData: ticket }} className="btn btn-primary">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No assigned tickets</p>
                )}
            </div>
        </div>
    );
}