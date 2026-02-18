document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const contentDisplay = document.getElementById('content-display');
    const pagesList = document.getElementById('pages-list');

    const pageDatabase = {};

    // --- PART 3: MOCK API DATABASE ---
    const mockApiDatabase = {
        'the future of ai': {
            title: 'The Future of Artificial Intelligence',
            meta: 'Topic Complexity: High',
            sections: [
                { type: 'h2', content: 'The AI Revolution' },
                { type: 'p', content: 'Artificial Intelligence (AI) is poised to redefine industries, economies, and human experiences. This page synthesizes the latest projections and expert opinions on its trajectory.' },
                { type: 'image', src: 'https://picsum.photos/seed/ai-future/800/400', alt: 'Futuristic AI concept' },
                { type: 'callout', content: 'Key takeaway: AI\'s impact will be pervasive, with significant advancements expected in machine learning, natural language processing, and robotics.' },
                { type: 'h2', content: 'Comparative Analysis of AI Models' },
                { type: 'table', headers: ['Model Type', 'Primary Use Case', 'Development Status'], rows: [
                    ['Generative Adversarial Networks (GANs)', 'Image & Data Generation', 'Rapidly Evolving'],
                    ['Transformers (e.g., GPT series)', 'Natural Language Understanding', 'State-of-the-Art'],
                    ['Reinforcement Learning', 'Autonomous Systems & Games', 'Mature but Specialized']
                ]},
                { type: 'p', content: 'Each model has unique strengths. The convergence of these technologies is expected to unlock unprecedented capabilities.' }
            ]
        },
        'healthy recipes': {
            title: 'Quick & Healthy Recipe Collection',
            meta: 'Topic Complexity: Low',
            sections: [
                { type: 'h2', content: 'Nourish Your Body' },
                { type: 'p', content: 'Eating healthy doesn\'t have to be complicated. Here are some simple, delicious recipes that you can make in under 30 minutes, curated by our Weaver engine.' },
                { type: 'image', src: 'https://picsum.photos/seed/healthy-food/800/400', alt: 'A vibrant, healthy meal' },
                { type: 'h2', content: 'Quinoa Salad with Lemon Vinaigrette' },
                { type: 'p', content: 'A refreshing and protein-packed salad perfect for lunch.'},
                { type: 'list', items: ['1 cup cooked quinoa', '1 cucumber, diced', '1 cup cherry tomatoes, halved', '1/4 cup feta cheese', 'For the dressing: 3 tbsp olive oil, 1 lemon (juiced), salt & pepper'] },
                { type: 'blockquote', content: 'A balanced diet is a cornerstone of a healthy lifestyle. - Simulated Health Expert'}
            ]
        },
        // A default response for any other query
        default: {
            title: 'Dynamically Generated Page',
            meta: 'Topic Complexity: Simulated Medium',
            sections: [
                { type: 'h2', content: 'Introduction' },
                { type: 'p', content: 'This page provides a comprehensive overview of the requested topic, compiled from simulated top-tier sources across the web. The AI Web Weaver has structured this information for clarity.' },
                { type: 'image', src: 'https://picsum.photos/seed/default-topic/800/400', alt: 'Abstract concept art' },
                { type: 'p', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { type: 'h2', content: 'Key Aspects' },
                { type: 'list', items: ['First key point synthesized from multiple sources.', 'Second crucial detail, often overlooked.', 'A third, data-driven insight.'] }
            ]
        }
    };

    /**
     * Simulates fetching structured data from an API.
     * @param {string} queryKey - The normalized search query.
     * @returns {Promise<object>} A promise that resolves with the content object.
     */
    const fetchSimulatedData = (queryKey) => {
        return new Promise(resolve => {
            // Simulate network latency
            setTimeout(() => {
                const data = mockApiDatabase[queryKey] || {
                    ...mockApiDatabase.default,
                    title: queryKey.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') // Capitalize title
                };
                resolve(data);
            }, 800);
        });
    };

    /**
     * Takes a structured data object and builds an HTML string from it.
     * @param {object} data - The content data object from the mock API.
     * @returns {string} The fully constructed HTML string for the page.
     */
    const buildHtmlFromData = (data) => {
        let html = `<div class="generated-content">`;
        html += `<h1>${data.title}</h1>`;
        html += `<p class="meta-info">Generated on: ${new Date().toLocaleDateString()} | ${data.meta}</p>`;

        data.sections.forEach(section => {
            switch (section.type) {
                case 'h2':
                    html += `<h2>${section.content}</h2>`;
                    break;
                case 'p':
                    html += `<p>${section.content}</p>`;
                    break;
                case 'image':
                    html += `<img src="${section.src}" alt="${section.alt}" class="content-image">`;
                    break;
                case 'list':
                    html += '<ul>';
                    section.items.forEach(item => { html += `<li>${item}</li>`; });
                    html += '</ul>';
                    break;
                case 'blockquote':
                    html += `<blockquote>${section.content}</blockquote>`;
                    break;
                case 'callout':
                    html += `<div class="callout"><p>${section.content}</p></div>`;
                    break;
                case 'table':
                    html += '<table class="data-table"><thead><tr>';
                    section.headers.forEach(header => { html += `<th>${header}</th>`; });
                    html += '</tr></thead><tbody>';
                    section.rows.forEach(row => {
                        html += '<tr>';
                        row.forEach(cell => { html += `<td>${cell}</td>`; });
                        html += '</tr>';
                    });
                    html += '</tbody></table>';
                    break;
            }
        });

        html += `</div>`;
        return html;
    };

    const generateNewPage = async (queryKey) => {
        // 1. Fetch the structured data from our simulated API
        const pageData = await fetchSimulatedData(queryKey);

        // 2. Build the HTML from this data
        const generatedHTML = buildHtmlFromData(pageData);

        // 3. Save and render the page
        pageDatabase[queryKey] = generatedHTML;
        renderPage(queryKey);
        updateGeneratedPagesList();
    };

    const handleSearchRequest = async () => {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('Please enter a topic to weave a page.');
            return;
        }

        renderLoadingState(query);
        const queryKey = query.toLowerCase();

        if (pageDatabase[queryKey]) {
            setTimeout(() => renderPage(queryKey), 500); // Quick load for existing pages
        } else {
            await generateNewPage(queryKey);
        }
    };

    const renderPage = (queryKey) => {
        contentDisplay.style.opacity = '0';
        setTimeout(() => {
            contentDisplay.innerHTML = pageDatabase[queryKey];
            contentDisplay.style.opacity = '1';
        }, 300);
    };

    const updateGeneratedPagesList = () => {
        pagesList.innerHTML = '';
        const pageKeys = Object.keys(pageDatabase);

        if (pageKeys.length === 0) {
            pagesList.innerHTML = '<li class="no-pages">No pages have been generated yet.</li>';
            return;
        }

        pageKeys.forEach(key => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            link.dataset.queryKey = key;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                renderPage(e.target.dataset.queryKey);
            });

            listItem.appendChild(link);
            pagesList.appendChild(listItem);
        });
    };

    const renderLoadingState = (query) => {
        contentDisplay.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <h4>Weaving the web for: "${query}"</h4>
                <p>Simulating data aggregation and content structuring...</p>
            </div>
        `;
    };

    const injectDynamicStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .loading-container { text-align: center; padding: 2rem; }
            .spinner { margin: 0 auto 1.5rem auto; border: 6px solid #f3f3f3; border-top: 6px solid #3a7bd5; border-radius: 50%; width: 50px; height: 50px; animation: spin 1.5s linear infinite; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    };

    // --- INITIALIZATION ---
    searchButton.addEventListener('click', handleSearchRequest);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearchRequest();
        }
    });

    injectDynamicStyles();
});