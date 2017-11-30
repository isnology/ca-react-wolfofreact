import React from 'react'

function StockInfo({
                     logoUrl,
                     symbol,          // NFLX
                     companyName,     // Netflix Inc
                     primaryExchange, // Nasdaq Global exchange
                     latestPrice,
                     latestSource,
                     week52High,
                     week52Low
                   }) {
  return (
      <div>
        <h2>{ symbol }: { companyName }</h2>
        <img src={ logoUrl } alt="company logo"/>
        <h3>Exchange: { primaryExchange }</h3>
        <h3>{ latestPrice } ({ latestSource })</h3>
        <dl>
          <dt>Week 52 high</dt>
          <dd>{ week52High }</dd>

          <dt>Week 52 Low</dt>
          <dd>{ week52Low }</dd>
        </dl>
      </div>
  )
}

export default StockInfo;