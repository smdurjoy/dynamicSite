import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import errorImage from '../../asset/image/error.svg'
import wrongImage from '../../asset/image/wrong.png'

class WentWrong extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center mt-3">
                    <Row>
                        <Col>
                            <img src={wrongImage}/> <br/>
                            Something went wrong!
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default WentWrong;