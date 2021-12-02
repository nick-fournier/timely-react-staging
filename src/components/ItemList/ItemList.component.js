import React from 'react'
import '../../pages/receivables/receivables.css'
import Item from '../Item/Item.component'
import './ItemList.component.css'

export default function ItemList({itemList, ShowHeaders, CurrentItem}) {
    return (
            <div className="ItemDetailsContainer" id='ItemDetailsContainer'>
                {itemList.map(item => (
                    <Item CurrentItem={CurrentItem} ShowHeaders={ShowHeaders} key={item.id} item ={item}/>
                ))}
            </div>

        )
}
