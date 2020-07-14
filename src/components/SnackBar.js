import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import * as Atts from "../Write/Story/Atts"  ; 
export default function SomeChildComponent() {
  const [openSnackbar, closeSnackbar] = useSnackbar({
    style :{
        backgroundColor: "#4BB543",
        fontFamily: '"Josefin Sans", sans-serif',
        textAlign: 'center',
    }}
  )
 
  return (
    <div>
      <button onClick={() => openSnackbar(<a style={{textDecoration:'none' , color:"white"}} href="/EditProfile" >This is the content of the Snackbar.</a>)}>
        Click me to open the Snackbar!
      </button>
    </div>
  )
}