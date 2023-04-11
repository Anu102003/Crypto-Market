import React from 'react'

function CurrencyOption({prop , fromCurrencyy , toCurrencyy , currencyOption , updateCurrencyy}) {
    const options = currencyOption.map((data,index) => {
        return <option key = {index}value = {data}>
            {data}
        </option>
    })
    return (
        <>
            {
                prop === "From currency" ?
                <select name = "currency" className = {prop}value = {fromCurrencyy} onChange = {updateCurrencyy} defaultValue='default'>
                    {options}
                </select> : prop === "To currency" ? 
                 <select name = "currency" className = {prop}value = {toCurrencyy} onChange = {updateCurrencyy}>
                 {options}
             </select> : null
            }
        </>
    )
}

export default CurrencyOption