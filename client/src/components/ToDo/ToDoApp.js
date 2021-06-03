import React, { useState, useRef, useEffect, useMemo } from "react";
import ToDoForm from "./ToDoForm";
import ToDoFilterButton from "./ToDoFilterButton";
import ToDo from "./ToDo";
import { nanoid } from "nanoid";

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
}

//Collects an array of filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function ToDoApp({ gardenId }) {
  var loadingTask = [{
    name:"loading",
    id:"loading",
    completed: false
  }]
  // POST TO COMMUNICATE 'NOTHING TO DO YET'
  const nothingToDo = useMemo(() => {
    return {
      profileImage: undefined,
      name: 'Please add a task',
      id: "default task",
      completed: false
    }
  }, [])

  const [tasks, setTasks] = useState(loadingTask)
  const [filter, setFilter] = useState('All')
  
  // manage default task appearing in task list
  useEffect (() => { 
    // if tasks is empty, add nothingToDo
    if (!tasks.length) {setTasks([nothingToDo])}

    // check if nothingToDo should be removed
    let shouldNothingToDoBeRemoved = (
      tasks.length > 1 &&
      tasks.includes(nothingToDo)
    )

    if (shouldNothingToDoBeRemoved) {setTasks(tasks.slice(1))}

  },[tasks, nothingToDo])
  
  // get all tasks from MongoDB and update them in state
  useEffect (() => {
    async function getAllTasks() {
      try {
        let response = await fetch(`/api/garden/alltasks/${gardenId}`)
        let resObject = await response.json()       
        let areThereTasks = (resObject.allTasks?.length > 0)
        let tasksToSet = areThereTasks ? resObject.allTasks : [nothingToDo]
        setTasks(tasksToSet)
      }
      catch(err) {
        console.log(`ERROR fetching all tasks for garden with _id ${gardenId}: `, err)
        alert("There was an error finding the todo list for this garden. We're fixing it as fast as we can.")
      }
    }
    
    getAllTasks()
  }, [gardenId, nothingToDo])

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
 
  //Create a task 
  const createTask = async (taskText) => {
    // new task object
    let newTask = {
      id: "todo-" + nanoid(),
      name: taskText,
      completed: false
    }
    // data for fetch()
    let fetchUrl = `/api/garden/task/${gardenId}`
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTask)
    }
    
    try {
      await fetch(fetchUrl, fetchOptions)
      setTasks([...tasks, newTask])
    }
    catch(err) {
      console.log(err)
      alert("There was an error creating this task. We're fixing it as fast as we can.")
    }
  }

  async function deleteTask(id) {
    let fetchUrl = `/api/garden/deleteTask/${gardenId}`
    let fetchOptions = {
      method: 'delete',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({taskId:id})
    }

    try {
      await fetch(fetchUrl, fetchOptions)
      let remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
    }
    catch(err) {
      console.log(err)
      alert("There was an error deleting this task. We're fixing it as fast as we can.")
    }

  }

  async function editTask(id, newName) {
    // update the task in state and put it into a variable
    let editedTaskList = tasks.map(task => (id === task.id) ? {...task, name: newName} : task)
    let taskToUpdate = editedTaskList.find((task) => task.id === id)
    // define info for fetch()
    let fetchUrl = `/api/garden/editTask/${gardenId}`
    let fetchOptions = {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(taskToUpdate)
    }

    try {
      await fetch(fetchUrl, fetchOptions)
      setTasks(editedTaskList)
      
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

  
  const tasksNoun = taskList.length !== 1 ? 'Tasks' : 'Task';
  const headingText = `${taskList.length} ${tasksNoun} Remaining`;

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


