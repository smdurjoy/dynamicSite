import React, {Component,Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {BarChart, Bar, ResponsiveContainer, XAxis, Tooltip} from "recharts";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';
import Loader from "../Loader/Loader";

class Analysis extends Component {

    constructor(){
        super();
        this.state={
            data:[],
            techDescription: '',
            loading: true
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.ChartData).then(result => {
            this.setState({data:result, loading: false})
        }).catch(error => {

        })

        RestClient.GetRequest(AppUrl.TechDesc).then(result => {
            this.setState({techDescription:result[0]['tech_description'], loading: false})
        }).catch(error => {

        })
    }

    render() {
        if(this.state.loading == true) {
            return <Loader />
        } else {
            let blue="rgba(0,115,230,0.8)"
            return (
                <Fragment>
                    <Container className="text-center">
                        <h1 className="serviceMainTitle">Technology Used</h1>
                        <Row>
                            <Col style={{width:'100%', height:'300px'}} lg={6} md={12} sm={12}>
                                <ResponsiveContainer>
                                    <BarChart width={100} height={300} data={this.state.data}>
                                        <XAxis dataKey="technology"/>
                                        <Tooltip/>
                                        <Bar dataKey="skill" fill={blue} >
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Col>

                            <Col lg={6} md={12} sm={12}>
                                <p className="text-justify des">
                                    { ReactHtmlParser(this.state.techDescription) }
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            );
        }
    }
}

export default Analysis;