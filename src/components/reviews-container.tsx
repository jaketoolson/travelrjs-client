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
  nextPage: number|null,
}

export default class ReviewsContainer extends React.Component<ReviewsProps, ReviewState> {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      ready: false,
      activePage: 1,
      totalReviews: 1,
      nextPage: null,
    };
  }

  async componentDidMount() {
    const reviews = await this.fetchReviews();

    this.setState({
      reviews: reviews.data,
      ready: true,
      activePage: reviews.meta.current_page,
      totalReviews: reviews.meta.total,
      nextPage: reviews.meta.next_page,
    }, () => store.dispatch(stopLoading()));
  }

  handlePageChange = async (pageNumber: number|null) => {
    if (!pageNumber) {
      return;
    }

    // Hrmmmm... need hooks ...
    this.setState({
      ready: false,
    }, async () => {
      const reviews = await this.fetchReviews(pageNumber);
      this.setState({
        reviews: this.state.reviews.concat(reviews.data),
        activePage: pageNumber,
        nextPage: reviews.meta.next_page,
        ready: true,
      });
    });
  }

  fetchReviews = async (nextPage?: number) => {
    const reviewsRes = await PlanetsService.reviews(this.props.planet_id, nextPage);
    return await reviewsRes.data;
  }

  render() {
    const {reviews, ready, nextPage} = this.state;
    return (
      <div className="col-md-12">
        {reviews && reviews.map((review) => {
        return <div key={review.id}>
          <p className="text-muted">"{review.attributes.title}"</p>
          <p className="text-muted">{review.attributes.author.name}: <StarRating rating={(review.attributes.rating)} /></p>
          <p className="text-muted">{review.attributes.description}</p>
          <time title={moment(review.attributes.created_at.date).format('LLLL')} className="text-xs text-muted">{moment(review.attributes.created_at.date).fromNow()}</time>
          <hr/>
        </div>
      })}
        <button disabled={!ready || !nextPage} className="btn btn-default btn-light" type={"button"} onClick={() => this.handlePageChange(nextPage)} >See more reviews</button>
      </div>
    )
  }
}
