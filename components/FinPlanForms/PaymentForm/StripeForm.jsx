import React from 'react';
import {
  injectStripe,
  CardElement,
} from 'react-stripe-elements';

class CheckoutForm extends React.Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  handleSubmit(e) {
    const {
      nameOnCard,
    } = this.props;
    e.preventDefault();
    return this.props.stripe.createToken({
      name: nameOnCard,
    });
  }

  render() {
    const cardStyles = {
        base: {
        color: '#303238',
        fontSize: '20px',
        lineHeight: '48px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#ccc',
        },
      },
    };
    return (
      <div
        className="lc-stripe-form"
      >
        <CardElement style={cardStyles} />
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  onRef: React.PropTypes.func,
  nameOnCard: React.PropTypes.any,
  stripe: React.PropTypes.shape({
    createToken: React.PropTypes.any
  })
};

export default injectStripe(CheckoutForm);
