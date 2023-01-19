import { Input, Typography } from '@mui/joy';
import { useCallback, useState } from 'react';
import BasePage from '../common/BasePage';
import FormWrapper from '../common/FormWrapper';
import { Link, useNavigate } from "react-router-dom";
import { ICreateUserData } from '../../client/users';
import { UsersApi } from '../../client';
import { UserRegistrationError } from '../../client/exceptions';



function Registration() {
    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>();
    const [data, setData] = useState<ICreateUserData>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });


    const submitRegistration: React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
        try {
            UsersApi.register(data)
            navigate('/login')
        } catch (error) {
            if (error instanceof UserRegistrationError) {
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
            submitHandler={submitRegistration}
            title='Create an account'
            sx={{ transform: 'translateY(-10vh)' }}
            error={error}
            footer={
                <Typography component={Link} to='/login' color='primary'>
                    I have an account
                </Typography>
            }
        >
            <Input
                autoFocus
                required
                placeholder='first name'
                type='text'
                value={data.firstname}
                onChange={({ target }) => setData({ ...data, firstname: target.value })}
            />
            <Input
                required
                placeholder='last name'
                type='text'
                value={data.lastname}
                onChange={({ target }) => setData({ ...data, lastname: target.value })}
            />
            <Input
                required
                placeholder='email'
                type='email'
                value={data.email}
                onChange={({ target }) => setData({ ...data, email: target.value })}
            />
            <Input
                required
                placeholder='password'
                type='password'
                value={data.password}
                onChange={({ target }) => setData({ ...data, password: target.value })}
            />
        </FormWrapper>
    </BasePage >
}

export default Registration