import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
	render() {
		const Component = this.props.component;
		if (!this.props.loggedIn) {
			<Redirect to={{ pathname: '/login' }} />
		} else {
			return <Route component={Component} path={this.props.path} />
		}
	}
}

const mapStateToProps = () => {
	let loggedIn = false;
	document.cookie.split(';').forEach(item => {
		const [key, value] = item.split('=');
		if (key === "access_token" && value !== "") loggedIn = true;
	})
	return {
		loggedIn: loggedIn
	}
}

export default connect(mapStateToProps)(ProtectedRoute);