import React, { useState } from 'react';
import axios from 'axios';

export const UpdateUser = () => {
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [ticker, setTicker] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [amountUSD, setAmountUSD] = useState('');

    const addUser = async () => {
        try {

            // Create the new wallet holding
            const newWalletHolding = {
                walletId: address,
                holdings: [
                    {
                        ticker,
                        amount: parseFloat(amount),
                        price: parseFloat(price),
                        amountUSD: parseFloat(amountUSD)
                    }
                ]
            };
            // Check if the user exists

            const userResponse = await axios.get(`/api/users/find/${username}`);
            if (userResponse.data) {
                // User exists, check if the walletId exists
                const user = userResponse.data;
                const existingWallet = user.cryptoWallets.find(
                    (wallet) => wallet.walletId === address
                );

                if (existingWallet) {
                    // If wallet exists, update holdings
                    existingWallet.holdings.push(...newWalletHolding.holdings);
                    await axios.put(`/api/users/${username}`, user);  // Update user
                    alert('User holdings updated.');
                } else {
                    // If wallet doesn't exist, add new wallet
                    user.cryptoWallets.push(newWalletHolding);
                    await axios.put(`/api/users/${username}`, user);  // Update user
                    alert('New wallet added to user.');
                }
            }
        } catch (error) {
            console.error('Error while updating user:', error);
            alert('Error occurred while processing the request.');
        }
    };

    return (
        <div>
            <h1>Add/Update user holdings</h1>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter wallet address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="ticker"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="amountUSD"
                        value={amountUSD}
                        onChange={(e) => setAmountUSD(e.target.value)}
                    />
                </div>
                <button onClick={addUser}>Save</button>
            </div>
        </div>
    );
};
