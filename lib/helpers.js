/**
 * Hjálparfall sem útbýr element með börnum eða texta.
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Möguleg börn elements, ef strengur, texti elements
 * @returns {HTMLElement} HTML element með börnum eða texta
 */
export function el(name, ...children) {
  const e = document.createElement(name);

  for (const child of children) {
    if (typeof child === 'string') {
      e.appendChild(
        document.createTextNode(child),
      );
    } else {
      e.appendChild(child);
    }
  }

  return e;
}
