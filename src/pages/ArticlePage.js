import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { articles } from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";
import useUser from "../hooks/useUser.js";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    title: "",
    content: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, { headers });
      const newArticleData = response.data;
      setArticleInfo(newArticleData);
    };
    if (isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
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
        {user ? (
          <button onClick={addUpvote}>{canUpvote ? "Upvote" : "Already Upvoted"}</button>
        ) : (
          <Link to='/login'>
            <button>Log in to upvote</button>
          </Link>
        )}

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
