/**
 * ChartEngine.js
 * Responsible for generating data visualizations from raw data.
 * Does not use external libraries; constructs DOM elements manually.
 */

export const ChartEngine = {
    
    /**
     * Generates a simple horizontal bar chart.
     * @param {object} data - { title: string, labels: [], values: [], color: string }
     */
    generateBarChart: (data) => {
        const maxVal = Math.max(...data.values);
        let html = `<div class="chart-container bar-chart">`;
        html += `<h4>${data.title}</h4>`;
        html += `<div class="chart-body">`;

        data.values.forEach((val, index) => {
            const percentage = (val / maxVal) * 100;
            const label = data.labels[index];
            
            html += `
                <div class="chart-row">
                    <div class="chart-label">${label}</div>
                    <div class="chart-bar-area">
                        <div class="chart-bar" style="width: 0%" data-width="${percentage}%">
                            <span class="chart-value">${val}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div><div class="chart-footer">Source: Aggregated Data Analysis</div></div>`;
        return html;
    },

    /**
     * Generates a circular progress metric (Donut style).
     * @param {object} item - { label: string, percent: number }
     */
    generateMetricCard: (item) => {
        const circumference = 2 * Math.PI * 40; // r=40
        const offset = circumference - (item.percent / 100) * circumference;
        
        return `
            <div class="metric-card">
                <svg width="100" height="100" viewBox="0 0 100 100" class="circular-chart">
                    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <circle class="circle-bg-ring" cx="50" cy="50" r="40" stroke="#eee" stroke-width="8" fill="none" />
                    <circle class="circle-progress" cx="50" cy="50" r="40" stroke="#3a7bd5" stroke-width="8" fill="none" 
                            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" />
                    <text x="50" y="55" class="percentage">${item.percent}%</text>
                </svg>
                <p class="metric-label">${item.label}</p>
            </div>
        `;
    }
};