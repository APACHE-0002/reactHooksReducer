import React, { useReducer, useState } from 'react';
import Todo from './Todo';
import './styles.css'

// DOCUMENTAÇAO
/*

1- ONclick, ativa a funçao increment
2- a funçao increment, esta chamando o dispatch, como se fosse o setState
3- dispatch podera enviar um valor ao chama-lo, ou somente ativa-lo
4- ao ativar dispatch estara ativando a funçao principal de useReducer
5- esta funçao recebendo um valor ou nao executara algo
6- funçao reducer de dispatch esta somando 1 ao valor anterior de state.count
7- o valor retornado por dispatch/reducer, se salvo em state/ segundo valor de userReducer(1 , '2');

function reducer(state, action){
  switch(action.type){
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state

  }
  

  console.log(action.type)
  return { count: state.count + 1}
}
expofrt default function pp() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment(){
    dispatch({ type: 'increment'})
  }

  function decrement(){
    dispatch({ type: 'decrement'})
  }
  return (
    <>
      <button onClick={increment}>+</button>
      <span>{state.count}</span>
    </>
  );
}

*/



/*
const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement'
}


function reducer(state, action){
  switch(action.type){
    case ACTIONS.INCREMENT:
      return {count: state.count + 1}
    case ACTIONS.DECREMENT:
      return {count: state.count - 1}
    default:
      return state
}
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment(){
    dispatch({ type: 'increment'})
  }

  function decrement(){
    dispatch({ type: 'decrement'})
  }

  return (
    <>

      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>



    </>

  );
}


*/

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}


function reducer(todos, action){
  switch(action.type){
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id === action.payload.id){
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name){
  return { id: Date.now(), name: name, complete: false }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  function handleSubmit(e){
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name} })
    setName('')
  }
 

  return (
    <>
      <form onSubmit={handleSubmit}>
          <input 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          />
      </form>

        {todos.map(todo => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        })}

    </>

  );
}
