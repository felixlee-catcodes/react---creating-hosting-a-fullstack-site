import { about } from "./article-content.js";
const AboutPage = () => {
  return (
    <>
      <h1>{about.heading}</h1>
      {about.content.map((p, idx) => (idx === 2 || idx === 5 ? <h2>{p}</h2> : <p key={idx}>{p}</p>))}
    </>
  );
};

export default AboutPage;
