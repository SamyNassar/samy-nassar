
import preStyles from 'raw-loader!./prestyles.css';
import typeWriter from './lib/typeWriter';


let style, editorEl, workEl, terminalEl, skipAnimationEl, pauseEl, observer;
let animationSkipped = false, done = false, paused = false;
let browserPrefix;




// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
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
        style.textContent = mutation.target.textContent;

        // Ensure we stay scrolled to the bottom.
        editorEl.scrollTop = editorEl.scrollHeight;
      }
    }
  });

  // Start observing the target node for configured mutations
  observer.observe(editorEl, config);
}




const startAnimation = async () => {
  const interval = 0

  await typeWriter(editor, "text1\n", interval);
  console.log("here")
  await typeWriter(editor, "text2", interval);

}





