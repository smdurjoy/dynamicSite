import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class ContactSection extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            email: '',
            phone: '',
            loaderClass: "",
            mainDivClass: "d-none",
            error: false
        }
    }

    componentDidMount() {
        const sessionFooterData = sessionStorage.getItem('FooterData');
        if(sessionFooterData == null) {
            RestClient.GetRequest(AppUrl.Footer).then(result => {
                const jsonData = (result)[0];
                this.setState({
                    address:result[0]['address'],
                    email: result[0]['email'],
                    phone: result[0]['phone'],
                    loaderClass:"d-none",
                    mainDivClass:""
                })
                sessionStorage.setItem('FooterData', JSON.stringify(jsonData));
            }).catch(error => {
                this.setState({error:true, loading:false})
            })
        } else {
            const footerDataJSON = JSON.parse(sessionFooterData);
            this.setState({
                address:footerDataJSON['address'],
                email: footerDataJSON['email'],
                phone: footerDataJSON['phone'],
                loaderClass:"d-none",
                mainDivClass:""
            })
        }
    }

    sendContact(){
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const contactForm = document.getElementById("contactForm");
        const submitContact = document.getElementById("submitContact");
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameRegex = /^[a-zA-Z ]+$/;

        if(name.length === 0) {
            alert('Please Enter Your Name !')
        }
        else if(!(nameRegex.test(name))) {
            alert('Please Enter a Valid Name !')
        }
        else if(email.length === 0) {
            alert('Please Enter Your Email Address !')
        }
        else if(!(emailRegex.test(String(email).toLowerCase()))) {
            alert('Please Enter a Valid Email Address !')
        }
        else if(message.length === 0) {
            alert('Please Enter Your Message !')
        }
        else {
            const jsonObject={name:name, email:email, message:message};
            submitContact.innerText = 'Sending ...';
            submitContact.disabled = true;
    
            RestClient.PostRequest(AppUrl.ContactSend,JSON.stringify(jsonObject)).then(result => {
                if(result === 1) {
                    submitContact.innerText = 'Send';
                    submitContact.disabled = false;
                    contactForm.reset();
                    alert('Message Send Successfully')
                } else {
                    submitContact.innerText = 'Send';
                    submitContact.disabled = false;
                    alert('Something Went Wrong !')
                }
            }).catch(error => {
                submitContact.innerText = 'Send';
                submitContact.disabled = false;
                alert("Error");
            })
        }
    }

    render() {
        if(this.state.error === true) {
            return <WentWrong />
        } else {
            return (
                <Fragment>
                    <Container className="mt-5">
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <h1 className="serviceName">Quick Connect</h1>

                                <Form id="contactForm">
                                    <Form.Group>
                                        <Form.Label className="serviceDescription" >Name</Form.Label>
                                        <Form.Control id="name" type="text" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="serviceDescription" >Email Address</Form.Label>
                                        <Form.Control id="email" type="email" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="serviceDescription" >Message</Form.Label>
                                        <Form.Control id="message" as="textarea" rows="3" />
                                    </Form.Group>


                                    <Button variant="primary" id="submitContact" onClick={this.sendContact}>
                                        Send
                                    </Button>
                                </Form>

                            </Col>

                            <Col lg={6} md={6} sm={12} className={this.state.loaderClass}>
                                <h1 className="serviceName">Discuss Now</h1>
                                <Loader />
                            </Col>

                            <Col lg={6} md={6} sm={12} className={this.state.mainDivClass}>
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
}

export default ContactSection;