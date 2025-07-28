> ### [English Version](./README.md)

# Bottone "Torna su"

> Un Web Component accessibile per includere un bottone "Torna su" nel proprio sito. Impostando alcuni parametri è possibile personalizzare la grafica e il comportamento del componente.

![](https://img.shields.io/badge/Made%20with%20love%20and-javascript-blue)
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://lbesson.mit-license.org/)

## Sommario

- [Demo](#demo)
- [Caratteristiche](#caratteristiche)
- [Installazione](#installazione)
- [Utilizzo web component](#utilizzo-web-component)
- [Lista parametri](#lista-parametri)
- [Configurazione di default](#configurazione-di-default)
- [Callback](#callback)
- [Stili CSS](#stili-css)
- [DevTeam](#devteam)
- [Licenza](#license)

## Demo

[Pagina demo](https://saiballo.github.io/backtop-component/)

## Caratteristiche

* Web Component senza dipendenze esterne.
* Il bottone è accessibile sia da tastiera che da screen reader (test effettuati con NVDA).
* È possibile personalizzare colori e icona del bottone.
* I testi per lo screen reader possono essere modificati anche per gestire siti multilingua.
* Sono disponibili 2 callback: una viene chiamata appena premuto il bottone e l'altra appena termina lo scroll top della pagina.

### Installazione

È possibile installare lo script in 3 modi diversi.

1) **Script in pagina del file compilato**

```
<script src="backtop-button.min.js"></script>
```

2) **Script in pagina del file module**

In questo caso si usa il file sorgente con `type="module"`.

**N.B.** Utilizzando il file come modulo è necessario mettere nella stesso path del file anche la cartella `include`. (vedi cartella `/docs/assets/js/module`)
```
<script type="module" src="module/backtop-button"></script>
```

3) **Importare lo script, come "side-effect import"**

È possibile importare il codice in qualsiasi altro entrypoint javascript.
```
// script master.js
import './backtop-button.min.js';
```

### Utilizzo web component

Una volta caricato il javascript principale si può inserire il web component in pagina. Senza nessun attributo specifico varrà la configurazione di default (vedi [Configurazione di default](#configurazione-di-default)):

```
<backtop-button></backtop-button>
```

Se invece si volesse personalizzare l'icona SVG oppure il valore di offset (in pixel) oltre il quale far comparire il bottone, si può impostare il codice in questa maniera:

```
<backtop-button offset-show="300" custom-icon="./img/custom.svg"></backtop-button>
```

### Lista parametri

<table style="width:100%; border-collapse: collapse;">
	<thead>
		<tr>
			<th style="border: 1px solid #ddd; padding: 8px;">Parametro</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Descrizione</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">title</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Testo da visualizzare all'hover del mouse sul bottone.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">non impostato</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">from-top</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Distanza della scrollbar, in pixel, dal margine superiore della pagina dopo aver premuto il bottone.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">0</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">offset-show</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indica il valore di offset della scrollbar (in pixel) oltre il quale far comparire il bottone.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">300</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">custom-icon</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Se impostato sostituisce la SVG di default del bottone</td>
			<td style="border: 1px solid #ddd; padding: 8px;">non impostato</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">aria-label</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Testo specifico per gli screen reader. Questo parametro non potrà mai essere vuoto. In caso venisse impostato a "" verrà usato il valore "back to top".</td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Pulsante per tornare in cima alla pagina"</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">live-text-show</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Testo annunciato dagli screen reader quando il bottone compare in pagina (al caricamento oppure dopo scroll). Questo parametro non potrà mai essere vuoto. In caso venisse impostato a "" verrà usato il valore "back to top available". </td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Pulsante torna su disponibile"/td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">live-text-hide</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Testo annunciato dagli screen reader quando il bottone viene nascosto dopo essere comparso la prima volta (quindi mai al caricamento della pagina se non si supera l'offset). Questo parametro può essere vuoto</td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Pulsante torna su nascosto"</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">no-smooth</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Se impostato lo scroll della pagina sarà immediato, senza animazione. Di default invece il comportamento è "smooth"</td>
			<td style="border: 1px solid #ddd; padding: 8px;">non impostato</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">arrow-color</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indica il colore delle 2 frecce del bottone. Questo parametro sovrascrivere il config generico ma viene sovrascritto da un eventuale css aggiuntivo (vedi la sezione "Stili CSS"). </td>
			<td style="border: 1px solid #ddd; padding: 8px;">#ffffff</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">background-color</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indica il colore di sfondo del bottone. Questo parametro sovrascrivere il config generico ma viene sovrascritto da un eventuale css aggiuntivo (vedi la sezione "Stili CSS"). </td>
			<td style="border: 1px solid #ddd; padding: 8px;">#002a79</td>
		</tr>
	</tbody>
</table>

### Configurazione di default

Alcuni parametri di default, nella maggior parte dei casi sono testi, possono essere sovrascritti creando una variabile globale chiamata `backTopConfig`. La lista dei parametri che possono essere sovrascritti è la seguente:

```
<script>
	window.backTopConfig = {
		"ariaLabel": "Pulsante per tornare in cima alla pagina",
		"liveTextShow": "Pulsante torna su disponibile",
		"liveTextHide": "Pulsante torna su nascosto",
		"liveRegionId": "js-backtop-live-region",
		"titleText": "",
		"offsetShow": 300,
		"fromTop": 0,
		"debounceTime": 200,
		"arrowColor": "#fff",
		"backgroundColor": "#002a79"
	};
</script>
```

I parametri `backgroundColor` e `arrowColor` possono essere personalizzati anche tramite css in pagina (vedi [Stili CSS](#stili-css))

La configurazione da sovrascrivere va messa prima di `<script src="backtop-button.min.js"></script>` oppure, nel caso si volesse metterla subito dopo, è fondamentale utilizzare l'attributo `defer` per lo script: `<script src="backtop-button.min.js" defer></script>`.

### Callback

Sono disponibili 2 callback da poter chiamare: una funzione asincrona quando viene cliccato il bottone (`cbBefore()`) e una quando è avvenuto lo scroll della pagina (`cbAfter()`). In questo caso è conveniente assegnare un `id` al component. Esempio di codice da utilizzare:

```
<script>
	document.addEventListener("DOMContentLoaded", (e) => {

		const btn = document.getElementById("js-backtop");

		btn.cbBefore = async (event) => {
			console.log("callback before the end of scroll");
		};

		btn.cbAfter= (event) => {
			console.log("callback after the end of scroll");
		};

	});
</script>
```

### Stili CSS

Lo sfondo del bottone e il colore delle frecce possono essere stilizzati anche usando i CSS.

> **Nota:**: gli stili CSS sovrascrivono **sempre** i corrispettivi parametri del componente.

```css
<style>

	/* colore frecce */
	backtop-button::part(icon)
	{
		fill: black;
	}

	/* sfondo del bottone */
	backtop-button::part(back-top)
	{
		background: grey;
	}

	/* bordo del bottone quando viene raggiunto dal focus da tastiera */
	backtop-button::part(back-top):focus-visible
	{
		outline: 4px solid red;
		outline-offset: 2px;
	}
</style>
```

## DevTeam

### ARMADA 429
<img src="https://raw.githubusercontent.com/saiballo/saiballo/refs/heads/master/armada429.png" width="80" height="80">
<br><br>

**Lorenzo "Saibal" Forti**

## License

[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://lbesson.mit-license.org/)
![](https://img.shields.io/badge/License-Copyleft%20Saibal%20--%20All%20Rights%20Reserved-red)
