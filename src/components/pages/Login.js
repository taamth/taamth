import { Typography, Button, Card, CardContent, Stack, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Box } from '@mui/material';

import { registerInit } from '../redux/actions';
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

//icons
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginInit, loginUserGoogle, loginUserFacebook } from '../redux/actions';
import SendIcon from '@mui/icons-material/Send';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function Register() {

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    // refvalue
    const emailRef = useRef();
    const passwordRef = useRef();

    let navigate = useNavigate();

    /// get state from redux
    const { currentUser } = useSelector((state) => state.user);
    const token = localStorage.getItem('myCat');

    // redux
    const dispatch = useDispatch();

    //check curent use : nếu đki thành công sẽ đưa vào trong chủ 
    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate])
    console.log('$currentUser', currentUser);


    const handleLogin = (e) => {
        if (!values.email || !values.password) {
            return;
        }
        dispatch(loginInit(values.email, values.password));
        setValues({
            ...values,
            password: '',
            email: '',
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleGoogleLogin = () => {
        dispatch(loginUserGoogle());
    }

    const handleFbLogin = () => {
        dispatch(loginUserFacebook());

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

    console.log('$values', values);

    return (
        <div id="loginform">
            <Box
                sx={{
                    my: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <form className='form-login' >
                            <Typography variant="h4" gutterBottom component="div">
                                Sign In
                            </Typography>
                            <Stack spacing={2} direction="row">
                                <TextField
                                    id="outlined-multiline-email"
                                    label="Email "
                                    required
                                    name="email"
                                    multiline
                                    maxRows={4}
                                    value={values.email}
                                    inputRef={emailRef}
                                    // onChange={handleChange('email')}
                                    // inputRef={handleChange('emailRef')}
                                />

                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        label="Password"
                                        required
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        inputRef={passwordRef}
                                        // Ref={handleChange('passwordRef')}
                                        // onChange={handleChange('password')}
                                        
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
                                    Login
                                </Button>
                                
                            </Stack>

                           

                            <Typography variant="h6" gutterBottom component="div">
                                or
                            </Typography>

                            <Stack spacing={1} direction="column">
                                <div className='form-login-content'>
                                    <Button variant="contained" color='error' endIcon={<GoogleIcon />} onClick={handleGoogleLogin}>
                                        Sign in with Google
                                    </Button>
                                </div>
                                <div className='form-login-content'>
                                    <Button variant="contained" endIcon={<FacebookIcon />} onClick={handleFbLogin}>
                                        Sign in with facebook
                                    </Button>
                                </div>

                            </Stack>

                            <Box
                                sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1, padding: '1rem' }}
                            ></Box>
                            <Typography variant="overline" display="block" gutterBottom>
                                Click here to create your account
                                <Link to='/register'>
                                    <Button color='warning' endIcon={<InsertLinkIcon />}>
                                        Register Now
                                    </Button>
                                </Link>
                            </Typography>

                        </form>
                    </CardContent>

                </Card>
            </Box>
        </div>
    )
}

