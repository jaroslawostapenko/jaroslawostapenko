/**
 * Database.js (Part 2 Update)
 * Contains complex data structures for testing.
 */

const mockApiDatabase = {
    'history of the internet': {
        title: 'The Evolution of the Web',
        meta: 'Timeline View | Historical Archive',
        sections: [
            { type: 'h2', content: 'Origins' },
            { type: 'p', content: 'The internet started as a military project and evolved into the global nervous system of humanity.' },
            { type: 'timeline', events: [
                { date: '1969', title: 'ARPANET', desc: 'First message sent between UCLA and Stanford.' },
                { date: '1983', title: 'TCP/IP', desc: 'Standard protocol adopted, creating the true Internet.' },
                { date: '1991', title: 'WWW Created', desc: 'Tim Berners-Lee introduces the Web to the public.' },
                { date: '1998', title: 'Google Founded', desc: 'Organizing the world\'s information.' },
                { date: '2004', title: 'Web 2.0', desc: 'The era of social media and user-generated content begins.' }
            ]},
            { type: 'h2', content: 'User Growth Statistics' },
            { type: 'chart-bar', data: {
                title: 'Global Internet Users (Billions)',
                labels: ['2000', '2005', '2010', '2015', '2020', '2025'],
                values: [0.4, 1.0, 2.0, 3.2, 4.8, 5.6]
            }}
        ]
    },
    'javascript frameworks': {
        title: 'Battle of the Frameworks: 2026 Edition',
        meta: 'Technical Comparison | Dev Trends',
        sections: [
            { type: 'h2', content: 'Market Share Analysis' },
            { type: 'metrics-grid', items: [
                { label: 'React Usage', percent: 75 },
                { label: 'Vue Usage', percent: 45 },
                { label: 'Svelte Usage', percent: 30 }
            ]},
            { type: 'h2', content: 'Code Comparison' },
            { type: 'p', content: 'See how a simple "Hello World" component differs.' },
            { type: 'code', language: 'React (JSX)', content: `function App() {\n  return <h1>Hello World</h1>;\n}` },
            { type: 'h2', content: 'Direct Comparison' },
            { type: 'comparison', items: [
                { name: 'React', price: 'Meta Backed', features: ['Virtual DOM', 'Huge Ecosystem', 'Steep Learning Curve'], winner: true },
                { name: 'Vue', price: 'Community Driven', features: ['Two-way Binding', 'Easy to Learn', 'Flexible'], winner: false }
            ]}
        ]
    },
    // ... default remains ...
    default: {
        title: 'Generated Content',
        meta: 'Automated Synthesis',
        sections: [
            { type: 'p', content: 'Content unavailable in high detail. Generating generic overview.' },
            { type: 'metrics-grid', items: [{ label: 'Relevance', percent: 85 }, { label: 'Accuracy', percent: 92 }] }
        ]
    }
};

export const Database = {
    fetchFromWeb: (queryKey) => {
        return new Promise((resolve) => {
            // Simulated advanced search delay
            const delay = Math.floor(Math.random() * 800) + 600; 
            setTimeout(() => {
                const normalized = queryKey.toLowerCase();
                const data = mockApiDatabase[normalized] || {
                    ...mockApiDatabase.default,
                    title: normalized.charAt(0).toUpperCase() + normalized.slice(1)
                };
                resolve(data);
            }, delay);
        });
    }
};