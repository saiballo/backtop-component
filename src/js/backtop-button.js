/**
* @preserve
* Filename: backtop-button.js
*
* Created: 21/07/2025 (14:08:06)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 01/09/2025 (10:55:59)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2025 - Tutti i diritti riservati
*
* Comments:
*/

import { defaultConfig } from "./include/config.js";
import { initShadowDom } from "./include/initShadowDom.js";
import { handleClick, showHideButton, debounce } from "./include/util.js";

class BackTopButton extends HTMLElement {

	constructor() {

		super();

		// merge della possibile configurazione globale con quella di default
		this.config = {
			...defaultConfig,
			...window.backTopConfig ?? {}
		};

		// dato che handleClick ha bisogno di 2 argomenti uso una funzione wrapper da richiamare poi nell'addEventListener
		this.handleClick = (e) => handleClick(e, this);
		// inizializzo le callback
		this.callbackBefore = null;
		this.callbackAfter = null;

		// inizializzo il codice e gli stili css
		initShadowDom(this);
	}

	// setter/getter per cbBefore
	set cbBefore(fn) {

		if (typeof fn === "function") {

			this.callbackBefore = fn;

		} else {

			this.callbackBefore = null;
		}
	}

	get cbBefore() {

		return this.callbackBefore;
	}

	// setter/getter per cbAfter
	set cbAfter(fn) {

		if (typeof fn === "function") {

			this.callbackAfter = fn;

		} else {

			this.callbackAfter = null;
		}
	}

	get cbAfter() {

		return this.callbackAfter;
	}

	// get attributi locali del component
	get arrowColor() {
		return this.getAttribute("arrow-color") || this.config.arrowColor;
	}

	get backgroundColor() {
		return this.getAttribute("background-color") || this.config.backgroundColor;
	}

	get titleText() {
		return this.getAttribute("title") || this.config.titleText;
	}

	get fromTop() {
		return this.getAttribute("from-top") || this.config.fromTop;
	}

	get offsetShow() {
		return this.getAttribute("offset-show") || this.config.offsetShow;
	}

	get customIcon() {
		return this.getAttribute("custom-icon");
	}

	// controllo accessibilità aggiuntivo per essere sicuri che aria-label sia sempre impostato (default in inglese)
	get ariaLabel() {
		return this.getAttribute("aria-label") || this.config.ariaLabel || "back to top";
	}

	get liveTextShow() {
		return this.getAttribute("live-text-show") || this.config.liveTextShow || "back to top available";
	}

	// questo può rimanere vuoto nel config
	get liveTextHide() {
		return this.getAttribute("live-text-hide") || this.config.liveTextHide;
	}
	// get attributi locali del component

	// has attributi locali
	get noSmooth() {
		return this.hasAttribute("no-smooth");
	}
	// has attributi locali del component

	connectedCallback() {

		// imposto i colori scelti nel config (vengono sovrascritti da eventuali css dell'utente)
		this.style.setProperty("--arrow-color", this.arrowColor);
		this.style.setProperty("--bg-color", this.backgroundColor);
		// imposto aria-hidden in modo che sia sempre presente
		this.setAttribute("aria-hidden", "true");

		if (this.titleText !== "") {

			this.setAttribute("title", this.titleText);
		}

		// setup del componente
		this.setupComponent();

		// evento onclick legato al bottone nello shadow
		this.buttonTop?.addEventListener("click", this.handleClick, {
			"passive": true
		});
	}

	setupComponent() {

		// status del bottone
		this.buttonShown = false;

		// debounce wrappato perchè showHideButton ha un parametro
		this.scrollDebounce = debounce(() => {

			showHideButton(this);

		}, this.config.debounceTime);

		// controllo la visibilità anche al load della pagina
		["load", "scroll"].forEach((e) => {

			window.addEventListener(e, this.scrollDebounce);
		});
	}

	/**
	 * The `disconnectedCallback` function removes event listeners and resets button status in a JavaScript class.
	 */
	disconnectedCallback() {

		// rimuovo callback e reset status bottone
		this.callbackBefore = null;
		this.callbackAfter = null;
		this.buttonShown = false;

		// rimuovo evento click
		this.buttonTop?.removeEventListener("click", this.handleClick);

		// rimuovo eventi load e scroll
		["load", "scroll"].forEach((e) => {

			window.removeEventListener(e, this.scrollDebounce);
		});
	}
}

customElements.define("backtop-button", BackTopButton);
