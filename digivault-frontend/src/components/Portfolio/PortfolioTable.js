import React, { useState } from "react";
import './PortfolioTable.css';
import profit from '../../res/profit.svg';
import loss from '../../res/loss.svg';

const PortfolioTable = ({ cryptoWallets }) => {
    // Group wallets by ticker

    const groupedWallets = cryptoWallets.reduce((acc, wallet) => {
        const holding = wallet.holdings; // Since holdings is now an object, not an array
        if (!acc[holding.ticker]) {
            acc[holding.ticker] = [];
        }
        acc[holding.ticker].push(wallet);
        return acc;
    }, {});

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = (ticker) => {
        setExpandedRow(expandedRow === ticker ? null : ticker);
    };

    return (
        <table className="rounded-2xl border border-black">
            <tbody>
            {Object.entries(groupedWallets).map(([ticker, wallets]) => {
                // Calculate totals
                const totalAmount = wallets.reduce((sum, wallet) =>
                    sum + wallet.holdings.amount, 0); // Adjusted for single holding
                const totalAmountUSD = wallets.reduce((sum, wallet) =>
                    sum + wallet.holdings.amountUSD, 0); // Adjusted for single holding

                const price = wallets[0].holdings.price;
                const lastPrice = wallets[0].holdings.lastPrice;
                const totalLossGain = (totalAmount * price) - (totalAmount * lastPrice);

                return (
                    <React.Fragment key={ticker}>
                        <tr className="tableRowContainer" onClick={() => toggleRow(ticker)}>
                            <td>
                                <div className="tableLeftSide">
                                    <div className="tableImageContainer">
                                        <img src={require(`../../res/${ticker}.svg`)} alt={`${ticker} logo`}/>
                                    </div>
                                    <div className="tableNetworkWalletContainer">
                                        <div className="networkContainer">{ticker}</div>
                                        <div className="numWalletsContainer">{wallets.length} Wallets</div>
                                    </div>
                                </div>
                            </td>
                            <td className="pricePerTokenText flex justify-center gap-4">
                                <div>${price.toFixed(2)}</div>
                                <div className={`text-green flex ${totalLossGain < 0 ? 'text-red-500' : 'text-green-500'}`}>${Math.abs(totalLossGain).toFixed(2)}
                                    {totalLossGain < 0 ? (<img className="h-4 w-4 my-auto ml-2" src={loss} alt="loss"/>) : (<img className="h-4 w-4 my-auto ml-2" src={profit} alt="profit"/>)}</div>
                            </td>
                            <td className="rightSideTD">
                                <div className="totalContainer">
                                    <div className="totalTextContainer">
                                        <div className="totalAmountText">{totalAmount.toFixed(4)} {ticker}</div>
                                        <div className="totalAmountUSDTText">${totalAmountUSD.toFixed(2)}</div>
                                    </div>
                                    <div className="expandButtonContainer">
                                        {expandedRow === ticker ? "▲" : "▼"}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {expandedRow === ticker && wallets.map((wallet, index) => (
                            <tr key={index} className="expanded-row">
                                <td className="walletAddressContainer">
                                    <div>
                                        Wallet: {wallet.walletId.substring(0, 4)} . . . {wallet.walletId.slice(-4)}
                                    </div>
                                </td>
                                <td className="amountInWalletContainer">
                                    <div>
                                        Amount: {wallet.holdings.amount.toFixed(4)}
                                    </div>
                                </td>
                                <td className="usdInWalletContainer">
                                    <div>
                                        USD: ${wallet.holdings.amountUSD.toFixed(2)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>
                );
            })}
            </tbody>
        </table>
    );
};

export default PortfolioTable;
