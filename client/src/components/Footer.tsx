import React, { useState } from "react";

const Footer = () => {
	return (
		<footer id="footer">
			<div id="footer_list">
				<ul>
					<li> Made by rekarome aka Snom </li>
					<li> <a href="#" onClick={() => { window.open('https://twitter.com/Socutesnom'); return false }}> twitter</a> . <a href="#" onClick={() => { window.open('https://github.com/kongsanggun'); return false }}> github</a> . <a href="#" onClick={() => { window.open('https://solved.ac/profile/rekarome'); return false }}> solved.ac </a></li>
				</ul>
				<ul>
					<li> 누니머기는 엉덩이가 아니다! </li>
					<li> 누니머기는 귀여운 포켓몬이다! </li>
					<li> <a href="#" onClick={() => { window.open('https://www.pokemon.com/us/pokedex/snom'); return false }}> 누니머기가 뭔가요? </a> </li>
				</ul>
			</div>
		</footer>
	)
}

export default Footer;