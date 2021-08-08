import { useState, useEffect } from 'react'
import './App.css';
import Receivables from './pages/receivables/receivables'
import Payables from './pages/payables/payables'
import Nav from './components/Nav/nav'
import AddInvoice from './components/AddInvoice/AddInvoice.component'
import AddBusiness from './components/AddBusiness/AddBusiness';
import AddPayment from './components/AddPayment/AddPayment';
import SchedulePayment from './components/SchedulePayment/SchedulePayment';
import PaymentSettings from './components/PaymentSettings/PaymentSettings';
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
  const [ShowNewBusiness, setShowNewBusiness] = useState(false)
  const [ShowNewPayment, setShowNewPayment] = useState(false)
  const [ShowSchedulePayment, setShowSchedulePayment] = useState(false)
  const [ShowPaymentSettings, setShowPaymentSettings] = useState(false)
  const [isActive, setisActive] = useState(false)
  const [reFetchBusinesses, setreFetchBusinesses] = useState(true)
  const [reFetchPM, setreFetchPM] = useState(true)


  const [isMobile, setisMobile] = useState(false)

  async function loadReceivablesData(){
    const rawReceivablesData = await fetch('https://timely-invoicing-api.herokuapp.com/api/receivables/',{
      method: "GET",
      headers: new Headers({
        'Authorization': `token ${localStorage.token}`
    }),
    })
    let dataJson = await rawReceivablesData.json()
    //console.log(dataJson)
    setDataSet(dataJson)
    //console.log(DataSet)
    setloading(false)
  }

  async function loadPayablesData(){
    const rawPayablesData = await fetch('https://timely-invoicing-api.herokuapp.com/api/payables/',{
      method: "GET",
      headers: new Headers({
        'Authorization': `token ${localStorage.token}`
    }),
    })
    let dataJson = await rawPayablesData.json()
    //console.log(dataJson)
    setDataSet(dataJson)
    console.log(DataSet)
    setloading(false)
  }

  useEffect( async () => {
    const userData = await fetch('https://timely-invoicing-api.herokuapp.com/api/userinfo',{
      method: "GET",
      headers: new Headers({
        'Authorization': `token ${localStorage.token}`
    }),
    })
    const userDataJSON = await userData.json()
    console.log(userDataJSON)
    const stripeID = userDataJSON.stripe_act_id
    setStripeID(stripeID)
    console.log({StripeID})

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
    }
  }, [loading, DataSwitch])


  let SearchedData = () => {
    if (SearchMethod === 1){
      return DataSet.filter(Data=>
        (Data.to_business_name.toLowerCase().includes(searchField.toLowerCase())
        || Data.invoice_id === parseInt(searchField))
        || parseInt(Data.total_price) === parseInt(searchField));
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
              <AddBusiness setreFetchBusinesses={setreFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setShowNewInvoice={setShowNewInvoice}/>
              <AddInvoice setloading={setloading} setreFetchBusinesses={setreFetchBusinesses} reFetchBusinesses={reFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              <SchedulePayment setreFetchPM={setreFetchPM} reFetchPM={reFetchPM} CurrentItem={CurrentItem} setloading={setloading} ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              <PaymentSettings setreFetchPM={setreFetchPM} reFetchPM={reFetchPM} CurrentItem={CurrentItem} setloading={setloading} ShowPaymentSettings={ShowPaymentSettings} setShowPaymentSettings={setShowPaymentSettings} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
              <AddPayment setloading={setloading} ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
            </div>
          <div style={ShowNewInvoice||ShowNewBusiness||ShowNewPayment||ShowPaymentSettings||ShowSchedulePayment?AddCover:RemoveCover} className='Cover'></div>
          <div className='invoicePageContainer'>
            <Nav ShowPaymentSettings={ShowPaymentSettings} setShowPaymentSettings={setShowPaymentSettings} setShowSchedulePayment={setShowSchedulePayment} ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setisMobile={setisMobile} isActive={isActive} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice} setcurrentNavItem={setcurrentNavItem} setShowNewBusiness={setShowNewBusiness} currentNavItem={currentNavItem} loadReceivables={loadReceivables} loadPayables={loadPayables} />
            {DataSwitch === 1?
              <Receivables ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} loadReceivables={loadReceivables} loadPayables={loadPayables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
              :
              <Payables ShowSchedulePayment={ShowSchedulePayment} setShowSchedulePayment={setShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} loadPayables={loadPayables} loadReceivables={loadReceivables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
            }  
          </div>
        </div>
      </Elements>

    );
  }

  export default App;
