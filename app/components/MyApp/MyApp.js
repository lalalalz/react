import React, { Component } from 'react';

import { SimpleLineChart } from './components/SimpleLineChart';
import { SimpleBarChart } from './components/SimpleBarChart';
import { Container, CardDeck, Card, CardBody, Row, Col, CardTitle, Table } from 'reactstrap';
import { HeaderMain } from '../../routes/components/HeaderMain';
import { HeaderDemo } from '../../routes/components/HeaderDemo';
import { TrTableResponsive } from "./components/TrTableResponsive";
import { observer } from 'mobx-react';
import _stores from './stores/EnvStore';
import { toJS } from 'mobx';
import DatePicker from 'react-datepicker';
import { ButtonInput } from '../../routes/Forms/DatePicker/components';

const store = new _stores();

const MyApp = observer(() => {
    
    const { temp, ec, humi, cabd, ec_sts, temp_sts, humi_sts, cabd_sts, selected_date } = toJS(store);
    const { setting, setting2 } = store;

    const handleDateChange = (selected_date) => {
        setting(selected_date);
        setting2(selected_date);
    }

    console.log("temp_sts", temp_sts);

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <p></p>
                </Col>
                <Col lg={9}>
                    <HeaderMain
                        title="Daily Report"
                        className="mb-4 mt-4"
                    />
                    <p>
                        Welcome to the Smart Farm Daily Report page.
                    </p>
                    <HeaderDemo
                        no={1}
                        title="System Status"
                        subTitle={(
                            <React.Fragment>
                                This sector indicates the current system status of the smart farm.
                            </React.Fragment>
                        )}
                    />
                </Col>
                <Col>
                    <DatePicker 
                        inline
                        selected={selected_date}
                        onChange={handleDateChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Card className="mb-3">
                        <CardBody>
                            <CardTitle tag="h6">
                                Table Responsive
                                <span className="small ml-1 text-muted">
                                    #2.01
                                </span>
                            </CardTitle>
                            <p className="mb-0">
                                Responsive tables allow tables to be scrolled horizontally with ease.
                                Make any table responsive across all viewports by wrapping a <code>Table</code> with <code>responsive</code>.
                            </p>
                        </CardBody>
                        { /* START Table */}
                        <Table className="mb-0" responsive>
                            <thead>
                                <tr>
                                    <th className="bt-0">Status</th>
                                    <th className="bt-0">Device</th>
                                    <th className="bt-0">Ip</th>
                                    <th className="bt-0">Location</th>
                                    <th className="bt-0">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TrTableResponsive />
                            </tbody>
                        </Table>
                        { /* END Table */}
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <HeaderDemo
                        no={2}
                        title="Trend data"
                        subTitle={(
                            <React.Fragment>
                                This sector shows the daily progress data of each smart farm, representing the data at intervals of two hours. 
                            </React.Fragment>
                        )}
                    />
                </Col>
            </Row>
            <CardDeck>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    Temperature
                                    <span className="small ml-1 text-muted">
                                        #1.01
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleLineChart data={temp}></SimpleLineChart>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    Humidity
                                    <span className="small ml-1 text-muted">
                                        #1.02
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleLineChart data={humi}></SimpleLineChart>
                    </CardBody>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    CO2
                                    <span className="small ml-1 text-muted">
                                        #1.03
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleLineChart data={cabd}></SimpleLineChart>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    NONE
                                    <span className="small ml-1 text-muted">
                                        #1.04
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleLineChart data={null}></SimpleLineChart>
                    </CardBody>
                </Card>
            </CardDeck>
            <p></p>
            <Row>
                <Col lg={12}>
                    <HeaderDemo
                        no={3}
                        title="Statistical Data"
                        subTitle={(
                            <React.Fragment>
                                This sector shows the daily statistical data of each smart farm, representing the maximum, minimum, and average values on the graph.
                            </React.Fragment>
                        )}
                    />
                </Col>
            </Row>
            <CardDeck>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    Temperature
                                    <span className="small ml-1 text-muted">
                                        #2.01
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleBarChart data={temp_sts}></SimpleBarChart>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    Humidity
                                    <span className="small ml-1 text-muted">
                                        #2.02
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleBarChart data={humi_sts}></SimpleBarChart>
                    </CardBody>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    CO2
                                    <span className="small ml-1 text-muted">
                                        #2.03
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleBarChart data={cabd_sts}></SimpleBarChart>
                    </CardBody>
                </Card>
                <Card className="mb-3">
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h6 className="card-title mb-1">
                                    NONE
                                    <span className="small ml-1 text-muted">
                                        #2.04
                                    </span>
                                </h6>
                                <p></p>
                            </div>
                        </div>
                        <SimpleBarChart data={null}></SimpleBarChart>
                    </CardBody>
                </Card>
            </CardDeck>
            <p></p>
            <Row>
                <Col lg={12}>
                    <HeaderDemo
                        no={4}
                        title="Event Table"
                        subTitle={(
                            <React.Fragment>
                                This sector shows the daily statistical data of each smart farm, representing the maximum, minimum, and average values on the graph.
                            </React.Fragment>
                        )}
                    />
                </Col>
            </Row>
        </Container>
    );
})

export default MyApp;