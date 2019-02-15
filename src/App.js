import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from 'loadable-components';
import posts from './posts.json';
import ScrollToTop from './components/ScrollToTop';

const Post = loadable(() => import('./components/Post'));
const Home = loadable(() => import('./components/Home'));

function App() {
  const routes = posts.map(post => {
    return {
      title: post.metadata.title,
      path: post.path,
      component: () => <Post {...post} />,
      exact: true
    };
  });
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          <Route component={Home} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
