(() => {
  const report = document.querySelector('[data-markdown]');
  if (!report) return;

  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const inline = (value) => {
    let html = escapeHtml(value);
    html = html.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, '<img src="$2" alt="$1"$3>');
    html = html.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, '<a href="$2">$1</a>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    return html;
  };

  const isTableDivider = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const tableCells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

  function renderMarkdown(markdown) {
    const lines = markdown.replaceAll('\r\n', '\n').split('\n');
    const output = [];
    let paragraph = [];
    let listType = null;
    let inCode = false;
    let codeLines = [];

    const flushParagraph = () => {
      if (paragraph.length) {
        output.push(`<p>${inline(paragraph.join(' '))}</p>`);
        paragraph = [];
      }
    };
    const closeList = () => {
      if (listType) {
        output.push(`</${listType}>`);
        listType = null;
      }
    };
    const closeCode = () => {
      output.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      codeLines = [];
      inCode = false;
    };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (/^\s*```/.test(line)) {
        flushParagraph();
        closeList();
        if (inCode) closeCode(); else inCode = true;
        continue;
      }
      if (inCode) {
        codeLines.push(line);
        continue;
      }
      if (!line.trim()) {
        flushParagraph();
        closeList();
        continue;
      }
      const heading = line.match(/^(#{1,4})\s+(.+?)\s*#*$/);
      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        continue;
      }
      if (/^\s*(\*\s*\*\s*\*|-{3,}|_{3,})\s*$/.test(line)) {
        flushParagraph();
        closeList();
        output.push('<hr>');
        continue;
      }
      if (line.trimStart().startsWith('>')) {
        flushParagraph();
        closeList();
        output.push(`<blockquote>${inline(line.replace(/^\s*>\s?/, ''))}</blockquote>`);
        continue;
      }
      const unordered = line.match(/^\s*[-*+]\s+(.+)/);
      const ordered = line.match(/^\s*\d+[.)]\s+(.+)/);
      if (unordered || ordered) {
        flushParagraph();
        const nextList = ordered ? 'ol' : 'ul';
        if (listType && listType !== nextList) closeList();
        if (!listType) { listType = nextList; output.push(`<${listType}>`); }
        output.push(`<li>${inline((unordered || ordered)[1])}</li>`);
        continue;
      }
      if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
        flushParagraph();
        closeList();
        const headers = tableCells(line);
        const rows = [];
        index += 2;
        while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
          rows.push(tableCells(lines[index]));
          index += 1;
        }
        index -= 1;
        output.push(`<table><thead><tr>${headers.map((cell) => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${inline(row[cellIndex] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      paragraph.push(line.trim());
    }
    if (inCode) closeCode();
    flushParagraph();
    closeList();
    return output.join('\n');
  }

  const source = report.dataset.markdown;
  fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load ${source} (${response.status})`);
      return response.text();
    })
    .then((markdown) => {
      report.innerHTML = renderMarkdown(markdown);
      report.querySelectorAll('a[href^="http"]').forEach((link) => {
        link.target = '_blank';
        link.rel = 'noreferrer';
      });
    })
    .catch((error) => {
      report.innerHTML = `<div class="error"><strong>Report unavailable.</strong><br>${escapeHtml(error.message)}<br><br><a href="${source}">Open the source markdown directly →</a></div>`;
    });
})();
