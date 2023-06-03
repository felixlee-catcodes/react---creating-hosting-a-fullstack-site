import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar.js";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import ArticlesListPage from "./pages/ArticlesListPage.js";
import ArticlePage from "./pages/ArticlePage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import LoginPage from "./pages/LoginPage.js";
import CreateAccountPage from "./pages/CreateAccountPage.js";
import useUser from "./hooks/useUser.js";

function App() {
  const { user, isLoading } = useUser();
  //console.log(user);
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar user={user} />
        <div id='page-body'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/articles' element={<ArticlesListPage />} />
            <Route path='/articles/:articleId' element={<ArticlePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-account' element={<CreateAccountPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
