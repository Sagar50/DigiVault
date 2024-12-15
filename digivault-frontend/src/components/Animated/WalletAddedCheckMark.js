import React from 'react';
import './WalletAddedCheckMark.css';
import complete from '../../res/Complete.gif'
import {useNavigate} from "react-router-dom";

const WalletAddedCheckMark = () => {
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <div className="walletAddedTitleContainer">Wallet Added</div>
            <div className="imageContainer">
                <img src={complete} alt="complete" />
            </div>
            <div className="flex pb-40">
                <button className="button border rounded-2xl py-2 px-4 border-[#6bbede] text-white bg-[#6bbede] mx-auto my-auto" onClick={() => {navigate('/addWallet')}}>Add another wallet</button>
            </div>
        </div>
    );
};

export default WalletAddedCheckMark;