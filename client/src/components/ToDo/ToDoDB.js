import React, { useState, useEffect, useMemo } from 'react'

//import AuthenticationContext from "../../../AuthenticationContext"

const ToDoDB = ({ gardenId }) => {
  // USE CONTEXT TO GET USERNAME
 // const authContext = useContext(AuthenticationContext)
 // const posterUsername = authContext.username || 'Anonymous'
  // DEFAULT POST TO DISPLAY LOADING MESSAGE

  const loadingTask = [{
    taskname: 'Loading...',
    completed: '<p>Loading...</p>',
    date: new Date()
  }]
  // POST TO COMMUNICATE 'NO TASKS YET'
  const noToDoYet = useMemo(() => [{
    //profileImage: undefined,
    taskname: 'Nothing to do',
    content: '<p>Have something to do. Please post it here!</p>',
    date: new Date()
  }], [])


  // DECLARE STATE FOR POSTS
  const [tasks, setTasks] = useState(loadingTask)

  // setPosts TO ALL POSTS FROM DB
  useEffect(() => {
    // fetch to the garden router for all posts  
    const fetchAllTasks = async () => {
      let fetchUrl = `/api/garden/tasks/${gardenId}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()

        // turn each 'date' from a string back into a Date object.
        for (let task of resObject.tasks) {
          task.date = new Date(task.date)
        }

        // if there are messages, set the 'tasks' state to them.
        // if not, set 'posts' to noToDoPost
        let areThereTasks = (resObject.tasks?.length > 0)
        let tasksToSet = areThereTasks ? resObject.tasks : noToDoYet
        setTasks(tasksToSet)
      }
      catch(err) {
        alert("Error!", err)
        console.log(err)
      }
    }

    fetchAllTasks()
    },
    [gardenId, noToDoYet]
  )

  const submitTask = async (taskText) => {
    // PUT THE VALUE OF THE CURRENT TIME INTO A VARIABLE
    const curDate = new Date()

    // IF THE ONLY TASK IS THE 'NO HISTORY YET' POST, 
    // OR THE 'LOADING' POST,
    // MAKE IT DISAPPEAR 
    if (tasks === noToDoYet) {setTasks([])}
    if (tasks === loadingTask) {setTasks([])}
    

    // SET 'POSTS' STATE TO INCLUDE THE NEW TASK.
    // CURRENTLY ONLY THE 'LOADING' POST APPEARS AFTER REFRESHING, BUT OLD POSTS ARE SAVED IN THE DB - WILL NEED TO MAKE NEW POSTS DISPLAY ON THE PAGE TOO
    setTasks([
      ...tasks,
      {
        taskname: tasks,
        date: curDate
      }
    ])

    // newMessage object to be inserted into MongoDB
    // NAME PULLED IN FROM THE LOGIN DETAILS
    // ***the date has to be a string, then get remade into 
    // a new Date() object to be usable by the 
    // DiscussionBoard component when coming back from MongoDB
    let newTask = { 
      taskname: tasks,  
      date: curDate.toString()
    }

    // SAVE NEW MESSAGE TO MONGO
    // URL BUILT WITH THE 'gardenId' PROP
    let fetchUrl = `/api/garden/task/${gardenId}`
    let fetchOptions = {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTask)
    }

    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      alert(resObject.task)
    }
    catch(err) {
      alert("Error!", err)
      console.log(err)
    }
  }

  return (
    <div className='App'>
      <ToDoDB tasks={tasks} onSubmit={submitTask} />
    </div>
  )
}

export default ToDoDB