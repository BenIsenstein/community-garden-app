import React, { useState, useRef, useEffect } from "react";
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
};

//Collects an array of filter names
const FILTER_NAMES = Object.keys(FILTER_MAP);


export default function ToDoApp({ gardenId }) {
  var loadingTask=[{
    name:"loading",
    id:"loading",
    completed:true
  }]

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
 

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);

    // fetch
  }


  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
    //fetch
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
      deleteTask={deleteTask}
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
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    //fetch
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
      <ToDoForm addTask={addTask} />
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
  );
}

