# Font Subsetting for Everyone

Why should you care? I wrote a detailed post on [Using Fonts on The Web](https://joyofcode.xyz/using-fonts-on-the-web). The short answer is that you can generate, and self-host a tiny version of a variable font hosted on [Google Fonts](https://fonts.google.com/), without having to reach for any packages.

A lot of tools that claim to do font subsetting do a poor job, when it comes to variable fonts, removing the variations from them.

Fontset uses the Google Fonts API, to subset a font based on characters, leaving only what you require. You don't have to install anything, or understand [unicode ranges](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range). The downside is that you're limited to Google Fonts.
