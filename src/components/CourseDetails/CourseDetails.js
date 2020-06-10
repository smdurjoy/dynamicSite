import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {BigPlayButton, Player} from "video-react";
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let long_title = "";
        let total_lecture = "";
        let total_students = "";
        let long_des = "";
        let skill_all = "";
        let video_url = "";
        let course_link = "";
        let loading = true;

        let courseDetailsArray = this.props.courseData;
        if(courseDetailsArray.length == 1) {
            long_title = courseDetailsArray[0]['long_title']
            total_lecture = courseDetailsArray[0]['total_lecture']
            total_students = courseDetailsArray[0]['total_students']
            long_des = courseDetailsArray[0]['long_des']
            skill_all = courseDetailsArray[0]['skill_all']
            video_url = courseDetailsArray[0]['video_url']
            course_link = courseDetailsArray[0]['course_link']
            loading = false
        }
        if(loading ==  true) {
            return <Loader />
        } else {
            return (
                <Fragment>
                    <Container fluid={true} className="topFixedPage p-0" >
                        <div className="topPageOverlay">
                            <Container className="topPageContentCourse">
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <h3 className="CourseFullTitle">{long_title}</h3>
                                        <h5 className="CourseSubTitle">Total Lecture= {total_lecture}</h5>
                                        <h5 className="CourseSubTitle mt-0">Total Student= {total_students}</h5>
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <p className="CourseDes">{long_des}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Container>
                    <Container className="mt-5">
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <h1 className="serviceName">Skill You Get</h1>
                                <ul>
                                    { ReactHtmlParser(skill_all) }
                                </ul>
                                <Button variant="primary"><Link className="link-style" to={course_link}>Live Preview</Link></Button>
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <Player>
                                    <source src={video_url} />
                                    <BigPlayButton position="center"/>
                                </Player>
                            </Col>
                        </Row>
                    </Container>
                </Fragment>
            );
        }
    }
}

export default CourseDetails;