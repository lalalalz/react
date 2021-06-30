import { runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import _EnvStore from './stores/EnvStore';

const EnvStore = new _EnvStore();

const MyApp = observer(() => {

    const { envData } = EnvStore;

    return (
        <div>
            <p>{envData.vtsf.temp}</p>
            <p>{envData.vtsf.humi}</p>
            <p>{envData.vtsf.co2}</p>
            <p>{envData.vtsf.time}</p>
        </div>
    )
})


export default MyApp;