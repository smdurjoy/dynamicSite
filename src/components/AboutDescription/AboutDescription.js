import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class AboutDescription extends Component {
    constructor() {
        super();
        this.state = {
            aboutDes: "",
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Information).then(result => {
            this.setState({aboutDes: result[0]['about'], loading: false})
        }).catch(error => {
            this.setState({error:true, loading:false})
        })
    }

    render() {
        if(this.state.error == true) {
            return <WentWrong />
        } else {
            if(this.state.loading == true) {
                return <Loader />
            } else {
                return (
                    <Fragment>
                        <Container className="mt-5">
                            <Row>
                                <Col sm={12} lg={12} md={12}>
                                    { ReactHtmlParser(this.state.aboutDes) }
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                );
            }
        }
    }
}

export default AboutDescription;