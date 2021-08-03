import axios from 'axios';
import moment from 'moment';
import { dataForm } from './dataform';
import { makeAutoObservable, makeObservable, observable, action, runInAction, _getAdministration} from 'mobx';
import { observerBatching } from 'mobx-react';


async function getTrendData(selected_date) {

    let   temp     = [[],[],[],[]];
    let   humi     = [[],[],[],[]];
    let   cabd      = [[],[],[],[]];
    let   time     = [[],[],[],[]];
    let   ec       = [[],[],[],[]];

    const response = await axios.post('http://gssiot.iptime.org:7777/api/env/avg-hour', {
        farm_id    : 0,
        start_date : moment(selected_date).format('YYYYMMDD'),
        end_date   : moment(selected_date).format('YYYYMMDD')
    })
    
    if(!response)  return;

    for(let idx = 0; idx < response.data.payload.length; ++idx) {

        if(response.data.payload[idx].FARM_ID > 4)  continue;

        temp[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].TEMP);
        humi[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].HUMID);
        cabd[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].CO2);
        ec[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].CO2);
        time[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].TIME);
    }

    // for(let idx = 1; idx < temp.length; ++idx) {
    //     if(temp[idx].length != temp[idx-1].length)  return;
    //     // if(humi[idx].length != humi[idx-1].length)  return;
    //     // if(co2 [idx].length != co2 [idx-1].length)  return;
    // }

    runInAction(() => {

        this.temp.length = 0;
        this.humi.length = 0;
        this.cabd.length = 0;
        this.ec.length = 0;

        for(let idx = 0; idx < temp[0].length; ++idx) {
            this.temp.push({name : time[0][idx], "vt" : temp[0][idx], "tr" : temp [1][idx], "via" : temp[2][idx], "vib" : temp[3][idx]});
            this.humi.push({name : time[0][idx], "vt" : humi[0][idx], "tr" : humi [1][idx], "via" : humi[2][idx], "vib" : humi[3][idx]});
            this.cabd.push({name : time[0][idx], "vt" : cabd[0][idx], "tr" : cabd [1][idx], "via" : cabd[2][idx], "vib" : cabd[3][idx]});
            this.ec.push({name : time[0][idx], "vt" : ec[0][idx], "tr" : ec[1][idx], "via" : ec[2][idx], "vib" : ec[3][idx]});
        }
    });
}

async function getStatisticalData(selected_date) {

    let temp_sts = [[],[],[],[]];
    let humi_sts = [[],[],[],[]];
    let cabd_sts = [[],[],[],[]];
    let ec_sts = [[],[],[],[]];

    const response = await axios.post('http://gssiot.iptime.org:7777/api/env/sts-day', {
        farm_id    : 0,
        start_date : moment(selected_date).format('YYYYMMDD'),
        end_date   : moment(selected_date).format('YYYYMMDD')
    })
    
    if(!response)  return;

    console.log(response);

    for(let idx = 0; idx < response.data.payload.length; ++idx) {

        if(response.data.payload[idx].FARM_ID > 4) continue;
        
        temp_sts[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].MAX_TEMP, response.data.payload[idx].MIN_TEMP, response.data.payload[idx].AVG_TEMP);
        humi_sts[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].MAX_HUMID, response.data.payload[idx].MIN_HUMID, response.data.payload[idx].AVG_HUMID);
        cabd_sts[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].MAX_CO2, response.data.payload[idx].MIN_CO2, response.data.payload[idx].AVG_CO2);
        ec_sts[response.data.payload[idx].FARM_ID - 1].push(response.data.payload[idx].MAX_CO2, response.data.payload[idx].MIN_CO2, response.data.payload[idx].AVG_CO2);
    }

    runInAction(() => {

        this.temp_sts.length = 0;
        this.humi_sts.length = 0;
        this.cabd_sts.length = 0;
        this.ec_sts.length   = 0;
        
        this.temp_sts.push({name : 'max', vt : temp_sts[0][0], tr : temp_sts[1][0], via : temp_sts[2][0], vib : temp_sts[3][0]});
        this.temp_sts.push({name : 'min', vt : temp_sts[0][1], tr : temp_sts[1][1], via : temp_sts[2][1], vib : temp_sts[3][1]});
        this.temp_sts.push({name : 'avg', vt : temp_sts[0][2], tr : temp_sts[1][2], via : temp_sts[2][2], vib : temp_sts[3][2]});

        this.humi_sts.push({name : 'max', vt : humi_sts[0][0], tr : humi_sts[1][0], via : humi_sts[2][0], vib : humi_sts[3][0]});
        this.humi_sts.push({name : 'min', vt : humi_sts[0][1], tr : humi_sts[1][1], via : humi_sts[2][1], vib : humi_sts[3][1]});
        this.humi_sts.push({name : 'avg', vt : humi_sts[0][2], tr : humi_sts[1][1], via : humi_sts[2][1], vib : humi_sts[3][1]});
        
        this.cabd_sts.push({name : 'max', vt : cabd_sts[0][0], tr : cabd_sts[1][0], via : cabd_sts[2][0], vib : cabd_sts[3][0]});
        this.cabd_sts.push({name : 'min', vt : cabd_sts[0][1], tr : cabd_sts[1][1], via : cabd_sts[2][1], vib : cabd_sts[3][1]});
        this.cabd_sts.push({name : 'avg', vt : cabd_sts[0][2], tr : cabd_sts[1][2], via : cabd_sts[2][2], vib : cabd_sts[3][2]});

        this.ec_sts.push({name : 'max', vt : ec_sts[0][0], tr : ec_sts[1][0], via : ec_sts[2][0], vib : ec_sts[3][0]});
        this.ec_sts.push({name : 'min', vt : ec_sts[0][1], tr : ec_sts[1][1], via : ec_sts[2][1], vib : ec_sts[3][1]});
        this.ec_sts.push({name : 'avg', vt : ec_sts[0][2], tr : ec_sts[1][2], via : ec_sts[2][2], vib : ec_sts[3][2]});
    });
}

class EnvStore {

    temp = [];
    humi = [];
    cabd = [];
    ec   = [];
    temp_sts = [];
    humi_sts = [];
    cabd_sts = [];
    ec_sts   = [];

    constructor() {
        makeObservable(this, {
            temp : observable,
            humi : observable,
            cabd : observable,
            temp_sts : observable,
            humi_sts : observable,
            cabd_sts : observable,
            ec : observable,
            ec_sts : observable,
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