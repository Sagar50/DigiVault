import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Portfolio.css';
import PortfolioTable from "./PortfolioTable";
import refresh from "../../res/refresh.svg";
import exprt from '../../res/export.svg';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Portfolio = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [data, setData] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        fetchHoldings();
        const fetchLastUpdated = async () => {
            try {
                const lastUpdate = await axios.get(`${backendUrl}/api/db/lastUpdated/${username}`);
                setLastUpdated(formatDate(lastUpdate.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchLastUpdated();

    }, [lastUpdated]);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'short', // e.g., "Thursday"
            year: 'numeric', // e.g., "2024"
            month: 'short', // e.g., "December"
            day: 'numeric', // e.g., "6"
            hour: '2-digit', // e.g., "03"
            minute: '2-digit', // e.g., "16"
            second: '2-digit', // e.g., "50"
            hour12: true, // 12-hour format with AM/PM
        });
    }

    const fetchHoldings = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/users/find/${username}`);
            setData(response.data);
            console.log(response.data);
        } catch {
            console.log('Holdings could not be fetched.');

        }
    };
    const updateHoldings = async () => {
        try {
            const response = await axios.put(`${backendUrl}/api/db/updatePortfolio/${username}`);
            setLastUpdated(formatDate(response.data));

        } catch {
            console.log('Holdings could not be updated.');
        }
    }

    const downloadUserData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/db/exportHoldings/${username}`, { responseType: 'blob' });

            // Create a URL for the blob data
            const url = window.URL.createObjectURL(response.data);

            // Create an anchor element and trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'user_data.csv';
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor and revoking the URL
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    return (
        <div className="portfolioWrapper gap-y-3 mt-2">
            <div className="sm:flex justify-between">
                <h2 className="text-xl sm:text-3xl ml-[12px] mb-4 sm:mb-0">{username.charAt(0).toUpperCase() + username.slice(1)}'s Crypto Holdings:</h2>
                <button className="border border-[#6bbede] bg-[#6bbede] text-white text-sm sm:text-lg py-2 px-4 rounded-2xl font-semibold" onClick={downloadUserData}>
                    <img className="inline w-5 h-5" src={exprt} alt="export holding data" />
                    Export Data</button>
            </div>

            <div className="flex gap-x-4 ml-[12px] text-sm sm:text-lg">
                <p className="">Last Updated -</p>
                <p className="">{lastUpdated}</p>
                <img src={refresh} alt="refresh" className="h-4 w-4 my-auto cursor-pointer hover:h-5 hover:w-5 transition-all ease-linear" onClick={updateHoldings}/>
            </div>
            {data && <PortfolioTable cryptoWallets={data["cryptoWallets"]} />}
        </div>
    );
};

export default Portfolio;
