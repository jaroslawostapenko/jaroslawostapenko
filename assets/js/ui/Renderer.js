/**
 * Renderer.js
 * Responsible for converting raw JSON data into HTML DOM elements.
 */
export const Renderer = {
    /**
     * Main render function
     * @param {object} data - The page data
     * @returns {string} HTML string
     */
    buildHtml: (data) => {
        let html = `<div class="generated-content">`;
        html += `<h1>${data.title}</h1>`;
        
        const dateStr = new Date().toLocaleDateString();
        html += `<p class="meta-info">WEAVED ON: ${dateStr} | ${data.meta}</p>`;

        data.sections.forEach(section => {
            html += Renderer.renderSection(section);
        });

        html += `</div>`;
        return html;
    },

    /**
     * Helper to render individual sections
     */
    renderSection: (section) => {
        switch (section.type) {
            case 'h2':
                return `<h2>${section.content}</h2>`;
            case 'p':
                return `<p>${section.content}</p>`;
            case 'image':
                return `<img src="${section.src}" alt="${section.alt}" class="content-image" loading="lazy">`;
            case 'list':
                let listHtml = '<ul>';
                section.items.forEach(item => { listHtml += `<li>${item}</li>`; });
                return listHtml + '</ul>';
            case 'callout':
                return `<div class="callout"><p>${section.content}</p></div>`;
            case 'table':
                let tableHtml = '<div class="table-wrapper"><table class="data-table"><thead><tr>';
                section.headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
                tableHtml += '</tr></thead><tbody>';
                section.rows.forEach(row => {
                    tableHtml += '<tr>';
                    row.forEach(cell => { tableHtml += `<td>${cell}</td>`; });
                    tableHtml += '</tr>';
                });
                return tableHtml + '</tbody></table></div>';
            default:
                return '';
        }
    }
};