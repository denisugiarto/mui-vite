import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
	components: {
		// Name of the component
		MuiButtonBase: {
			defaultProps: {
				// The props to change the default for.
				disableRipple: true, // No more ripple, on the whole application 💣!
			},
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
