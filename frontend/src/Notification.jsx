import React from 'react'

const Notification = ({ message:{ message, type }}) => {
    if (message === null && type === null) {
        return null
    } else {
        return (
            <div className={type === 'success' ? 'msg' :'err'}>{message}</div>
        )
    }

}

export default Notification