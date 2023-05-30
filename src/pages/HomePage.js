import { homepage } from "./article-content.js";
const HomePage = () => {
  return (
    <>
      <h1>{homepage.heading}</h1>
      {homepage.content.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
};

export default HomePage;
