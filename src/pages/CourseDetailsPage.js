import React, {Component, Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import CourseDetails from "../components/CourseDetails/CourseDetails";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class CourseDetailsPage extends Component {
    constructor({match}) {
        super();
        this.state = {
            myCourseId: match.params.courseId,
            courseData: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        RestClient.GetRequest(AppUrl.CourseDetails+this.state.myCourseId).then(result => {
            this.setState({courseData: result})
        }).catch(error => {

        })
    }

    render() {
        return (
            <Fragment>
                <TopNavigation title="Course Details"/>
                <CourseDetails courseData={this.state.courseData}/>
                <Footer/>
            </Fragment>
        );
    }
}

export default CourseDetailsPage;