import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

class ContactSection extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            email: '',
            phone: ''
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.Footer).then(result => {
            this.setState({
                address:result[0]['address'],
                email: result[0]['email'],
                phone: result[0]['phone']
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Container className="mt-5">
                    <Row>
                        <Col lg={6} md={6} sm={12}>
                            <h1 className="serviceName">Quick Connect</h1>

                            <Form>
                                <Form.Group>
                                    <Form.Label className="serviceDescription" >Name</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="serviceDescription" >Email Address</Form.Label>
                                    <Form.Control type="email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="serviceDescription" >Message</Form.Label>
                                    <Form.Control  as="textarea" rows="3" />
                                </Form.Group>


                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                        </Col>


                        <Col lg={6} md={6} sm={12}>
                            <h1 className="serviceName">Discuss Now</h1>
                            <p className="serviceDescription" >{this.state.address}</p>
                            <p className="serviceDescription" > <FontAwesomeIcon  icon={faEnvelope} /> {this.state.email}</p>
                            <p className="serviceDescription" > <FontAwesomeIcon  icon={faPhone} /> {this.state.phone}</p>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default ContactSection;