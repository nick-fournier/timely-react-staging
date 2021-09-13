import '../../pages/receivables/receivables.css'
import './InvoiceCard.component.css'
import {useState, useEffect} from 'react'

export default function InvoiceCard({item, itemList, setitemList, CurrentItem, setCurrentItem, setisMobile,DataSwitch}) {
    const [isActive, setisActive] = useState(false)

    useEffect(() => {
        setisActive(false)
    }, [itemList])



    return (
        <div onClick={() => {
            setCurrentItem(item)
            console.log(item)
            setitemList(item.items)
           // console.log(item.items)
            setTimeout(() => {
                setisActive(true)
            }, 0.01);
            setisMobile(true)
 
        }}
         id="id" className={isActive?'ActiveCard':'card-container'} >
            <div className="top-part">
                <h2 className="top-part-content">{DataSwitch===1?item.to_business_name:item.from_business_name}</h2>
            </div>
            <div className="bot-part">
                <span className="bot-part-content"> Due: {item.date_due} </span>
                <span className="bot-part-content total_price"> ${item.invoice_total_price} </span>
            </div>
            <div className="bot-part-footer">
                <span>{item.invoice_name}</span>
            </div>
        </div>
    )
}
