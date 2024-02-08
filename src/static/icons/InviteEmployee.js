import React from 'react'

const InviteEmployee = ({ color }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20.701" height="20.033" viewBox="0 0 20.701 20.033">
                <path id="Send_invites" data-name="Send invites" d="M0,20.033V8.883L10.351,14.6,20.7,8.883v11.15Zm10.342-5.914L3.673,10.538V3.089H17.011v7.449l-6.669,3.582h0ZM7.877,7.466a.368.368,0,0,0,.372.363h2.029V9.842a.372.372,0,0,0,.744,0V7.829h2.094a.363.363,0,1,0,0-.726H11.022V5.088a.372.372,0,0,0-.744,0V7.1H8.249A.368.368,0,0,0,7.877,7.466ZM17.4,5.836l3.167,2.7L17.4,10.29ZM.139,8.543,3.3,5.951V10.29Zm7.1-5.817L10.563,0l3.194,2.726Z" fill={color} />
            </svg>
        </>
    )
}

export default InviteEmployee