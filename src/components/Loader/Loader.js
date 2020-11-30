import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import loader from "../../asset/image/loader.svg";

class Loader extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center">
                    <Row>
                        <Col>
                            <img src={loader} alt="loader"/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Loader;