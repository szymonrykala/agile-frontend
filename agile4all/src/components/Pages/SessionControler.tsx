import React from "react";
import { useNavigate } from "react-router";
import { UsersApi } from "../../client";
import { NoValidUserSessionError } from "../../client/exceptions";
import { useAppDispatch } from "../../hooks";
import { removeSession, setSession } from "../../store/sessionSlice";


interface ISessionController {
    element: React.ReactElement
}


function SessionController(props: ISessionController) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const checkCurrentSession = React.useCallback(async () => {
        try {
            const session = await UsersApi.readUserFromSession()
            dispatch(setSession(session))
            navigate(`/users/${session.user.id}`)
        } catch (e) {
            if (e instanceof NoValidUserSessionError) {
                navigate('/login')
            } else throw e
        }
    }, [dispatch, navigate])

    React.useEffect(() => {
        checkCurrentSession();

        return () => {
            dispatch(removeSession())
        }
    // there is no need to check session on each route change    
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [dispatch, removeSession])

    return props.element
}

export default SessionController;