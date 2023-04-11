styleEl = document.getElementById('style-text');
style = document.getElementById('style-tag');


styleEl.addEventListener('input', function() {
    style.textContent = styleEl.textContent;
});

