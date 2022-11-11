import React from 'react'
import InstitutionServices from '../services/institutions'

export default function Institution() {
  let name = "a"
  InstitutionServices.ListInstitutions(name)
  .then(response => response.json())
  .then(result=>{
    console.log(result.data)
    window.location.href="#"+name})

  return (
    <div>Institution</div>
  )
}
