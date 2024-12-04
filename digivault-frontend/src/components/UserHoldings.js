import React, { useState } from 'react';
import axios from 'axios';

const UserHoldings = () => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchHoldings = async () => {
        try {
            const response = await axios.get(`/api/users/find/${userId}`);
            console.log(response.data);
            setData(response.data);
            setError('');
        } catch {
            setError('User not found.');
            setData(null);
        }
    };

    return (
        <div>
            <h1>Crypto Holdings</h1>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={fetchHoldings}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    {data["cryptoWallets"]?.map((wallet, walletIndex) => (
                        <div key={walletIndex}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                    <th>Amount (USD)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {wallet["holdings"].map((holding, i) => (
                                    <tr key={i}>
                                        <td>{holding["ticker"]}</td>
                                        <td>{holding["amount"]}</td>
                                        <td>{holding["price"]}</td>
                                        <td>{holding["amountUSD"]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserHoldings;
