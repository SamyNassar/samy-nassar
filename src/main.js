import workText from '!raw-loader!./resources/work.txt';
import preStyles from 'raw-loader!./prestyles.css';
import typeWriter from './lib/typeWriter';
import { skipAnim, isAnimationSkiped } from './lib/typeWriter';
import getBrowserPrefix from './lib/getBrowserPrefix';
let styleText = [0, 1, 2, 3].map((i) => require('raw-loader!./resources/styles' + i + '.css').default);


let style, editorEl, workEl, contactEl, skipAnimationEl, pauseEl, observer;
let animationSkipped = false, paused = false;
let browserPrefix;

const md2html = marked.parse(workText);

import { marked } from 'marked';
import textHandler from './lib/textHandler';


// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
  // Put the proper prefix for the styles.
  browserPrefix = getBrowserPrefix();
    styleText = styleText.map(function(text) {
        return text.replace(/-webkit-/g, browserPrefix);
    });

  getEls();
  createEventHandlers();
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
  contactEl = document.getElementById('contact-me');
  pauseEl = document.getElementById('pause');
  skipAnimationEl = document.getElementById('skip');

}

const createEventHandlers = () => {
  // // Options for the observer (which mutations to observe)
  // const config = {childList: true};

  // // Create an observer instance linked to the callback function
  // observer = new MutationObserver((mutationList) => {
  //   for (const mutation of mutationList) {
  //     if (mutation.type === "childList") {
  //       // Update page style.
  //       // style.textContent = mutation.target.textContent;
  //     }
  //   }
  // });

  // // Start observing the target node for configured mutations
  // observer.observe(editorEl, config);

  skipAnimationEl.addEventListener("click", (e) => {
    e.preventDefault();
    skipAnim()
  })
  
}

// Start building the page with animation
const startAnimation = async () => {
  const interval = 10

  await typeWriter(editorEl, styleText[0], interval, style);
  await typeWriter(workEl, workText, 0);
  await typeWriter(editorEl, styleText[1], interval, style);
  workEl.innerHTML = md2html;
  await typeWriter(editorEl, styleText[2], interval, style);
  await typeWriter(editorEl, styleText[3], interval, style);

  if(isAnimationSkiped){
    skipAnimation()
  }

  pauseEl.style.display = "none";
  skipAnimationEl.style.display = "none"

}

// Skip animation
function skipAnimation() {
  animationSkipped = true;

  let fullText = styleText.join('\n');

  style.textContent = fullText;
  style.textContent += "\n* { " + browserPrefix + "transition: 0.25s; } \n";

  let editorHTML = "";

  // Convert txt to html.
  for(let i = 0; i < fullText.length; i++) {
     editorHTML = textHandler(editorHTML, fullText[i]);
  }

  editorEl.innerHTML = editorHTML;
}

