import React from 'react'
import { getUserFullName } from '../../hooks/helper'

const Profile = () => {
  return (
    <div className="text-center bg-image profile-temp-style" >
        <div className="mask">
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-white">
                    <h1 className="mb-3">Hello {getUserFullName()}</h1>
                    <h4 className="mb-3">How are you ?</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile