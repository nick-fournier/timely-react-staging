import './Settings.css'
import SettingsPMList from '../SettingsPMList/SettingsPMList';

import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCog, faCreditCard, faHandHoldingUsd, faIdCardAlt, faLandmark, faLock, faShieldAlt, faUserLock } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef, useCallback, FunctionComponent } from 'react'

import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe, IdealBankElement} from '@stripe/react-stripe-js';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'


import {gsap} from 'gsap'



import  { usePlaidLink } from 'react-plaid-link';

export default function Settings({setreFetchPM, reFetchPM, setshowPopup, setPopupMessage, Proceed, setActionType, ActionType, setshowPopUpButton, setProceed, PaymentLoaded, setPaymentLoaded, BusinessLoaded, setBusinessLoaded, PersonalLoaded, setPersonalLoaded, ProfileOrPayment, setProfileOrPayment, CardOrACH, setCardOrACH, PaymentOptionsOrPaymentMethods, setPaymentOptionsOrPaymentMethods, AddPaymentMethodOrListPaymentMethods, setAddPaymentMethodOrListPaymentMethods, SelectedPaymentMethod, setSelectedPaymentMethod}) {

    const StripeElementsStyle = {
        fontSize: '1.4em'
    }



    // ->  Success and Error message handling

    const [PasswordChangeSuccessOrError, setPasswordChangeSuccessOrError] = useState(false)
    const [PasswordErrorMessage, setPasswordErrorMessage] = useState('')

    const ResMessage = useRef(null)

    const Visible = {
        display: 'block'
    }

    const Hidden = {
        display: 'none'
    }

    ///

    const stripe = useStripe()
    const elements = useElements()

    const [PersonalOrBusiness, setPersonalOrBusiness] = useState(true)
    const [InfoOrPassword, setInfoOrPassword] = useState(false)

    const [ReadOrWrite, setReadOrWrite] = useState(false)
    const [userPersonalData, setuserPersonalData] = useState(null)
    const [userBusinessData, setuserBusinessData] = useState(null)


    const PersonalEmailRef = useRef(null)
    const PersonalFirstNameRef = useRef(null)
    const PersonalLastNameRef = useRef(null)

    const PasswordOneRef = useRef(null)
    const PasswordTwoRef = useRef(null)
    const PasswordTwoConfirmRef = useRef(null)

    const [PersonalEmailInput, setPersonalEmailInput] = useState('')
    const [PersonalFirstNameInput, setPersonalFirstNameInput] = useState('')
    const [PersonalLastNameInput, setPersonalLastNameInput] = useState('')

    const [PasswordOneInput, setPasswordOneInput] = useState('')
    const [PasswordTwoInput, setPasswordTwoInput] = useState('')
    const [PasswordTwoConfirmInput, setPasswordTwoConfirmInput] = useState('')


    
    const [loading, setloading] = useState(false)


    const [plaidToken, setplaidToken] = useState()



    const [PaymentMethodSuccessOrError, setPaymentMethodSuccessOrError] = useState(false)
    const [MessageReveal, setMessageReveal] = useState(false)
    const [LoadingPaymentMethod, setLoadingPaymentMethod] = useState(false)
    
    const [ErrorMessage, setErrorMessage] = useState('')
    const [ErrorState, setErrorState] = useState(false)

    // Stripe inputs validation

    const [CardNumberComplete, setCardNumberComplete] = useState(false)
    const [CardExpirationComplete, setCardExpirationComplete] = useState(false)    
    const [CardCVCComplete, setCardCVCComplete] = useState(false)    


    const ActiveCard = {
        border: 'solid 1px #4b4b4bbe'
    }

    // Stripe Onboarding Logic --->

    const [RedirectURL, setRedirectURL] = useState('')
    const [StripeLoading, setStripeLoading] = useState(false)

    // PMList stuff -->

    const [loadingPMS, setloadingPMS] = useState(true)

    

    useEffect(() => {
        LoadStripeLink()
    }, [])
    
    useEffect( async () => {
        setIntervalAsync(async () => {
            setStripeLoading(true)
            const httpResponse = await fetch('https://api.pendulumapp.com/api/stripe/onboard/',{
                method: 'GET',
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`,
                })
            })
            const JsonResponse = await httpResponse.json()
            console.log(JsonResponse.url)
            setRedirectURL(JsonResponse.url)
            
            return function cleanup(){
                clearIntervalAsync()
                setStripeLoading(false)
            }
        }, 300000);
    }, [StripeLoading])
    
    const LoadStripeLink = async () => {
        const httpResponse = await fetch('https://api.pendulumapp.com/api/stripe/onboard/',{
            method: 'GET',
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
            })
        })
        const JsonResponse = await httpResponse.json()
        console.log(JsonResponse.url)
        setRedirectURL(JsonResponse.url)
    }

    ////////////////////////////////////////////////


    async function handleSubmit(e){
        setPopupMessage('Are you sure you want to save this card?')
        setshowPopUpButton(true)
        setActionType('SaveCard')
        setshowPopup(true)            
        }

        /////////////////////////////////////////////////////////////////


    useEffect(() => {
        setloading(true)
        const LoadUserInfo = async () =>{
            const userData = await fetch('https://api.pendulumapp.com/api/rest-auth/user/',{
                method: "GET",
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`
                }),
            })
            const userDataJSON = await userData.json()
            setuserPersonalData(userDataJSON)
            if (userPersonalData){
                console.log(userPersonalData)
            }
        
            
        }
        const LoadbusinessInfo = async () =>{
            const businessData = await fetch('https://api.pendulumapp.com/api/businessinfo/',{
                method: "GET",
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`
                }),
            })
            const businessDataJSON = await businessData.json()
            setuserBusinessData(businessDataJSON[0])
            if (userBusinessData){
                console.log(userBusinessData)
            }
        
            
        }
        LoadUserInfo()
        LoadbusinessInfo()
      
    }, [loading])

    const SubmitPersonalInfo = async () =>{
        let PersonalInfoToSend = {
            id: userPersonalData.id,
            email : (PersonalEmailInput?PersonalEmailInput:userPersonalData.email),
            first_name: (PersonalFirstNameInput?PersonalFirstNameInput:userPersonalData.first_name),
            last_name: (PersonalLastNameInput?PersonalLastNameInput:userPersonalData.last_name),
            is_active: userPersonalData.is_active,
            date_joined: userPersonalData.date_joined
        }

        const PersonalDataEditResponse = await fetch(`https://api.pendulumapp.com/api/rest-auth/user/`, {
           method: 'PUT',
           headers: new Headers({
            'Authorization': `token ${localStorage.token}`,
            "content-type":"application/json",

        }),
           body: JSON.stringify(PersonalInfoToSend)
       })

       const resp = await PersonalDataEditResponse.json()
       console.log(resp)

       if (true){
           console.log('Do Stuff')
    }
    else{
           console.log('Do Stuff')
    }
        setReadOrWrite(false)
        setloading(!loading)
        setPersonalEmailInput('')
        setPersonalFirstNameInput('')
        setPersonalLastNameInput('')
    }

    useEffect( async () => {
        if (!Proceed){
            return
        }
        
    // Change password logic --> 


        if (ActionType === 'ChangePassword'){
            let NewPasswordToSend = {
                old_password: PasswordOneInput,
                new_password1: PasswordTwoInput,
                new_password2: PasswordTwoConfirmInput
            }
            setPopupMessage('Changing password...')
            setshowPopUpButton(false)
            const PasswordChangeResponse = await fetch(`https://api.pendulumapp.com/api/rest-auth/password/change/`, {
               method: 'POST',
               headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
                "content-type":"application/json",
    
            }),
               body: JSON.stringify(NewPasswordToSend)
           })
    
           const Passwordjson = await PasswordChangeResponse.json()
    
           if (Passwordjson.detail){
    
                setPasswordOneInput('')
                setPasswordTwoInput('')  
                setPasswordTwoConfirmInput('')
                if(PasswordOneRef && PasswordTwoRef && PasswordTwoConfirmRef){    
                    PasswordOneRef.current.value = ''
                    PasswordTwoRef.current.value = ''
                    PasswordTwoConfirmRef.current.value = ''
                }
    
                console.log(Passwordjson.detail)
                setPasswordChangeSuccessOrError(true)
                setPopupMessage('Password changed successfully!')
           }
    
           else if (Passwordjson.old_password){
                setPopupMessage(`${Passwordjson.old_password}`)
                console.log(Passwordjson.old_password)
    
               
           }
           else if (Passwordjson.new_password2){
            setPopupMessage(`${Passwordjson.new_password2}`)
               console.log(Passwordjson.new_password2)
           }
    
        }

    // Stripe Payment Method logic --> 

        else if (ActionType === 'SaveCard'){
            setshowPopUpButton(false)
            setPopupMessage('Processing...')
            const Card = elements.getElement(CardNumberElement)
            const paymentMethodRes = await stripe.createPaymentMethod({
                type :'card',
                card: Card,
            })
            if (paymentMethodRes.error){
                console.log(paymentMethodRes.error)
                setPopupMessage(`${paymentMethodRes.error.message}`)
                console.log(ErrorMessage)
                return
                
            }
            const {id} = paymentMethodRes.paymentMethod
            console.log(id)
            
            if (!stripe || !elements){
                return;
            }
    
                console.log('Entered')            
    
                const paymentData = await fetch('https://api.pendulumapp.com/api/stripe/paymentmethods/',{
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': `token ${localStorage.token}`,
                        'Content-Type': 'application/json'
                    }), 
                    body: JSON.stringify({
                        "payment_method":`${id}`,
                        "action": 'attach'
                    })
                })
                const JsonData = await paymentData.json()
                console.log(JsonData)
                if(JsonData.Error){
                    console.log(JsonData.Error)
                    setPopupMessage(JsonData.Error)
                    console.log('shouldnt have entered')
                }
                
                 else {
                    setPopupMessage('Card was saved successfully!')
                    console.log('Payment method added successfully')
                    
                }
                
                setreFetchPM(true)
                setAddPaymentMethodOrListPaymentMethods(false)
                setloadingPMS(true)
                

        }
        setProceed(false)

    }, [Proceed])

    const SubmitPasswordChange = async () => {
        setPopupMessage('Are you sure you want to change your passowrd?')
        setshowPopUpButton(true)
        setshowPopup(true)
        setActionType('ChangePassword')

    }


    // Plaid Link Logic

    useEffect( async () => {
        const PlaidLinkToken = await fetch('https://api.pendulumapp.com/api/plaid/linktoken/',{
            method: "GET",
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`
            }),
        })
        const PlaidLinkTokenJSON = await PlaidLinkToken.json()
        // console.log(PlaidLinkTokenJSON)
        setplaidToken(PlaidLinkTokenJSON)
        console.log(plaidToken)
    }, [])



    const config = {
        onSuccess: async (public_token, metadata) => {
            const PlaidExchange = await fetch('https://api.pendulumapp.com/api/plaid/linktoken/',{
            method: "POST",
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                'public_token': public_token,
                'plaid_account_id': metadata.accounts[0].id
            })
        })
            const PlaidExchangeResponse = await PlaidExchange.json()
            console.log(PlaidExchangeResponse)
            console.log(public_token);
            console.log(metadata)
            setAddPaymentMethodOrListPaymentMethods(false)
            setloadingPMS(true)
        },
        onExit: (err, metadata) => {},
        onEvent: (eventName, metadata) => {},
        token: `${plaidToken}`,
        // required for OAuth:
        receivedRedirectUri: window.location.href,
        // if not OAuth, set to null or do not include:
        receivedRedirectUri: null,
      };
      const { open, exit, ready } =  usePlaidLink(config);

 



    return (
        <div className='SettingsPageContainer'>
            <div className="SettingsLHS">
                <div className="SettingsHeader">
                    <span className='SettingsHeaderIcon'><FontAwesomeIcon icon={faCog} /></span>
                    Settings
                </div>

                <div style={ProfileOrPayment?PersonalOrBusiness?ActiveCard:{}:{}} className="SettingsCard" onClick={()=>{

                    setPasswordOneInput('')
                    setPasswordTwoInput('')  
                    setPasswordTwoConfirmInput('')
                    if(ProfileOrPayment && PersonalLoaded && InfoOrPassword){    
                        PasswordOneRef.current.value = ''
                        PasswordTwoRef.current.value = ''
                        PasswordTwoConfirmRef.current.value = ''
                    }

                    setPersonalOrBusiness(true)
                    setProfileOrPayment(true)

                    if (!PersonalLoaded){
                        gsap.from('.ProfileInformationData',{
                            y:'-50',
                            duration: 0.3,
                            stagger: 0.25,
                            opacity:0,
                            ease: "ease-out",
                            
                        })
                        
                    }
                    setPersonalLoaded(true)
                    setBusinessLoaded(false)
                    setPaymentLoaded(false)
                    setInfoOrPassword(false)
                    setAddPaymentMethodOrListPaymentMethods(true)

                }
                }>
                    <div className="SettingsCardLogoContainer">
                        <div className="SettingsCardLogo">
                            <FontAwesomeIcon icon={faIdCardAlt} />
                        </div>
                    </div>
                    <div className="SettingsCardData">
                        <div className="SettingsCardHeader">
                            Profile Settings
                        </div>
                        <div className="SettingsCardParagraph">
                            Control your profile settings: like name, email, password, etc
                        </div>
                    </div>
                </div>

                <div style={ProfileOrPayment?PersonalOrBusiness?{}:ActiveCard:{}} className="SettingsCard" onClick={()=>{
                    setPasswordOneInput('')
                    setPasswordTwoInput('')  
                    setPasswordTwoConfirmInput('')
                    if(ProfileOrPayment && PersonalLoaded && InfoOrPassword){    
                        PasswordOneRef.current.value = ''
                        PasswordTwoRef.current.value = ''
                        PasswordTwoConfirmRef.current.value = ''
                    }
                    setPersonalOrBusiness(false)
                    setProfileOrPayment(true)
                    setPaymentOptionsOrPaymentMethods(true)

                    if (!BusinessLoaded){
                        gsap.from('.ProfileInformationData',{
                            y:'-50',
                            duration: 0.3,
                            stagger: 0.25,
                            opacity:0,
                            ease: "ease-out",
                            
                        })
                    }
                    setBusinessLoaded(true)
                    setPersonalLoaded(false)
                    setPaymentLoaded(false)
                    setReadOrWrite(false)
                    setAddPaymentMethodOrListPaymentMethods(true)

                }
                }>
                    <div className="SettingsCardLogoContainer">
                        <div className="SettingsCardLogo">
                            <FontAwesomeIcon icon={faBriefcase} />
                        </div>
                    </div>
                    <div className="SettingsCardData">
                        <div className="SettingsCardHeader">
                            Business Settings
                        </div>
                        <div className="SettingsCardParagraph">
                            Control your business settings: like business name, tax information, etc
                        </div>
                    </div>
                </div>

                <div style={ProfileOrPayment?PersonalOrBusiness?{}:{}:ActiveCard} className="SettingsCard" onClick={()=>{
                    setPasswordOneInput('')
                    setPasswordTwoInput('')  
                    setPasswordTwoConfirmInput('')
                    if(ProfileOrPayment && PersonalLoaded && InfoOrPassword){    
                        PasswordOneRef.current.value = ''
                        PasswordTwoRef.current.value = ''
                        PasswordTwoConfirmRef.current.value = ''
                    }
                    setPersonalOrBusiness(false)
                    setProfileOrPayment(false)
                    setPaymentOptionsOrPaymentMethods(true)


                    if (!PaymentLoaded){
                        gsap.from('.ProfileInformationData',{
                            y:'-50',
                            duration: 0.3,
                            stagger: 0.25,
                            opacity:0,
                            ease: "ease-out",
                            
                        })
                    }
                    setBusinessLoaded(false)
                    setPersonalLoaded(false)
                    setPaymentLoaded(true)
                    setAddPaymentMethodOrListPaymentMethods(true)

                    
                }
                }>
                    <div className="SettingsCardLogoContainer">
                        <div className="SettingsCardLogo">
                            <FontAwesomeIcon icon={faHandHoldingUsd} />
                        </div>
                    </div>
                    <div className="SettingsCardData">
                        <div className="SettingsCardHeader">
                            Payment Settings
                        </div>
                        <div className="SettingsCardParagraph">
                            Control your payment settings: like saved cards, bank information, etc
                        </div>
                    </div>
                </div>

            </div>
            <div className="SettingsRHS">
                <div className="SettingsRHSCard">
                    {ProfileOrPayment?
                    PersonalOrBusiness?
                    !InfoOrPassword?
                    <div className='ProfileInformation'>
                        <div className="ProfileInformationFirstRow">
                            <div className="ProfileInformationHeader">
                                Profile Information
                            </div>
                            <div onClick={()=>{
                                if (ReadOrWrite){
                                    setReadOrWrite(!ReadOrWrite)
                                    setPersonalEmailInput('')
                                    setPersonalFirstNameInput('')
                                    setPersonalLastNameInput('')
                                }
                                else {
                                    setReadOrWrite(!ReadOrWrite)
                                }
                                
                            }} className="ProfileInformationButton">
                                {!ReadOrWrite?'Edit':'Cancel'}
                            </div>
                        </div>
                        <div className="ProfileInformationData ProfileInformationDataGSAP">
                            <label className='ProfileInformationLabel' htmlFor="">Email:</label>
                            {!ReadOrWrite?<div className="ProfileInformationField">{!userPersonalData?'Loading...':userPersonalData.email}</div>
                            :<input ref={PersonalEmailRef} className='ProfileInformationInput' type='email' defaultValue={userPersonalData.email} placeholder={userPersonalData.email} onChange={(e)=>{
                                setPersonalEmailInput(e.target.value)
                                console.log(PersonalEmailInput)
                            }}/>
                            }

                            <label className='ProfileInformationLabel' htmlFor="">First Name:</label>
                            {!ReadOrWrite?<div className="ProfileInformationField">{!userPersonalData?'Loading...':userPersonalData.first_name}</div>
                            :<input ref={PersonalFirstNameRef} className='ProfileInformationInput' type='text' defaultValue={userPersonalData.first_name} onChange={(e)=>{
                                setPersonalFirstNameInput(e.target.value)
                                console.log(PersonalFirstNameInput)
                            }}/>
                           }

                            <label className='ProfileInformationLabel' htmlFor="">Last Name:</label>
                            {!ReadOrWrite?<div className="ProfileInformationField">{!userPersonalData?'Loading...':userPersonalData.last_name}</div>
                            :<input ref={PersonalLastNameRef} className='ProfileInformationInput' type='text' defaultValue={userPersonalData.last_name} onChange={(e)=>{
                                setPersonalLastNameInput(e.target.value)
                                console.log(PersonalLastNameInput)
                            }}/>
                            }

                            {!ReadOrWrite && <div onClick={()=>setInfoOrPassword(true)} className="PasswordChangeLink">
                                You can also change your password here.
                            </div>}
                            {ReadOrWrite && <div className='ProfileInformationSubmitButton' onClick={SubmitPersonalInfo}>Save</div>}
                        </div>
                    </div>
                    :
                    <div>
                        <div className="ProfileInformationHeader">
                            Change Password
                        </div>
                        <div className="ProfileInformationData">
                            <label className='ProfileInformationLabel' htmlFor="">Old Password:</label>
                            <input ref={PasswordOneRef} className='ProfileInformationInput' type='password' onChange={(e)=>{
                                setPasswordOneInput(e.target.value)
                                console.log(PasswordOneInput)
                            }}/>
                            <label className='ProfileInformationLabel' htmlFor="">New Password:</label>
                            <input ref={PasswordTwoRef} className='ProfileInformationInput' type='password' onChange={(e)=>{
                                setPasswordTwoInput(e.target.value)
                                console.log(PasswordTwoInput)
                            }}/>
                            <label className='ProfileInformationLabel' htmlFor="">Confirm New Password:</label>
                            <input ref={PasswordTwoConfirmRef} className='ProfileInformationInput' type='password'
                                onChange={(e)=>{
                                setPasswordTwoConfirmInput(e.target.value)
                                console.log(PasswordTwoConfirmInput)
                            }}/>
                            <div className='ProfileInformationSubmitButton' onClick={SubmitPasswordChange}>Save</div>
                            <div style={MessageReveal?Visible:Hidden} className="PaymentMethodResponseMessage">
                                    {PasswordChangeSuccessOrError?
                                        <div className="PaymentMethodMessageSuccess">Password was changed successfully</div>
                                        :
                                        <div className="PaymentMethodMessageError">{PasswordErrorMessage}</div>
                                    }
                                </div>
                        </div>
                    </div>
                    :
                    <div className='ProfileInformation'>
                        <div className="ProfileInformationFirstRow">
                            <div className="ProfileInformationHeader">
                                Business Information
                            </div>
                            <a className='ProfileInformationButton' href={RedirectURL}> Edit</a>
            
                        </div>
                        <div className="ProfileInformationData BusinessInformationDataGSAP">
                            <label className='ProfileInformationLabel' htmlFor="">Business Name:</label>
                            <div className="ProfileInformationField">{!userBusinessData?'Loading...':userBusinessData.business_name}</div>

                            <label className='ProfileInformationLabel' htmlFor="">User Email:</label>
                            <div className="ProfileInformationField">{!userBusinessData?'Loading...':userBusinessData.user_email}</div>
                            
                            <label className='ProfileInformationLabel' htmlFor="">Business Email:</label>
                            <div className="ProfileInformationField">{!userBusinessData?'Loading...':userBusinessData.business_email}</div>

                            <label className='ProfileInformationLabel' htmlFor="">Business Phone:</label>
                            <div className="ProfileInformationField">{!userBusinessData?'Loading...':userBusinessData.business_phone}</div>
                            
                            <label className='ProfileInformationLabel' htmlFor="">Business Address:</label>
                            <div className="ProfileInformationField">{!userBusinessData?'Loading...':userBusinessData.billing_address}</div>

                        </div>
                    </div>
                    :AddPaymentMethodOrListPaymentMethods?
                    PaymentOptionsOrPaymentMethods?
                    ////
                    <div className='ProfileInformation'>
                        <div className="PaymentInformationHeader">
                            Payment Methods
                        </div>
                        <div className="ProfileInformationData">
                            <div onClick={()=>{
                                setPaymentOptionsOrPaymentMethods(false)
                                setCardOrACH(true)

                            }} className="PaymentSettingsTab">
                            <FontAwesomeIcon icon={faLandmark} />
                                Bank Account
                                <span className="AddPaymentMethodLabel">Add payment method</span>
                            </div>
                            <div onClick={()=>{
                                setPaymentOptionsOrPaymentMethods(false)
                                setCardOrACH(false)
                            }} className="PaymentSettingsTab">
                            <FontAwesomeIcon icon={faCreditCard} />
                                Credit Card
                                <span className="AddPaymentMethodLabel"> Add payment method</span>

                            </div>
                            <div onClick={()=>{
                                setAddPaymentMethodOrListPaymentMethods(false)
                                setloadingPMS(true)
                            }} className="ViewPaymentMethodsButton">
                                View currently saved payment methods
                            </div>
                        </div>
                    </div>
                    :
                    !CardOrACH?
                    <div className='CardDetailsSection'>
                        <div className='SaveCardBackButton' onClick={()=>{

                            setPaymentOptionsOrPaymentMethods(true)
                            }}>
                                <FontAwesomeIcon className='' icon={faChevronLeft} />
                        </div>
                        <div className="CardDetailsHeader">
                            Save your card details
                        </div>

                        <div className="CardDetailsLogos">
                            <img className='TeaserLogoPM' src="\Visa_Inc._logoColor.svg" alt="" />
                            <img className='TeaserLogoSmallPM' src="\American_Express_logo_(2018)COLOR.svg" alt="" />
                            <img className='TeaserLogoMediumPM' src="\Mastercard-logocolor.svg" alt="" />
                            <img className='TeaserLogoPM' src="\Discover_Card_logocolor.svg" alt="" />
                        </div>
                        <div className="CardInformation">        
                            <label className='CardInfoLabel' htmlFor="">Card Number:</label>
                            <CardNumberElement options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} onChange={(e)=>{
                                if (e.complete){
                                    setCardNumberComplete(true)
                                }
                                else {
                                    setCardNumberComplete(false)
                                }
                            }} className='CardNumberElement' />

                            <div className="CardEXPandCVC">
                                <div className="CardExpiryContainer">
                                    <label className='CardInfoLabel' htmlFor="">Card Expiration Date:</label>
                                    <CardExpiryElement  options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} onChange={(e)=>{
                                if (e.complete){
                                    setCardExpirationComplete(true)
                                }
                                else {
                                    setCardExpirationComplete(false)
                                }
                            }} className='CardNumberElement'/>
                                </div>
                                <div className="CardCVCContainer">
                                    <label className='CardInfoLabel' htmlFor="">Card Security Code:</label>
                                    <CardCvcElement options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} onChange={(e)=>{
                                if (e.complete){
                                    setCardCVCComplete(true)
                                }
                                else {
                                    setCardCVCComplete(false)
                                }
                            }} className='CardNumberElement'/>
                                </div>
                            </div>


                                <button disabled={CardNumberComplete && CardExpirationComplete && CardCVCComplete?false:true} className={CardNumberComplete && CardExpirationComplete && CardCVCComplete?'SaveCardDetails':'SaveCardDetailsDisabled'} onClick={handleSubmit}> Link My Card </button>
                            <div className="PMMessageContainer">
                                {LoadingPaymentMethod?
                                <div className="PaymentMethodMessageSuccess">Loading...</div>
                                :
                                <div style={MessageReveal?Visible:Hidden} ref={ResMessage} className="PaymentMethodResponseMessage">
                                    {PaymentMethodSuccessOrError?
                                        <div className="PaymentMethodMessageSuccess">Payment Method Added Successfully!</div>
                                        :
                                        <div className="PaymentMethodMessageError">{ErrorMessage}</div>
                                    }
                                </div>
                                }
                            </div>
                            <div className="CardFooterMessage">
                                <span className='CardShieldIcon'>
                                    <FontAwesomeIcon icon={faUserLock} />
                                </span>
                                Pendulum keeps all your details 100% secure so your sensitive information remains private.
                            </div>
                        </div>
                        
                    </div>
                    ////
                    :
                    <div className='AddACHContainer'>
                        {!plaidToken?
                        <>Loading...</>
                        :<div className="">
                            <div className="ACHHeaderAndSubHeaderContainer">
                                <div className="ACHDetailsHeader">
                                    Connect your bank account
                                </div>
                                <div className="ACHDetailsSubHeader">
                                    Choose how you'd like to transfer payments for free
                                </div>
                                <div className='ACHDetailsBackButton' onClick={()=>{
                                    setPaymentOptionsOrPaymentMethods(true)
                                    }}>
                                    <FontAwesomeIcon className='' icon={faChevronLeft} />
                                </div>
                            </div>
                            <div className="ACHTabsContainer">
                                <div className='ACHTab' onClick={open}>
                                    <div className="ACHTabContentContainer">
                                        <div className="ACHTabHeader">
                                            Connect instantly
                                        </div>
                                        <div className="ACHSubHeader">
                                            Securely log in to your bank account and start scheduling transfers right away.
                                        </div>
                                    </div>
                                    <div className="ACHGoArrow">
                                        <FontAwesomeIcon icon={ faChevronRight} />
                                    </div>
                                </div>
                                <div className='ACHTab'>
                                    <div className="ACHTabContentContainer">
                                        <div className="ACHTabHeader">
                                            Verify with deposits <span className='ACHComingSoon'>  Coming soon </span>
                                        </div>
                                        <div className="ACHSubHeader">
                                            You'll receive two micro-deposits in your bank account in 1-2 business days. Verify the amounts to start getting paid.
                                        </div>
                                    </div>
                                    <div className="ACHGoArrow">
                                        <FontAwesomeIcon icon={ faChevronRight} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    :
                    <div className='ProfileInformation'>
                        <div className="PMHeaderAndBackButtonContainer">
                            {!loadingPMS &&
                            <div className='SettingsPMListBackContainer' onClick={()=>{
                                setAddPaymentMethodOrListPaymentMethods(true)
                                setPaymentOptionsOrPaymentMethods(true)
                            }}>
                                <FontAwesomeIcon className='SettingsPMListBackButton' icon={faChevronLeft} />
                            </div>}
                        <div className="PaymentInformationHeader">
                            Payment Methods
                        </div>
                        </div>
                        
                        <SettingsPMList AddPaymentMethodOrListPaymentMethods={AddPaymentMethodOrListPaymentMethods} loadingPMS={loadingPMS} setloadingPMS={setloadingPMS} setCardOrACH={setCardOrACH} setPaymentOptionsOrPaymentMethods={setPaymentOptionsOrPaymentMethods} setAddPaymentMethodOrListPaymentMethods={setAddPaymentMethodOrListPaymentMethods} SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} setActionType={setActionType} ActionType={ActionType} setPopupMessage={setPopupMessage} Proceed={Proceed} setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} />
                    </div>
                    }
                    
                </div>

                
            </div>
        </div>
    )
}
