export default function addTargetBlank(html) {
    const regex = /(<a\s+[^>]*)(href\s*=\s*["']([^"']*)["'])/gi;
    const replacement = '$1$2 target="_blank"';
    return html.replace(regex, replacement);
  }