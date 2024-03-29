import textHandler from "./textHandler";

const endOfSentence = /[\.\?\!]\s$/;
const endOfBlock = /[^\/]\n\n$/;

let skipAnimations = false

export const skipAnim = () => {
  skipAnimations = true;
}

export const isAnimationSkiped = () => {
  return skipAnimations;
}

function writer(target, text, i, interval, style, resolve) {
  if(skipAnimations){
    resolve();
  }
  if (i < text.length && !skipAnimations) {
    let currentChar = text.charAt(i);
    let nextChar = text.charAt(i + 1);
    let pauseDuration = interval;

    if (endOfSentence.test(currentChar + nextChar)) { // if current and next characters match end of sentence regex
      pauseDuration *= 400;
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
