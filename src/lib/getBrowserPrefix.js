export default function getBrowserPrefix() {
    const styles = window.getComputedStyle(document.documentElement, '');
    const browserPerfix = Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/);
    if (browserPerfix) {
        return browserPerfix[0];
    }
    return '';
}