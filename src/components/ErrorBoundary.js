import React from 'react';
import Error from '../Error';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error', error.message);
      console.error(error);
    }

    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <Error/>;
    }

    return this.props.children;
  }
}
