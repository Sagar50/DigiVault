import React, { useState } from 'react';
import axios from 'axios';

const UserHoldings = () => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchHoldings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
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
                    {data["holdings"].map((h, i) => (
                        <tr key={i}>
                            <td>{h["ticker"]}</td>
                            <td>{h.amount}</td>
                            <td>{h["price"]}</td>
                            <td>{h["amountUSD"]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserHoldings;
