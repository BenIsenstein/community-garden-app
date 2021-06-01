import React, { useState, useRef, useEffect, useMemo } from "react";
import ToDoForm from "./ToDoForm";
import ToDoFilterButton from "./ToDoFilterButton";
import ToDo from "./ToDo";
import { nanoid } from "nanoid";
//import { Db } from "mongodb";


// custom hook  to return a previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// values of FILTER_MAP are functions used to filter the tasks data array (All, Active, Completed)
//ALL-CAPS  convention that signifies this data will never change after being defined here
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

//Collects an array of filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);


export default function ToDoApp({ gardenId }) {
  var loadingTask=[{
    name:"loading",
    id:"loading",
    completed:true
  }]
  // POST TO COMMUNICATE 'NOTHING TO DO YET'
  const nothingToDo = useMemo(() => [{
    // profileImage: undefined,
    name: 'Nothing To do Today',
    id: '<p>No one has posted to the list yet. Make the first post!</p>',
    completed: true
  }], [])

  const [tasks, setTasks] = useState(loadingTask);
  const [filter, setFilter] = useState('All');

  useEffect (()=> {
    async function getAllTasks() {
      try {
        let response = await fetch(`/api/garden/alltasks/${gardenId}`)
        let resObject = await response.json()
        let allTasks = resObject.allTasks
        setTasks(allTasks)
      }
      catch(err) {
        console.log(`ERROR fetching all tasks for garden with _id ${gardenId}: `, err)
        alert("There was an error finding the todo list for this garden. We're fixing it as fast as we can.")
      }
    }
    getAllTasks()
    }, [gardenId]
  )

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new obkect
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
 

  async function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    let fetchUrl = `/api/garden/deleteTask/${gardenId}`
    let fetchOptions = {
      method: 'delete',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({taskId:id})
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      alert(resObject.successMessage)
    }
    catch(err) {
      alert("Error!", err)
      console.log(err)
    }

  }

  async function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
    let taskToUpdate=tasks.find((task) => task.id === id)
    let fetchUrl = `/api/garden/editTask/${gardenId}`
    let fetchOptions = {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(taskToUpdate)
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      alert(resObject.successMessage)
    }
    catch(err) {
      alert("Error!", err)
      console.log(err)
    }
  }

  //Re-uses the unique id of task as the key
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <ToDo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={() => deleteTask(task.id)}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <ToDoFilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  //Create a task 
  const createTask = async (taskText) => {
   // if (tasks.length === nothingToDo) {setTasks([])}
    
    // SET 'Tasks' STATE TO INCLUDE THE NEW Task.
    setTasks([
      ...tasks, 
      {
        id: "todo-" + nanoid(),
        name: taskText,
        completed: false
    }
    ])

    let newTask ={
      id: "todo-" + nanoid(),
      name: taskText,
      completed: false
    }
  
    let fetchUrl = `/api/garden/task/${gardenId}`
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTask)
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      alert(resObject.successMessage)
    }
    catch(err) {
      alert("Error!", err)
      console.log(err)
    }
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <ToDoForm addTask={createTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
        <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}


