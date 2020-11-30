import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class PrivacyDescription extends Component {
    constructor() {
        super();
        this.state = {
            privacyDes: "",
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        const sessionPrivacyData = sessionStorage.getItem('privacyData');
        if(sessionPrivacyData == null) {
            RestClient.GetRequest(AppUrl.Information).then(result => {
                this.setState({privacyDes: result[0]['privacy'], loading:false})
                sessionStorage.setItem('privacyData', result[0]['privacy']);
            }).catch(err => {
                this.setState({error:true, loading:false})
            })
        }else {
            this.setState({privacyDes: sessionPrivacyData, loading:false})
        }
    }

    render() {
        if(this.state.error === true) {
            return <WentWrong />
        } else {
            if( this.state.loading === true ) {
                return <Loader />
            } else {
                return (
                    <Fragment>
                        <Container className="mt-5">
                            <Row>
                                <Col sm={12} lg={12} md={12}>
                                    <div className="serviceDescription">
                                        { ReactHtmlParser(this.state.privacyDes) }
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                );
            }
        }
    }
}

export default PrivacyDescription;