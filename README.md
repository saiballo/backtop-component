> ### [Italian Version](./README-it.md)

# "Back to Top" Button

> An accessible Web Component to include a "Back to Top" button on your website. By setting some parameters you can customize the graphics and behavior of the component.

![](https://img.shields.io/badge/Made%20with%20love%20and-javascript-blue)
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://lbesson.mit-license.org/)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Web component usage](#web-component-usage)
- [Properties list](#properties-list)
- [Default configuration](#default-configuration)
- [Callbacks](#callbacks)
- [CSS styles](#css-styles)
- [DevTeam](#devteam)
- [License](#license)

## Demo

[Demo page](https://saiballo.github.io/backtop-component/)

## Features

* Web Component without external dependencies.
* The button is accessible both from keyboard and screen reader (tests performed with NVDA).
* You can customize button colors and icon.
* Screen reader texts can be modified to handle multilingual sites as well.
* 2 callbacks are available: one is called as soon as the button is pressed and the other as soon as the page scroll top ends.

### Installation

You can install the script in 3 different ways.

1) **In-page script of the compiled file**

```
<script src="backtop-button.min.js"></script>
```

2) **In-page script of the module file**

In this case you use the source file with `type="module"`.

**N.B.** When using the file as a module, you need to put the `include` folder in the same path as the file. (see `/docs/assets/js/module` folder)
```
<script type="module" src="module/backtop-button.js"></script>
```

3) **Import the script as "side-effect import"**

You can import the code into any other javascript entrypoint.
```
// master.js script
import './backtop-button.min.js';
```

### Web component usage

Once the main javascript is loaded, you can insert the web component on the page. Without any specific attributes, the default configuration will apply (see [Default configuration](#default-configuration)):

```
<backtop-button></backtop-button>
```

If you want to customize the SVG icon or the offset value (in pixels) beyond which to show the button, you can set the code like this:

```
<backtop-button offset-show="300" custom-icon="./img/custom.svg"></backtop-button>
```

### Properties list

<table style="width:100%; border-collapse: collapse;">
	<thead>
		<tr>
			<th style="border: 1px solid #ddd; padding: 8px;">Properties</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Default</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">title</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text to display on mouse hover over the button.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">not set</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">from-top</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Distance of the scrollbar, in pixels, from the top margin of the page after pressing the button.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">0</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">offset-show</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indicates the scrollbar offset value (in pixels) beyond which to show the button.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">300</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">custom-icon</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If set, replaces the button's default SVG</td>
			<td style="border: 1px solid #ddd; padding: 8px;">not set</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">aria-label</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Specific text for screen readers. This parameter can never be empty. If set to "", the value "back to top" will be used.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Button to go back to the top of the page"</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">live-text-show</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text announced by screen readers when the button appears on the page (at loading or after scroll). This parameter can never be empty. If set to "", the value "back to top available" will be used. </td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Back to top button available"</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">live-text-hide</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text announced by screen readers when the button is hidden after appearing for the first time (so never at page loading if the offset is not exceeded). This parameter can be empty</td>
			<td style="border: 1px solid #ddd; padding: 8px;">"Back to top button hidden"</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">no-smooth</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If set, the page scroll will be immediate, without animation. By default the behavior is "smooth"</td>
			<td style="border: 1px solid #ddd; padding: 8px;">not set</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">arrow-color</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indicates the color of the 2 arrows of the button. This parameter overrides the generic config but is overridden by any additional css (see "CSS Styles" section). </td>
			<td style="border: 1px solid #ddd; padding: 8px;">#ffffff</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">background-color</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Indicates the background color of the button. This parameter overrides the generic config but is overridden by any additional css (see "CSS Styles" section). </td>
			<td style="border: 1px solid #ddd; padding: 8px;">#002a79</td>
		</tr>
	</tbody>
</table>

### Default configuration

Some default parameters, which in most cases are texts, can be overridden by creating a global variable called `backTopConfig`. The list of parameters that can be overridden is as follows:

```
<script>
	window.backTopConfig = {
		"ariaLabel": "Button to go back to the top of the page",
		"liveTextShow": "Back to top button available",
		"liveTextHide": "Back to top button hidden",
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

The `backgroundColor` and `arrowColor` parameters can also be customized via css on the page (see [CSS Styles](#css-styles))

The configuration to override must be placed before `<script src="backtop-button.min.js"></script>` or, if you want to put it immediately after, it is essential to use the `defer` attribute for the script: `<script src="backtop-button.min.js" defer></script>`.

### Callbacks

2 asynchronous callbacks are available to call: a function when the button is clicked (`cbBefore()`) and one when the page scroll has occurred (`cbAfter()`). In this case it is convenient to assign an `id` to the component. Example code to use:

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

### CSS Styles

The button background and arrow color can also be styled using CSS.

> **Note:**: CSS styles **always** override the corresponding component parameters.

```css
<style>

	/* arrow color */
	backtop-button::part(icon)
	{
		fill: black;
	}

	/* button background */
	backtop-button::part(back-top)
	{
		background: grey;
	}

	/* button border when reached by keyboard focus */
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
