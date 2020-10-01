import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todo/Todos';
import Header from './components/layouts/Header';
import About from './components/Pages/About';
import AddTodo from './components/Todo/AddTodo';
import axios from 'axios';
//import uuid from 'uuid/v4';
// const { v4: uuidv4 } = require('uuid');      this works

class App extends Component{

  state = {
    todos: [
      /*{
        id:uuidv4(),
        title: "Dust the furnitures in the sitting room.",
        completed: false,
      },
      {
        id:uuidv4(),
        title: "Clean the toilets.",
        completed: false,
      },
      {
        id: uuidv4(),
        title: "Arrange the beds.",
        completed: false,
      }*/
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos:res.data}))

  }

  // toggle complete

  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map( todo =>{

      if(todo.id === id ){
        todo.completed = !todo.completed
      }
      return todo;
    })
       
      });
  }

  // delete todo

  delTodo = (id) =>  {

    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then( res => this.setState({ todos: [... this.state.todos.filter(todo => todo.id !== id)] }));


    //this.setState({ todos: [... this.state.todos.filter(todo => todo.id !== id)] });
  }

  // addtodo

  addTodo = (title) => {

    /*const newTodo ={
      id:uuidv4(),
      title:title,
      completed:false
    }*/
    axios.post('https://jsonplaceholder.typicode.com/todos?_limit=10',{title, completed: false})
    .then(res => this.setState({ todos:[...this.state.todos, res.data]}));

    //this.setState({ todos: [... this.state.todos, newTodo] });
  }


  render() {
    /*console.log(this.state.todos)*/
    return (
      <Router>
        <div className="App">
          <div className="container">

            <Header/>
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo = {this.delTodo} />
                <AddTodo addTodo={this.addTodo}/>
              </React.Fragment>
            )}/>

            <Route path="/about" component={About}
            />
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
