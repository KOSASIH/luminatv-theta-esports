// Import dependencies
import React from 'eact';
import ReactDOM from 'eact-dom';
import { BrowserRouter, Route, Switch } from 'eact-router-dom';
import { Provider } from 'eact-redux';
import { createStore, combineReducers } from 'edux';
import { composeWithDevTools } from 'edux-devtools-extension';
import thunk from 'edux-thunk';

// Import components
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import LiveStream from './components/LiveStream';
import Chat from './components/Chat';
import Polls from './components/Polls';

// Import reducers
import { streamReducer } from './reducers/streamReducer';
import { chatReducer } from './reducers/chatReducer';
import { pollReducer } from './reducers/pollReducer';

// Create store with combined reducers
const rootReducer = combineReducers({
  stream: streamReducer,
  chat: chatReducer,
  poll: pollReducer,
});

const store = createStore(rootReducer, composeWithDevTools(thunk));

// Create router
const router = (
  <BrowserRouter>
    <Provider store={store}>
      <App>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/live-stream" component={LiveStream} />
          <Route path="/chat" component={Chat} />
          <Route path="/polls" component={Polls} />
        </Switch>
        <Footer />
      </App>
    </Provider>
  </BrowserRouter>
);

// Render to DOM
ReactDOM.render(router, document.getElementById('root'));
