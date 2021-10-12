import React from 'react'
import './Item.component.css'

export default function Item({item, ShowHeaders}) {
    return (
        <div>
            <div className="ItemDetails">
                <div className="ItemDetailsLHS">
                    <div className="ItemName">
                        {item.item_name}
                    </div>
                    <div className="ItemDescription">
                        {item.item_description}
                    </div>
                </div>
                <div className="QuantityPriceAmountContainerNumbers">
                    {ShowHeaders && <div className="Quantity">
                        {parseInt(item.quantity_purchased)}
                    </div>}
                    {ShowHeaders && <div className="ItemPrice">
                        ${parseInt(item.item_price)}
                    </div>}
                    <div className="ItemsTotalPrice">
                        ${parseInt(item.item_total_price)}
                    </div>
                </div>  
            </div>
        </div>
    )
}
