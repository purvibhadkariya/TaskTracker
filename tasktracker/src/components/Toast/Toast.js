import React from 'react';
import './toast.css'

const Toast = (props) => {
    return (
        <div className={'toast_container_custom'}>
            <div className={'toast_wrapper'+  " "+ (props.type === "success"? 'toast_success_msg' : 'toast_error_msg')}>{props.message}</div>
        </div>
      )
}

export default Toast