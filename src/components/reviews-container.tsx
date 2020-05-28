import * as React from 'react';
import {stopLoading, store} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import {StarRating} from "@/common/Stars";

const moment = require('moment');

interface ReviewsProps {
  planet_id: number,
  records_per_page?: number,
}

interface ReviewState {
  reviews: any,
  ready: boolean,
  activePage: number,
  totalReviews: number,
}

export default class ReviewsContainer extends React.Component<ReviewsProps, ReviewState> {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      ready: false,
      activePage: 1,
      totalReviews: 1,
    };
  }

  async componentDidMount() {
    const reviews = await this.fetchReviews();

    this.setState({
      reviews: reviews.data,
      ready: true,
      activePage: reviews.meta.current_page,
      totalReviews: reviews.meta.total,
    }, () => store.dispatch(stopLoading()));
  }

  handlePageChange = async (pageNumber: number) => {
    // Hrmmmm... need hooks ...
    this.setState({
      ready: false,
    }, async () => {
      const reviews = await this.fetchReviews(pageNumber);
      this.setState({
        reviews: this.state.reviews.concat(reviews.data),
        activePage: pageNumber,
        ready: true,
      });
    });
  }

  fetchReviews = async (nextPage?: number) => {
    const reviewsRes = await PlanetsService.reviews(this.props.planet_id, nextPage);
    return await reviewsRes.data;
  }

  render() {
    const {reviews, ready, activePage, totalReviews} = this.state;
    return (
      <div className="col-md-12">
        {/*{!ready && <><p className="text-muted">Loading...</p></>}*/}
        {reviews && reviews.map((review) => {
        return <div key={review.id}>
          <p className="text-muted">{review.attributes.title}: <StarRating rating={(review.attributes.rating)} /></p>
          <p className="text-muted">{review.attributes.description}</p>
          <time title={moment(review.attributes.created_at.date).format('LLLL')} className="text-muted">{moment(review.attributes.created_at.date).fromNow()}</time>
          <hr/>
        </div>
      })}
        <button disabled={!ready} className="btn btn-default btn-light" type={"button"} onClick={() => this.handlePageChange(activePage+1)} >See more reviews</button>
      </div>
    )
  }
}
