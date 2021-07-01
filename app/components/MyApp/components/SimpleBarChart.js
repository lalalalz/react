import React from 'react';
import { 
    BarChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Legend, 
    Bar
} from '../../recharts';

import colors from '../../../colors';

// const data = [
//       {name: 'max', 수직: 12, 전통: 44, 생력A: 27, 생력B: 23},
//       {name: 'min', 수직: 33, 전통: 24, 생력A: 31, 생력B: 11},
//       {name: 'avg', 수직: 33, 전통: 20, 생력A: 23, 생력B: 20},
// ];

const SimpleBarChart = ({data}) => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <BarChart 
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                contentStyle={{
                    background: colors['900'],
                    border: `1px solid ${colors['900']}`,
                    color: colors['white']
                }}
            />
            <Legend wrapperStyle={{ color: colors['900'] }}/>
            <Bar dataKey="vt"  fill={ colors['primary'] } barSize={ 5 } />
            <Bar dataKey="tr"  fill={ colors['purple'] }  barSize={ 5 } />
            <Bar dataKey="via" fill={ colors['info'] } barSize={ 5 } />
            <Bar dataKey="vib" fill={ colors['amazon'] } barSize={ 5 } />
        </BarChart>
    </ResponsiveContainer>

)

export { SimpleBarChart };
