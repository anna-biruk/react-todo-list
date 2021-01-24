import React from 'react';
import logo from './logo.svg';
import {Counter} from './features/counter/Counter';
import './App.css';
import {Todolist} from "./features/todolist/todolist";

function App() {
    return (
        <div className="App">
            <Todolist/>
        </div>
    );
}

export default App;
