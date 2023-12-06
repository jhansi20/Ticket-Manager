import React, { Component, useState, useEffect } from 'react';
// class TicketForm extends Component{
async function createTicket(credentials) {
    console.log("Request Headers:", credentials.getHeaders);
    const headers = new Headers();
    // Log other details for debugging
    const res = await fetch('http://localhost:3003/createTicket', {
        method: 'POST',
        body: credentials,
        // headers: headers
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        // },
        // body: JSON.stringify(credentials)
    })
        .then(data => data.json())

    console.log(res)
    return res
}

export default function TicketForm() {
    const [title, setTitle] = useState();
    const [reporter, setReporter] = useState();
    const [assigneeEmailId, setassigneeEmailId] = useState();
    const [assignee, setAssignee] = useState();
    const [type, setType] = useState();
    const [priority, setPriority] = useState();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [description, setDescription] = useState();
    const [attachments, setAttachments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersData();
    }, []);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);

        const formData = new FormData();

        // Append each file to FormData with the key 'attachments[]'
        fileArray.forEach((file, index) => {
            formData.append('attachments[]', file);
        });

        setAttachments([...attachments, ...fileArray]);
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
    const handleRemoveFile = (index) => {
        const updatedAttachments = [...attachments];
        updatedAttachments.splice(index, 1);
        setAttachments(updatedAttachments);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('reporter', reporter);
        formData.append('assigneeEmailId', assigneeEmailId);
        formData.append('assignee', assignee);
        formData.append('type', type);
        formData.append('priority', priority);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('description', description);
        // formData.append('attachments',attachments)
        // Append each file to FormData
        attachments.forEach((file) => {
            formData.append('attachments[]', file);
        });

        const res = await createTicket(formData);
        console.log(res);
        // const res = await createTicket({
        //     title,
        //     reporter,
        //     assigneeEmailId,
        //     assignee,
        //     type,
        //     priority,
        //     category,
        //     subCategory,
        //     description,
        //     attachments
        // });
        // setToken(token);
    }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" name="title" required onChange={e => setTitle(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="reporter">Reporter </label>
                    <select type="text" class="form-control" id="reporter" name="reporter" required onChange={e => setReporter(e.target.value)} >
                        <option value="" disabled selected>Choose Reporter</option>
                        {users.map((userName, index) => (
                            <option key={index} value={userName}>
                                {userName}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="form-group">
                    <label htmlFor="assignee">Assignee </label>
                    <select
                        id="assignee"
                        name="assignee"
                        class="form-control"
                        required
                        onChange={(e) => setAssignee(e.target.value)}
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
                </div>
                <div class="form-group">
                    <label for="assigneeEmailId">Assignee Email address</label>
                    <input type="email" class="form-control" id="assigneeEmailId" name="assigneeEmailId" aria-describedby="emailHelp" required onChange={e => setassigneeEmailId(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="type">Type</label>
                    <select id="type" name="type" class="form-control" required onChange={e => setType(e.target.value)}>
                        <option selected>Choose...</option>
                        <option>check</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority" name="priority" class="form-control" required onChange={e => setPriority(e.target.value)}>
                        <option selected>Assign Priority</option>
                        <option>Low-P0</option>
                        <option>Medium-P1</option>
                        <option>High-P2</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category" class="form-control" required onChange={e => setCategory(e.target.value)}>
                        <option selected>Choose</option>
                        <option>check</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="subCategory">Sub-Category</label>
                    <select id="subCategory" name="subCategory" class="form-control" required onChange={e => setSubCategory(e.target.value)}>
                        <option>Choose</option>
                        <option>check</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" name="description" rows="3" required onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="attachments">Attachments:</label>
                    <input type="file" id="attachments" name="attachments" onChange={handleFileChange} multiple accept="image/*" />

                    {/* Display selected files */}
                    {attachments.length > 0 && (
                        <div>
                            <p>Selected Files:</p>
                            <ul>
                                {attachments.map((file, index) => (
                                    <li key={index}>
                                        <span>{file.name}</span>
                                        <button type="button" onClick={() => handleRemoveFile(index)}>
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* <div class="form-group">
                                        <label for="attachments">Attachments</label>
                                        <input type="file" class="form-control-file" id="attachments" name="attachments" onChange={this.handleInputChange}></input>
                                    </div> */}
                <button class="btn btn-primary" type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}

// export default TicketForm
//<input type="text" class="form-control" id="userid" name="userid" required onChange={e => setTitle(e.target.value)} />
