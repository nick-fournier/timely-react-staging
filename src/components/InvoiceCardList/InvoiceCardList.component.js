import React from 'react'
import InvoiceCard from '../InvoiceCard/InvoiceCard.component'

export default function InvoiceCardList({SearchedData, itemList, setitemList, setCurrentItem}) {

    return (
        <div className="cardsContainer">
            {SearchedData.map(item => (
                <InvoiceCard key={item.invoice_id} item={item} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>
            ))}
        </div>
    )
}
