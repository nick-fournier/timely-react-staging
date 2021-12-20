import './ImmediateSolutions.css'
import { useState, useEffect } from 'react'
import PaymentMethodCard from '../PaymentMethodCard/PaymentMethodCard.component'
import { useHistory } from 'react-router'
import Loading from '../loading/loading'
import { toInteger } from 'lodash'
import { div } from 'prelude-ls'

 export default function ImmediateSolutions({ShowImmediateSolutions, setShowImmediateSolutions, HideImmediateSolutionsBackButton, setHideImmediateSolutionsBackButton, DataSwitch, CurrentItem, reFetchPM,  setreFetchPM, showPopup, setshowPopup, PopupMessage, setPopupMessage, Proceed, setProceed, setshowPopUpButton, ActionType, setActionType, setSettingsOrInvoices, setPaymentLoaded, setPersonalLoaded, setBusinessLoaded, setProfileOrPayment, setCardOrACH, setPaymentOptionsOrPaymentMethods, currentNavItem, setcurrentNavItem, SelectedPaymentMethod, setSelectedPaymentMethod}) {

    const rate = 2.5;

    const history = useHistory()

    const [ShowOfferButtonOrCard, setShowOfferButtonOrCard] = useState(true)
    const [IPLoadingOrContent, setIPLoadingOrContent] = useState(true)

    const ShowImmediateSolutionsContainer ={
        transform: 'translateX(0%)'

    }

    const HideImmediateSolutionsContainer = {
        transform: 'translateX(100%)',
        boxShadow: 'none'
    }

    const Hidden ={
        display: 'none'
    }

    const Underlined = {
        borderBottom :'2px solid black',
        marginBottom: '1em',
        width: 'fit-content'
    }

    // Effect for handling exit button

    useEffect(() => {
        if (ShowOfferButtonOrCard) return
        setTimeout(() => {
            setIPLoadingOrContent(false)
        }, 1500);

    }, [ShowOfferButtonOrCard])

    useEffect(() => {
        if (!ShowImmediateSolutions){
            setShowOfferButtonOrCard(true)
            setIPLoadingOrContent(true)

        }
    }, [ShowImmediateSolutions])

    // States for Paymemt methods list

    const [PaymentMethodsList, setPaymentMethodsList] = useState([])
    const [ReloadList, setReloadList] = useState(false)
    const [CardOrACHForPayment, setCardOrACHForPayment] = useState(true)
    


    useEffect(() => {
        
        const loadPMs = async () =>{
            const response = await fetch('https://api.pendulumapp.com/api/stripe/paymentmethods/',{
                method: "GET",
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`
                }),
                })
            const DataJson = await response.json()
            setPaymentMethodsList(DataJson)
            console.log(PaymentMethodsList)
            let NewArray = []
            PaymentMethodsList.forEach((item)=>{
                NewArray.push(item.last4)
            })
            console.log(NewArray)
            setreFetchPM(false)
        }
        loadPMs()
        console.log(PaymentMethodsList)

    }, [reFetchPM, currentNavItem])


    // Effect for handling CTA

    useEffect(() => {
        
        if (!Proceed) return

        if (ActionType === 'PayOut'){
            setshowPopUpButton(false)
            setPopupMessage('Processing...')
            setTimeout(() => {
                setPopupMessage(`Success! \n Your payout is being processed. You should have the funds in your account in 1 business day.`)
                setShowImmediateSolutions(false)
                setCardOrACHForPayment(true)
            }, 1500);
        }
        
        else if (ActionType ==='PayInInstallments'){
            setshowPopUpButton(false)
            setPopupMessage('Processing...')
            setTimeout(() => {
                setPopupMessage(`Your installments were setup successfully. You will be charged $${((CurrentItem.invoice_total_price*(100+rate)*0.01)/3).toFixed(2)} 3 times over the next 3 months.`)
                setShowImmediateSolutions(false)
                setCardOrACHForPayment(true)

            }, 1500);

        }


    }, [Proceed])


    const Installment = {
        width: 'fit content',
        textAlign: 'center',
        marginTop: '1em'
    }

    const InstallmentAmount = {
        width: 'fit content',
        textAlign: 'center',
        marginBottom: '1em'
    }



    return (
        <div style={ShowImmediateSolutions?ShowImmediateSolutionsContainer: HideImmediateSolutionsContainer} className='ImmediateSolutionsContainer'>
            <div style={HideImmediateSolutionsBackButton?Hidden:{}} className="PopBackButon" onClick={()=>{
                    setHideImmediateSolutionsBackButton(true)
                    setShowImmediateSolutions(false)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div className="NewInvoiceHeader">
                {DataSwitch === 1?
                'Get Paid Out':'Pay in Installments'}
            </div>
            <div className="ImmediateSolutionsDescription">
                {DataSwitch === 1? 'Turn this unpaid invoice into cash on hand by getting paid out now, at a competitive rate':'Free up cash by paying this bill off on your own schedule, at a competitive rate'}
            </div>
            {ShowOfferButtonOrCard?
                <button onClick={()=>{setShowOfferButtonOrCard(false)}} className='IPOfferButton'>
                    {DataSwitch === 1?'See Payout Offer':'See Installments Offer'}
                </button>
            :
                <div className='IPOfferCardContainer'>
                {DataSwitch===1?IPLoadingOrContent?
                    <Loading />
                :
                    <div className='IPOfferCard'>
                        <div style={Underlined} className="IPOfferSubHeader">
                            Your Payout Offer
                        </div>
                        <div className="IPOfferSubHeader">
                            Terms:
                        </div>
                        <div className="ImmediateSolutionsDescription">
                            Get paid up front for this invoice due from {CurrentItem.from_business_name} at a slight discount. No debt, no liability. We get paid when your customer pays you.
                        </div>
                        <div className="IPAmountsContainer">
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Invoice face value:
                                </div>
                                <div className="IPAmount IPBeforeAmount">
                                    ${toInteger(CurrentItem.invoice_total_price)}
                                </div>
                            </div>
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Discount Rate:
                                </div>
                                <div className="IPAmount">
                                    {rate}%
                                </div>
                            </div>
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Payout amount:
                                </div>
                                <div className="IPAmount IPAfterAmount">
                                    ${toInteger(CurrentItem.invoice_total_price*(100-rate)*0.01)}
                                </div>
                            </div>
                        </div>
                        <div className="IP-PMList">
                        <div className="SchedulePaymentInputContainer">
                            <label className=''>{DataSwitch ===1?'Payout Destination': 'Payment Method'} </label>
                            <select defaultValue='ACH' onChange={(e)=>{
                                if (e.target.value === 'Card Payments'){
                                    console.log('card')
                                    setCardOrACHForPayment(false)
                                }
                                else if (e.target.value === 'ACH'){
                                    console.log('ACH')
                                    setCardOrACHForPayment(true)
                                }
                            }} className='SelectPaymentMethod'>
                                <option value="ACH" >ACH</option>
                                <option value="Card Payments" >Card</option>
                            </select>
                        </div>
                                { <label className=''>{CardOrACHForPayment?'Choose A Card:':'Choose a Bank Account'} </label>}
                        {PaymentMethodsList?
                        !CardOrACHForPayment?
                        <div className="PaymentMethodCardList">
                            {PaymentMethodsList.filter(item => item.type === 'card').length >= 1?
                            PaymentMethodsList.filter(item => item.type === 'card').map((item, index) =>
                            // , , , , , 
                            <PaymentMethodCard type='card' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment} key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                            ):
                            <>
                            <div className="PaymentTotalLabel">
                                Looks like you don't have any cards saved yet.
                            </div>
                            <div onClick={()=>{
                                setProfileOrPayment(false)
                                setBusinessLoaded(false)
                                setPersonalLoaded(false)
                                setPaymentLoaded(true)
                                setPaymentOptionsOrPaymentMethods(false)
                                setcurrentNavItem(4)
                                setCardOrACH(false)
                                history.push('/settings')
                                setSettingsOrInvoices(true)
                                setSelectedPaymentMethod(null)
                                setShowImmediateSolutions(false)
                                setHideImmediateSolutionsBackButton(true)
                            }} className="RedirectToSettingsLink">
                                Click here to add a new card.
                            </div>
                            </>
                            }
                        </div>
                        :<>
                        <div className="PaymentMethodCardList">
                            {PaymentMethodsList.filter(item => item.type === 'ach').length >= 1?
                            PaymentMethodsList.filter(item => item.type === 'ach').map((item, index) =>
                            <PaymentMethodCard type='ach' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment}  key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                            )
                            :
                            <>
                            <div className="PaymentTotalLabel">
                                Looks like you don't have any bank accounts saved yet.
                            </div>
                            <div onClick={()=>{
                                setProfileOrPayment(false)
                                setBusinessLoaded(false)
                                setPersonalLoaded(false)
                                setPaymentLoaded(true)
                                setPaymentOptionsOrPaymentMethods(false)
                                setCardOrACH(true)
                                setcurrentNavItem(4)
                                history.push('/settings')
                                setSettingsOrInvoices(true)
                                setSelectedPaymentMethod(null)
                                setShowImmediateSolutions(false)
                                setPaymentLoaded(true)
                                setHideImmediateSolutionsBackButton(true)
                            }} className="RedirectToSettingsLink">
                                Click here to add a new bank account.
                            </div>
                            </>
                        }
                        </div>
                        </>
                            :
                            <Loading/>
                        
                            }
                        </div>
                    </div>
                :
                IPLoadingOrContent?
                <Loading/>:
                <>
                    <div className='IPOfferCard'>
                        <div style={Underlined} className="IPOfferSubHeader">
                            Your Installments Offer
                        </div>
                        <div className="IPOfferSubHeader">
                            Terms:
                        </div>
                        <div className="ImmediateSolutionsDescription">
                        We will pay {CurrentItem.to_business_name} out on your behalf, allowing you to pay this bill off in 3 installments over the next 3 months.
                        </div>
                        <div className="IPAmountsContainer">
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Invoice face value:
                                </div>
                                <div className="IPAmount IPBeforeAmount">
                                    ${toInteger(CurrentItem.invoice_total_price)}
                                </div>
                            </div>
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Interest Rate:
                                </div>
                                <div className="IPAmount">
                                    {rate}%
                                </div>
                            </div>
                            <div className="IPAmountColumn">
                                <div className="IPOfferSubHeader">
                                    Payout amount:
                                </div>
                                <div className="IPAmount IPAfterAmount">
                                    ${toInteger(CurrentItem.invoice_total_price*(100+rate)*0.01)}
                                </div>
                            </div>
                        </div>
                        
                        <div style={Installment} className="IPOfferSubHeader">
                        Amount due per installment:
                        </div>
                        <div style={InstallmentAmount} className='IPAmount IPAfterAmount'>
                            ${toInteger(((CurrentItem.invoice_total_price*(100+rate)*0.01)/3).toFixed(2))}    
                        </div>
                        <div className="IPOfferSubHeader">
                            Installment due dates:
                        </div>
                        <div className="ISDatesContainer">
                            <div>December 19th 2021</div>
                            <div>January 19th 2022</div>
                            <div>February 19th 2022</div> 
                        </div>


                        <div className="IP-PMList">
                        <div className="SchedulePaymentInputContainer">
                            <label className=''>Payment Method: </label>
                            <select defaultValue='Card Payments' onChange={(e)=>{
                                if (e.target.value === 'Card Payments'){
                                    console.log('card')
                                    setCardOrACHForPayment(true)
                                }
                                else if (e.target.value === 'ACH'){
                                    console.log('ACH')
                                    setCardOrACHForPayment(false)
                                }
                            }} className='SelectPaymentMethod'>
                                <option value="Card Payments" >Card</option>
                                <option value="ACH" >ACH</option>
                            </select>
                        </div>
                                { <label className=''>{CardOrACHForPayment?'Choose A Card:':'Choose a Bank Account'} </label>}
                        {PaymentMethodsList?
                        CardOrACHForPayment?
                        <div className="IP-PaymentMethodCardList">
                            {PaymentMethodsList.filter(item => item.type === 'card').length >= 1?
                            PaymentMethodsList.filter(item => item.type === 'card').map((item, index) =>
                            // , , , , , 
                            <PaymentMethodCard type='card' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment} key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                            ):
                            <>
                            <div className="PaymentTotalLabel">
                                Looks like you don't have any cards saved yet.
                            </div>
                            <div onClick={()=>{
                                setProfileOrPayment(false)
                                setBusinessLoaded(false)
                                setPersonalLoaded(false)
                                setPaymentLoaded(true)
                                setPaymentOptionsOrPaymentMethods(false)
                                setcurrentNavItem(4)
                                setCardOrACH(false)
                                history.push('/settings')
                                setSettingsOrInvoices(true)
                                setSelectedPaymentMethod(null)
                                setShowImmediateSolutions(false)
                                setHideImmediateSolutionsBackButton(true)
                            }} className="RedirectToSettingsLink">
                                Click here to add a new card.
                            </div>
                            </>
                            }
                        </div>
                        :<>
                        <div className="IP-PaymentMethodCardList">
                            {PaymentMethodsList.filter(item => item.type === 'ach').length >= 1?
                            PaymentMethodsList.filter(item => item.type === 'ach').map((item, index) =>
                            <PaymentMethodCard type='ach' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment}  key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                            )
                            :
                            <>
                            <div className="PaymentTotalLabel">
                                Looks like you don't have any bank accounts saved yet.
                            </div>
                            <div onClick={()=>{
                                setProfileOrPayment(false)
                                setBusinessLoaded(false)
                                setPersonalLoaded(false)
                                setPaymentLoaded(true)
                                setPaymentOptionsOrPaymentMethods(false)
                                setCardOrACH(true)
                                setcurrentNavItem(4)
                                history.push('/settings')
                                setSettingsOrInvoices(true)
                                setSelectedPaymentMethod(null)
                                setShowImmediateSolutions(false)
                                setPaymentLoaded(true)
                                setHideImmediateSolutionsBackButton(true)
                            }} className="RedirectToSettingsLink">
                                Click here to add a new bank account.
                            </div>
                            </>
                        }
                        </div>
                        </>
                            :
                            <Loading/>
                        
                            }
                        </div>
                    </div>
                </>}
                </div>
                
            }
            {!ShowOfferButtonOrCard && !IPLoadingOrContent &&
            <div onClick={()=>{
                if (DataSwitch===1){
                    setshowPopup(true)
                    setshowPopUpButton(true)
                    setActionType('PayOut')
                    setPopupMessage(`Are you sure you want to get paid out on this bill for $${CurrentItem.invoice_total_price*(100-rate)*0.01}?`)
                }
                else if (DataSwitch===2){
                    setshowPopup(true)
                    setshowPopUpButton(true)
                    setActionType('PayInInstallments')
                    setPopupMessage(`Are you sure you want to setup 3 installments of $${((CurrentItem.invoice_total_price*(100+rate)*0.01)/3).toFixed(2)} for this bill?`)
                }
            }} className="IPButton">{DataSwitch===1?'Get paid out now':'Pay in installments'}</div>
            }
        </div>
    )
}

