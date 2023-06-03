import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { articles } from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";
import useUser from "../hooks/useUser.js";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    title: "",
    content: [],
  });

  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());

      if (token) console.log("got token:", token);
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, { headers });
      const newArticleData = response.data;

      setArticleInfo(newArticleData);
    };
    loadArticleInfo();
  }, []);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!articleInfo) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{articleInfo.title}</h1>

      <div className='upvotes-section'>
        {user ? <button onClick={addUpvote}>Upvote</button> : <button>Log in to upvote</button>}

        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {articleInfo.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? <AddCommentForm articleName={articleId} onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)} /> : <button>Log in to add a comment</button>}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
