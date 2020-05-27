import * as React from 'react';
import {stopLoading, store} from "@/context/store";
import {PlanetsService} from "@/services/api.service";
import Pagination from "react-js-pagination";

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
      reviews: reviews,
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
        reviews: reviews,
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
        {!ready && <><p className="text-muted">Loading...</p></>}
        {ready && reviews.data.map((review) => {
        return <div key={review.id}>
          <p className="text-muted">{review.attributes.title}: {review.attributes.rating}</p>
          <p className="text-muted">{review.attributes.description}</p>
          <small className="text-muted">{moment(review.attributes.created_at.date).format('LLLL')}</small>
          <hr/>
        </div>
      })}
        <Pagination
          totalItemsCount={totalReviews}
          activePage={activePage}
          itemsCountPerPage={this.props.records_per_page || 5}
          onChange={(pageNumber)=> this.handlePageChange(pageNumber)}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    )
  }
}
