import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { articles } from "./article-content.js";
import NotFoundPage from "./NotFoundPage.js";
import CommentsList from "../components/CommentsList.js";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const articleData = response.data;
      setArticleInfo(articleData);
      console.log(articleInfo.upvotes);
    };
    loadArticleInfo();
  }, [articleId, articleInfo.upvotes]);

  // const article = articles.find((article) => article.name === articleId);
  console.log(articleInfo);
  if (!articleInfo) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{articleInfo.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {/* {articleInfo.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))} */}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
