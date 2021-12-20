import { useState, useEffect } from 'react'
import './App.css';
import Settings from './components/Settings/Settings'
import Receivables from './pages/receivables/receivables'
import Payables from './pages/payables/payables'
import Nav from './components/Nav/nav'
import AddInvoice from './components/AddInvoice/AddInvoice.component'
import AddBusiness from './components/AddBusiness/AddBusiness';
import AddPayment from './components/AddPayment/AddPayment';
import SchedulePayment from './components/SchedulePayment/SchedulePayment';
import PaymentSettings from './components/PaymentSettings/PaymentSettings';
import ImmediateSolutions from './components/ImmediateSolutions/ImmediateSolutions';
import Popup from './components/Popup/Popup';
import SendRemind from './components/SendRemind/SendRemind';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'


function App() {


  const AddCover = {
    visibility : 'visible',
    opacity : '1'
  }

  const RemoveCover = {
    visibility : 'hidden',
    opacity : '0'
  }
  const [StripeID, setStripeID] = useState(null)
  const [StripeObject, setStripeObject] = useState(null)

  const [DataSet, setDataSet] = useState([])
  const [loading, setloading] = useState(true)
  const [itemList, setitemList] = useState([])
  const [CurrentItem, setCurrentItem] = useState({})
  const [searchField, setsearchField] = useState('');
  const [SearchMethod, setSearchMethod] = useState(1)
  const [DataSwitch, setDataSwitch] = useState(1)
  const [currentNavItem, setcurrentNavItem] = useState(2)
  const [ShowNewInvoice, setShowNewInvoice] = useState(false)
  const [HideAddBusinessBackButton, setHideAddBusinessBackButton] = useState(true)
  const [HideAddPaymentBackButton, setHideAddPaymentBackButton] = useState(true)
  const [HideAddInvoiceBackButton, setHideAddInvoiceBackButton] = useState(true)
  const [HideImmediateSolutionsBackButton, setHideImmediateSolutionsBackButton] = useState(true)

  const [ShowNewBusiness, setShowNewBusiness] = useState(false)
  const [ShowNewPayment, setShowNewPayment] = useState(false)
  const [ShowSchedulePayment, setShowSchedulePayment] = useState(false)
  const [ShowPaymentSettings, setShowPaymentSettings] = useState(false)
  const [ShowSendRemind, setShowSendRemind] = useState(false)
  const [ShowImmediateSolutions, setShowImmediateSolutions] = useState(false)

  const [isActive, setisActive] = useState(false)
  const [reFetchBusinesses, setreFetchBusinesses] = useState(true)
  const [reFetchPM, setreFetchPM] = useState(true)

  const [RedirectToNewReceivableOrPayable, setRedirectToNewReceivableOrPayable] = useState(true)

  const [SettingsOrInvoices, setSettingsOrInvoices] = useState(false)

  const [SetDefaultValueForBusiness, setSetDefaultValueForBusiness] = useState(false)


  const [isMobile, setisMobile] = useState(false)

  const [ShowHeaders, setShowHeaders] = useState(false)

  const [showPopup, setshowPopup] = useState(false)
  const [PopupMessage, setPopupMessage] = useState('')
  const [showPopUpButton, setshowPopUpButton] = useState(false)
  const [Proceed, setProceed] = useState(false)
  const [ActionType, setActionType] = useState('')

  const [SearchClicked, setSearchClicked] = useState(false)


  // State for settings page to manipulate outside of settings context

  const [PaymentLoaded, setPaymentLoaded] = useState(false)
  const [PersonalLoaded, setPersonalLoaded] = useState(false)
  const [BusinessLoaded, setBusinessLoaded] = useState(false)
  const [ProfileOrPayment, setProfileOrPayment] = useState(false)
  const [CardOrACH, setCardOrACH] = useState(true)
  const [PaymentOptionsOrPaymentMethods, setPaymentOptionsOrPaymentMethods] = useState(true)
  const [AddPaymentMethodOrListPaymentMethods, setAddPaymentMethodOrListPaymentMethods] = useState(true)


  // Data for users to pay invoices immediately after they add a new payable

  const [ImmediatePayableID, setImmediatePayableID] = useState(null)
  const [PayInvoiceImmediately, setPayInvoiceImmediately] = useState(false)


  // Data for selected payment method to use in both lists
  const [SelectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

  // Toggle for reloading invoice list

  const [ReloadInvoiceList, setReloadInvoiceList] = useState(false)


  async function loadReceivablesData(){
    setloading(true)
    const rawReceivablesData = await fetch('https://api.pendulumapp.com/api/receivables/',{
      method: "GET",
      headers: new Headers({
        'Authorization': `token ${localStorage.token}`
    }),
    })
    let dataJson = await rawReceivablesData.json()
    //console.log(dataJson)
    console.log(DataSet)
    setDataSet(dataJson)
    setloading(false)
  }

  async function loadPayablesData(){
    setloading(true)
    const rawPayablesData = await fetch('https://api.pendulumapp.com/api/payables/',{
      method: "GET",
      headers: new Headers({
        'Authorization': `token ${localStorage.token}`
    }),
    })
    let dataJson = await rawPayablesData.json()
    //console.log(dataJson)
    console.log(DataSet)
    setDataSet(dataJson)
    setloading(false)
  }

  useEffect( async () => {
    const URL = window.location.href
    if (URL === 'http://localhost:3000/invoices'){
      setSettingsOrInvoices(false)
    }

    else if (URL === 'http://localhost:3000/settings'){
      setSettingsOrInvoices(true)
      setcurrentNavItem(4)

    }
   
  const stripePromise = loadStripe(
    'pk_test_51J7P2UC6DO7oZMzwFigARqX8KyMNlZWjDuzas5oRbpgurPlCRrwwwb3ZGeZS5FbsC8RKZmpn7zSdCcwYftctUfz400GYOMb0BJ',
    {
      stripeAccount: `acct_1J7P2UC6DO7oZMzw`
    })

    setStripeObject(stripePromise)


    console.log(CurrentItem)
    if(DataSwitch === 1){
      loadReceivablesData()
    }
    else if(DataSwitch === 2){
      loadPayablesData()
    }
    else return
    



    return function cleanup() {
      setDataSet([])
      setitemList([])
      setloading(false)
    }
  }, [DataSwitch, ReloadInvoiceList])

  useEffect(() => {
    if (ShowImmediateSolutions)
    {
      setHideImmediateSolutionsBackButton(false)
    }
    else {
      setHideImmediateSolutionsBackButton(true)
    }
  }, [ShowImmediateSolutions])


  let SearchedData = () => {
    if (SearchMethod === 1){        
      return DataSet.filter(Data => Data.is_paid === false).filter(Data=>
        (Data.to_business_name.toLowerCase().includes(searchField.toLowerCase())
        || Data.invoice_id === parseInt(searchField))
        || parseInt(Data.invoice_total_price) === parseInt(searchField));
    }

    else if(SearchMethod === 2){
      return DataSet.filter(Data => Data.is_scheduled === true)
    }
    else if(SearchMethod === 3){
      return DataSet.filter(Data => Data.is_flagged === true)
    }
    else if(SearchMethod === 4){
      return DataSet.filter(Data => Data.is_paid === true)
    }
  }

  const loadPayables = () => {
    setDataSwitch(2)
    console.log(DataSwitch)
    setcurrentNavItem(3)
  }

  const loadReceivables = () => {
    setDataSwitch(1)
    console.log(DataSwitch)
    setcurrentNavItem(2)
  }


  if (!StripeObject)
    return (
      <div>Loading...</div>
    );

  else

    return (
      <Elements stripe={StripeObject}>
          <div className='AppInside'>
            <div className="AddStuff">
              {showPopup && <Popup showPopUpButton={showPopUpButton} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage}/>}
              
              <AddBusiness setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} HideAddPaymentBackButton={HideAddPaymentBackButton} setHideAddPaymentBackButton={setHideAddPaymentBackButton} setHideAddInvoiceBackButton={setHideAddInvoiceBackButton} HideAddInvoiceBackButton={HideAddInvoiceBackButton} SetDefaultValueForBusiness={SetDefaultValueForBusiness} setSetDefaultValueForBusiness={setSetDefaultValueForBusiness} RedirectToNewReceivableOrPayable={RedirectToNewReceivableOrPayable} setreFetchBusinesses={setreFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setShowNewInvoice={setShowNewInvoice} setShowNewPayment={setShowNewPayment}/>
              
              <AddInvoice ReloadInvoiceList={ReloadInvoiceList} setReloadInvoiceList={setReloadInvoiceList} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed}  setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} setHideAddInvoiceBackButton={setHideAddInvoiceBackButton} HideAddInvoiceBackButton={HideAddInvoiceBackButton} SetDefaultValueForBusiness={SetDefaultValueForBusiness} setSetDefaultValueForBusiness={setSetDefaultValueForBusiness} RedirectToNewReceivableOrPayable={RedirectToNewReceivableOrPayable} setRedirectToNewReceivableOrPayable={setRedirectToNewReceivableOrPayable} setloading={setloading} setreFetchBusinesses={setreFetchBusinesses} reFetchBusinesses={reFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              
              <AddPayment ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} HideAddPaymentBackButton={HideAddPaymentBackButton} setHideAddPaymentBackButton={setHideAddPaymentBackButton} ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} PayInvoiceImmediately={PayInvoiceImmediately} setPayInvoiceImmediately={setPayInvoiceImmediately} ImmediatePayableID={ImmediatePayableID} setImmediatePayableID={setImmediatePayableID} SetDefaultValueForBusiness={SetDefaultValueForBusiness} setSetDefaultValueForBusiness={setSetDefaultValueForBusiness} RedirectToNewReceivableOrPayable={RedirectToNewReceivableOrPayable} setRedirectToNewReceivableOrPayable={setRedirectToNewReceivableOrPayable} setloading={setloading} setreFetchBusinesses={setreFetchBusinesses} reFetchBusinesses={reFetchBusinesses} ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              
              <SchedulePayment SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} currentNavItem={currentNavItem} setcurrentNavItem={setcurrentNavItem} setPaymentOptionsOrPaymentMethods={setPaymentOptionsOrPaymentMethods} setCardOrACH={setCardOrACH} setProfileOrPayment={setProfileOrPayment} setPersonalLoaded={setPersonalLoaded} setBusinessLoaded={setBusinessLoaded} setPaymentLoaded={setPaymentLoaded} setSettingsOrInvoices={setSettingsOrInvoices} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} PayInvoiceImmediately={PayInvoiceImmediately} setPayInvoiceImmediately={setPayInvoiceImmediately} ImmediatePayableID={ImmediatePayableID} setImmediatePayableID={setImmediatePayableID} setreFetchPM={setreFetchPM} reFetchPM={reFetchPM} CurrentItem={CurrentItem} setloading={setloading} ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              
              <SendRemind  ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} setProceed={setProceed} Proceed={Proceed} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} CurrentItem={CurrentItem} ShowSendRemind={ShowSendRemind} setShowSendRemind={setShowSendRemind} />
              
              <ImmediateSolutions setisActive={setisActive} setloading={setloading} setreFetchPM={setreFetchPM} SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} currentNavItem={currentNavItem} setcurrentNavItem={setcurrentNavItem} setPaymentOptionsOrPaymentMethods={setPaymentOptionsOrPaymentMethods} setCardOrACH={setCardOrACH} setProfileOrPayment={setProfileOrPayment} setPersonalLoaded={setPersonalLoaded} setBusinessLoaded={setBusinessLoaded} setPaymentLoaded={setPaymentLoaded} setSettingsOrInvoices={setSettingsOrInvoices} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage}  currentNavItem={currentNavItem} reFetchPM={reFetchPM} CurrentItem={CurrentItem} DataSwitch={DataSwitch} setHideImmediateSolutionsBackButton={setHideImmediateSolutionsBackButton} HideImmediateSolutionsBackButton={HideImmediateSolutionsBackButton} ShowImmediateSolutions={ShowImmediateSolutions} setShowImmediateSolutions={setShowImmediateSolutions} />
            </div>

          <div style={ShowSendRemind||ShowNewInvoice||ShowNewBusiness||ShowNewPayment||ShowPaymentSettings||ShowSchedulePayment||ShowImmediateSolutions?AddCover:RemoveCover} className='Cover'></div>
          <div className='invoicePageContainer'>
            <Nav setitemList={setitemList} CurrentItem={CurrentItem} setCurrentItem={setCurrentItem} ShowSendRemind={ShowSendRemind} setShowSendRemind={setShowSendRemind} HideAddPaymentBackButton={HideAddPaymentBackButton} setHideAddPaymentBackButton={setHideAddPaymentBackButton} HideAddInvoiceBackButton={HideAddInvoiceBackButton} setHideAddInvoiceBackButton={setHideAddInvoiceBackButton} setSettingsOrInvoices={setSettingsOrInvoices} SettingsOrInvoices={SettingsOrInvoices} ShowPaymentSettings={ShowPaymentSettings} setShowPaymentSettings={setShowPaymentSettings} setShowSchedulePayment={setShowSchedulePayment} ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setisMobile={setisMobile} isActive={isActive} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice} setcurrentNavItem={setcurrentNavItem} setShowNewBusiness={setShowNewBusiness} currentNavItem={currentNavItem} loadReceivables={loadReceivables} loadPayables={loadPayables} />
            {!SettingsOrInvoices?
            DataSwitch === 1?
              <Receivables setReloadInvoiceList={setReloadInvoiceList} ReloadInvoiceList={ReloadInvoiceList} ShowImmediateSolutions={ShowImmediateSolutions} setShowImmediateSolutions={setShowImmediateSolutions} loading={loading} setloading={setloading} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} ShowSendRemind={ShowSendRemind} setShowSendRemind={setShowSendRemind} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} loadReceivables={loadReceivables} loadPayables={loadPayables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
              :
              <Payables setReloadInvoiceList={setReloadInvoiceList} ReloadInvoiceList={ReloadInvoiceList} ShowImmediateSolutions={ShowImmediateSolutions} setShowImmediateSolutions={setShowImmediateSolutions} loading={loading} setloading={setloading} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} ShowSendRemind={ShowSendRemind} setShowSendRemind={setShowSendRemind} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} loadPayables={loadPayables} loadReceivables={loadReceivables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
            :
              <Settings SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} AddPaymentMethodOrListPaymentMethods={AddPaymentMethodOrListPaymentMethods} setAddPaymentMethodOrListPaymentMethods={setAddPaymentMethodOrListPaymentMethods} PaymentOptionsOrPaymentMethods={PaymentOptionsOrPaymentMethods} setPaymentOptionsOrPaymentMethods={setPaymentOptionsOrPaymentMethods} CardOrACH={CardOrACH} setCardOrACH={setCardOrACH} setProfileOrPayment={setProfileOrPayment} ProfileOrPayment={ProfileOrPayment} BusinessLoaded={BusinessLoaded} setBusinessLoaded={setBusinessLoaded} PersonalLoaded={PersonalLoaded} setPersonalLoaded={setPersonalLoaded} PaymentLoaded={PaymentLoaded} setPaymentLoaded={setPaymentLoaded}  ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} setProceed={setProceed} Proceed={Proceed}  showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} setreFetchPM={setreFetchPM} reFetchPM={reFetchPM}/>
            }  
          </div>
        </div>
      </Elements>

    );
  }

  export default App;
