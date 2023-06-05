import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ArticleList } from './ArticleList/ArticleList';
import { Header } from './Header/Header';
import { ArticleDetails } from '../pages/ArticleDetails/ArticleDetails';
import { CreateAccount } from '../pages/CreateAccount/CreateAccount';
import { Login } from '../pages/Login/login';
import { Profile } from '../pages/Profile/Profile';
import { NewArticle } from '../pages/NewArticle/NewArticle';
import { HocComponent } from '../pages/HocComponent/HocComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />
            <Route path="/sign-up" element={<CreateAccount />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/new-article"
              element={
                <HocComponent>
                  <NewArticle />
                </HocComponent>
              }
            />
            <Route
              path="/articles/:slug?/edit"
              element={
                <HocComponent>
                  <NewArticle />
                </HocComponent>
              }
            />
            <Route path="*" element={<h1>ничего нет</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
