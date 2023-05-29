import { homepage } from "./article-content.js";
const HomePage = () => {
  return (
    <>
      <h1>{homepage.heading}</h1>
      {homepage.content.map((p) => (
        <p>{p}</p>
      ))}
    </>
  );
};

export default HomePage;
