import React, {Component} from 'react';
import {Row, Col, Breadcrumb, Table, Button} from 'react-bootstrap';
import * as Icon from 'react-feather';


class StrippedTable extends Component {
    render() {
        return (
            <div className="page-wrapper">
                {/* Striped Rows Table */}
                <Row>
                        <Col xl={12}>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="card-header">
                                        <h5 className="card-title">Striped Rows Table</h5>
                                    </div>
                                    
                                    <Table responsive hover striped className="m-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date</th>
                                                <th className="text-center">Pages / Visit</th>
                                                <th className="text-center">New user</th>
                                                <th className="text-center">Last week</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>02.01.2019</td>
                                                <td className="text-center">5000</td>
                                                <td className="text-center">1000</td>
                                                <td className="text-center">4500</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>02.02.2019</td>
                                                <td className="text-center">5400</td>
                                                <td className="text-center">1400</td>
                                                <td className="text-center">4700</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>02.03.2019</td>
                                                <td className="text-center">5500</td>
                                                <td className="text-center">1400</td>
                                                <td className="text-center">7600</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>02.04.2019</td>
                                                <td className="text-center">7400</td>
                                                <td className="text-center">4500</td>
                                                <td className="text-center">8700</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>02.05.2019</td>
                                                <td className="text-center">7600</td>
                                                <td className="text-center">2300</td>
                                                <td className="text-center">5400</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* End Striped Rows Table */}
            </div>
            )
        }
}

export default StrippedTable;