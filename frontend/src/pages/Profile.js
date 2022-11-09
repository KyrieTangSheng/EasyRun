import React from 'react'

export default function Profile() {

  if (localStorage.isLoggedIn) {
    let userInfo = JSON.parse(localStorage.userInfo)
    let userType = localStorage.userType
    console.log(localStorage.isLoggedIn)
    console.log(userInfo, userType)
  }
  else{
    window.location.href='./'
  }

  return (
    <div>Profile</div>
  )
}
