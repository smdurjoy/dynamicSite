import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {faFacebook,faYoutube} from "@fortawesome/free-brands-svg-icons";
import {Link, NavLink} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";

class Footer extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            email: '',
            phone: '',
            facebook: '',
            youtube: '',
            footerCredit: '',
            loaderClass: "text-center",
            mainDivClass: "d-none"
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Footer).then(result => {
            this.setState({
                address:result[0]['address'],
                email: result[0]['email'],
                phone: result[0]['phone'],
                facebook: result[0]['facebook'],
                youtube: result[0]['youtube'],
                footerCredit: result[0]['footer_credit'],
                loaderClass:"d-none",
                mainDivClass:"p-5 text-justify"
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Container fluid={true} className="text-center footerSection">
                    <Row>
                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h1 className="serviceName">Follow Me</h1>
                            <a className="socialLink" target={null} href={this.state.facebook}><FontAwesomeIcon  icon={faFacebook} /> Facebook</a><br/>
                            <a className="socialLink" href={this.state.youtube}><FontAwesomeIcon  icon={faYoutube} /> YouTube</a>
                        </Col>
                        <Col lg={3} md={6} sm={12} className={this.state.loaderClass}>
                            <h1 className="serviceName">Address</h1>
                            <Loader />
                        </Col>
                        <Col lg={3} md={6} sm={12} className={this.state.mainDivClass}>
                            <h1 className="serviceName">Address</h1>
                            <p className="serviceDescription"> {this.state.address} </p>
                            <p className="serviceDescription" > <FontAwesomeIcon  icon={faEnvelope} /> {this.state.email} </p>
                            <p className="serviceDescription" > <FontAwesomeIcon  icon={faPhone} /> {this.state.phone} </p>
                        </Col>
                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h1 className="serviceName">Information</h1>
                            <Link className="footerLink" to="/about">About Me</Link><br/>
                            <Link className="footerLink" to="/contact">Contact Me</Link>
                        </Col>
                        <Col lg={3} md={6} sm={12} className="p-5 text-justify">
                            <h1 className="serviceName">Legal</h1>
                            <Link className="footerLink" to="/Refund">Refund Policy</Link><br/>
                            <Link className="footerLink" to="/Terms">Terms And Condition</Link><br/>
                            <Link  className="footerLink" to="/Privacy">Privacy Policy</Link >
                        </Col>
                    </Row>
                </Container>

                <Container fluid={true} className="text-center copyrightSection">
                    <a className="copyrightLink" href="https://smdurjoy.netlify.app"> {this.state.footerCredit} </a>
                </Container>

            </Fragment>
        );
    }
}

export default Footer;