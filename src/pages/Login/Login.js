import {useState, FunctionComponent} from 'react'
import { useForm } from 'react-hook-form'
import './Login.css'
import {useHistory} from 'react-router-dom'
export default function Login() {

    const HideError = {
        display: 'none',
    }
    const ShowError = {
        display: 'block',
    }

    const [showError, setshowError] = useState(false)

    const History = useHistory()
    const {register, handleSubmit } = useForm();

    async function onSubmit(data){
        const LoginData = new FormData()
        LoginData.append('email', data.email)
        LoginData.append('password', data.password)
    
        const httpResponse = await fetch('https://api.pendulumapp.com/api/rest-auth/login/',{
            method: 'POST',
            body: LoginData
        })

        const JsonResponse = await httpResponse.json()
        console.log(JsonResponse)
        
        if (JsonResponse.key){
            setshowError(false)
            localStorage.setItem('token', JsonResponse.key)
            History.push('/invoices')
        }
        setshowError(true)
        setTimeout(() => {
            setshowError(false)
        }, 5000);

    }


    return (
        <div className="LoginPageFlex">
                <div className="LoginColumnFlex">
                    <div className="LoginHeader">
                        Pendulum
                    </div>
                    <div className="LoginPageDescription">
                    Focus on what matters most for your business.
                    </div>
                    <div className="LoginImage">
                        
                    </div>
                </div>

                <div className='flexContainerLogin'>
                    <form className='formContainerLogin' action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className='titleLogin'>Login to Pendulum</h2>
                        <div className='AlreadyAMember'> New to Pendulum? <span className='LoginLink' onClick={()=>{
                            History.push('Register')
                        }}>Sign up</span></div>
                        <div className="formContainerSmall">
                            <label className='subtitleLogin'>Email: </label>
                            <input className='inputLogin' type="email" {...register('email')} placeholder='Enter your email' />
                            <label className='subtitleLogin'>Password:</label>
                            <input className='inputLogin' type="password" {...register('password')} placeholder='Enter your password' />
                        </div>
                        <button className="submitLogin" type="submit" value="Submit"> Login</button>
                        <div className='LoginError' style={showError? ShowError:HideError} >Incorrect email or password</div>
                    </form>
                </div>
            </div>
    )
}




                        