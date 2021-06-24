import React from 'react'
import InvoiceCard from '../InvoiceCard/InvoiceCard.component'
import './InvoiceCardList.component.css'

export default function InvoiceCardList({SearchedData, itemList, setitemList, setCurrentItem, isMobile, setisMobile}) {

    const hideInvoiceList={
        left : '-100%'
    }

    return (
        <div style={isMobile?hideInvoiceList:{}} className= 'cardsContainer'>
            {SearchedData.map(item => (
                <InvoiceCard setisMobile={setisMobile} key={item.invoice_id} item={item} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>
            ))}
        </div>
    )
}
