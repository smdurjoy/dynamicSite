import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {BigPlayButton, Player} from "video-react";
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import WentWrong from "../WentWrong/WentWrong";

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseData: [],
            myCourseId: props.courseId,
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.CourseDetails+this.state.myCourseId).then(result => {
            this.setState({
                long_title: result[0]['long_title'],
                total_lecture: result[0]['total_lecture'],
                total_students: result[0]['total_students'],
                long_des: result[0]['long_des'],
                skill_all: result[0]['skill_all'],
                video_url: result[0]['video_url'],
                course_link: result[0]['course_link'],
                loading: false
            })
        }).catch(error => {
            this.setState({error: true, loading:false})
        })
    }

    render() {
        if(this.state.error === true) {
            return <WentWrong />
        } else {
            if(this.state.loading === true) {
                return <Loader />
            } else {
                return (
                    <Fragment>
                        <Container fluid={true} className="topFixedPage p-0" >
                            <div className="topPageOverlay">
                                <Container className="topPageContentCourse">
                                    <Row>
                                        <Col sm={12} md={6} lg={6}>
                                            <h3 className="CourseFullTitle">{this.state.long_title}</h3>
                                            <h5 className="CourseSubTitle">Total Lecture= {this.state.total_lecture}</h5>
                                            <h5 className="CourseSubTitle mt-0">Total Student= {this.state.total_students}</h5>
                                        </Col>

                                        <Col sm={12} md={6} lg={6}>
                                            <p className="CourseDes">{this.state.long_des}</p>
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
                                        { ReactHtmlParser(this.state.skill_all) }
                                    </ul>
                                    <Button variant="primary"><Link className="link-style" to={this.state.course_link}>Live Preview</Link></Button>
                                </Col>

                                <Col sm={12} md={6} lg={6}>
                                    <Player>
                                        <source src={this.state.video_url} />
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
}

export default CourseDetails;