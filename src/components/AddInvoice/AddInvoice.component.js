import './AddInvoice.component.css'

import {useState, useRef, useEffect} from 'react'
import {useForm} from 'react-hook-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faSleigh} from '@fortawesome/free-solid-svg-icons'

export default function AddInvoice( {ShowNewInvoice, setShowNewInvoice, setisActive, setShowNewBusiness, reFetchBusinesses, setreFetchBusinesses, setloading, setRedirectToNewReceivableOrPayable, setSetDefaultValueForBusiness, SetDefaultValueForBusiness, HideAddInvoiceBackButton, setHideAddInvoiceBackButton, setshowPopup, setPopupMessage, Proceed, setProceed, setshowPopUpButton, ActionType, setActionType} ) {

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

    const [PaymentMethods, setPaymentMethods] = useState([])
    const [Note, setNote] = useState('')

    const ItemName = useRef(null)
    const ItemQTY = useRef(null)
    const ItemPrice = useRef(null)  
    const BusinessNameRef = useRef(null)
    const TermsRef = useRef(null)
    const DateRef = useRef(null)
    const AmountDueRef = useRef(null)
    const ItemNameRef = useRef(null)
    const ItemDescriptionRef = useRef(null)
    const NotesRef = useRef(null)


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
            if(ShowNewInvoice && SetDefaultValueForBusiness){
                BusinessNameRef.current.value = lastItem.business_name
                setBusinessKey(lastItem.id)
                console.log(lastItem.id)
                console.log(BusinessKey)
            }

            else if (ShowNewInvoice && !SetDefaultValueForBusiness){
                BusinessNameRef.current.value = null
                setBusinessKey(null)
            }
            
        }
        loadBusinesses()

    }, [reFetchBusinesses, ShowNewInvoice])



    const ShowAddInvoice = {
        transform: 'translateX(0%)'
    }
    const HideAddInvoice = {
        transform: 'translateX(100%)',
        boxShadow: 'none'
    }

    const Hidden ={
        display: 'none'
    }

    const Clicked ={
        color: "#0275d8",
        fontWeight: "700",        
    }

    const {register, handleSubmit } = useForm();

    useEffect( async () => {
        if (!Proceed){
            return
        }

        if (ActionType === 'AddInvoice') {
            setshowPopUpButton(false)
            setPopupMessage('Processing Invoice...')
            const SingularItem = [{        
                item_name:ItemNameValue,
                item_description:ItemDescriptionValue,
                quantity_purchased: 1,
                item_price:TotalPriceValue,
                item_total_price:TotalPriceValue    
            }]
            console.log(SingularItem)
    
            const TestInvoice = {
                bill_to_key: BusinessKey,
                terms: TermsValue,
                date_due: DateValue,
                invoice_total_price: TotalPriceValue,
                accepted_payments: PaymentMethods,
                items: SingularOrItemized?SingularItem:
                AddItemList,
                notes: Note?Note:'Thank you for your business'
            }
    
            console.table(TestInvoice)
            const httpResponse = await fetch('https://api.pendulumapp.com/api/new_receivable/',{
                method: 'POST',
                headers: new Headers({
                    'Authorization': `token ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(TestInvoice)
            })
    
            const JsonResponse = await httpResponse.json()
            console.log(JsonResponse)
            
            if (JsonResponse.bill_to_name){
                setPopupMessage('Invoice added successfully!')
                setloading(true)
                CleanAllFields()
                setHideAddInvoiceBackButton(true)
            }
            else{
                setPopupMessage('Something went wrong.')
            }
        }
        setProceed(false)
    }, [Proceed])

    async function onSubmit(data){
        setActionType('AddInvoice')
        setPopupMessage('Are you sure you want to send this invoice?')
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
         const filteredBusiness = BusinssesArray.find(business => business.business_name === CurrentValue)
         filteredBusiness?setBusinessKey(filteredBusiness.id):setBusinessKey(null)
        }

    const HandlePaymentMethods = (Method, num) =>{
        const Mediums = [...PaymentMethods]
        let newMediums = []

        if (Method){
            newMediums = Mediums.filter(item => item !== num)
            setPaymentMethods(newMediums)
        }

        else if (!Method){
            Mediums.push(num)
            setPaymentMethods(Mediums)
        }
    }

    const CleanAllFields = () =>{

        BusinessNameRef.current.value = ''
        DateOrTerms?TermsRef.current.value ='Cash on delivery':DateRef.current.value=null
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
        setPaymentMethods([])

        setCardPaymentSelected(false)
        setACHSelected(false)
        setPaperCheckSelected(false)

        setisActive(false)
        setShowNewInvoice(false)

        setAddItemName(null)
        setAddItemQty(null)
        setAddItemPrice(null)

        setAmountOrItems(true)
        setSingularOrItemized(true)
        setDateOrTerms(true)
        setTermsOrDate(true)
    }


    return (
        <div style={ShowNewInvoice? ShowAddInvoice: HideAddInvoice} className='AddInvoiceContainer'>
            <form className='AddInvoiceForm' action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className='NewInvoiceHeader'>Create a new inovice</div>
                <div style={HideAddInvoiceBackButton?Hidden:{}} className="PopBackButon" onClick={(e)=>{
                    e.preventDefault()
                    CleanAllFields()
                    setHideAddInvoiceBackButton(true)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
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
                            setRedirectToNewReceivableOrPayable(true)
                            setShowNewInvoice(false)
                            setShowNewBusiness(true)
                            setHideAddInvoiceBackButton(true)
                        }}>Add Business</button>
                    </div>
                </div>
                <div className="SecondRowOfAddInvoice">
                    <div className="ChangeTermsContainer">
                        <div style={TermsOrDate?Clicked:{}} onClick={(e)=>{
                            e.preventDefault()
                            setDateOrTerms(true)
                            setTermsOrDate(true)
                            setDateValue(null)
                        }} className="Tab">Terms</div>
                        <span style={{margin: '0 0.3em', color: 'rgb(146,146,146)'}}>/</span>
                        <div style={TermsOrDate?{}:Clicked} onClick={(e)=>{
                            setTermsValue('Custom')
                            e.preventDefault()
                            setDateOrTerms(false)
                            setTermsOrDate(false)
                        }} className="Tab">Custom Due Date</div>
                    </div>
                    <div className="TermsAndDateFormContainer">
                        {DateOrTerms?<label className=''>Terms:</label>:
                        <label>Due Date:</label>
                        }
                        {DateOrTerms?
                        <select ref={TermsRef} className='TermsInput' default='Cash On Delivery' onChange={(e)=>{
                            console.log(e.target.value)
                            const value = e.target.value
                            switch (value) {
                                case 'Cash on delivery':
                                    setTermsValue('COD')
                                    break;
                                case 'Cash in advance':
                                    setTermsValue('CIA')
                                    break;
                                case 'Net 7 days':
                                    setTermsValue('NET7')
                                    break;
                                case 'Net 10 days':
                                    setTermsValue('NET10')
                                    break;
                                case 'Net 30 days':
                                    setTermsValue('NET30')
                                    break;
                                case 'Net 60 days':
                                    setTermsValue('NET60')
                                    break;
                                case 'Net 90 days':
                                    setTermsValue('NET90')
                                    break;
                                case 'Net 120 days':
                                    setTermsValue('NET120')
                                    break;
                            
                                default:
                                    break;
                            }
                        }}>
                            <option value="Cash on delivery" >Cash on delivery</option>
                            <option value='Cash in advance'>Cash in advance</option>
                            <option value='Net 7 days' >Net 7 days</option>
                            <option value='Net 10 days' >Net 10 days</option>
                            <option value='Net 30 days' >Net 30 days</option>
                            <option value='Net 60 days' >Net 60 days</option>
                            <option value='Net 90 days' >Net 90 days</option>
                            <option value='Net 120 days' >Net 120 days</option>
                        </select>:
                        <input ref={DateRef} className='DateInput' type="date"  max="2025-12-21" onChange={(e)=>{setDateValue(e.target.value)}}/>
                        }
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
                            
                        </>

                        :
                        <></>
                        }
                        {AmountOrItems?
                        <label className=''>Amount Due:</label>
                        :
                        <label className=''>Add items:</label>}
                        {AmountOrItems?
                        <input ref={AmountDueRef} className='AmountInput' type="number" placeholder='Enter amount' onChange={(e)=>{setTotalPriceValue(e.target.value)}}/>
                        :
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
                
                <div className="AcceptedMediumsContainer">
                    <label className=''>Accepted Mediums: </label>
                    <div className="RadioContainer">
                        <label><input type='radio' value='Card Payment' name='Card Payment' onClick={()=>{
                            setCardPaymentSelected(!CardPaymentSelected)
                            HandlePaymentMethods(CardPaymentSelected, 1)
                        }
                            } checked={CardPaymentSelected?true:false} /> Card Payment </label>
                        <label><input type='radio' value='ACH' onClick={()=>{
                            setACHSelected(!ACHSelected)
                            HandlePaymentMethods(ACHSelected, 2)
                        
                        }
                            } checked={ACHSelected?true:false} /> ACH </label>
                        <label><input type='radio' value='Paper Check' onClick={()=>{
                            setPaperCheckSelected(!PaperCheckSelected)
                            HandlePaymentMethods(PaperCheckSelected, 3)
                        }
                            } checked={PaperCheckSelected?true:false} /> Paper Check </label>
                    </div>
                </div>
                <div className="AdditionalNotesContainer">
                    <label className=''>Additional Notes: </label>
                    <input ref={NotesRef}  className='NoteInput' type="textarea" placeholder='Enter your note' onChange={(e)=>setNote(e.target.value)}/>
                </div>
                
                <div className="SubmitAndDiscardContainer">
                    <button disabled={TotalPriceValue && BusinessKey?false:true} className={TotalPriceValue && BusinessKey?"SubmitInvoiceButton":"AddInvoiceButtonDisabled"} type="submit" value="Submit"> Create Invoice</button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                        e.preventDefault()
                        CleanAllFields()
                        setHideAddInvoiceBackButton(true)
                    }}> Discard</button>
                </div>
                

            </form>
        </div>
        
    )
    
}


