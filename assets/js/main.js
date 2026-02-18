import { bus } from './core/EventBus.js';
import { Weaver } from './engine/Weaver.js';

/**
 * Main Entry Point
 * Bootstraps the application components.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Core Engine
    Weaver.init();

    // 2. Cache DOM Elements
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const contentDisplay = document.getElementById('content-display');
    const pagesList = document.getElementById('pages-list');
    const pageCountBadge = document.getElementById('page-count');

    // 3. Setup UI Interaction Logic
    const handleSearch = () => {
        const query = searchInput.value;
        if(query) bus.emit('SEARCH_REQUEST', query);
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // 4. Listen for System Events (The "Dispatcher" Pattern)
    
    // Loading State
    bus.on('UI_LOADING', (query) => {
        contentDisplay.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <h4>Weaving: "${query}"</h4>
                <p>Scanning global networks...</p>
            </div>
        `;
    });

    // Render Content
    bus.on('UI_RENDER_PAGE', (html) => {
        contentDisplay.style.opacity = '0';
        setTimeout(() => {
            contentDisplay.innerHTML = html;
            contentDisplay.style.opacity = '1';
        }, 200);
    });

    // Update Sidebar Library
    bus.on('LIBRARY_UPDATED', (keys) => {
        pagesList.innerHTML = '';
        pageCountBadge.textContent = keys.length;

        keys.forEach(key => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = "#";
            a.textContent = key.toUpperCase();
            a.addEventListener('click', (e) => {
                e.preventDefault();
                // Request existing page
                bus.emit('SEARCH_REQUEST', key);
            });
            li.appendChild(a);
            pagesList.appendChild(li);
        });
    });

    console.log("AI Web Weaver System Online v0.1");
});