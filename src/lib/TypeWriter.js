const endOfSentence = /[\.\?\!]\s$/;
const comma = /\D[\,]\s$/;
const endOfBlock = /[^\/]\n\n$/;

function writer(target, text, i, interval, resolve) {
    if (i < text.length) {
      let currentChar = text.charAt(i);
      let nextChar = text.charAt(i + 1);
      let pauseDuration = interval;
  
      if (endOfSentence.test(currentChar + nextChar)) { // if current and next characters match end of sentence regex
        pauseDuration *= 20;
      } else if (comma.test(currentChar + nextChar)) { // if current and next characters match comma regex
        pauseDuration *= 20;
      } else if (endOfBlock.test(currentChar + nextChar)) { // if current and next characters match end of block regex
        pauseDuration *= 15;
      }
  
      setTimeout(function() {
        target.innerHTML += currentChar;
        i++;
        setTimeout(function() {
            writer(target, text, i, interval, resolve);
        }, pauseDuration);
      }, interval);
    }else {
        // Resolve the Promise when the function completes
        resolve();
    }
  }


// Define a wrapper function that returns a Promise
export default function typeWriter(target, text, interval) {
    // Wrap the writer function inside a Promise
    return new Promise(resolve => {
        // Call the writer function with the resolve callback to signal completion
        writer(target, text, 0, interval, resolve);
    });
}
