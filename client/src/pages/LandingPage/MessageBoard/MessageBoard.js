import React, { useState, useContext, useEffect } from 'react'
import DiscussionBoard from 'react-discussion-board'
import AuthenticationContext from "../../../AuthenticationContext"
// import 'react-discussion-board/dist/index.css'

const MessageBoard = ({ gardenId }) => {
  // USE CONTEXT TO GET USERNAME
  const authContext = useContext(AuthenticationContext)
  const posterUsername = authContext.username || 'Anonymous'
  // DEFAULT POST TO DISPLAY LOADING MESSAGE
  const defaultPost = [{
    profileImage: undefined,
    name: 'Loading',
    content: '<p>Loading</p>',
    date: new Date('01 Jan 2020 01:12:00 GMT')
  }]

  // DECLARE STATE FOR POSTS
  const [posts, setPosts] = useState(defaultPost)

  // setPosts TO ALL POSTS FROM DB, NOT PLACEHOLDERS
  useEffect(() => {
    // fetch to the garden router for all posts here 
    },
    []
  )

  const submitPost = async (messageText) => {
    // PUT THE VALUE OF THE CURRENT TIME INTO A VARIABLE
    const curDate = new Date()

    // SET 'POSTS' STATE TO INCLUDE THE NEW POST.
    // CURRENTLY ONLY THE 'LOADING' POST APPEARS AFTER REFRESHING, BUT OLD POSTS ARE SAVED IN THE DB - WILL NEED TO MAKE NEW POSTS DISPLAY ON THE PAGE TOO
    setPosts([
      ...posts,
      {
        name: posterUsername,
        content: messageText,
        date: curDate
      }
    ])

    // NAME PULLED IN FROM THE LOGIN DETAILS
    let newMessage = { 
      name: posterUsername, 
      content: messageText, 
      date: curDate
    }

    // URL BUILT WITH THE 'gardenId' PROP
    let fetchUrl = `/api/garden/messages/${gardenId}`
    let fetchOptions = {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newMessage)
    }
    try {
      let response = await fetch(fetchUrl, fetchOptions)
      let resObject = await response.json()
      alert(resObject.message)
    }
    catch(err) {
      alert("Error!", err)
      console.log(err)
    }
  }

  return (
    <div className='App'>
      <DiscussionBoard posts={posts} onSubmit={submitPost} />
    </div>
  )
}

export default MessageBoard