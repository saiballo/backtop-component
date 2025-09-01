/**
* @preserve
* Filename: util.js
*
* Created: 21/07/2025 (15:53:26)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 01/09/2025 (11:13:19)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2025 - Tutti i diritti riservati
*
* Comments:
*/

/**
 * The function `checkScrollEnd` returns a promise that resolves when the user has scrolled back to a specified position from the top of the page.
 * @param fromtop - The `fromtop` parameter in the `checkScrollEnd` function represents the scroll position from the top of the page.
 * The function will resolve the Promise when the window's scroll position is less than or equal to the specified `fromtop` value.
 * @returns A Promise is being returned.
 */
const checkScrollEnd = (fromtop) => {

	return new Promise((resolve) => {

		const loop = () => {

			if (window.scrollY <= fromtop) {

				resolve();

			} else {

				requestAnimationFrame(loop);
			}
		};

		loop();
	});
};

/**
 * The setLiveRegion function creates a live region in the DOM if it doesn't already exist and makes it accessible to the class.
 * @param context - it is an object containing configuration settings and properties related to the live region setup.
 * @returns it returns `false` if the `regionId` is missing or if it is not provided in the `context.config.liveRegionId`.
 */
const setLiveRegion = (context) => {

	const regionId = context.config.liveRegionId;

	if (!regionId) {

		console.log("Missing region Id");
		return false;
	}

	// crea una live region nel DOM se non esiste già
	if (!document.getElementById(regionId)) {

		const region = document.createElement("div");
		region.id = regionId;
		region.setAttribute("aria-live", "polite");
		region.setAttribute("role", "status");
		region.setAttribute("style", "border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px;");
		document.body.appendChild(region);
	}

	// rendo disponibile l'oggetto alla classe
	context.liveRegion = document.getElementById(regionId);
};

/**
 * The `showHideButton` function toggles the visibility of a button based on the scroll position and updates an optional live region for accessibility purposes.
 * @param context - it is an object containing various properties and values used within the function.
 * @returns it returns the updated state of the button visibility, which is stored in the `context.buttonShown` property.
 */
export const showHideButton = (context) => {

	const button = context.buttonTop;
	const isVisible = window.scrollY >= Number(context.offsetShow);

	// se è già nello stato corretto blocco
	if (isVisible === context.buttonShown) return;

	// aggiorno lo stato
	context.buttonShown = isVisible;

	if (isVisible === true) {

		// preparo il div liveregion se non esiste
		setLiveRegion(context);

		button.classList.remove("d-none");

		// senza rAF e stT le operazioni di aggiunta/rimozione classi css arrivano al browser nello stesso frame e viene usato solo lo stato finale.
		// per un forcing reflow solo requestAnimationFrame non è sufficiente, per questo si aggiunge anche setTimeout
		// un'alternativa è "void el.offsetWidth"; è il classico forcing reflow, ma è meno elegante
		requestAnimationFrame(() => {

			setTimeout(() => {
				button.classList.add("back-top--show");
			}, 0);
		});

		// accessibilità
		if (context.liveRegion) {

			// in questo caso è necessario un delay dato che alcuni screen reader (NVDA) non vedono la modifica perchè è troppo presto nel ciclo vitale della pagina
			// oppure perchè la modifica al textContent avviene prima che la live region sia "registrata" internamente dal lettore di schermo
			setTimeout(() => {
				context.liveRegion.textContent = context.liveTextShow;
			}, 200);
		}

	// queste azioni solo su evento scroll. in questo modo evito anche che venga letto il messaggio al load della pagina se il bottone è nascosto
	} else {

		button.classList.add("d-none");
		button.classList.remove("back-top--show");

		// accessibilità
		if (context.liveRegion) {

			context.liveRegion.textContent = context.liveTextHide;
		}
	}

	// ritorna lo stato aggiornato
	return context.buttonShown;
};

/**
 * `handleClick` handles a click event, scrolls the window to a specified position with optional smooth behavior and executes callback functions before and after scrolling.
 * @param e - The `e` parameter in the `handleClick` function represents the event object, typically an event like a click that triggers the function.
 * @param context - it is an object containing various properties and values used within the function.
 */
export const handleClick = async (e, context) => {

	e.preventDefault();

	const scrollFromTop = Number(context.fromTop);
	const scrollBehavior = context.noSmooth ? "auto" : "smooth";

	if (typeof context.callbackBefore === "function") {

		await context.callbackBefore.call(this, e);
	}

	window.scrollTo({
		"top": scrollFromTop,
		"left": 0,
		"behavior": window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : scrollBehavior
	});

	// controlla la fine dello scroll soprattutto quando il behavior è smooth
	await checkScrollEnd(scrollFromTop);

	if (typeof context.callbackAfter === "function") {

		context.callbackAfter.call(this, e);
	}
};

/**
 * The debounce function is a utility function in JavaScript that limits the frequency of a function call by delaying its execution until a certain amount of time has
 * passed since the last invocation.
 * @param func - The `func` parameter is the function that you want to debounce. It is the function that will be called after the debounce period has passed.
 * @param [wait=300] - The `wait` parameter specifies the time in milliseconds to wait before invoking the `func` function. If multiple calls to the debounced function are
 * made within this time period, only the last call will be executed after the specified wait time has passed. The default value is 300 milliseconds.
 * @param [immediate=false] - The `immediate` parameter is a boolean value that determines whether the `func` should be called immediately or after the specified `wait`
 * time has passed. If `immediate` is set to `true`, the `func` will be called immediately and then debounced for subsequent calls. If
 * @returns The debounce function is returning a new function that will execute the provided function (func) after a specified wait time (wait) has passed since the last
 * time the returned function was called.
 */
export const debounce = (func, wait = 300, immediate = false) => {

	let timeout;

	return function() {

		const context = this;
		const args = arguments;

		const later = () => {

			timeout = null;

			if (immediate === false) {

				func.apply(context, args);
			}
		};

		const callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) {

			func.apply(context, args);
		}
	};
};
