import {useState} from 'react'
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom'

export default function Nav({loadPayables, loadReceivables, setcurrentNavItem, currentNavItem, ShowNewInvoice, setShowNewInvoice, setShowNewBusiness, isActive, setisActive, setisMobile}) {
    const [showNav, setshowNav] = useState(false)
    const History = useHistory()

    const black = {
        color: 'black',
        fontWeight: 'bold'
    }

    return (
        <div className='NavContainer'>
            <ul className="navbar">
                <li className="navLogo">
                    <span className="icon ">
                        <FontAwesomeIcon icon={faStopwatch} />
                    </span>
                    <span className="text">
                        timely
                    </span>
                </li>
                <li className={currentNavItem === 1?'ActiveNavItem':"nav-item"} onClick={()=>{
                    setshowNav(!showNav)
                    if (!showNav){
                        setcurrentNavItem(1)
                        setisActive(false)
                    }
                    else{
                        return
                    }}}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        New
                    </span>
                </li>
                <li style={isActive? black : {}} className={showNav?'ShowNav':'SubNavItem'} onClick ={()=>{
                    setShowNewBusiness(false)
                    setShowNewInvoice(!ShowNewInvoice)
                    {isActive?setisActive(false):setisActive(true)}
                }}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        New Invoice
                    </span>
                </li>
                <li className={showNav?'ShowNav':'SubNavItem'}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        New Payment
                    </span>
                </li>
                <li className={currentNavItem === 2? 'ActiveNavItem':'nav-item'} onClick={()=>{
                    loadReceivables()
                    setshowNav(false)
                    setShowNewInvoice(false)
                    setisActive(false)
                    setisMobile(false)
                }}>
                    <span className="icon IconRed">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} />
                    </span>
                    <span className="text">
                        Receivables
                    </span>
                </li>
                <li className={currentNavItem === 3?'ActiveNavItem':"nav-item"}onClick={()=>{
                    loadPayables()
                    setshowNav(false)
                    setShowNewInvoice(false)
                    setisActive(false)
                    setisMobile(false)
                }}>
                    <span className="icon IconGreen">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} />
                    </span>
                    <span className="text">
                        Payables
                    </span>
                </li>

                <li className="nav-item">
                    <span className="icon">
                        <FontAwesomeIcon icon ={faCog} />
                    </span>
                    <span className="text">
                        Settings
                    </span>
                </li>
                <li className="nav-item">
                    <span className="icon">
                        <FontAwesomeIcon icon ={faQuestionCircle} />
                    </span>
                    <span className="text">
                        Support
                    </span>
                </li>
                <li className="nav-item">
                    <span className="icon">
                        <FontAwesomeIcon icon ={faSignOutAlt} />
                    </span>
                    <span onClick={()=>{
                        setisActive(false)
                        localStorage.setItem('token', '')
                        History.push('/login')
                    }} className="text">
                        Log out
                    </span>
                </li>

            </ul>
        </div>
    )
}
