import React, { Component } from 'react'
import {fetchReviews} from '../actions';
import {connect} from 'react-redux';
import InternalRestHeader from './InternalRestHeader';
import {Row,Col, Card, Button} from 'react-bootstrap';

class ShowReviews extends Component {
  componentDidMount(){
    this.props.fetchReviews(window.localStorage.getItem('rest_id'), "rest");
  }

  render() {
    // console.log(this.props.reviews.reviews)
    let review_cards = null;

    console.log(this.props.reviews.reviews.review_data)
    if(this.props.reviews.reviews.review_data !== undefined){      
      review_cards = this.props.reviews.reviews.review_data.map(review => {
        console.log("Review : "+review)
        return (          
          <Card bg="light" style={{width:"300px",marginLeft:50, marginTop:20, height:"100px"}}>
            <Card.Body>
              <Card.Title style={{marginLeft:"30%"}}>{review.user_name}</Card.Title>
              <Card.Text style={{marginLeft:"30%"}}>
                <Row><Col>Ratings : {review.rating}</Col></Row>
                <Row><Col>Review : {review.review}</Col></Row>
              </Card.Text>
            </Card.Body>
          </Card>
        )        
      })
    }

    return (
      <div>
        <InternalRestHeader/>
        <Row>
          <Col>
            Average ratings : {this.props.reviews.reviews.avg}
          </Col>          
        </Row>
        <Row>
          <Col>
            {review_cards}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {reviews:state.reviews, isRestSignedIn:state.rest_auth.isRestSignedIn}
}

export default connect(mapStateToProps,{fetchReviews})(ShowReviews);