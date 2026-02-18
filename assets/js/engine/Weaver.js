import { Database } from '../data/Database.js';
import { bus } from '../core/EventBus.js';
import { Renderer } from '../ui/Renderer.js';

/**
 * Weaver.js
 * The Core Engine. Determines if we look up a page or generate a new one.
 * Holds the logic for the "1 week update" rule (skeleton).
 */

const memory = {}; // Runtime cache

export const Weaver = {
    init: () => {
        bus.on('SEARCH_REQUEST', Weaver.processRequest);
    },

    processRequest: async (query) => {
        const queryKey = query.trim().toLowerCase();
        
        if (!queryKey) return;

        // UI Loading State
        bus.emit('UI_LOADING', query);

        // 1. Check Memory/Cache
        if (memory[queryKey]) {
            console.log('[Weaver] Found in memory.');
            // TODO: Add logic here to check if date > 7 days
            bus.emit('UI_RENDER_PAGE', memory[queryKey].html);
            return;
        }

        // 2. If not in memory, Fetch from "Web" (Database)
        try {
            const rawData = await Database.fetchFromWeb(queryKey);
            
            // 3. Weave the Page (Render)
            const htmlContent = Renderer.buildHtml(rawData);
            
            // 4. Store result
            memory[queryKey] = {
                html: htmlContent,
                timestamp: Date.now(),
                data: rawData
            };

            // 5. Update UI
            bus.emit('UI_RENDER_PAGE', htmlContent);
            bus.emit('LIBRARY_UPDATED', Object.keys(memory));

        } catch (error) {
            console.error(error);
            bus.emit('UI_ERROR', "The Weaver encountered a tangled web.");
        }
    }
};