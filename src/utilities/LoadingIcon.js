import React from 'react'
const LoadingIcon = props => {
    return (
        <div className="loading" id="loading-icon" style={{ display: "none" }}> <div> <svg width="100" height="100" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" > <defs> <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a" > <stop offset="0%"></stop> <stop offset="63.146%"></stop> <stop offset="100%"></stop> </linearGradient> </defs> <g fill="none"> <g transform="translate(1 1)"> <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="#EC661C" transform="rotate(122.524 18 18)" > <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" ></animateTransform> </path> <circle fill="#fff" cx="36" cy="18" r="1" transform="rotate(122.524 18 18)" > <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" ></animateTransform> </circle> </g> </g> </svg> </div> </div>
    )
}

export default LoadingIcon
