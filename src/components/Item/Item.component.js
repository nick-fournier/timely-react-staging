import React from 'react'
import './Item.component.css'

export default function Item({item, ShowHeaders, CurrentItem}) {
    return (
        <div>
            <div className="ItemDetails">
                <div className="ItemDetailsLHS">
                    <div className="ItemName">
                        {!(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object) && item.item_name}
                    </div>
                    <div className="ItemDescription">
                        {!(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object) && item.item_description}
                    </div>
                </div>
                <div className="QuantityPriceAmountContainerNumbers">
                    {ShowHeaders && <div className="Quantity">
                        {!(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object) && parseInt(item.quantity_purchased)}
                    </div>}
                    {ShowHeaders && <div className="ItemPrice">
                        {!(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object) &&  `$${parseInt(item.item_price)}`}
                    </div>}
                    <div className="ItemsTotalPrice">
                        {!(Object.keys(CurrentItem).length===0 && CurrentItem.constructor === Object) && `$${parseInt(item.item_total_price)}`}
                    </div>
                </div>  
            </div>
        </div>
    )
}
