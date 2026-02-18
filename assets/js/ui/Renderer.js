import { ChartEngine } from '../engine/ChartEngine.js';

/**
 * Renderer.js (Part 2 Update)
 * Expands capability to render rich media types.
 */

export const Renderer = {

    buildHtml: (data) => {
        let html = `<div class="generated-content fade-in">`;
        
        // Dynamic Header based on complexity
        const headerClass = data.meta.includes('High') ? 'header-complex' : 'header-simple';
        html += `
            <header class="${headerClass}">
                <h1>${data.title}</h1>
                <div class="meta-tags">
                    <span>${new Date().toLocaleDateString()}</span>
                    <span class="separator">•</span>
                    <span>${data.meta}</span>
                </div>
            </header>
        `;

        data.sections.forEach(section => {
            html += Renderer.renderSection(section);
        });

        html += `</div>`;
        
        // Inject script for bar chart animation after render
        setTimeout(() => Renderer.animateCharts(), 100);
        
        return html;
    },

    renderSection: (section) => {
        switch (section.type) {
            // ... (Previous cases h2, p, image remain) ...
            case 'h2':
                return `<h2>${section.content}</h2>`;
            case 'p':
                return `<p>${section.content}</p>`;
            case 'image':
                return `
                    <figure class="media-figure">
                        <img src="${section.src}" alt="${section.alt}" loading="lazy">
                        <figcaption>${section.alt}</figcaption>
                    </figure>`;

            // --- NEW TYPES ---
            
            case 'timeline':
                let timelineHtml = '<div class="timeline-container">';
                section.events.forEach((event, idx) => {
                    timelineHtml += `
                        <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'}">
                            <div class="timeline-content">
                                <span class="date">${event.date}</span>
                                <h3>${event.title}</h3>
                                <p>${event.desc}</p>
                            </div>
                        </div>
                    `;
                });
                return timelineHtml + '</div>';

            case 'chart-bar':
                return ChartEngine.generateBarChart(section.data);

            case 'metrics-grid':
                let metricsHtml = '<div class="metrics-grid">';
                section.items.forEach(item => {
                    metricsHtml += ChartEngine.generateMetricCard(item);
                });
                return metricsHtml + '</div>';

            case 'code':
                return `
                    <div class="code-block">
                        <div class="code-header">
                            <span class="lang-tag">${section.language}</span>
                            <button class="copy-btn">Copy</button>
                        </div>
                        <pre><code>${Renderer.escapeHtml(section.content)}</code></pre>
                    </div>`;

            case 'comparison':
                let compHtml = '<div class="comparison-cards">';
                section.items.forEach(item => {
                    compHtml += `
                        <div class="comp-card ${item.winner ? 'winner' : ''}">
                            ${item.winner ? '<div class="badge-winner">TOP PICK</div>' : ''}
                            <h3>${item.name}</h3>
                            <div class="price">${item.price}</div>
                            <ul>${item.features.map(f => `<li>${f}</li>`).join('')}</ul>
                        </div>
                    `;
                });
                return compHtml + '</div>';

            default:
                return '';
        }
    },

    escapeHtml: (unsafe) => {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    },

    animateCharts: () => {
        // Simple JS animation for bars
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
};