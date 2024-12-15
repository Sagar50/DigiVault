import React, {useEffect, useRef} from 'react';

const CoinGeckoWidget = () => {
    const container = useRef();
    useEffect(()=> {
        const script = document.createElement('script');
        script.src = "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
        script.type = "text/javascript";
        script.async = true;
        container.current.appendChild(script);
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <div className="coinGeckoWidgetContainer h-fit w-[100%] !z-0" ref={container} onClick={handleClick}>
            <gecko-coin-price-marquee-widget locale="en" outlined="true"
                                             coin-ids="bitcoin,solana,ethereum,ripple,vechain,cardano,stellar,dogecoin,algorand,litecoin"
                                             initial-currency="usd"></gecko-coin-price-marquee-widget>
        </div>
    );
};

export default CoinGeckoWidget;
