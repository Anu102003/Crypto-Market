import React from 'react'

import './Coins.css'

const CoinItem = (props) => {
    return (<div>
        <div className='coin-row'>

            <p>{props.coins.market_cap_rank}</p>
            <div className='img-symbol'>
                <img src={props.coins.image} alt='' className='imgg'/>
                <p className='data'>{`${props.coins.symbol.toUpperCase()}`}<br></br><span className='sym'>{`(${props.coins.name.toUpperCase()})`}</span></p>
            </div>
            <p className='data'>${props.coins.current_price.toLocaleString()}</p>
            <p className='data'>
                <span class={props.coins.price_change_percentage_24h < 0 ? 'text-danger' : 'text-success'}>
                    {props.coins.price_change_percentage_24h.toFixed(2)}%
                </span></p>
            <p className='hide-mobile data'>${props.coins.total_volume.toLocaleString()}</p>
            <p className='hide-mobile data'>${props.coins.market_cap.toLocaleString()}</p>
        </div></div>
    )
}

export default CoinItem
