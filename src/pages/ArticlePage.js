import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { articles } from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], title: "", content: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const articleData = response.data;

      setArticleInfo(articleData);
    };
    loadArticleInfo();
  }, [articleId]);

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
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {articleInfo.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <AddCommentForm articleName={articleId} onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)} />
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
