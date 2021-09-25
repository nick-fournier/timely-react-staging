import './PGWInvoiceItem.css'
export default function PGWInvoiceItem({item}) {
    return (
            <div className="PGWItemDetails">
                        <div className="PGWItemDetailsLHS">
                            <div className="ItemName">
                                {item.item_name}
                            </div>
                            <div className="ItemDescription">
                                {item.item_description}
                            </div>
                        </div>
                        <div className="QuantityPriceAmountContainerNumbers">
                            <div className="Quantity">
                                {parseInt(item.quantity_purchased)}
                            </div>
                            <div className="ItemPrice">
                               ${item.item_price}
                            </div>
                            <div className="ItemsTotalPrice">
                                ${item.item_total_price}
                            </div>
                        </div>  
                    </div>
    )
}
