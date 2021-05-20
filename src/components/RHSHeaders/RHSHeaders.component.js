import React from 'react'
import './RHSHeaders.component.css'

export default function RHSHeaders({CurrentItem}) {


    return (
        <div className={(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object)?'hideHeaders':(CurrentItem.items.length)?'RHSHeaders':'hideHeaders'}>
            <div className="ItemDescriptionHeader">
                DESCRIPTION
            </div>
            <div className="QuantityPriceAmountContainer">
                <div className="QuantityHeader">
                    QUANTITY
                </div>
                <div className="ItemPriceHeader">
                    PRICE
                </div>
                <div className="ItemsTotalPriceHeader">
                    AMOUNT
                </div>
            </div>
        </div>
    )
}
