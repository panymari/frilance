import React from 'react';
import {useState} from 'react';
import classes from './AcheivForm.module.scss';

const AcheivForm = ({addToDo}) => {
  const [userInput, setUserInput] = useState('')

  const handleChange = (event)=>{
    setUserInput(event.currentTarget.value)
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    addToDo(userInput)
    setUserInput("")
  }
  const handleKeyPress = (event)=>{
    if(event.key === "Enter"){
      handleSubmit(event)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.buttonIn}>
        <input         
            className={classes.input}
            value={userInput}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter your achievements..."
        />
        <button className={classes.buttonAdd}>Add</button>
    </div>
    </form>
  );
}
export default AcheivForm;