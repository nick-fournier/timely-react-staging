
// import './PaymentSettings.css'
// import {useForm} from 'react-hook-form'
// import { useRef, useState, useEffect } from 'react';
// import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';



// export default function PaymentSettings({ShowPaymentSettings, setShowNewInvoice, setShowPaymentSettings, CurrentItem, setreFetchPM, reFetchPM, HideAddPaymentBackButton, setHideAddPaymentBackButton}) {

//     const stripe = useStripe()
//     const elements = useElements()

    
//     const [paymentMethodID, setpaymentMethodID] = useState('')

//     const ResMessage = useRef(null)



//     const [RedirectURL, setRedirectURL] = useState('')
//     const [Loading, setLoading] = useState(false)
//     const [OnboardingOrPaymentMethod, setOnboardingOrPaymentMethod] = useState(false)
//     const [PaymentMethodSuccessOrError, setPaymentMethodSuccessOrError] = useState(false)
//     const [MessageReveal, setMessageReveal] = useState(false)
//     const [LoadingPaymentMethod, setLoadingPaymentMethod] = useState(false)
    
//     const [ErrorMessage, setErrorMessage] = useState('')
//     const [ErrorState, setErrorState] = useState(false)
    
//     useEffect(() => {
//         LoadStripeLink()
//     }, [])
    
//     useEffect( async () => {
//         setIntervalAsync(async () => {
//             setLoading(true)
//             const httpResponse = await fetch('https://api.pendulumapp.com/api/stripe/onboard',{
//                 method: 'GET',
//                 headers: new Headers({
//                     'Authorization': `token ${localStorage.token}`,
//                 })
//             })
//             const JsonResponse = await httpResponse.json()
//             console.log(JsonResponse.url)
//             setRedirectURL(JsonResponse.url)
            
//             return function cleanup(){
//                 clearIntervalAsync()
//                 setLoading(false)
//             }
//         }, 300000);
//     }, [Loading])
    
//     const LoadStripeLink = async () => {
//         const httpResponse = await fetch('https://api.pendulumapp.com/api/stripe/onboard',{
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `token ${localStorage.token}`,
//             })
//         })
//         const JsonResponse = await httpResponse.json()
//         console.log(JsonResponse.url)
//         setRedirectURL(JsonResponse.url)
//     }
    
//     async function handleSubmit(e){
//         setErrorState(false)
//         setLoadingPaymentMethod(true)
//         e.preventDefault()
//         const Card = elements.getElement(CardElement)
//         const paymentMethodRes = await stripe.createPaymentMethod({
//             type :'card',
//             card: Card,
//         })
//         if (paymentMethodRes.error){
//             setLoadingPaymentMethod(false)
//             console.log(paymentMethodRes.error)
//             setErrorState(true)
//             setErrorMessage(paymentMethodRes.error.message)
//             setPaymentMethodSuccessOrError(false)
//             console.log(ErrorMessage)
//             setMessageReveal(true)
//             setTimeout(() => {
//                 setMessageReveal(false)
//                 setErrorMessage('')
//             }, 3000);
//             return
            
//         }

//         setErrorState(false)
//         const {id} = paymentMethodRes.paymentMethod
//         console.log(id)
//         if (!stripe || !elements){
//             return;
//         }

//         // else if (ErrorState){
//         //     return
//         // }


//             console.log('Entered')            

//             const paymentData = await fetch('https://api.pendulumapp.com/api/stripe/paymentmethods/attach',{
//                 method: 'POST',
//                 headers: new Headers({
//                     'Authorization': `token ${localStorage.token}`,
//                     'Content-Type': 'application/json'
//                 }), 
//                 body: JSON.stringify({
//                     "attach_payment_method":`${id}`
//                 })
//             })
//             const JsonData = await paymentData.json()
//             console.log(JsonData)
//             setLoadingPaymentMethod(false)
//             if(JsonData.Error){
//                 console.log(JsonData.Error)
//                 setPaymentMethodSuccessOrError(false)
//                 setErrorMessage(JsonData.Error)
//                 console.log('shouldnt have entered')
//             }
            
//              else {
//                 setPaymentMethodSuccessOrError(true)
//                 console.log('Payment method added successfully')
                
//             }
            
//             setMessageReveal(true)
//             setTimeout(() => {
//                 setMessageReveal(false)
//                 setErrorMessage('')
//             }, 3000);
//             setreFetchPM(true)
            
//         }
    


//     const ShowPaymentSettingsTab = {
//         transform: 'translateX(0%)'
//     }
//     const HidePaymentSettings = {
//         transform: 'translateX(100%)'
//     }

//     const Visible = {
//         display: 'block'
//     }

//     const Hidden = {
//         display: 'none'
//     }

//     const BlueAndBold = {
//         color: "#0275d8",
//         fontWeight: "700",  
//     }



//     return (
//             <div style={ShowPaymentSettings? ShowPaymentSettingsTab: HidePaymentSettings} className='PaymentSettingsContainer'>
//                 <div className="OnboardingOrPaymentMethodButtonsContainer">
//                     <div style={OnboardingOrPaymentMethod?{}:BlueAndBold} className='PaymentSettingTab' onClick={()=>setOnboardingOrPaymentMethod(false)}>
//                         Setup your payment method
//                     </div>
//                     /
//                     <div style={OnboardingOrPaymentMethod?BlueAndBold:{}} className='PaymentSettingTab' onClick={()=>setOnboardingOrPaymentMethod(true)}>
//                         Setup your stripe account
//                     </div>
//                 </div>
//                 {OnboardingOrPaymentMethod?
//                 <div className="PaymentSettingsForm">

//                     <div className="StripeOnboardingImg">
//                         <img  src="\undraw_stripe_payments_o7aw.svg" alt="" />
//                     </div>
//                     <div className="PaymentSettingsHeader">
//                         Connect your stripe account to timely in order to use our immediate payment solutions
//                     </div>
//                     <div className="SubmitAndDiscardContainer">
//                     <a className='OnBoardingButton' href={RedirectURL}> Connect Stripe</a>
//                     <button className="DiscardInvoiceButton" onClick={(e)=>{
//                         setShowPaymentSettings(false)
//                         e.preventDefault()
//                     }}> Discard</button>
//                     </div>
//                 </div>

//             :
//                 <div className="PaymentMethodContainer">
//                     <div className="AddNewCardHeader">
//                         Add a new card
//                     </div>

//                     <div className="PaymentSettingsImg">
//                         <img  src="\undraw_Plain_credit_card_re_c07w.svg" alt="" />
//                     </div>

//                     <div className="CardInputContainer">
//                         {/* <CardElement />  */}
//                     </div>

//                     {LoadingPaymentMethod?
//                     <div className="PaymentMethodMessageSuccess">Loading...</div>
//                     :
//                     <div style={MessageReveal?Visible:Hidden} ref={ResMessage} className="PaymentMethodResponseMessage">
//                         {PaymentMethodSuccessOrError?
//                             <div className="PaymentMethodMessageSuccess">Payment Method Added Successfully!</div>
//                             :
//                             <div className="PaymentMethodMessageError">{ErrorMessage}</div>
//                         }
//                     </div>
//                     }


//                     <div className="SubmitAndDiscardContainer">
//                         <button className='OnBoardingButton' onClick={handleSubmit}> Save </button>
//                         <button className="DiscardInvoiceButton" onClick={(e)=>{
//                             setShowPaymentSettings(false)
//                             e.preventDefault()
//                         }}> Discard</button>
//                     </div>
//                 </div>
//             }
//             </div>
//     )
// }
