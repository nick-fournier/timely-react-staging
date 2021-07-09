import { useState, useEffect } from 'react'
import './App.css';
import Receivables from './pages/receivables/receivables'
import Payables from './pages/payables/payables'
import Nav from './components/Nav/nav'
import AddInvoice from './components/AddInvoice/AddInvoice.component'
import AddBusiness from './components/AddBusiness/AddBusiness';
import AddPayment from './components/AddPayment/AddPayment';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
function App() {

  const AddCover = {
    visibility : 'visible',
    opacity : '1'
  }

  const RemoveCover = {
    visibility : 'hidden',
    opacity : '0'
  }

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
  const [isActive, setisActive] = useState(false)
  const [reFetchBusinesses, setreFetchBusinesses] = useState(true)


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

  useEffect(() => {
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



    return (
        <div className='AppInside'>
          <div className="AddStuff">
            <AddBusiness setreFetchBusinesses={setreFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setShowNewInvoice={setShowNewInvoice}/>
            <AddInvoice setloading={setloading} setreFetchBusinesses={setreFetchBusinesses} reFetchBusinesses={reFetchBusinesses} ShowNewBusiness={ShowNewBusiness} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
            <AddPayment setloading={setloading} ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setShowNewBusiness={setShowNewBusiness} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice}/>
          </div>
        <div style={ShowNewInvoice||ShowNewBusiness||ShowNewPayment?AddCover:RemoveCover} className='Cover'></div>
        <div className='invoicePageContainer'>
          <Nav ShowNewPayment={ShowNewPayment} setShowNewPayment={setShowNewPayment} setisMobile={setisMobile} isActive={isActive} setisActive={setisActive} ShowNewInvoice={ShowNewInvoice} setShowNewInvoice={setShowNewInvoice} setcurrentNavItem={setcurrentNavItem} setShowNewBusiness={setShowNewBusiness} currentNavItem={currentNavItem} loadReceivables={loadReceivables} loadPayables={loadPayables} />
          {DataSwitch === 1?
            <Receivables setisMobile={setisMobile} isMobile={isMobile} loadReceivables={loadReceivables} loadPayables={loadPayables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
           :
            <Payables setisMobile={setisMobile} isMobile={isMobile} loadPayables={loadPayables} loadReceivables={loadReceivables} SearchedData={SearchedData()} setSearchMethod={setSearchMethod} DataSet={DataSet} setDataSet={setDataSet} itemList={itemList} CurrentItem={CurrentItem} setitemList={setitemList} setCurrentItem={setCurrentItem} setsearchField={setsearchField} DataSwitch={DataSwitch}/>
          }  
        </div>
      </div>
    );
  }

  export default App;
