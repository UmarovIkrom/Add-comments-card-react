import React, {useState} from 'react';
import './App.css';


const App = () => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectedComment, setSelectedComment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = e => {
        e.preventDefault(); 

        if(!name && !title &&!body){
            return;
        }

        if(isEditing) {
            const allComments = [...comments];
            allComments.splice(selectedComment, 1, {name, title, body});

            setComments(allComments);

            setIsEditing(false);
            setSelectedComment(null);
    
        } else{
            const comment = {name, title, body};
            console.log("comment", comment);
            setComments((prev) => [...prev, comment]);
        }
        
        setName("");
        setTitle("");
        setBody("");
    };

    const onDelete = index => {
       const newComments = [...comments];
       newComments.splice(index, 1);

       setComments(newComments)
        
    }

    const onEdit = (comment, index) => {
        setName(comment.name);
        setTitle(comment.title);
        setBody(comment.body);
        setSelectedComment(index);

        setIsEditing(true);
    }


    return (
        <>
            <div className="content-container">
                <div className="form">
                    <h2 className="header-title">Add comments</h2>
                    <input type="text" onChange={e => setName(e.target.value)} value={name} name="name" className="input" placeholder="Enter Your Name:" />
                    <input type="text" onChange={e => setTitle( e.target.value)} value={title} className="input" placeholder="Add title:" />
                    <textarea onChange={e => setBody(e.target.value)} value={body} className="input-body" placeholder="Body:" ></textarea>
                    <button onClick={handleSubmit} type="buttton" className="submit-input">Submit</button>
                </div>
                <div className="card-container">
                    {comments.map((comment, index) => (
                        <div className="card" key={index}>
                            <p>{comment.name}</p>
                            <p>{comment.title}</p>
                            <p>{comment.body}</p>
                            <button onClick={() => onDelete(index)} className="btn">Delete</button>
                            <button onClick={() => onEdit(comment, index)} className="btn" >Edit</button>
                        </div>
                    ))}
                </div> 
            </div>
        </>
    );
}


export default App;