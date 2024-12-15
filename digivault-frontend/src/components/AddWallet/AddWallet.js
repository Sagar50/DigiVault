import React, { useState } from 'react';
import axios from 'axios';
import {coin_networks, coin_networks_api} from "../../constants/appConstants";
import './AddWallet.css'
import addWalletImage from '../../res/AddWallet.png';
import {useNavigate} from "react-router-dom";

export const AddWallet = () => {
    const [address, setAddress] = useState('');
    const [selectedTicker, setSelectedTicker] = useState("");
    const [selectedApi, setSelectedApi] = useState("");
    const navigate = useNavigate();
    const handleSelectChange = (event) => {
        setSelectedApi(coin_networks_api[event.target.value]);
        setSelectedTicker(coin_networks[event.target.value]);
    };

    const clearInputs = () => {
        window.location.reload();
    }
    const addWallet = async () => {
        try {
            const addWalletData = {
                ticker: selectedTicker,
                api: selectedApi,
                walletId: address,
                username: localStorage.getItem('username'),
            };
            await axios.post(`/api/db/addWallet`, addWalletData);
            alert("wallet Added")
        } catch (error) {
            console.error('Error while updating user:', error);
            alert('Error occurred while processing the request.');
        }
        navigate('/walletAdded');
    };

    return (
        <div className="flex flex-1 relative">
            <div className="mx-10 lg:mx-20 mt-[12%] md:mt-[5%] flex flex-col">
                <div>
                    <div className="py-3 px-4">
                        <p className="addWalletTitle">Add a Wallet</p>
                        <p className="description">Select the network of your wallet and provide your wallet
                            address.</p>
                    </div>
                    <div className="cryptoNetworkContainer">
                        <label>
                            <select className="networkSelect" onChange={handleSelectChange}>
                                <option value="" disabled selected>Choose a network
                                </option>
                                {Object.keys(coin_networks).map((network) => (
                                    <option key={network} value={network}>
                                        {network}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="walletAddressInputContainer">
                        <label>
                            <input className="placeholder-white" placeholder="Wallet address" type="text"
                                   onChange={(e) => setAddress(e.target.value)}/>
                        </label>
                    </div>
                </div>
                <div className="footerBttnContainer mt-auto mb-20">
                    <div className="bttnContainer">
                        <button className="cancelWalletBttn" onClick={clearInputs}>
                            Cancel
                        </button>
                        <button className="addWalletBttn" onClick={addWallet}>
                            Add Wallet
                        </button>
                    </div>
                </div>
            </div>
            <div className="imgDiv bg-cover ml-auto my-auto hidden md:block">
                <img src={addWalletImage} alt="add wallet image"
                     className="h-[50vw] w-[560px] lg:h-[80%] xl:h-full xl:w-full"/>
            </div>
        </div>
    );
};
