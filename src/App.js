import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import posts from './posts';
import Post from './components/Post';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';

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
