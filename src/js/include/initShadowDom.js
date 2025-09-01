/**
* @preserve
* Filename: initShadowDom.js
*
* Created: 21/07/2025 (14:15:03)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 05/08/2025 (17:15:54)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2025 - Tutti i diritti riservati
*
* Comments:
*/

"use strict";

import { setStyle } from "./setStyle.js";

export const initShadowDom = (context) => {

	const idButton = "js-back-top";

	context.attachShadow({
		"mode": "open"
	});

	// stili css
	context.shadowRoot.adoptedStyleSheets = [setStyle()];

	// codice di partenza
	context.shadowRoot.innerHTML = `

		<button id="${idButton}" class="back-top fade d-none" part="back-top" aria-label="${context.ariaLabel}">
			<svg class="icon" part="icon" role="graphics-symbol" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="7.97 8.05 16.05 15.92">
				<g id="double_chevron_up">
					<path d="M9.715,16.651L16,10.456l6.285,6.196c0.394,0.391,1.034,0.391,1.428,0c0.394-0.391,0.394-1.024,0-1.414 l-6.999-6.899c-0.379-0.375-1.048-0.377-1.429,0l-6.999,6.9c-0.394,0.39-0.394,1.024,0,1.414 C8.681,17.042,9.321,17.042,9.715,16.651z" />
					<path d="M16.714,15.338c-0.379-0.375-1.048-0.377-1.429,0l-6.999,6.899c-0.394,0.391-0.394,1.024,0,1.414 c0.394,0.391,1.034,0.391,1.428,0L16,17.456l6.285,6.196c0.394,0.391,1.034,0.391,1.428,0c0.394-0.391,0.394-1.024,0-1.414 L16.714,15.338z" />
				</g>
			</svg>
		</button>
	`;

	context.buttonTop = context.shadowRoot.getElementById(idButton);

	if (context.customIcon) {

		const img = document.createElement("img");
		img.src = context.customIcon;
		img.className = "icon";
		img.setAttribute("part", "icon");
		img.setAttribute("role", "graphics-symbol");
		context.buttonTop.replaceChildren(img);
	}
};
