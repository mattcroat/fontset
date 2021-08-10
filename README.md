# Font Subsetting for Everyone

**Fontset** uses the **Google Fonts API**, to **subset** a font based on characters you need, creating a tiny font to self-host.

> Subsetting fonts is the process of taking a large font file as input and creating other smaller files, with fewer characters or OpenType features. — [Creating Font Subsets](https://markoskon.com/creating-font-subsets/)

You don't have to install anything, or understand [unicode ranges](https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range) but the downside is that you're limited to **Google Fonts**.

The **Google Fonts** data is parsed from a **JSON** file through the clever use of the network tab and the **character table** is parsed from [Character Table](https://character-table.netlify.app/).

I wrote a detailed post on [using fonts on the web](https://joyofcode.xyz/using-fonts-on-the-web) explaining everything in great detail.
