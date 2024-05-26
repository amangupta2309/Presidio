import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/userStore';
import NextTopLoader from 'nextjs-toploader';
import {
  persistStore,
} from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
        <NextTopLoader color="#2299DD" />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
