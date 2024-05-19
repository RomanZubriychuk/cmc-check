import React, {useEffect, useState} from 'react';
import {MenuProps, Spin} from 'antd';
import { Menu } from 'antd';
import axios from 'axios';
import CryptoCard from "./components/CryptoCard.tsx";


const App: React.FC = () => {
    const fetchCurrencies = () => {
        axios.get('http://127.0.0.1:8000/cryptocurrencies')
            .then((response) => {
                console.log(response);
                const items = [
                    {
                        label: 'List of cryptocurrencies',
                        type: 'group',
                        children: response.data.map((currency: { name: string; id: string; }) => ({label: currency.name, key: currency.id}))
                    },
                ];
                setCurrencies(items);
        })
    }
    const fetchCurrency = () => {
        axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`)
            .then((response) => {
                console.log(response);
                setCurrencyData(response.data);
            })
    }
    const [currencies, setCurrencies] = useState([])
    const [currencyId, setCurrencyId] = useState(1)
    const [currencyData, setCurrencyData] = useState(null)

    useEffect(() => {
        fetchCurrencies();
    }, [])
    useEffect(() => {
        setCurrencyData(null);
        fetchCurrency();
    }, [currencyId])

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrencyId(e.key);
    };

    return (
        <div className="flex">
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={currencies}
                className="h-screen overflow-y-auto"
            />
            <div className="mx-auto my-auto">
                {currencyData ? <CryptoCard currency={currencyData}/> : <Spin size='large'/> }
            </div>
        </div>
    );
};

export default App;
