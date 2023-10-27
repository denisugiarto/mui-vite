import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav style={{ margin: 10 }}>
			<Link to="/" style={{ padding: 5 }}>
				Home
			</Link>
			<Link to="/non-availability" style={{ padding: 5 }}>
				Non Availability
			</Link>
			<Link to="/loading" style={{ padding: 5 }}>
				Loading
			</Link>
		</nav>
	);
};

export default Header;
