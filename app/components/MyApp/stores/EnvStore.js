import axios from 'axios';
import moment from 'moment';
import { dataForm } from './dataform';
import { makeAutoObservable, makeObservable, observable, action, runInAction, _getAdministration} from 'mobx';
import { observerBatching } from 'mobx-react';


async function getTrendData() {

    let   temp     = [[],[],[],[]];
    let   humi     = [[],[],[],[]];
    let   cabd      = [[],[],[],[]];
    let   time     = [[],[],[],[]];

    const response = await axios.post('http://localhost:1235/api/env/avg-hour', {
        farm_id    : 0,
        start_date : '20210630',
        end_date   : '20210630'
    })
    
    if(!response)  return;
    
    console.log(response.data.payload[0].HUMID);

    for(let idx = 0; idx < response.data.payload.length; ++idx) {

        temp[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].TEMP);
        humi[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].HUMID);
        cabd[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].CO2);
        time[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].TIME);
           
    }

    console.log(cabd);

    for(let idx = 1; idx < 4; ++idx) {
        if(temp[idx].length != temp[idx-1].length)  return;
        // if(humi[idx].length != humi[idx-1].length)  return;
        // if(co2 [idx].length != co2 [idx-1].length)  return;
    }

    runInAction(() => {
        this.temp.length = 0;
        this.humi.length = 0;
        this.cabd.length = 0;

        for(let idx = 0; idx < temp[0].length; ++idx) {
            this.temp.push({name : time[0][idx], "vt" : temp[0][idx], "tr" : temp [1][idx], "via" : temp[2][idx], "vib" : temp[3][idx]});
            this.humi.push({name : time[0][idx], "vt" : humi[0][idx], "tr" : humi [1][idx], "via" : humi[2][idx], "vib" : humi[3][idx]});
            this.cabd.push({name : time[0][idx], "vt" : cabd[0][idx], "tr" : cabd [1][idx], "via" : cabd[2][idx], "vib" : cabd[3][idx]});
        }
    });
}

async function getStatisticalData() {

    let temp_sts = [[],[],[],[]];
    let humi_sts = [[],[],[],[]];
    let cabd_sts = [[],[],[],[]];

    const response = await axios.post('http://localhost:1235/api/env/sts-day', {
        farm_id    : 0,
        start_date : '20210630',
        end_date   : '20210630'
    })
    
    if(!response)  return;

    for(let props of response.data.payload) {
        temp_sts[props.FARM_ID - 1].push(props.MAX_TEMP, props.MIN_TEMP, props.AVG_TEMP);
        humi_sts[props.FARM_ID - 1].push(props.MAX_HUMID, props.MIN_HUMID, props.AVG_HUMID);
        cabd_sts[props.FARM_ID - 1].push(props.MAX_CO2, props.MIN_CO2, props.AVG_CO2);
    }

    console.log("temp_sts", temp_sts);

    runInAction(() => {
        // this.temp_sts.length = 0;
        // this.humi_sts.length = 0;
        // this.cabd_sts.length = 0;
        
        this.temp_sts.push({name : 'max', vt : temp_sts[0][0], tr : temp_sts[1][0], via : temp_sts[2][0], vib : temp_sts[3][0]});
        this.humi_sts.push({name : 'min', vt : humi_sts[0][1], tr : humi_sts[1][1], via : humi_sts[2][1], vib : humi_sts[3][1]});
        this.cabd_sts.push({name : 'avg', vt : cabd_sts[0][2], tr : cabd_sts[1][2], via : cabd_sts[2][2], vib : cabd_sts[3][2]});
    });
}

class EnvStore {

    temp = [];
    humi = [];
    cabd = [];
    temp_sts = [];
    humi_sts = [];
    cabd_sts = [];
    

    constructor() {
        makeObservable(this, {
            temp : observable,
            humi : observable,
            cabd : observable,
            temp_sts : observable,
            humi_sts : observable,
            cabd_sts : observable,
            setting : action,
            setting2 : action
        });
        // setInterval(getTrendData.bind(this), 5000);
        // getStatisticalData();
        getStatisticalData.bind(this);
    }

    setting = getTrendData.bind(this);
    setting2 = getStatisticalData.bind(this);
}


export default EnvStore;