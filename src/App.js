import Home from './pages/home';
import Pokemons from './pages/pokemons'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
      <div className="app-contaner">
        <section className="display-app">
          <Router>
            <Switch>
              <Route path="/pokemons/home" component={Home} />
              <Route path="/pokemons/:id" component={Pokemons} />
              <Route path="/" exact>
              <Redirect to="/pokemons/home" />
              </Route>
            </Switch>
          </Router>
        </section>
      </div>
  );
}

export default App;
