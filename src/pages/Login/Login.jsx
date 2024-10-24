import Form from 'react-bootstrap/Form'; 
import { useRef } from 'react';

import './Login.css'
import { verifyUser } from '../../data/users';

function Login( {setToken, setRole}) {
    const userRef = useRef()
    const passwordRef = useRef()

    return ( 
        <div className="login-container">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
                type="text"
                id="username"
                placeholder='Enter username'
                style={{textAlign: 'center'}}
                ref={userRef}
             />

            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
                type="password"
                id="password"
                placeholder='Password'
                style={{textAlign: 'center'}}
                ref={passwordRef}
            />

            <button className='btn btn-success mt-3'
                onClick={ () => {
                    const user = userRef.current.value.trim()
                    const password = passwordRef.current.value.trim()
                    userRef.current.value = ''
                    passwordRef.current.value = ''
                    const userInfo = verifyUser(user, password)

                    if (userInfo === null) {
                        alert('Wrong user or password')
                        userRef.current.focus()
                    } else {
                        setToken(userInfo.token)
                        setRole(userInfo.role)
                    }
                } }
                >Login</button>    
        </div>
     );
}

export default Login;