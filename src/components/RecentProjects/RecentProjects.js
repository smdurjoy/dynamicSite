import React, {Component,Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";

class RecentProjects extends Component {
    constructor() {
        super();
        this.state = {
            myData: [],
            loading: true
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.ProjectHome).then(result => {
            this.setState({myData:result, loading:false})
        }).catch(error => {

        })
    }

    render() {
        if(this.state.loading == true) {
            return <Loader />
        } else {
            const myList = this.state.myData;
            const myView = myList.map(data => {
                return   <Col lg={4} md={6} sm={12}>
                    <Card className="projectCard">
                        <Card.Img variant="top" src={data.image_one} className="cardImage"/>
                        <Card.Body>
                            <Card.Title className="projectCardTitle">{data.project_name}</Card.Title>
                            <Card.Text className="projectCardDes">{data.short_description}</Card.Text>
                            <Button variant="primary"><Link className="link-style" to={"/ProjectDetails/"+data.id+"/"+data.project_name}>Details</Link></Button>
                        </Card.Body>
                    </Card>
                </Col>
            });
            return (
                <Fragment>
                    <Container className="text-center">
                        <h1 className="serviceMainTitle">RECENT PROJECTS</h1>
                        <Row>
                            {myView}
                        </Row>
                    </Container>
                </Fragment>
            );
        }
    }
}
export default RecentProjects;