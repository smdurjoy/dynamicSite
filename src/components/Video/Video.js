import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import "video-react/dist/video-react.css"
import {Player,BigPlayButton} from 'video-react'
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";
class Video extends Component {

    constructor(){
        super();
        this.state={
            show:false,
            videoDescription: '',
            videoUrl: '',
            loading: true,
            error: false
        }
    }

    modalClose=()=>this.setState({show:false})
    modalOpen=()=>this.setState({show:true})

    componentDidMount() {
        RestClient.GetRequest(AppUrl.VideoHome).then(result => {
            this.setState({
                videoDescription:result[0]['video_description'],
                videoUrl:result[0]['video_url'],
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
                        <Container className="text-center">
                            <Row>
                                <Col lg={12} md={12} sm={12} className="videoCard">
                                    <div>
                                        <p className="videoTitle">How I Do</p>
                                        <p className="videoDes">{this.state.videoDescription}</p>
                                        <p><FontAwesomeIcon onClick={this.modalOpen} className="playBtn" icon={faPlayCircle} /></p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>

                        <Modal size="lg" show={this.state.show} onHide={this.modalClose}>
                            <Modal.Body>
                                <Player>
                                    <source src={this.state.videoUrl} />
                                    <BigPlayButton position="center"/>
                                </Player>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.modalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Fragment>
                );
            }
        }
    }
}

export default Video;