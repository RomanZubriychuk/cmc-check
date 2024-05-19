import { Card } from "antd"

function CryptoCard(props) {
    const { currency } = props;

    return (
        <>
            <Card
                title={
                    <div className="flex items-center">
                        <img className="w-8 h-8 mr-3" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="icon"/>
                        <span>{currency?.name}</span>
                    </div>}
                style={{ width: 300 }}>
                <p>Price: {Math.round(currency.quote.USD.price)}</p>
                <p>24h price change: {currency.quote.USD.percent_change_24h}</p>
            </Card>
        </>
    )
}

export default CryptoCard
