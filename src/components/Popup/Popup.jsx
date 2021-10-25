
import {useState, useRef, useEffect} from 'react'
import './Popup.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Popup({showPopup, setshowPopup, PopupMessage, setPopupMessage, Proceed, setProceed, showPopUpButton, setshowPopUpButton}) {

    const RefPopup = useRef(null)


    // const handleClickOutside = (event) => {
    //     if (RefPopup.current && !RefPopup.current.contains(event.target)) {
    //         setshowPopup(false)
    //         setPopupMessage('')
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside, true)
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true)
    //     }
    // })

    return (
        <div className='PopupScreenContainer'>
            <div ref={RefPopup} className="PopupCard">
                    <div className="PopupCardExitButton" onClick={()=>{
                        setshowPopup(false)
                        setPopupMessage('')
                        setshowPopUpButton(false)
                        setProceed(false)
                    }}>
                        <FontAwesomeIcon icon ={faTimes} />
                    </div>
                    <div className="PopupCardContent">
                        {PopupMessage}
                    </div>
                    <div className="PopupButtonsContainer">
                        {
                            showPopUpButton && <div className="PopupButtonYes" onClick={()=>{
                            setProceed(true)
                            }}> Yes</div>
                        
                        }
                        {
                            showPopUpButton && <div className="PopupButtonNo" onClick={()=>{
                            setProceed(false)
                            setshowPopup(false)
                            }}> No</div>
                        
                        }
                    </div>
            </div>
        </div>
    )
}
