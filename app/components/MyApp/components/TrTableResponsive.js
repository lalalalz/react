import React from 'react';
import faker from 'faker/locale/en_US';
import _ from 'lodash';

import { 
    UncontrolledTooltip,
    Media
} from '../../../components';
import moment from 'moment';

/*eslint-disable */
const browserOs = [
    "Safari",
    "Firefox",
    "Opera",
    "Chrome"
];
/*eslint-enable */
/*eslint-disable */
const browserIcon = [
    "desktop",
    "laptop",
    "mobile",
    "tablet"
];
/*eslint-enable */
/*eslint-disable */
const colorStatus = [
    "danger",
    "success",
    "warning",
    "secondary"
];
/*eslint-enable */

const TrTableResponsive = () => (
    <React.Fragment>
        {
            _.times(5, (index) => (
                <tr key={ index }>
                    {/* color & status */}
                    <td className="align-middle">
                        <i className={`fa fa -fw fa-circle text-${ colorStatus[index] }`}></i>
                    </td>
                    {/* Node & master */}
                    <td className="align-middle">
                        <Media>
                            <Media left className="align-self-center mr-3">
                                <i className={`fa fa-fw fa-${ browserIcon[index] } fa-lg`}></i>
                            </Media>
                            <Media body>
                                <div className="mt-0 d-flex">
                                    <span className="text-inverse">
                                        { browserOs[index] } 
                                    </span>
                                </div>
                                <span>
                                    {"Master 95.0.1v"}
                                </span>
                            </Media>
                        </Media>
                    </td>
                    {/* ip */}
                    <td className="align-middle">
                        <div>
                            <samp>
                                { "000.000.000.000" }
                            </samp>
                        </div>
                        <span>
                            -
                        </span>
                    </td>
                    {/* location */}
                    <td className="align-middle"> 
                        <div>
                            { "Korea" }
                        </div>
                        <span>
                            { "Gyeonggi-do" }, { "Goyang-si" }
                        </span>
                    </td>
                    {/* Update */}
                    <td className="align-middle">
                        { moment().format('DD MM YYYY') }<br />
                        12:34 PM
                    </td>
                    {/* action
                    <td className="align-middle text-right">
                        <a href="#" id="UncontrolledTooltipRevoke">
                            <i className="fa fa-fw fa-spinner fa-spin text-success"></i>
                        </a>
                    </td> */}
                </tr>
            ))
        }
    </React.Fragment>
)

export { TrTableResponsive };
