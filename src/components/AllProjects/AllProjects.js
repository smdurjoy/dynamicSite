import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class AllProjects extends Component {
    constructor() {
        super();
        this.state = {
            myData: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        const allProjectData = sessionStorage.getItem('allProjects');
        if(allProjectData == null) {
            RestClient.GetRequest(AppUrl.ProjectAll).then(result => {
                if(result==null){
                    this.setState({error:true, loading:false})
                } else {
                    this.setState({myData:result, loading: false})
                    sessionStorage.setItem('allProjects', JSON.stringify(result));
                }
            }).catch(error => {
                this.setState({error:true, loading:false})
            })
        } else {
            const allProjectJSON = JSON.parse(allProjectData);
            this.setState({myData:allProjectJSON, loading:false})
        }
    }

    render() {
        if(this.state.error == true) {
            return <WentWrong />
        } else {
            if(this.state.loading == true) {
                return <Loader />
            } else {
                const myList = this.state.myData;
                const myView = myList.map(data => {
                    return  <Col sm={12} md={6} lg={4} className="p-2">
                        <Card className="projectCard">
                            <Card.Img variant="top" src={data.image_one}/>
                            <Card.Body>
                                <Card.Title className="projectCardTitle">{data.project_name}</Card.Title>
                                <Card.Text className="projectCardDes">
                                    {data.short_description}
                                </Card.Text>
                                <Button variant="primary"><Link className="link-style" to={"/ProjectDetails/"+data.id+"/"+data.project_name}>Details</Link></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                });

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

export default AllProjects;