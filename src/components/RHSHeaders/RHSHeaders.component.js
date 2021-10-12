import {useEffect, useState} from 'react'
import './RHSHeaders.component.css'

export default function RHSHeaders({CurrentItem, ShowHeaders, setShowHeaders}) {


    useEffect(() => {
        if (CurrentItem.items){
            if (CurrentItem.items.length > 1){
                setShowHeaders(true)
            }
            else {
                setShowHeaders(false)
            }
        }
            return () => {
                
            }
    }, [CurrentItem])


    return (
        <div className={(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object)?'hideHeaders':(CurrentItem.items.length)?'RHSHeaders':'hideHeaders'}>
            <div className="ItemDescriptionHeader">
                DESCRIPTION
            </div>
            <div className="QuantityPriceAmountContainer">
                {ShowHeaders &&<div className="QuantityHeader">
                    QUANTITY
                </div>}
                {ShowHeaders && <div className="ItemPriceHeader">
                    PRICE
                </div>}
                <div className="ItemsTotalPriceHeader">
                    AMOUNT
                </div>
            </div>
        </div>
    )
}
