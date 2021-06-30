import axios from 'axios';
import moment from 'moment';
import { data } from './dataform';
import { makeAutoObservable, makeObservable, observable, action, runInAction, _getAdministration} from 'mobx';

async function getData(farmID) {

    const response = await axios.post('http://localhost:1235/api/env', {
        farm_id: farmID
    })

    if (response) {
        runInAction(() => {
            this.envData.vtsf.humi = parseFloat(response.data.payload[0].HUMID);
            this.envData.vtsf.temp = parseFloat(response.data.payload[0].TEMP);
            this.envData.vtsf.co2  = parseFloat(response.data.payload[0].CO2);
            this.envData.vtsf.time = moment().format('YYYY-MM-DD hh:mm:ss');
        })
    }
}

class EnvStore {

    envData = data;

    constructor() {
        makeObservable(this, {
            envData  : observable,
        });
        setInterval(getData.bind(this, 1), 2000);
    }
}


export default EnvStore;