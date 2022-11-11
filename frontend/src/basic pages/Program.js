import React from 'react'
import ProgramServices from '../services/programs'

export default function Program() {
  let schoolName = "all"
  let programName = "all"
  ProgramServices.ListPrograms(schoolName, programName)
  .then(response => response.json())
  .then(result=>{
    console.log(result.data)})
  return (
    <div>Program</div>
  )
}
