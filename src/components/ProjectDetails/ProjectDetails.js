import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class ProjectDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            myProjectId: props.projectId,
            short_description: "",
            project_features: "",
            live_preview: "",
            image_two: "",
            project_name: "",
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.ProjectDetails+this.state.myProjectId).then(result => {
            this.setState({
                short_description: result[0]['short_description'],
                project_features: result[0]['project_features'],
                live_preview: result[0]['live_preview'],
                image_two: result[0]['image_two'],
                project_name: result[0]['project_name'],
                loading: false
            })
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
                                <Col lg={6} md={6} sm={12}>
                                    <img src={this.state.image_two}/>
                                </Col>

                                <Col lg={6} md={6} sm={12}>
                                    <h2 className="serviceName">{this.state.project_name}</h2>
                                    <p className="serviceDescription">{this.state.short_description}</p>
                                    <ul>
                                        { ReactHtmlParser(this.state.project_features) }
                                    </ul>
                                    <Button variant="primary"><Link className="link-style" to={this.state.live_preview}>Live Preview</Link></Button>
                                </Col>
                            </Row>
                        </Container>
                    </Fragment>
                );
            }
        }
    }
}

export default ProjectDetails;