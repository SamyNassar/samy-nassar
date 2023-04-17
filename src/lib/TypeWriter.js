import textHandler from "./textHandler";

const endOfSentence = /[\.\?\!]\s$/;
const comma = /(?!\w),(?=\s)/;
const endOfBlock = /[^\/]\n\n$/;

function writer(target, text, i, interval, style, resolve) {
    if (i < text.length) {
      let currentChar = text.charAt(i);
      let nextChar = text.charAt(i + 1);
      let pauseDuration = interval;
  
      if (endOfSentence.test(currentChar + nextChar)) { // if current and next characters match end of sentence regex
        pauseDuration *= 100;
      } else if (comma.test(currentChar + nextChar)) { // if current and next characters match comma regex
        pauseDuration *= 50;
      } else if (endOfBlock.test(currentChar + nextChar)) { // if current and next characters match end of block regex
        pauseDuration *= 100;
      }

      const finalText = textHandler(target.innerHTML, currentChar)

      if(style){
        style.textContent += currentChar
      }

      // Ensure we stay scrolled to the bottom.
      target.scrollTop = target.scrollHeight;
  
      setTimeout(() => {
        target.innerHTML = finalText;
        i++;
        setTimeout(() => {
            writer(target, text, i, interval, style, resolve);
        }, pauseDuration);
      }, interval);
    }else {
        // Resolve the Promise when the function completes
        resolve();
    }
  }


// Define a wrapper function that returns a Promise
export default function typeWriter(target, text, interval, style) {
    // Wrap the writer function inside a Promise
    return new Promise(resolve => {
        // Call the writer function with the resolve callback to signal completion
        writer(target, text, 0, interval, style, resolve);
    });
}
