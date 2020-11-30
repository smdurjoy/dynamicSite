import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class AllCourses extends Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        const allCourseData = sessionStorage.getItem('allCourses');
        if(allCourseData == null) {
            RestClient.GetRequest(AppUrl.CourseAll).then(result => {
                if(result == null) {
                    this.setState({error:true, loading:false })
                }
                this.setState({courses:result, loading: false})
                sessionStorage.setItem('allCourses', JSON.stringify(result));
            }).catch(error => {
                this.setState({error:true, loading:false})
            })
        } else {
            const allCourseJSON = JSON.parse(allCourseData);
            this.setState({courses:allCourseJSON, loading:false})
        }
    }

    render() {
        if(this.state.error === true) {
            return <WentWrong />
        } else {
            if(this.state.loading === true) {
                return <Loader />
            } else {
                const myData = this.state.courses;
                const myView =  myData.map((data, index) => {
                    return  <Col lg={6} md={12} sm={12} className="p-2" key={index}>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <img className="courseImg" src={data.short_img} alt="Yoo !"/>
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
    }
}

export default AllCourses;