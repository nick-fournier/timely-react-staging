import {useState} from 'react'
import { useForm } from 'react-hook-form'
import './Register.css'
import {useHistory} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'

export default function Register() {

    const HideInputs = {
        display: 'none',
        opacity: '0%',
    }
    const ShowInputs = {
        display: 'block',
        opacity: '100%',
    }

    const [firstStep, setfirstStep] = useState(true)
    const [secondStep, setsecondStep] = useState(false)

    const [showError, setshowError] = useState(false)


    const History = useHistory()
    const {register, handleSubmit } = useForm();

    async function onSubmit(data){
        const RegisterData = new FormData()
        RegisterData.append('email', data.email)
        RegisterData.append('first_name', data.first_name)
        RegisterData.append('last_name', data.last_name)
        RegisterData.append('password1', data.password1)
        RegisterData.append('password2', data.password2)


    const httpResponse = await fetch('https://api.pendulumapp.com/api/rest-auth/registration/',{
        method: 'POST',
        body: RegisterData
    })

    const JsonResponse = await httpResponse.json()
    console.log(JsonResponse)
    if (JsonResponse.key){
        alert('Registered succesfully.')
        localStorage.setItem('token', JsonResponse.key)
        History.push('invoices')
    }
    setshowError(true)
    setTimeout(() => {
        setshowError(false)
    }, 5000);
}




    return (
            <div className="RegisterPageFlex">
                <div className="RegisterColumnFlex">
                    <div className="RegisterHeader">
                        Timely
                    </div>
                    <div className="RegisterPageDescription">
                    Focus on what matters most for your business.
                    </div>
                    <div className="RegisterImage">
                        
                    </div>
                </div>

                <div className='flexContainerRegister'>
                    <form className='formContainerRegister' action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                        <div className="RegisterTitle">
                            <h2 className='titleRegister'>Sign Up to Timely</h2>
                            {/* <div className="CircleContainer">
                                <div className="OneOutOfTwo">
                                    <img src="\FullCircle.png" alt="" />
                                    1 / 2
                                </div>
                                <div className="TwoOutOfTwo">
                                    2 / 2
                                </div>
                            </div> */}
                        </div>
                        <div style={firstStep? ShowInputs:HideInputs} className='AlreadyAMember'> Already a Member? <span className='LoginLink' onClick={()=>{
                            History.push('login')
                        }}>Login</span></div>
                        <div className="formContainerSmall">
                            <label style={secondStep? ShowInputs:HideInputs} className='subtitleRegister'>Email: </label>
                            <input style={secondStep? ShowInputs:HideInputs} className='inputRegister' type="email" {...register('email')}   placeholder=  'Enter your email' />
                            <label style={firstStep? ShowInputs:HideInputs} className='subtitleRegister'>First Name: </label>
                            <input style={firstStep? ShowInputs:HideInputs} className='inputRegister' type="text" {...register('first_name')}  placeholder=  'Enter your first name' />
                            <label style={firstStep? ShowInputs:HideInputs} className='subtitleRegister'>Last Name: </label>
                            <input style={firstStep? ShowInputs:HideInputs} className='inputRegister' type="text" {...register('last_name')}  placeholder=  'Enter your last name' />
                            <label style={secondStep? ShowInputs:HideInputs} className='subtitleRegister'>Password:</label>
                            <input style={secondStep? ShowInputs:HideInputs}className='inputRegister' type="password" {...register('password1')}   placeholder=  'Enter your password' />
                            <label style={secondStep? ShowInputs:HideInputs} className='subtitleRegister'>Confirm Password: </label>     
                            <input style={secondStep? ShowInputs:HideInputs} className='inputRegister' type="password" {...register('password2')}  placeholder=  'Confirm your password'/>

                            
                            <button onClick={(e)=>{
                                setsecondStep(true)
                                setfirstStep(false)
                                e.preventDefault()
                            }} style={firstStep? ShowInputs:HideInputs}  className="submitRegister" > Next Step <span className='NextIcon'><FontAwesomeIcon icon ={faAngleDoubleRight} /></span>
                            </button>
                            <button onClick={(e)=>{
                                setsecondStep(false)
                                setfirstStep(true)
                                e.preventDefault()
                            }} style={secondStep? ShowInputs:HideInputs}  className="submitRegister2" > <span className='PrevIcon'><FontAwesomeIcon icon ={faAngleDoubleLeft} /></span> Previous Step 
                            </button>
                            <button style={secondStep? ShowInputs:HideInputs}  className="submitRegister" type="submit" value="Submit"> Create an account</button>
                            <div className='RegisterError' style={showError? ShowInputs:HideInputs} >Error while signing up!</div>
                        </div>
                    </form>
                </div>
            </div>
    )
}
