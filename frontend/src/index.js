//import custom sass
import './styles/main.scss';
// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// Import React & Redux
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from "react-redux";
import configureStore from './store/configure_store';
import './firebase/firebase_init';

// config redux store
const store = configureStore();

const app = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));