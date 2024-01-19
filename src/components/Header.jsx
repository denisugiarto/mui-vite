import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav style={{ margin: 10 }}>
			<Link to="/" style={{ padding: 5 }}>
				Home
			</Link>
			<Link to="/date-validation" style={{ padding: 5 }}>
				Date Validation
			</Link>
			<Link to="/min-notice" style={{ padding: 5 }}>
				Minimum Notice
			</Link>
			<Link to="/non-availability" style={{ padding: 5 }}>
				Non Availability
			</Link>
			<Link to="/tes" style={{ padding: 5 }}>
				Test Render
			</Link>
			<Link to="/loading" style={{ padding: 5 }}>
				Loading
			</Link>
			<Link to="/file-preview" style={{ padding: 5 }}>
				File Preview
			</Link>
			<Link to="/calendar" style={{ padding: 5 }}>
				Calendar
			</Link>
		</nav>
	);
};

export default Header;
