import React from 'react';
import {useState} from 'react';
import AcheivForm from './AcheivForm';
import AchievItem from './AchievItem';

const Achievments = () => {
    const [todos, setToDos] = useState([])
  
    const addToDo = (userInput) =>{
      if(userInput){
        const newItem ={
          id: Math.random().toString(36).substr(2,9),
          task: userInput,
          complete: false
        }
        setToDos([...todos, newItem])
      }
    }
  
    const removeToDo = (id) =>{
      setToDos([...todos.filter((todo)=>todo.id !== id)])
    }
  
    const handleToggle = (id) =>{
      setToDos([...todos.map((todo)=>todo.id === id ? {...todo, complete: !todo.complete} : {...todo})])
    }
  
    return(
      <div className="App">    
        <AcheivForm addToDo={addToDo}/>
        {todos.map((todo)=>{
          return(
            <AchievItem
            todo={todo}
            key={todos.id}
            handleToggle={handleToggle}
            removeToDo={removeToDo}
            />
          )
        })}
        <div>You have: {todos.length} achievements</div>
      </div>
    );
  }
  
  export default Achievments;
  