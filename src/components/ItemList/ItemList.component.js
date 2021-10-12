import React from 'react'
import '../../pages/receivables/receivables.css'
import Item from '../Item/Item.component'
import './ItemList.component.css'

export default function ItemList({itemList, ShowHeaders}) {
    return (
            <div className="ItemDetailsContainer" id='ItemDetailsContainer'>
                {itemList.map(item => (
                    <Item ShowHeaders={ShowHeaders} key={item.id} item ={item}/>
                ))}
            </div>

        )
}
