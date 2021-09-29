import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        <Switch>
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
            path="/profile/edit"
            render={ () => (
              <main>
                <Header />
                <ProfileEdit />
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
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
