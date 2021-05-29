import React, { useState } from 'react'

import DiscussionBoard from 'react-discussion-board'

// import 'react-discussion-board/dist/index.css'

const MessageBoard = () => {
  const allPosts = [
    // SAMPLE POSTS
    // {
    //   profileImage:
    //     'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
    //   name: 'Jane Doe',
    //   content: '<p>Hello everyone!</p><p>How are you all doing?</p><p>-Jane</>',
    //   date: new Date('01 Jan 2020 01:12:00 GMT')
    // },
    // {
    //   profileImage:
    //     'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //   name: 'John Doe',
    //   content:
    //     '<p>Raising say express had chiefly detract demands she. Quiet led own cause three him.</p>',
    //   date: new Date('01 Jan 2020 09:12:00 GMT')
    // }
  ]

  // UPDATE USESTATE TO USE ALL POSTS FROM DB, NOT PLACEHOLDERS
  const [posts, setPosts] = useState(allPosts)

  const submitPost = async (text) => {
    const curDate = new Date()

    // CURRENTLY ONLY THE NEW POSTS APPEAR AFTER REFRESHING, BUT OLD POSTS ARE SAVED IN THE DB - WILL NEED TO MAKE NEW POSTS DISPLAY ON THE PAGE TOO
    setPosts([
      ...posts,
      {
        // WE LIKELY WON'T USE PROFILE IMAGES FOR CHAT
        // profileImage:
        //   'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        // NAME WILL NEED TO BE PULLED IN FROM THE LOGIN DETAILS
        name: 'Me',
        content: text,
        date: curDate
      }
    ])
    // NAME WILL NEED TO BE PULLED IN FROM THE LOGIN DETAILS
    let newMessage = { name: "Me", content: text, date: curDate}

    // URL WILL NEED TO BE UPDATED FROM THE GARDEN ID
    let fetchUrl = `/api/garden/messages/60b1b2d1be11f242740db645`
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