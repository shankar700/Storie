// a protected container to decide to show info based on auth

import  {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ProtectedLayout({children, authentication = true}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.authReducer.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoading(false)

    },[authStatus, authentication, navigate])

  return loading? <h1>Loading...</h1>: <>{children}</>
}

ProtectedLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    authentication: PropTypes.boolean
}

export default ProtectedLayout