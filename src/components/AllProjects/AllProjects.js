import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";

class AllProjects extends Component {
    constructor() {
        super();
        this.state = {
            myData: []
        }
    }

    componentDidMount() {
        RestClient.GetRequest(AppUrl.ProjectAll).then(result => {
            this.setState({myData:result})
        }).catch(error => {

        })
    }

    render() {
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
                        <Button variant="primary"><Link className="link-style" to="/ProjectDetails">Details</Link></Button>
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

export default AllProjects;