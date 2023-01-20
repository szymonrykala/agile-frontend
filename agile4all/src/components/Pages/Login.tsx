import { Input, Typography } from '@mui/joy';
import { useCallback, useState } from 'react';
import BasePage from '../common/BasePage';
import FormWrapper from '../common/FormWrapper';
import { Link, useNavigate } from "react-router-dom";
import { ILoginData } from '../../client/users';
import { UsersApi } from '../../client';
import { BadCredentialsError } from '../../client/exceptions';


function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>();
    const [data, setData] = useState<ILoginData>({
        email: '',
        password: ''
    });


    const submitLogin: React.FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        setError(undefined)
        try {
            if(await UsersApi.login(data)){
                navigate(`/app`)
            }
        } catch (error) {
            if (error instanceof BadCredentialsError) {
                setError(error.message)
            }
        }
    }, [navigate, setError, data])


    return <BasePage sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100'
    }}>
        <FormWrapper
            submitHandler={submitLogin}
            title='Login'
            sx={{ transform: 'translateY(-10vh)' }}
            error={error}
            footer={
                <Typography component={Link} to='/register' color='primary'>
                    Create an account
                </Typography>
            }
        >
            <Input
                autoFocus
                required
                placeholder='email'
                type='email'
                value={data.email}
                onChange={(evt) => setData({ ...data, email: evt.target.value })}
            />
            <Input
                required
                placeholder='password'
                type='password'
                value={data.password}
                onChange={(evt) => setData({ ...data, password: evt.target.value })}
            />
        </FormWrapper>
    </BasePage >
}

export default Login;



