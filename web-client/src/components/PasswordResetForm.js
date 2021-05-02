import React, { useEffect } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'material-ui-image'
import AgroboxLogo from '../assets/agrobox_logo.png'
import queryString from 'query-string'

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main
    },
    text: {
        color: theme.palette.text.primary.main
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
        marginBottom: 10
    },
}))

const validationSchema = yup.object({
    password: yup
        .string('Enter your new password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('New password is required'),
    confirmPassword: yup
        .string('Confirm your new password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password confirmation is required')
        .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
                [yup.ref("password")],
                "Password and Confirm Password didn't match"
            ),
        }),
});

const PasswordResetForm = (props) => {
    const classes = useStyles()
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const value = queryString.parse(props.location.search);
    const token = value.token;
    const userId = value.id
    // console.log('Token: ', token)
    // console.log('User Id: ', userId)

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const passwordReset = {
                user_id: userId,
                reset_token: token,
                new_password: values.password
            }
            console.log(`${process.env.REACT_APP_API_URL}/api/auth/resetPassword`)

            axios.post(`${process.env.REACT_APP_API_URL}/api/auth/resetPassword`, passwordReset).then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })
        },
    });

    return (
        <div>
            <NavBar />
            <form onSubmit={formik.handleSubmit}>
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    
                    
                    <img src={AgroboxLogo} width='60%' height='60%'/>
                    <Grid item>
                        <div>
                            <FormControl className={clsx(classes.textField)}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="New Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>

                                    }}

                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item>
                        <div>
                            <FormControl className={clsx(classes.textField)}>
                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>

                                    }}
                                />
                            </FormControl>
                        </div>
                    </Grid>

                    <Button color="primary" variant="contained" type="submit">
                        Reset Password
                        </Button>
                </Grid>
            </form>



        </div>
    )
}
export default PasswordResetForm;