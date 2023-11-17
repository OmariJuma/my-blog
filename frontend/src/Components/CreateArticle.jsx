import React, { useRef } from "react";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const CreateArticle = () => {
  const [text, setText] = React.useState('');
  const handleChange = (value) => {
    console.log(value); // Will be HTML string
    setText(value);
  }

  const submitHandler = () => {
    //using regex extract the h1 from the text and set it as the title
    const title = text.match(/<h1>(.*)<\/h1>/)[1];
    if(title){
      axios.post("http://localhost:8080/api/v1/articles", {title, text, category, authorId:"Juma"})
      .then(res =>{ 
        console.log(res.data);
      })
      .catch(err => console.log(err));
    }

  }
  
  return (
<div className="container">
      <ReactQuill 
        theme="snow"
        value={text}
        onChange={handleChange} 
      />
      <button className="btn btn-primary" onClick={submitHandler}>Submit Article</button>
    </div>  );
};

export default CreateArticle;
