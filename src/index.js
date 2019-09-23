import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import 'typeface-roboto';

const platformTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#455a64', // rgb(69, 90, 100)
			dark: '#1c313a',
			light: '#718792',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ef5350',
			dark: '#b61827',
			light: '#ff867c',
			contrastText: '#000000',
		},
	},
});

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={platformTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
