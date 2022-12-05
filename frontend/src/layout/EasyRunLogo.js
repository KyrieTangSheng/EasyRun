import { border, height, sizeHeight, sizeWidth } from '@mui/system'
import React from 'react'

export default function EasyRunLogo(props) {
  return (
    <a className="logo-link" href="/" style={{height:1, width:1}}>
        <div className={"logo-card " +  props.position + " " + props.size}>
            <div className="logo"><img alt="logo" src='/favicon.png' /></div>
            <div className="logo-title"><h2>{props.title}</h2></div>
        </div> 
    </a>
  )
}
