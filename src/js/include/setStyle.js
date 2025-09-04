/**
* Filename: setStyle.js
*
* Created: 30/04/2025 (16:26:32)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 03/09/2025 (11:31:30)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

"use strict";

export const setStyle = () => {

	const stylesheet = new CSSStyleSheet();

	stylesheet.replaceSync(`

		:host,
		:host *,
		:host *::before,
		:host *::after
		{
			box-sizing: border-box;
		}

		.back-top
		{
			display: flex;
  			align-items: center;
  			justify-content: center;
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 2.5rem;
			background: var(--bg-color, red);
			position: fixed;
			border-width: 0;
			z-index: 500;
			bottom: clamp(2.5rem, 8vh, 4rem);
			right: clamp(0.5rem, 8vw, 3rem);
			opacity: 0;
  			transition: opacity 500ms ease-in-out;
			cursor: pointer;
		}

		.back-top:focus-visible
		{
			outline: 3px solid #000;
			outline-offset: 2px;
		}

		.back-top--show
		{
  			opacity: 1;
		}

		.icon
		{
			width: 1.2rem;
			height: 1.2rem;
			line-height:1.2;
			fill: var(--arrow-color, white);
		}

		.d-none
		{
			display: none;
		}
	`);

	return stylesheet;
};
