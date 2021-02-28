import React from 'react';
import css from './HomePage.module.scss';
import classNames from 'classnames/bind'
import addRepositoryImg from '../assets/add-repository.gif'
const classes = classNames.bind(css)

export const HomePage = () => {
	return (
		<div className={classes(css.container)}>
			<span className={classes(css.homeTitle)}>Welcome to Paisti Plugins</span>
			<div className={classes(css.slogan)}>
				Home of the free and premium plugins produced by Paisti.
			</div>

			<div className={classes(css.textGroups)}>
								
				<div>
					<div className={classes(css.faqTitle)}>
						Contact
					</div>
					<p>
						You can find me at the Illumine Plugins discord
					</p>
					<p>
						<a className="link" href="https://discord.com/invite/9fGzEDR" target="_blank" rel="noreferrer">https://discord.com/invite/9fGzEDR</a>
					</p>
				</div>
			

				<div>
					<div className={classes(css.faqTitle)}>
						What are external plugins?
					</div>
					<p>
						These are unofficial, external plugins for the OpenOSRS old school runescape client 
					</p>
					<p>
						Plugins can assist the user by being small helpers for tedious tasks or they can fully automate something.
					</p>
				</div>

				<div>
					<div className={classes(css.faqTitle)}>
						Where do I get the free plugins?
					</div>
					<p>
						The free plugins can be added to the client through the external plugin manager. Open the external plugin manager,
						click on add github repository.
					</p>
					<p>
						Github Repository owner: Marsunpaisti
					</p>
					<p>
						Github Repository name: plugins-release
					</p>
					<img src={addRepositoryImg} alt="Add repository guide gif"/>
				</div>

				<div>
					<div className={classes(css.faqTitle)}>
						Can I get banned?
					</div>
					<p>
						The game rules forbid software from inputting more than 1 input per 1 user input. This essentially means that
						the plugins you find here are not allowed by game rules and usage may result in your account getting banned.
					</p>					
				</div>


				<div>
					<div className={classes(css.faqTitle)}>
						Source codes?
					</div>					
					<p>
						The source code of my free plugins as well as my scripting API can be found at
					</p>
					<p>
						<a className="link" href="https://github.com/Marsunpaisti/openosrs-plugins" target="_blank" rel="noreferrer">https://github.com/Marsunpaisti/openosrs-plugins</a>
					</p>
				</div>

				<div>
					<div className={classes(css.faqTitle)}>
						Disclaimer
					</div>
					<p>
						While I make every effort to deliver high quality products, I do not guarantee that my products are free from defects. 
						My software is provided “as is," and you use the software at your own risk.
						I make no warranties as to performance, merchantability, fitness for a particular purpose, or any other warranties whether expressed or implied.
						No oral or written communication from or information provided by me shall create a warranty.
					</p>
					<p>
						Under no circumstances shall I be liable for direct, indirect, special, incidental, or consequential damages 
						resulting from the use, misuse, or inability to use this software, even if I have been advised of the possibility of such damages.
					</p>
				</div>
			</div>
		</div>
	);
};
