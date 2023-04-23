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

// Detecting a mobile browser. 
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Start building the page with animation
const startAnimation = async () => {

  let interval = 2;

  if(window.mobileCheck()){
    interval = 1;
  }

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

