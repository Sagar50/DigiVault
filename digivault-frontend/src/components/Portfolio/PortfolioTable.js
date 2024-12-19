import React, {useEffect, useRef, useState} from "react";
import './PortfolioTable.css';
import profit from '../../res/profit.svg';
import loss from '../../res/loss.svg';
import del from '../../res/delete.svg';
import axios from "axios";
import copy from '../../res/copy.svg';
import CustomAlert from "./CustomAlert";
import edit from '../../res/edit.svg';

const PortfolioTable = ({cryptoWallets}) => {
    // Group wallets by ticker
    const [walletsToUse, setWalletsToUse] = useState(cryptoWallets);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [newWalletName, setNewWalletName] = useState({});
    const [editingMode, setEditingMode] = useState(null); // Use walletId for editing mode
    const inputRefs = useRef({}); // Store refs for each wallet input field

    const groupedWallets = walletsToUse.reduce((acc, wallet) => {
        const holding = wallet.holdings; // Since holdings is now an object, not an array
        if (!acc[holding.ticker]) {
            acc[holding.ticker] = [];
        }
        acc[holding.ticker].push(wallet);
        return acc;
    }, {});
    useEffect(() => {
        if (isAlertVisible) {
            const timer = setTimeout(() => {
                setAlertVisible(false);
            }, 3000); // Hide after 3 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or when alert is closed
        }
    }, [isAlertVisible]);

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (ticker) => {
        setExpandedRow(expandedRow === ticker ? null : ticker);
    };

    const handleCopy = (walletId) => {
        navigator.clipboard.writeText(walletId).then(() => {
            showAlert("Successfully Copied.")
        }).catch(err => {
            console.error('Error copying text: ', err);
        });
    };

    const handleDeleteWallet = async (walletId) => {
        const user = localStorage.getItem("username");
        try {
            const response = await axios.delete(`/api/db/remove/${user}/${walletId}`);
            if (response.status === 200) {
                // Update the state to remove the deleted wallet
                setWalletsToUse((prevWallets) => prevWallets.filter((wallet) => wallet.walletId !== walletId));
            } else {
                console.error('Failed to delete wallet:', response.data);
            }
        } catch (e) {
            console.error('Error deleting wallet:', e);
        }
    };
    const handleEditClick = (walletId) => {
        setEditingMode(walletId);
    };

    useEffect(() => {
        if (editingMode && inputRefs.current[editingMode]) {
            inputRefs.current[editingMode].focus(); // Autofocus the input
        }
    }, [editingMode]);
    // Function to show the alert
    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
    };

    // Function to close the alert
    const closeAlert = () => {
        setAlertVisible(false);
    };

    const changeWalletName = async (walletId) => {
        const user = localStorage.getItem("username");
        try {
            const response = await axios.put(`/api/db/updateName/${user}/${walletId}/${newWalletName[walletId]}`, {
                newName: newWalletName[walletId],
            });

            if (response.status === 200) {
                setWalletsToUse((prevWallets) =>
                    prevWallets.map((wallet) =>
                        wallet.walletId === walletId
                            ? { ...wallet, walletName: newWalletName[walletId] }
                            : wallet
                    )
                );
                setEditingMode(null); // Exit editing mode
                setNewWalletName((prev) => {
                    const updated = { ...prev };
                    delete updated[walletId]; // Clear saved name
                    return updated;
                });
                showAlert("Updated successfully.");
            } else {
                console.error("Failed to update wallet name:", response.data);
            }
        } catch (error) {
            console.error("Error changing wallet name:", error);
        }
    };

    return (<>
        {isAlertVisible && (<CustomAlert message={alertMessage} onClose={closeAlert}/>)}

        <table className="rounded-2xl border border-black w-full">
            <tbody>
            {Object.entries(groupedWallets).map(([ticker, wallets]) => {
                const totalAmount = wallets.reduce((sum, wallet) => sum + wallet.holdings.amount, 0);
                const totalAmountUSD = wallets.reduce((sum, wallet) => sum + wallet.holdings.amountUSD, 0);

                const price = wallets[0].holdings.price;
                const lastPrice = wallets[0].holdings.lastPrice;
                const totalLossGain = (totalAmount * price) - (totalAmount * lastPrice);

                return (<React.Fragment key={ticker}>
                    <tr className="tableRowContainer unexp justify-between" onClick={() => toggleRow(ticker)}>
                        <td className="flex-1">
                            <div className="tableLeftSide">
                                <div className="tableImageContainer">
                                    <img src={require(`../../res/${ticker}.svg`)} alt={`${ticker} logo`}/>
                                </div>
                                <div className="tableNetworkWalletContainer text-md md:text-xl">
                                    <div className="networkContainer font-bold">{ticker}</div>
                                    <div className="numWalletsContainer">{wallets.length} Wallets</div>
                                </div>
                            </div>
                        </td>
                        <td className="pricePerTokenText justify-center gap-4 h-[100px] text-sm md:text-lg hidden sm:flex">
                            <div className="my-auto">${price.toFixed(2)}</div>
                            <div
                                className={`text-green flex my-auto ${totalLossGain < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                ${Math.abs(totalLossGain).toLocaleString(undefined, {
                                minimumFractionDigits: 2, maximumFractionDigits: 2
                            })}
                                {totalLossGain < 0 ? (
                                    <img className="h-4 w-4 my-auto ml-2" src={loss} alt="loss"/>) : (
                                    <img className="h-4 w-4 my-auto ml-2" src={profit} alt="profit"/>)}
                            </div>
                        </td>
                        <td className="rightSideTD">
                            <div className="totalContainer">
                                <div className="totalTextContainer text-sm md:text-lg ">
                                    <div className="totalAmountText">
                                        {totalAmount.toLocaleString(undefined, {
                                            minimumFractionDigits: 4, maximumFractionDigits: 4
                                        })} {ticker}
                                    </div>
                                    <div className="totalAmountUSDTText">
                                        ${totalAmountUSD.toLocaleString(undefined, {
                                        minimumFractionDigits: 2, maximumFractionDigits: 2
                                    })}
                                    </div>
                                </div>
                                <div className="expandButtonContainer ml-2 sm:ml-8">
                                    {expandedRow === ticker ? "▲" : "▼"}
                                </div>
                            </div>
                        </td>
                    </tr>
                    {expandedRow === ticker && wallets.map((wallet, index) => (
                        <tr key={index} className="expanded-row border border-gray-200">
                            <td className="walletAddressContainer">
                                <div className="text-sm md:text-lg">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={wallet.walletId === editingMode ? (newWalletName[wallet.walletId] !== undefined ? newWalletName[wallet.walletId] : wallet.walletName) : wallet.walletName}
                                            onChange={(e) => setNewWalletName((prev) => ({
                                                ...prev,
                                                [wallet.walletId]: e.target.value, // Update the specific wallet's name
                                            }))}
                                            onBlur={() => changeWalletName(wallet.walletId)} // Save changes on blur
                                            disabled={wallet.walletId !== editingMode} // Enable only for the editing wallet
                                            ref={(el) => (inputRefs.current[wallet.walletId] = el)} // Store ref for each wallet
                                            className="bg-[#fafafa] my-auto w-[90px] min-[400px]:w-[100px] sm:w-[150px]"
                                            size={20}
                                            maxLength={15}
                                        />
                                        <div className="w-fit my-auto m-1">
                                            <a className="w-fit h-fit block p-1 cursor-pointer"
                                               onClick={() => handleEditClick(wallet.walletId)}
                                            >
                                                <img
                                                    src={edit}
                                                    alt="edit"
                                                    className="w-[18px] h-[18px] hover:h-5 hover:w-5 ease-in-out transition-all mr-0"
                                                />
                                            </a>
                                        </div>

                                    </div>
                                    <div className="flex">
                                        <span
                                            className="h-fit my-auto w-[90px] min-[400px]:w-[100px] sm:w-[150px]">{wallet.walletId.substring(0, 4)} . . . {wallet.walletId.slice(-4)}</span>
                                        <div className="w-fit my-auto m-1">
                                            <a className="w-fit h-fit inline-block p-1 cursor-pointer"
                                               onClick={(e) => handleCopy(wallet.walletId)}
                                               title={wallet.walletName}>
                                                <img src={copy} alt="copy icon"
                                                     className="w-[18px] h-[18px] mr-0 ease-in-out transition-all hover:h-5 hover:w-5"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="amountInWalletContainer hidden sm:flex h-[120px] flex-1">
                                <div className="text-sm md:text-lg m-auto">
                                    Amount: {wallet.holdings.amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2
                                })}
                                </div>
                            </td>
                            <td className="usdInWalletContainer">
                                <div className="flex items-center ml-auto text-right w-full">
                                    <div className="text-sm md:text-lg w-fit ml-auto">
                                        ${wallet.holdings.amountUSD.toLocaleString(undefined, {
                                        minimumFractionDigits: 2, maximumFractionDigits: 2
                                    })}
                                    </div>
                                    <div className="my-auto cursor-pointer flex ml-2 sm:ml-8 w-fit text-right"
                                         onClick={() => handleDeleteWallet(wallet.walletId)}>
                                        <a className="w-fit">
                                            <img src={del} alt="delete icon"
                                                 className="w-[18px] h-[18px] mr-0 ease-in-out transition-all hover:h-[20px] hover:w-[20px]"/>
                                        </a>
                                    </div>
                                </div>
                            </td>
                        </tr>))}
                </React.Fragment>);
            })}
            </tbody>
        </table>
    </>);
};

export default PortfolioTable;
