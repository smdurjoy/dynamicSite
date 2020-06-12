import React, {Component, Fragment} from 'react';
import TopNavigation from "../components/TopNavigation/TopNavigation";
import Footer from "../components/Footer/Footer";
import CourseDetails from "../components/CourseDetails/CourseDetails";

class CourseDetailsPage extends Component {
    constructor({match}) {
        super();
        this.state = {
            myCourseId: match.params.courseId
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Fragment>
                <TopNavigation title="Course Details"/>
                <CourseDetails courseId={this.state.myCourseId}/>
                <Footer/>
            </Fragment>
        );
    }
}

export default CourseDetailsPage;