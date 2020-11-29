import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Button} from "react-bootstrap";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Loader from "../Loader/Loader";
import WentWrong from "../WentWrong/WentWrong";
class TopBanner extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            subtitle: "",
            loaderClass: "text-center",
            mainDivClass: "d-none",
            wentWrong: "d-none"
        }
    }

    componentDidMount() {
        const sessionTopBannerData = sessionStorage.getItem('TopBannerData');
        if(sessionTopBannerData == null) {
            RestClient.GetRequest(AppUrl.HomeTitles).then(result => {
                const jsonData = (result)[0];
                if(result == null) {
                    this.setState({loaderClass: "d-none", mainDivClass:"d-none", wentWrong: "text-center"})
                } else {
                    this.setState({
                        title:jsonData["home_title"], 
                        subtitle:jsonData['home_subtitle'], 
                        loaderClass:"d-none", 
                        mainDivClass:"text-center"
                    })
                    sessionStorage.setItem('TopBannerData', JSON.stringify(jsonData));
                }

            }).catch(error => {
                this.setState({loaderClass: "d-none", mainDivClass:"d-none", wentWrong: "text-center"})
            })
        } else {
            const topBannerJSON = JSON.parse(sessionTopBannerData);
            this.setState({
                title:topBannerJSON["home_title"], 
                subtitle:topBannerJSON['home_subtitle'], 
                loaderClass:"d-none", 
                mainDivClass:"text-center"
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Container fluid={true} className="topFixedBanner p-0" >
                    <div className="topBannerOverlay">
                       <Container className="topContent">
                           <Row>
                               <Col className={this.state.wentWrong}>
                                   <WentWrong />
                               </Col>
                               <Col className={this.state.loaderClass}>
                                   <Loader />
                               </Col>
                               <Col className={this.state.mainDivClass}>
                                   <h1 className="topTitle">{this.state.title}</h1>
                                   <h4 className="topSubTitle">{this.state.subtitle}</h4>
                                   <Button variant="primary">More Info</Button>
                               </Col>
                           </Row>
                       </Container>
                    </div>
                </Container>
            </Fragment>
        );
    }
}
export default TopBanner;