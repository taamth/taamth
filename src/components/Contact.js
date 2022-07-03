import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
// hook

export default function Contact() {

  // this.state = {name: 'test'} === name
  // setName === this.setState({name: newValue})
  const [name, setName] = useState("test");
  const [isRed, setIsRed] = useState(false);
  const [isTrue, setIsTrue] = useState();
  // setState của hook nó là replace (thay thế)
  /*
      name; // "test" => example
      setName("example")
  */

  /*
    // setState của class là mergeing
    sate = {
      name: "xinchao",
      age: 17
    }
    this.setState({name: "hello"}); 
    this.state.name = "hello";
    this.state.age = 17;
  */
  // componentDidMount
  React.useEffect(() => {
    // đây là componentDidMount
    console.log("đây là componentDidMount");

  }, []);



  // componentDidUpdate
  React.useEffect(() => {
    // đây là componentDidUpdate
    console.log("đây là componentDidUpdate");
    console.log('$isRed', isRed);
    
    // componentUnmound
    return () => console.log("component unmound")
  }, [isRed]);

  React.useEffect(() => {
    // đây là componentDidUpdate
    console.log("đây là componentDidUpdate name");
    console.log('$name', name);
    
  }, [name]);

  const onchangeName = (e) => {
    setName(e.target.value);
  }

  const updateColorText = () => {
    setIsRed(!isRed);
  }


  return (
    <div>
      <p style={{ "color": isRed ? "red" : "blue"}}> {name} </p>
     
      <TextField id="outlined-basic" onChange={onchangeName} value={name} label="Outlined" variant="outlined" />
      <Button onClick={updateColorText} variant="contained">click change color</Button>
    </div>
  )
}