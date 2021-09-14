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
            <Header>
              <Search />
            </Header>
          ) }
        />
        <Route
          path="/album/:id"
          render={ () => (
            <Header>
              <Album />
            </Header>
          ) }
        />
        <Route
          path="/favorites"
          render={ () => (
            <Header>
              <Favorites />
            </Header>
          ) }
        />
        <Route
          path="/profile"
          render={ () => (
            <Header>
              <Profile />
            </Header>
          ) }
        />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
