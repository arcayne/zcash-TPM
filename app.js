(() => {
  const documents = document.querySelectorAll('[data-markdown]');
  if (!documents.length) return;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const publishedDocuments = {
    'README.md': 'index.html',
    'part-1-delivery-triage.md': 'index.html',
    'part-1-delivery-triage-extended.md': 'report.html',
    'part-1-scope-assumptions.md': 'scope-notes.html',
    'part-2-context-tooling-design.md': 'part-2.html',
    'part-2-context-tooling-prd.md': 'design-notes.html',
    'part-2-example-daily-brief.md': 'example-brief.html'
  };

  const rewriteHref = (href) => {
    if (href.startsWith('../research/')) {
      return `https://github.com/arcayne/zcash-TPM/blob/main/${href.slice(3)}`;
    }
    const [path, hash = ''] = href.split('#');
    const filename = path.split('/').pop();
    if (publishedDocuments[filename]) {
      return `${publishedDocuments[filename]}${hash ? `#${hash}` : ''}`;
    }
    return href;
  };

  const inline = (value) => {
    let html = escapeHtml(value);
    html = html.replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_match, alt, src, title) =>
      `<img src="${rewriteHref(src)}" alt="${alt}"${title ? ` title="${title}"` : ''}>`);
    html = html.replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_match, label, href, title) =>
      `<a href="${rewriteHref(href)}"${title ? ` title="${title}"` : ''}>${label}</a>`);
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    return html;
  };

  const plainText = (value) => value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .trim();

  const slugify = (value) => plainText(value)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&amp;|&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'section';

  const legacyAliases = {
    "what's in flight": 'picture',
    'what i would chase first': 'follow-ups',
    'how it would work': 'design',
    'an example morning brief': 'brief'
  };

  const isTableDivider = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const tableCells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());

  function renderMarkdown(markdown) {
    const lines = markdown.replaceAll('\r\n', '\n').split('\n');
    const output = [];
    const usedIds = new Map();
    let paragraph = [];
    let listType = null;
    let inCode = false;
    let codeLanguage = '';
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
      output.push(`<pre${codeLanguage ? ` data-language="${escapeHtml(codeLanguage)}"` : ''}><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      codeLines = [];
      codeLanguage = '';
      inCode = false;
    };

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const fence = line.match(/^\s*```\s*([^\s]*)/);
      if (fence) {
        flushParagraph();
        closeList();
        if (inCode) closeCode(); else {
          inCode = true;
          codeLanguage = fence[1] || '';
        }
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

      const diagram = line.match(/^<div class="source-diagram" data-diagram="([^"]+)"><\/div>$/);
      if (diagram) {
        flushParagraph();
        closeList();
        output.push(`<div class="source-diagram" data-diagram="${escapeHtml(diagram[1])}"><p>Loading the relationship diagram…</p></div>`);
        continue;
      }

      const heading = line.match(/^(#{1,4})\s+(.+?)\s*#*$/);
      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        const baseId = slugify(heading[2]);
        const count = usedIds.get(baseId) || 0;
        usedIds.set(baseId, count + 1);
        const id = count ? `${baseId}-${count + 1}` : baseId;
        const alias = legacyAliases[plainText(heading[2]).toLowerCase()];
        if (alias) output.push(`<span class="anchor-alias" id="${alias}" aria-hidden="true"></span>`);
        output.push(`<h${level} id="${id}">${inline(heading[2])}<a class="heading-anchor" href="#${id}" aria-label="Link to ${escapeHtml(plainText(heading[2]))}">#</a></h${level}>`);
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
        if (!listType) {
          listType = nextList;
          output.push(`<${listType}>`);
        }
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
        output.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable table"><table><thead><tr>${headers.map((cell) => `<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${inline(row[cellIndex] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
        continue;
      }
      paragraph.push(line.trim());
    }

    if (inCode) closeCode();
    flushParagraph();
    closeList();
    return output.join('\n');
  }

  function renderSourceDiagram(container) {
    const source = container.dataset.diagram;
    fetch(source)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load diagram source (${response.status})`);
        return response.text();
      })
      .then((mermaid) => {
        const labels = {};
        for (const match of mermaid.matchAll(/([a-z][\w-]*)\["([^"]+)"\]/gi)) labels[match[1]] = match[2];
        const mainOrder = ['collect', 'connect', 'compare', 'brief', 'review', 'follow'];
        const returnLabel = mermaid.match(/follow\s*-->\|([^|]+)\|\s*compare/)?.[1];
        if (mainOrder.some((id) => !labels[id]) || !returnLabel) throw new Error('Diagram source does not contain the expected communication flow.');
        const steps = mainOrder.map((id, index) => `<li><span>${escapeHtml(labels[id])}</span>${index < mainOrder.length - 1 ? '<b aria-hidden="true">→</b>' : ''}</li>`).join('');
        container.outerHTML = `<figure class="relationship-diagram" aria-labelledby="diagram-title"><figcaption id="diagram-title">Proposed context loop</figcaption><ol class="diagram-flow">${steps}</ol><div class="diagram-notes"><p><strong>${escapeHtml(labels.coverage || 'Missing source coverage')}</strong> is shown alongside the draft brief.</p><p><strong>Return loop:</strong> ${escapeHtml(returnLabel)} feed back into comparison.</p></div><a class="source-detail" href="${source}">Diagram source (.mmd)</a></figure>`;
      })
      .catch((error) => {
        container.innerHTML = `<div class="error"><strong>Diagram unavailable.</strong> ${escapeHtml(error.message)} <a href="${source}">Open its source.</a></div>`;
      });
  }

  function finishDocument(report, markdown) {
    report.innerHTML = renderMarkdown(markdown);
    report.classList.remove('loading');
    report.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.target = '_blank';
      link.rel = 'noreferrer';
    });
    report.querySelectorAll('.source-diagram').forEach(renderSourceDiagram);
    if (window.location.hash) {
      window.requestAnimationFrame(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView());
    }
  }

  documents.forEach((report) => {
    const source = report.dataset.markdown;
    fetch(source)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${source} (${response.status})`);
        return response.text();
      })
      .then((markdown) => finishDocument(report, markdown))
      .catch((error) => {
        report.classList.remove('loading');
        report.innerHTML = `<div class="error"><strong>Document unavailable.</strong><p>${escapeHtml(error.message)}</p><p><a href="${source}">Open the source Markdown directly.</a></p></div>`;
      });
  });
})();
