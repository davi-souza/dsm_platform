import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from './themes';
import './index.scss';
import 'typeface-roboto';

const platformTheme = createMuiTheme({
	palette: theme, 
	border: 'oi',
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
