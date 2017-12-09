import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// +----------------+
// |                |
// |    ACTIONS     |
// |                |
// +----------------+

function addTodo(text) {
 return { type: 'ADD_TODO', text }
}

function addList(title) {
  return { type: 'ADD_LIST', title }
 }

// +----------------+
// |                |
// |    REDUCERS    |
// |                |
// +----------------+

const reducers = {
  todos: (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            ...action.text,
            id: state.length
          }
        ]
      default:
        return state
    }
  },
  lists: (state = [], action) => {
    switch (action.type) {
      case 'ADD_LIST':
        return [
          ...state,
          {
            ...action.title,
            id: state.length
          }
          
        ]
      default:
        return state
    }
  }
};

// +----------------+
// |                |
// |     STORE      |
// |                |
// +----------------+

const store = createStore(combineReducers(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// +----------------+
// |                |
// |   COMPONENTS   |
// |                |
// +----------------+

class List extends React.Component {

  createTodo = (e) => {
    e.preventDefault();
    store.dispatch(addTodo({
      text: this.refs.text.value,
      listId: this.props.listId
    }));
    this.refs.text.value = '';
  }

  todos = () => {
    return this.props.todos.filter(todo => todo.listId === this.props.listId).map(todo => {
      return (<li key={todo.id}>{todo.text}</li>);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.todos()}
        </ul>
        <form onSubmit={this.createTodo} placeholder="Add a TODO">
          <input ref='text'/>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

class Board extends React.Component {
  createList = (e) => {
    e.preventDefault();
    store.dispatch(addList({
      title: this.refs.text.value
    }));
    this.refs.text.value = '';
  }

  lists = () => {
    return this.props.lists.map(list => {
      return (
        <div key={list.id}>
          <h3>{list.title}</h3>
          <List listId={list.id} />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.lists()}
        <form onSubmit={this.createList}>
          <input ref='text' placeholder="Add a List"/>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { todos, lists } = state;
  return { todos, lists };
}

List = connect(mapStateToProps)(List)
Board = connect(mapStateToProps)(Board)

class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Board />
    </Provider>
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));