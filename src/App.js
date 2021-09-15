import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Album } from './pages/Album';
import { Favorites } from './pages/Favorites';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { ProfileEdit } from './pages/ProfileEdit';
import { Search } from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route
          path="/search"
          render={ () => (
            <main>
              <Header />
              <Search />
            </main>
          ) }
        />
        <Route
          path="/album/:id"
          render={ (props) => (
            <main>
              <Header />
              <Album { ...props } />
            </main>
          ) }
        />
        <Route
          path="/favorites"
          render={ () => (
            <main>
              <Header />
              <Favorites />
            </main>
          ) }
        />
        <Route
          path="/profile"
          render={ () => (
            <main>
              <Header />
              <Profile />
            </main>
          ) }
        />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
