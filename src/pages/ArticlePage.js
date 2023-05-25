import { useParams } from "react-router-dom";
import articles from "./article-content";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);

  return (
    <>
      <Link className='article-list-item' to='/articles'>
        <IoIosArrowRoundBack /> Back
      </Link>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
