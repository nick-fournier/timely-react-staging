
import './PaymentSettings.css'
import {useForm} from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';


export default function PaymentSettings({ShowPaymentSettings, setShowNewInvoice, setShowPaymentSettings, CurrentItem}) {

    const [RedirectURL, setRedirectURL] = useState('')
    const [RedirectTrigger, setRedirectTrigger] = useState(false)


    useEffect( async () => {
        const httpResponse = await fetch('https://timely-invoicing-api.herokuapp.com/pay/onboard',{
            method: 'GET',
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
            })
        })

        const JsonResponse = await httpResponse.json()
        console.log(JsonResponse.url)
        setRedirectURL(JsonResponse.url)
        
    }, [])

    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
    }

    const ShowPaymentSettingsTab = {
        transform: 'translateX(0%)'
    }
    const HidePaymentSettings = {
        transform: 'translateX(100%)'
    }

    return (
            <div style={ShowPaymentSettings? ShowPaymentSettingsTab: HidePaymentSettings} className='PaymentSettingsContainer'>
                <div className="PaymentSettingsForm">
                    <div className="PaymentSettingsHeader">
                        Connect your stripe account to timely in order to use our immediate payment solutions!
                    </div>
                    <div className="SubmitAndDiscardContainer">
                    <a className='OnBoardingButton' href={RedirectURL}> Connect Stripe</a>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                                setShowPaymentSettings(false)
                                e.preventDefault()
                            }}> Discard</button>
                    </div>
                </div>

            </div>
    )
}
