import React from 'react';
import { 
    AreaChart, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer,
    Area
} from './../../../../components/recharts';

import colors from './../../../../colors';

const data = [
      {name: 'Page A', 수직형: 4000, 전통형: 2400, 생력형A: 2400, 생력형B: 2400},
      {name: 'Page B', 수직형: 3000, 전통형: 1398, 생력형A: 2210, 생력형B: 2211},
      {name: 'Page C', 수직형: 2000, 전통형: 9800, 생력형A: 2290, 생력형B: 2290},
      {name: 'Page D', 수직형: 2780, 전통형: 3908, 생력형A: 2000, 생력형B: 2000},
      {name: 'Page E', 수직형: 1890, 전통형: 4800, 생력형A: 2181, 생력형B: 2182},
      {name: 'Page F', 수직형: 2390, 전통형: 3800, 생력형A: 2500, 생력형B: 2503},
      {name: 'Page H', 수직형: 3490, 전통형: 4300, 생력형A: 2100, 생력형B: 2104},
      {name: 'Page I', 수직형: 4000, 전통형: 2400, 생력형A: 2400, 생력형B: 2406},
      {name: 'Page J', 수직형: 3000, 전통형: 1398, 생력형A: 2210, 생력형B: 2210},
      {name: 'Page K', 수직형: 2000, 전통형: 9800, 생력형A: 2290, 생력형B: 2290},
      {name: 'Page L', 수직형: 2780, 전통형: 3908, 생력형A: 2000, 생력형B: 2000},
];

const StackedAreaChart = () => (
    <ResponsiveContainer width='100%' aspect={6.0/3.0}>
        <AreaChart data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area dataKey='수직형' stackId="1" stroke={ colors['primary'] } fill={ colors['primary-03'] } />
            <Area dataKey='전통형' stackId="1" stroke={ colors['purple'] } fill={ colors['purple-03'] } />
            <Area dataKey='생력형A' stackId="1" stroke={ colors['success'] } fill={ colors['success-03'] } />
            <Area dataKey='생력형B' stackId="1" stroke={ colors['info'] } fill={ colors['info-03'] } />
        </AreaChart>
    </ResponsiveContainer>

)

export { StackedAreaChart };
