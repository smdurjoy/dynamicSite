import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';

class PrivacyDescription extends Component {
    constructor() {
        super();
        this.state = {
            privacyDes: ""
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Information).then(result => {
            this.setState({privacyDes: result[0]['privacy']})
        }).catch(err => {

        })
    }

    render() {
        return (
            <Fragment>
                <Container className="mt-5">
                    <Row>
                        <Col sm={12} lg={12} md={12}>
                            <p className="serviceDescription">
                                { ReactHtmlParser(this.state.privacyDes) }
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default PrivacyDescription;