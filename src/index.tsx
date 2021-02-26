import dotenv from 'dotenv-flow';
import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import 'typeface-heebo';
import 'typeface-ubuntu-mono';
import { MainContextProvider } from './contexts/MainContext';
import { MainRouter } from './components/MainRouter';

dotenv.config();

ReactDOM.render(
	<React.StrictMode>
		<MainContextProvider>
			<MainRouter />
		</MainContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
