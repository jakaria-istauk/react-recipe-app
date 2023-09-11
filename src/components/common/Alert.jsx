import React, { useCallback, useEffect, useState } from 'react'

const Alert = (props) => {
    const [closeBtn, setCloseBtn] = useState(false);
    const closeAlert = useCallback((e)=>{
        setCloseBtn(true);
    });
    if(!props?.closable){
        useEffect(()=>{
            setTimeout(()=>{
                setCloseBtn(true);
            }, 2000)
        });
    }
  return (
    <>
    {
        closeBtn ? '' :
        <div className={`alert alert-${props?.type} alert-dismissible recipe-alert`} role="alert">
            {props?.message}
            {
                props?.closable ? <button onClick={closeAlert} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                : ''
            }
        </div>
    }
    </>
  )
}

export default Alert