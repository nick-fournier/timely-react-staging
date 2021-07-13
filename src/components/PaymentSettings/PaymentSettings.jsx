
import './PaymentSettings.css'
import {useForm} from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


export default function PaymentSettings({ShowPaymentSettings, setShowNewInvoice, setShowPaymentSettings, CurrentItem}) {




    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
    }

    const ShowPaymentSettingsTab = {
        transform: 'translateX(0%)'
    }
    const HidePaymentSettings = {
        transform: 'translateX(100%)'
    }

    async function onSubmit(data){




    }

    return (
            <div style={ShowPaymentSettings? ShowPaymentSettingsTab: HidePaymentSettings} className='PaymentSettingsContainer'>

                <div className="SubmitAndDiscardContainer">
                    <button className="SubmitPaymentButton">Connect Stripe</button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                                setShowPaymentSettings(false)
                                e.preventDefault()
                            }}> Discard</button>
                </div>
            </div>
    )
}
