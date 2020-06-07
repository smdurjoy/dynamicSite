import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

class AllCourses extends Component {
    constructor() {
        super();
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.CourseAll).then(result => {
            this.setState({courses:result})
        }).catch(error => {

        })
    }

    render() {
        const myData = this.state.courses;
        const myView =  myData.map(data => {
            return  <Col lg={6} md={12} sm={12} className="p-2">
                <Row>
                    <Col lg={6} md={6} sm={12}>
                        <img className="courseImg" src={data.short_img}/>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <h5 className="text-justify courseTitle">{data.short_title}</h5>
                        <p className="text-justify courseDes">{data.short_des}</p>
                        <Link  className="courseDetails float-left" to={"/CourseDetails/"+data.id}>Details</Link>
                    </Col>
                </Row>
            </Col>
        })
        return (
            <Fragment>
                <Container className="text-center mt-5">
                    <Row>
                        {myView}
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default AllCourses;