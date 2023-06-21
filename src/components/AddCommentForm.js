import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser.js";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`/api/articles/${articleName}/comments`, { postedBy: user.email, text: commentText }, { headers });

    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    console.log(updatedArticle);
    setName("");
    setCommentText("");
  };
  return (
    <div id='add-comment-form'>
      <h3>Add a Comment:</h3>
      <label>
        Name:
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea name='' id='' cols='50' rows='10' value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
