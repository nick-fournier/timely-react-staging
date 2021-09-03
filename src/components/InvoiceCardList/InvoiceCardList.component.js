import React from 'react'
import InvoiceCard from '../InvoiceCard/InvoiceCard.component'
import './InvoiceCardList.component.css'
import MediaQuery from 'react-responsive'

export default function InvoiceCardList({SearchedData, itemList, setitemList, setCurrentItem, CurrentItem, isMobile, setisMobile, DataSwitch}) {

    const hideInvoiceList={
        transform : 'translateX(-100%)'
    }

    return (
        <>
        <MediaQuery maxDeviceWidth={480}>
            <div style={isMobile?hideInvoiceList:{}} className= 'cardsContainer'>
                {SearchedData.map(item => (
                    <InvoiceCard DataSwitch={DataSwitch} setisMobile={setisMobile} key={item.invoice_id} item={item} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>
                ))}
            </div>
        </MediaQuery>

        <MediaQuery minDeviceWidth={481}>
            <div className= 'cardsContainer'>
                {SearchedData.map(item => (
                    <InvoiceCard DataSwitch={DataSwitch} CurrentItem={CurrentItem} setisMobile={setisMobile} key={item.invoice_id} item={item} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>
                ))}
            </div>
        </MediaQuery>
        </>
    )
}
