import React from 'react'

export default function Profile() {
  let userInfo = JSON.parse(localStorage.userInfo)
  let userType = localStorage.userType
  console.log(localStorage.isLoggedIn)
  console.log(userInfo, userType)
  return (
    <div>Profile</div>
  )
}
