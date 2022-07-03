import { Typography, Button, Card, CardContent, Stack, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//icon
import SendIcon from '@mui/icons-material/Send';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import { registerInit } from '../redux/actions';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    // refvalue
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();   

    let navigate = useNavigate();

    /// get state from redux
    const { currentUser } = useSelector((state) => state.user);

    // redux
    const dispatch = useDispatch();

    //check curent use : nếu đki thành công sẽ đưa vào trong chủ 
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate])
    console.log('$currentUser', currentUser);


    const handleLogin = () => {
        console.log('$email', emailRef.current.value);
        console.log('$passwordRef', passwordRef.current.value);
        if (emailRef.current.value === '' || passwordRef.current.value === '' || nameRef.current.value === '') {
            alert("please input again !");
        }
        dispatch(registerInit(emailRef.current.value, passwordRef.current.value, nameRef.current.value));
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div id="registerform">
            <Box
                sx={{
                    my: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <form className='form-register' >
                            <Typography variant="h4" gutterBottom component="div">
                                Register
                            </Typography>

                            <Stack spacing={2} direction="column">

                                <TextField
                                    id="outlined-multiline-email"
                                    label="Email"
                                    name="email"
                                    multiline
                                    maxRows={4}
                                    value={values.email}
                                    inputRef={emailRef}
                                />

                                <TextField
                                    id="outlined-multiline-email"
                                    label="Name"
                                    name="name"
                                    multiline
                                    maxRows={4}
                                    value={values.name}
                                    inputRef={nameRef}
                                />

                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        inputRef={passwordRef}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }

                                    />
                                </FormControl>
                                <Button variant="contained" onClick={handleLogin} endIcon={<SendIcon />}>
                                    Register
                                </Button>
                            </Stack>

                            <Box
                                sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, padding: '1rem' }}
                            ></Box>

                            <Link to='/login'>
                                <Button color='warning' endIcon={<InsertLinkIcon />}>
                                    Login Now
                                </Button>
                            </Link>

                        </form>
                    </CardContent>

                </Card>
            </Box>
        </div>
    )
}

