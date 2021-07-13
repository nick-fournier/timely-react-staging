
import './SchedulePayment.css'
import {useForm} from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


export default function SchedulePayment({ShowSchedulePayment, setShowNewInvoice, setShowSchedulePayment, CurrentItem}) {


    const stripe = useStripe()
    const elements = useElements()
    
    async function handlePayment(){
        
        const paymentData = await fetch('/',{
            method: 'POST',
            amount: CurrentItem.invoice_total_price * 100,
        })
        
        const cardElement = elements.getElement(CardElement)
        
        const paymentMethodReq = await stripe.createPaymentMethod({
            type :'card',
            card: cardElement,
            billing_details: {}
        })
        
        
        const confirmedCardPayment = await stripe.confirmCardPayment('Client Secret from paymentData',{
            payment_method: paymentMethodReq.paymentMethod.id
        })
        
    }

    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
    }

    const ShowSchedulePaymentTab = {
        transform: 'translateX(0%)'
    }
    const HideSchedulePayment = {
        transform: 'translateX(100%)'
    }

    async function onSubmit(data){




    }

    return (
            <div style={ShowSchedulePayment? ShowSchedulePaymentTab: HideSchedulePayment} className='SchedulePaymentContainer'>
                <form className='SchedulePaymentForm' action="" method="post" onSubmit={handleSubmit(onSubmit)} >
                <div className="NewPaymentHeader">Payment Details</div>


                <div className="SchedulePaymentInputContainer">
                            <select className='SelectInput'>
                            <label className=''>Payment Method: </label>
                                <option value="Card Payments" >Card</option>
                                <option value="ACH" >ACH</option>
                                <option value="Paper Check" >Paper Check</option>
                            </select>
                </div>

                <label className='CardDetailsLabel'>Schedule Date: </label> 
                <div className="SchedulePaymentDateContainer">
                    <input className="SchedulePaymentDateInput" type="date" />
                </div>

                <label className='CardDetailsLabel'>Card Details: </label> 
                <div className="CardInputContainer">
                    <CardElement/>
                </div>
                {/* <div className="SchedulePaymentInputContainer">
                            <label className=''>Business fax: </label>
                            <input className='FirstRowInputField' type="text"  {...register('fax')} placeholder='Enter your business fax' />
                </div> */}

                <div className="SubmitAndDiscardContainer">
                    <button className="SubmitPaymentButton" type="submit" value="Submit"> {`Pay $${CurrentItem.invoice_total_price}`}</button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                                setShowSchedulePayment(false)
                                setShowNewInvoice(false)
                                e.preventDefault()
                            }}> Discard</button>
                </div>
                </form>
            </div>
    )
}
