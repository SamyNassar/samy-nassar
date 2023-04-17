import workText from '!raw-loader!./resources/work.txt';
import preStyles from 'raw-loader!./prestyles.css';
import typeWriter from './lib/typeWriter';
import getBrowserPrefix from './lib/getBrowserPrefix';
let styleText = [0, 1].map((i) => require('raw-loader!./resources/styles' + i + '.css').default);


let style, editorEl, workEl, terminalEl, skipAnimationEl, pauseEl, observer;
let animationSkipped = false, done = false, paused = false;
let browserPrefix;

import { marked } from 'marked';


// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
  // Put the proper prefix for the styles.
  const browserPrefix = getBrowserPrefix();
    styleText = styleText.map(function(text) {
        return text.replace(/-webkit-/g, browserPrefix);
    });

  getEls();
  // createEventHandlers();
  startAnimation();
});


const getEls = () => {
  // We're cheating a bit on styles.
  let preStyleEl = document.createElement('style');
  preStyleEl.textContent = preStyles;
  document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0]);

  // El refs
  style = document.getElementById('style-tag');

  editorEl = document.getElementById('editor');

  workEl = document.getElementById('work');

  terminalEl = document.getElementById('terminal');

}

const createEventHandlers = () => {
  // Options for the observer (which mutations to observe)
  const config = {childList: true};

  // Create an observer instance linked to the callback function
  observer = new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        // Update page style.
        // style.textContent = mutation.target.textContent;
      }
    }
  });

  // Start observing the target node for configured mutations
  observer.observe(editorEl, config);
}

const startAnimation = async () => {
  const interval = 10

  await typeWriter(editorEl, styleText[0], interval, style);
  await typeWriter(workEl, workText, interval);
  await typeWriter(editorEl, styleText[1], interval, style);
  const md2html = marked.parse(workText);
  workEl.innerHTML = md2html
  workEl.classList.toggle('show')
}
