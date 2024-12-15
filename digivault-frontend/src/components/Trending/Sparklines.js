import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Sparkline = ({ data }) => {
    const isUpward = data[data.length - 1] > data[0];
    return (
        <div>
            <Sparklines data={data}>
                <SparklinesLine color={isUpward ? "green" : "red"} />
            </Sparklines>
        </div>
    );
};

export default Sparkline;
