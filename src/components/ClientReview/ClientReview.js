import React, {Component, Fragment} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Col, Container, Row} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";

class ClientReview extends Component {
    constructor() {
        super();
        this.state = {
            myData: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        const homeClientData = sessionStorage.getItem('homeClient');
        if(homeClientData == null) {
            RestClient.GetRequest(AppUrl.ClientReview).then(result => {
                if(result == null) {
                    this.setState({error:true, loading:false})
                } else {
                    this.setState({myData:result, loading:false})
                    sessionStorage.setItem('homeClient', JSON.stringify(result));
                }
            }).catch(error => {
                this.setState({error:true, loading:false})
            })
        } else {
            const homeClientJSON = JSON.parse(homeClientData);
            this.setState({myData:homeClientJSON, loading:false})
        }
    }

    render() {
        if(this.state.error == true) {
            return <WentWrong />
        } else {
            if(this.state.loading == true) {
                return <Loader />
            } else {
                var settings = {
                    autoplaySpeed:3000,
                    autoplay:true,
                    dots: true,
                    infinite: true,
                    speed: 3000,
                    vertical:true,
                    verticalSwiping:true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                initialSlide: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                };

                const myList = this.state.myData;
                const myView = myList.map(data => {
                    return  <div>
                        <Row className="text-center justify-content-center">
                            <Col lg={6} md={6} sm={12}>
                                <img className="circleImg" src={data.client_image}/>
                                <h1 className="serviceName">{data.client_name}</h1>
                                <p className="serviceDescription" >{data.client_comment}</p>
                            </Col>
                        </Row>
                    </div>
                })

                return (
                    <Fragment>

                        <Container className="text-center">
                            <h1 className="serviceMainTitle">CLIENT SAYS</h1>
                            <Slider {...settings}>
                                {myView}
                            </Slider>
                        </Container>
                    </Fragment>
                );
            }
        }
    }
}

export default ClientReview;