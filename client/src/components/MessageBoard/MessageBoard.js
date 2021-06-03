import React, { useState, useContext, useEffect, useMemo } from 'react'
import DiscussionBoard from 'react-discussion-board'
import AuthenticationContext from "../../auth/AuthenticationContext"
import './MessageBoard.css'

const MessageBoard = ({ gardenId }) => {
  // USE CONTEXT TO GET USERNAME
  const authContext = useContext(AuthenticationContext)
  const posterUsername = authContext.username || 'Anonymous'
  // DEFAULT POST TO DISPLAY LOADING MESSAGE
  const loadingPostArray = [{
    name: 'Loading...',
    content: '<p>Loading...</p>',
    date: new Date()
  }]
  // POST TO COMMUNICATE 'NO CHAT HISTORY YET'
  const noHistoryYetPost = useMemo(() => {
    return {
      name: 'No Chat History',
      content: '<p>No one has posted to the message board yet. Make the first post!</p>',
      date: new Date()
    }
  }, [])

  // DECLARE STATE FOR POSTS
  const [posts, setPosts] = useState(loadingPostArray)

  // Remove default post once more get added
  useEffect (() => {
    let shouldNoHistoryYetBeRemoved = (
      posts.length > 1 && 
      posts.includes(noHistoryYetPost)
    ) 

    if (shouldNoHistoryYetBeRemoved) {setPosts(posts.slice(1))}
    
  },[posts, noHistoryYetPost])

  // setPosts TO ALL POSTS FROM DB
  useEffect(() => {
    // fetch to the garden router for all posts  
    const fetchAllMessages = async () => {
      let fetchUrl = `/api/garden/messages/${gardenId}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()

        // turn each 'date' from a string back into a Date object.
        for (let message of resObject.messages) {
          message.date = new Date(message.date)
        }

        // if there are messages, set the 'posts' state to them.
        // if not, set 'posts' to noHistoryYetPost
        let areThereMessages = (resObject.messages?.length > 0)
        let messagesToSet = areThereMessages ? resObject.messages : [noHistoryYetPost]
        setPosts(messagesToSet)
      }
      catch(err) {
        alert("There was an error getting the message board history for this garden. We're fixing it as fast as we can.")
        console.log(err)
      }
    }

    fetchAllMessages()
    },
    [gardenId, noHistoryYetPost]
  )

  const submitPost = async (messageText) => {
    // PUT THE VALUE OF THE CURRENT TIME INTO A VARIABLE
    const curDate = new Date()

    // SET 'POSTS' STATE TO INCLUDE THE NEW POST.
    setPosts([
      ...posts,
      {
        name: posterUsername,
        content: messageText,
        date: curDate
      }
    ])

    // newMessage object to be inserted into MongoDB
    // NAME PULLED IN FROM THE LOGIN DETAILS
    // ***the date has to be a string, then get remade into 
    // a new Date() object to be usable by the 
    // DiscussionBoard component when coming back from MongoDB
    let newMessage = { 
      name: posterUsername, 
      content: messageText, 
      date: curDate.toString()
    }

    // SAVE NEW MESSAGE TO MONGO
    // URL BUILT WITH THE 'gardenId' PROP
    let fetchUrl = `/api/garden/messages/${gardenId}`
    let fetchOptions = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newMessage)
    }

    try {await fetch(fetchUrl, fetchOptions)}

    catch(err) {console.log(err); alert("There was an error posting your message. We're fixing it as fast as we can.")}
  }

  return (
    <div className='discussion-board'>
      <DiscussionBoard posts={posts} onSubmit={submitPost} />
    </div>
  )
}

export default MessageBoard