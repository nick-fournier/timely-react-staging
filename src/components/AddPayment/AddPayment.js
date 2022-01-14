
import './AddPayment.css'
import {useForm} from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faFileMedical, faPenToSquare, faUpload, faPlus} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'


export default function AddPayment({ShowNewPayment, setShowNewInvoice, setShowNewPayment, setisActive, setShowNewBusiness, reFetchBusinesses, setreFetchBusinesses, setloading, setRedirectToNewReceivableOrPayable, SetDefaultValueForBusiness, setSetDefaultValueForBusiness, PayInvoiceImmediately, setPayInvoiceImmediately, ImmediatePayableID, setImmediatePayableID, setShowSchedulePayment, HideAddPaymentBackButton, setHideAddPaymentBackButton, setshowPopup, setPopupMessage, Proceed, setProceed, setshowPopUpButton, ActionType, setActionType, setReloadInvoiceList }) {

    const [DateOrTerms, setDateOrTerms] = useState(true)
    const [AmountOrItems, setAmountOrItems] = useState(true)
    const [CardPaymentSelected, setCardPaymentSelected] = useState(false)
    const [ACHSelected, setACHSelected] = useState(false)
    const [PaperCheckSelected, setPaperCheckSelected] = useState(false)
    const [AddItemList, setAddItemList] = useState([])
    const [AddItemName, setAddItemName] = useState('')
    const [AddItemQty, setAddItemQty] = useState(null)
    const [AddItemPrice, setAddItemPrice] = useState(null)

    const [SingularOrItemized, setSingularOrItemized] = useState(true)
    const [TermsOrDate, setTermsOrDate] = useState(true)

    const [BusinssesArray, setBusinssesArray] = useState([])
    const [BusinessKey, setBusinessKey] = useState(null)

    const [TermsValue, setTermsValue] = useState('Custom')
    const [DateValue, setDateValue] = useState(null)
    const [TotalPriceValue, setTotalPriceValue] = useState(0)
    const [ItemNameValue, setItemNameValue] = useState('')
    const [ItemDescriptionValue, setItemDescriptionValue] = useState('')
    const [PaymentMethods, setPaymentMethods] = useState([1])
    const [Note, setNote] = useState('')

    const ItemName = useRef(null)
    const ItemQTY = useRef(null)
    const ItemPrice = useRef(null)
    const BusinessNameRef = useRef(null)
    const TermsRef = useRef(null)
    const DateRef = useRef(null)
    const AmountDueRef = useRef(null)
    const NotesRef = useRef(null)

    const ItemNameRef = useRef(null)
    const ItemDescriptionRef = useRef(null)


    const [ChooseOrInputs, setChooseOrInputs] = useState(true)
    const [ManualOrUpload, setManualOrUpload] = useState(true)


    

    useEffect(() => {
        
        const loadBusinesses = async () =>{

            const response = await fetch('https://api.pendulumapp.com/api/businesses/',{
                method: "GET",
                headers: new Headers({
                  'Authorization': `token ${localStorage.token}`
              }),
              })
            const DataJson = await response.json()
            setBusinssesArray(DataJson)
            console.log(BusinssesArray)
            setreFetchBusinesses(false)
            let lastItem = BusinssesArray.find(item => item.id === BusinssesArray.length)
            console.log(lastItem)
            
            if (lastItem && !ChooseOrInputs && SetDefaultValueForBusiness){
                console.log('testing manual or upload')
                BusinessNameRef.current.value = lastItem.business_name
                setBusinessKey(lastItem.id)    
            }

            else if (!ChooseOrInputs && !SetDefaultValueForBusiness && ManualOrUpload){
                BusinessNameRef.current.value = null
                setBusinessKey(null)
            }
        }
        loadBusinesses()

    }, [reFetchBusinesses, ChooseOrInputs, ShowNewPayment])



    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
    }

    const ShowAddPayment = {
        transform: 'translateX(0%)'
    }
    const HideAddPayment = {
        transform: 'translateX(100%)',
        boxShadow: 'none'

    }

    const Clicked ={
        color: "#0275d8",
        fontWeight: "700",        
    }

    const Hidden ={
        display: 'none'
    }

    useEffect( async () => {
        if (!Proceed){
            return
        }
        else if (ActionType === 'SaveAndExit'){
            setPopupMessage('Proccessing Invoice...')
            setshowPopUpButton(false)
            setPayInvoiceImmediately(false)
            const SingularItem = [{        
                item_name:ItemNameValue,
                item_description:ItemDescriptionValue,
                quantity_purchased: 1,
                unit_price:TotalPriceValue,
                item_total_price:TotalPriceValue,
                item_tax_rates: ["tax_GXXPX9oS2C9cLF75RBFK6e","tax_GXXPX9oS2C9cLF75RBFK6e"]    
            }]
    
            const TestInvoice = {
                bill_from_key: BusinessKey,
                terms: TermsValue,
                date_due: DateValue,
                invoice_total_price: TotalPriceValue,
                accepted_payments: PaymentMethods,
                items: SingularOrItemized?SingularItem:
                AddItemList,
                notes: Note?Note:'Thank you for your business'
            }

    
            console.table(TestInvoice)
            console.table(SingularItem)
    
            const httpResponse = await fetch('https://api.pendulumapp.com/api/new_payable/',{
                method: 'POST',
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(TestInvoice)
            })
    
            const JsonResponse = await httpResponse.json()
            console.log(JsonResponse)
            
            if (JsonResponse.invoice_id){
                    setPopupMessage('Invoice added successfully!')
                    setloading(true)
                    CleanAllFields()
                    setShowNewPayment(false)
                    setHideAddPaymentBackButton(true)
                    setReloadInvoiceList(true)

            }
            else{
            setPopupMessage('Something went wrong!')
            }
    
        }
        else if (ActionType === 'SaveAndPay'){
            setPopupMessage('Proccessing Invoice...')
            setshowPopUpButton(false)
            setPayInvoiceImmediately(true)

            const SingularItem = [{        
                item_name:ItemNameValue,
                item_description:ItemDescriptionValue,
                quantity_purchased: 1,
                unit_price:TotalPriceValue,
                item_total_price:TotalPriceValue    
            }]
    
            const TestInvoice = {
                bill_from_key: BusinessKey,
                terms: TermsValue,
                date_due: DateValue,
                invoice_total_price: TotalPriceValue,
                accepted_payments: PaymentMethods,
                items: SingularOrItemized?SingularItem:
                AddItemList,
                notes: Note?Note:'Thank you for your business'
            }
    
            console.table(TestInvoice)
    
            setPopupMessage('Proccessing Invoice...')
            setshowPopup(true)
            const httpResponse = await fetch('https://api.pendulumapp.com/api/new_payable/',{
                method: 'POST',
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(TestInvoice)
            })
    
            const JsonResponse = await httpResponse.json()
            console.log(JsonResponse)
            
            if (JsonResponse.invoice_id){
                setPopupMessage('Invoice added successfully!')
                setloading(true)
                CleanAllFields()
                setImmediatePayableID(JsonResponse)
                setShowNewPayment(false)
                setHideAddPaymentBackButton(true)
                setShowSchedulePayment(true)
            }
            else{
            setPopupMessage('Something went wrong!')
    
            }
    
        }

        setProceed(false)

    }, [Proceed])

    async function SaveAndExit(data){
        setActionType('SaveAndExit')
        setPopupMessage('Are you sure you want to add this Invoice?')
        setshowPopUpButton(true)
        setshowPopup(true)
        
    }

    async function SaveAndPayImmediately (){
        setActionType('SaveAndPay')
        setPopupMessage('Are you sure you want to add this Invoice?')
        setshowPopUpButton(true)
        setshowPopup(true)

    }

    const CalcTotal = () =>{
        let Tot = 0
        AddItemList.forEach(item => Tot += item.item_total_price)
        return Tot
    }

    const AddItemToList = () => {
        const newList = [...AddItemList]
        if (AddItemName && AddItemQty && AddItemPrice){
            newList.push({
                item_name: AddItemName,
                quantity_purchased: AddItemQty,
                item_price: AddItemPrice,
                item_total_price: AddItemQty * AddItemPrice
            })
        }
        else return
        setAddItemList(newList)
        setAddItemName('')
        ItemName.current.value = ''
        setAddItemQty(null)
        ItemQTY.current.value = null
        setAddItemPrice(null)
        ItemPrice.current.value = null
        console.table(AddItemList)
        console.log('hello from total')
        let total = 0
        console.log(`total is now ${total}`)
        newList.forEach(item => total += item.item_total_price)
        setTotalPriceValue(total)
        console.log(`total is now ${total}`)
    }

    const HandleKey = (e) => {
        const CurrentValue = e.target.value
        console.log(CurrentValue)
        console.log(BusinssesArray)
        const filteredBusiness = BusinssesArray.find(business => business.business_name === CurrentValue)
        filteredBusiness?setBusinessKey(filteredBusiness.id):setBusinessKey(null)
        console.log(BusinessKey)
       }

    
    const CleanAllFields = () =>{

        BusinessNameRef.current.value = ''
        DateRef.current.value=null
        SingularOrItemized?AmountDueRef.current.value =null:setSingularOrItemized(false)
        NotesRef.current.value =''
        if (SingularOrItemized){
            ItemNameRef.current.value = null;
            ItemDescriptionRef.current.value = null;
        }

        setTermsValue('Custom')
        setDateValue(null)
        setNote(null)
        setTotalPriceValue(null)
        setAddItemList([])
        setPaymentMethods([1])

        setCardPaymentSelected(false)
        setACHSelected(false)
        setPaperCheckSelected(false)

        setisActive(false)
        setChooseOrInputs(true)
        setSetDefaultValueForBusiness(false)

        setAddItemName(null)
        setAddItemQty(null)
        setAddItemPrice(null)

        setAmountOrItems(true)
        setSingularOrItemized(true)
        setDateOrTerms(true)
        setTermsOrDate(true)
    }


    return (
        <div style={ShowNewPayment? ShowAddPayment: HideAddPayment} className='AddPaymentContainer'>
            <div style={HideAddPaymentBackButton?Hidden:{}} className="PopBackButon" onClick={(e)=>{
                e.preventDefault()
                setShowNewPayment(false)
                setShowNewInvoice(false)
                if (!ChooseOrInputs && ManualOrUpload){
                    CleanAllFields()
                }
                if (!ManualOrUpload){
                    setChooseOrInputs(true)
                    setManualOrUpload(true)
                }
                setHideAddPaymentBackButton(true)

                }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
         {ChooseOrInputs?
         <>
            <div className="NewPaymentHeader">Add A Bill To Pay</div>
            <div className="AddBillSubHeader">
                Add a bill or invoice however you want and have the option to pay it immediately.
            </div>
            <div className="AddBillCard" onClick={()=>{
                setChooseOrInputs(false)
                setManualOrUpload(true)
            }}>
                <div className="AddBillIcon">
                    <FontAwesomeIcon icon ={faFileMedical} />
                </div>
                <div className="AddBillContent">
                    <span className="AddBillMainContent">
                        Add a bill manually
                    </span>
                    <span className="AddBillSubContent">
                        Add bill information
                    </span>
                </div>
            </div>
            <div className="AddBillCard" onClick={()=>{
                setChooseOrInputs(false)
                setManualOrUpload(false)
            }}>
                <div className="AddBillIcon">
                    <FontAwesomeIcon icon ={faUpload} />
                </div>
                <div className="AddBillContent">
                    <span className="AddBillMainContent">
                        Upload a bill file
                    </span>
                    <span className="AddBillSubContent">
                        From your device
                    </span>
                </div>
            </div>
            
            <div className="AddBillButtonContainer">
                            <button className="AddBillDiscardButton" onClick={(e)=>{
                            setShowNewPayment(false)
                            setShowNewInvoice(false)
                            setHideAddPaymentBackButton(true)
                            e.preventDefault()
                        }}> Discard</button>
            </div>
         </>
            :
        <>
            {ManualOrUpload?
            <>
            <div className="AddInvoiceForm">

            
                <div className="NewInvoiceHeader">Create a new payable</div>
                <div className="FirstRowOfAddInvoice">
                    <div className="BusinessNameContainer">
                        <label className=''>Business Name: </label>
                        <input className='FirstRowInputField' ref={BusinessNameRef} type="text" list="data" placeholder='Search business' onChange={(e) => {HandleKey(e)}} />
                            <datalist id="data">
                                {BusinssesArray.map((item, index) =>
                                <option key={index} value={item.business_name} />
                                )}
                            </datalist>
                    </div>
                    <div className="BusinessNotRegistered">
                        Business Not Registered?
                    </div>
                    <div className="BusinessEmailContainer">
                        <button className='AddBusinessButton' onClick={(e)=>{
                            e.preventDefault()
                            setRedirectToNewReceivableOrPayable(false)
                            setShowNewInvoice(false)
                            setShowNewPayment(false)
                            setShowNewBusiness(true)
                            setHideAddPaymentBackButton(true)
                        }}>Add Business</button>
                    </div>
                </div>
                <div className="SecondRowOfAddInvoice">
                    <div className="TermsAndDateFormContainer">
                        <label>Due Date:</label>
                        <input ref={DateRef} className='DateInput' type="date"  max="2025-12-21" onChange={(e)=>{setDateValue(e.target.value)}}/>
                    </div>
                </div>
                <div className="ThirdRowOfAddInvoice">
                    <div className="ChangeAmountContainer">
                            <div style={SingularOrItemized?Clicked:{}} onClick={(e)=>{
                                e.preventDefault()
                                setAmountOrItems(true)
                                setSingularOrItemized(true)
                                setAddItemList([])
                            }} className="Tab">Singular </div>
                            <span style={{margin: '0 0.3em', color: 'rgb(146,146,146)'}}>/</span>
                            <div style={SingularOrItemized?{}:Clicked} onClick={(e)=>{
                                e.preventDefault()
                                setAmountOrItems(false)
                                setSingularOrItemized(false)
                                setTotalPriceValue(0)
                            }} className="Tab"> Itemized</div>
                    </div>
                    <div className="AmountAndItemsFormContainer">
                        {AmountOrItems?
                        <>
                        <label className=''>Item Name:</label>
                        <input ref={ItemNameRef} className='AmountInput' type="text" placeholder='Enter name' onChange={(e)=>{setItemNameValue(e.target.value)}}/>
                        <label className=''>Item Description:</label>
                        <input ref={ItemDescriptionRef} className='AmountInput' type="text" placeholder='Enter description' onChange={(e)=>{setItemDescriptionValue(e.target.value)}}/>
                        <label className=''>Amount Due:</label>
                    </>:
                        <label className=''>Add items:</label>}
                        {AmountOrItems?
                        <input ref={AmountDueRef} className='AmountInput' type="number" placeholder='Enter amount' onChange={(e)=>{setTotalPriceValue(e.target.value)}}/>:
                        <div className='AddItemsContainer'>
                            {AddItemList.length>0 && <div className="AddItemsHeaders">
                                <div className="AddItem-Item">
                                    Item
                                </div>
                                <div className="QtyPriceTotalContainer">
                                    <div className="AddItem-Qty">
                                        Qty
                                    </div>
                                    <div className="AddItem-Price">
                                        Price
                                    </div>
                                    <div className="AddItem-Total">
                                        Total
                                    </div>
                                </div>
                            </div>}

                            <div className="AddItemDetails">
                                {AddItemList.map((Item,index) => (
                                    <div className='OneItemContainer' key={index}>
                                        {Item.item_name}
                                        <div className='AddItemRHS'>
                                            <div className="ItemQtyInTable">
                                                {Item.quantity_purchased}
                                            </div>
                                            <div className="ItemPriceInTable">
                                                ${Item.item_price}   
                                            </div>
                                            <div className="ItemTotalInTable">
                                                ${Item.item_total_price}
                                            </div>
                                            <div className='DeleteItemButton' onClick={(e)=>{
                                               const newAddItemList = [...AddItemList]
                                               newAddItemList.splice(index,1)
                                               setAddItemList(newAddItemList)
                                               let newTot = 0
                                               newAddItemList.forEach(item => newTot += item.item_total_price)
                                               setTotalPriceValue(newTot)
                                            }}>
                                                X
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='AddItemFields'>
                                <input className ='AddItemNameInput' ref={ItemName}  onChange={(e)=>{
                                    setAddItemName(e.target.value)
                                }} type="text" placeholder='Item Name'/>
                                <input className ='AddItemQTYInput' ref ={ItemQTY} onChange={(e)=>{
                                    setAddItemQty(e.target.value)
                                }} type="number" placeholder='Item Qty'/>
                                <input className ='AddItemPriceInput' ref={ItemPrice} onChange={(e)=>{
                                    setAddItemPrice(e.target.value)
                                }} type="number" placeholder='Item Price'/>
                                
                            </div>
                            <div className="AddItemOptions">
                                <div onClick={AddItemToList} className="AddItemButton">
                                <span className='AddItemIcon'><FontAwesomeIcon icon ={faPlus} /></span> Add Item
                                </div>
                                <div className="">
                                    Total: <span className="AddItemTotalAmount" >${CalcTotal()} </span>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    
                </div>
                <div className="AdditionalNotesContainer">
                    <label className=''>Additional Note: </label>
                    <input ref={NotesRef}  className='NoteInput' type="textarea" placeholder='Enter your note' onChange={(e)=>setNote(e.target.value)}/>
                </div>
                
                <div className="SubmitAndDiscardContainer">
                    <button disabled={BusinessKey && DateValue && TotalPriceValue?false:true} className={BusinessKey && DateValue && TotalPriceValue?"SubmitPayableImmediatelyButton":'AddBillDisabledButton'} type="submit" value="Submit" onClick={()=>{
                        SaveAndPayImmediately()
                    }}> Save and pay immediately</button>
                    <button disabled={BusinessKey && DateValue && TotalPriceValue?false:true} className={BusinessKey && DateValue && TotalPriceValue?"AddBillDiscardButton":'AddBillDisabledButton'} type="submit" value="Submit" onClick={()=>{
                        SaveAndExit()
                    }}> Save and exit</button>
                    {/* <button className="AddBillDiscardButton" onClick={(e)=>{
                        e.preventDefault()
                        CleanAllFields()
                    }}> Discard</button> */}
                </div>
            </div>
            </>
            :
            <>Welcome To Upload bill</>}
        </>}
        </div>
    )
}
