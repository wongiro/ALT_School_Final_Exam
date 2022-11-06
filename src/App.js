import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Apps from "./Topics";

import "./styles.css";
import NotFound from "./NotFound";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error) {
    this.setState({ hasError: error });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h1>Error boundary page</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorScreen = () => {
  throw new Error("OPPS! Wahala  during render");
};

export default function App() {
  return (
    <Router>
      <header className="headers">
        <Link to="/" activeClassName="active">
          Home
        </Link>
        <Link
          to="/about"
          activeClassName="active"
          style={{ marginLeft: "10px" }}
        >
          Custom Hook Counter
        </Link>
        <Link
          to="/topics"
          style={{ marginLeft: "10px" }}
          activeClassName="active"
        >
          Use Reducer Counter
        </Link>
        <Link
          to="/shop"
          activeClassName="active"
          style={{ marginLeft: "10px" }}
        >
          Error Boundary
        </Link>
        <Link to="*" activeClassName="active" style={{ marginLeft: "10px" }}>
          404 Page
        </Link>
      </header>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ErrorBoundary {...props}>
                <Home {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/about"
            render={(props) => (
              <ErrorBoundary {...props}>
                <About {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/topics"
            render={(props) => (
              <ErrorBoundary {...props}>
                <Apps {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="/shop"
            render={(props) => (
              <ErrorBoundary {...props}>
                <ErrorScreen {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path="*"
            render={(props) => (
              <ErrorBoundary {...props}>
                <NotFound {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </main>
    </Router>
  );
}
