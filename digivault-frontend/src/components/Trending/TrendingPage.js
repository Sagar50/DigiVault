import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Sparkline from "./Sparklines";

const TrendingPage = () => {
    const [cryptos, setCryptos] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const fetchCryptoData = async (page, rowsPerPage) => {
        try {
            const response = await axios.get(`/api/getCryptoData?page=${page}&numRows=${rowsPerPage}`); // Pass rows as the query param
            setCryptos(response.data);
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
    };


    useEffect(() => {
        fetchCryptoData(page, rowsPerPage);
    }, [page, rowsPerPage]); // Dependencies are page and rowsPerPage

    const handleRowChange = (rows) => {
        setRowsPerPage(rows); // Just update rows per page state
        setPage(1); // Reset to page 1 when rows per page change
    };



    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

    return (<div className="container mx-auto p-4 flex flex-1 flex-col">
        <div className="stick flex justify-between py-4">
            <h1 className="!m-0 text-lg font-bold mb-6 min-[524px]:text-2xl">Trending Cryptocurrencies</h1>
            <div className="inline-flex items-center gap-2">
                <div className="text-xs leading-4 text-gray-500 font-regular">Rows:</div>
                <div>
                    <select
                        className="bg-gray-200 hover:bg-gray-300 items-center justify-center font-semibold text-inline rounded-lg select-none focus:outline-none px-2.5 py-1.5 inline-flex transition-all duration-200 ease-in-out transform"
                        onChange={(e) => handleRowChange(e.target.value)} // Replace with your handler function
                        defaultValue={15} // Default value
                    >
                        <option
                            className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center py-3 px-2 rounded-lg font-semibold text-gray-700 text-sm"
                            value={15}>15
                        </option>
                        <option
                            className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center py-3 px-2 rounded-lg font-semibold text-gray-700 text-sm"
                            value={25}>25
                        </option>
                        <option
                            className="cursor-pointer hover:bg-gray-100 hover:text-gray-900 flex items-center py-3 px-2 rounded-lg font-semibold text-gray-700 text-sm"
                            value={50}>50
                        </option>
                    </select>
                </div>
            </div>

        </div>
        {/*overflow-x-auto*/}
        <div className="2lg:overflow-x-visible 2lg:flex 2lg:justify-center">
            <table
                className="border-y border-gray-200 divide-y divide-gray-200 [&>tbody:first-of-type]:!border-t-0 sortable mx-auto sm:w-full">
                <thead className="sticky top-px z-[2]">
                <tr className="bg-white text-left">
                    <th className="sticky left-[24px] md:min-w-[48px] py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap text-right bg-white">#</th>
                    <th className="sticky left-[51px] md:left-[72px] min-w-[122px] 2lg:min-w-[220px] py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">Coin</th>
                    <th className="text-right indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap  bg-white">Price</th>
                    <th className="hidden xl:table-cell text-right min-w-[70px] indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">1h</th>
                    <th className="hidden xl:table-cell text-right min-w-[70px] indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">24h</th>
                    <th className="hidden xl:table-cell text-right min-w-[70px] indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">7d</th>
                    <th className="hidden md:table-cell text-right min-w-[150px] indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">24h
                        Volume
                    </th>
                    <th className="hidden min-[524px]:table-cell text-end min-w-[150px] indicator-left py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">Market
                        Cap
                    </th>
                    <th className="hidden sm:table-cell text-end min-w-[160px] pr-2 no-sort py-3 px-1 2lg:pl-2.5 font-semibold text-xs text-gray-900 whitespace-nowrap bg-white">Last
                        7 Days
                    </th>

                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 min-w-full">
                {cryptos.map((crypto, index) => (<tr key={crypto.id}
                                                     className="hover:bg-gray-50 bg-white text-sm">
                    <td className="sticky 2lg:static left-[24px] px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900 text-end">{index + 1 + (page - 1) * rowsPerPage}</td>
                    <td className="sticky 2lg:static left-[51px] md:left-[72px] px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                        <div className="flex items-center w-full">
                            <img src={crypto.img} alt={crypto.name}
                                 className="mr-2 !h-6 w-6 object-fill"/>
                            <div className="flex flex-col 2lg:flex-row items-start 2lg:items-center">
                                {crypto.name} ({crypto.symbol.toUpperCase()})
                            </div>

                        </div>
                    </td>
                    <td className="text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                        <span> ${
                            crypto.current_price >= 1
                                ? crypto.current_price.toLocaleString('en-us', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                })
                                : crypto.current_price.toLocaleString('en-us', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 6
                                })
                        }</span>
                    </td>
                    <td className="hidden xl:table-cell text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                  <span className={crypto.hourVolumeChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                    <i className={`fas fa-fw ${crypto.hourVolumeChange >= 0 ? 'fa-caret-up' : 'fa-caret-down'}`}>
                      <span className="ml-1">{Math.abs(crypto.hourVolumeChange).toFixed(1)}%</span>
                    </i>
                  </span>
                    </td>

                    <td className="hidden xl:table-cell text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                  <span className={crypto.dayVolumeChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                    <i className={`fas fa-fw ${crypto.dayVolumeChange >= 0 ? 'fa-caret-up' : 'fa-caret-down'}`}>
                      <span className="ml-1">{Math.abs(crypto.dayVolumeChange).toFixed(1)}%</span>
                    </i>
                  </span>
                    </td>

                    <td className="hidden xl:table-cell text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                  <span className={crypto.sevenDayVolumeChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                    <i className={`fas fa-fw ${crypto.sevenDayVolumeChange >= 0 ? 'fa-caret-up' : 'fa-caret-down'}`}>
                      <span className="ml-1">{Math.abs(crypto.sevenDayVolumeChange).toFixed(1)}%</span>
                    </i>
                  </span>
                    </td>

                    <td className="hidden md:table-cell text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                        <span>${crypto.day_volume.toLocaleString()}</span>
                    </td>
                    <td className="hidden min-[524px]:table-cell text-end px-1 py-2.5 2lg:p-2.5 bg-inherit text-gray-900">
                        <span>{crypto.market_cap === 0.0 ? "N/A" : crypto.market_cap.toLocaleString()}</span>
                    </td>
                    <td className="hidden sm:table-cell">
                        <Sparkline data={crypto.sparkline}/>
                    </td>
                </tr>))}
                </tbody>
            </table>
        </div>
        <div className="flex my-4 mx-auto gap-4">
            <button onClick={handlePrevPage} disabled={page === 1}>
                <i className="fas fa-angle-left cursor-pointer inline-block before:align-middle rounded-lg px-4 py-2 h-8 text-gray-900 hover:bg-gray-50"></i>
            </button>
            <span className="my-auto">Page <input
                className="bg-gray-200 hover:bg-gray-300 items-center justify-center font-semibold text-inline rounded-lg select-none focus:outline-none px-2.5 py-1.5 inline-flex transition-all duration-200 ease-in-out transform w-[30px]"
                defaultValue={page} value={page} onChange={(e) => {
                setPage(e.target.value)
            }}/> </span>
            <button onClick={handleNextPage}>
                <i className="fas fa-angle-right cursor-pointer inline-block before:align-middle rounded-lg px-4 py-2 h-8 text-gray-900 hover:bg-gray-50"></i>
            </button>
        </div>
    </div>);
};

export default TrendingPage;
