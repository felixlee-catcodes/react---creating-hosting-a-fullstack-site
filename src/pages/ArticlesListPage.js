import ArticlesList from "../components/ArticlesList.js";
import { articles } from "./article-content.js";

const ArticlesListPage = () => {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articles} />
    </>
  );
};

export default ArticlesListPage;
