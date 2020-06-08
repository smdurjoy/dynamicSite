import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import graphicsLogo from '../../asset/image/graphics.svg'
import webLogo from '../../asset/image/web.svg'
import mobileLogo from '../../asset/image/mobile.svg'
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
class Services extends Component {
    constructor() {
        super();
        this.state = {
            myData: [],
            loading: true
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Services).then(result => {
            this.setState({myData:result, loading:false})
        }).catch(error => {

        })
    }

    render() {
        if(this.state.loading == true) {
            return <Loader />
        } else {
            const myList = this.state.myData;
            const myView = myList.map(data => {
                return  <Col lg={4} md={6} sm={12}>
                    <div className="serviceCard text-center">
                        <img src={webLogo}/>
                        <h2 className="serviceName">{data.service_name}</h2>
                        <p className="serviceDescription">{data.service_description}</p>
                    </div>
                </Col>

            })
            return (
                <Fragment>
                    <Container className="text-center">
                        <h1 className="serviceMainTitle">OUR SERVICES</h1>
                        <Row>
                            {myView}
                        </Row>
                    </Container>
                </Fragment>
            );
        }
    }
}

export default Services;