const { getCliClient } = require('sanity/cli');
const fs = require('fs');
const path = require('path');

const client = getCliClient();
const STABLE_STATE_PATH = path.join(__dirname, '..', 'src', 'sanity', 'data', 'stable_state.json');

async function sync() {
    console.log('[STABLE SYNC] Fetching current content from Sanity...');
    try {
        const projects = await client.fetch('*[_type == "project"]');
        const experiences = await client.fetch('*[_type == "experience"]');
        
        // We preserve full objects but sanitize some system fields if needed
        const cleanProjects = projects.map(p => {
            const { _createdAt, _updatedAt, _rev, ...rest } = p;
            return rest;
        });

        const cleanExperiences = experiences.map(e => {
            const { _createdAt, _updatedAt, _rev, ...rest } = e;
            return rest;
        });

        const state = {
            timestamp: new Date().toISOString(),
            projects: cleanProjects,
            experiences: cleanExperiences
        };

        fs.writeFileSync(STABLE_STATE_PATH, JSON.stringify(state, null, 2));
        console.log(`[STABLE SYNC] Local stable state updated: ${STABLE_STATE_PATH}`);
    } catch (err) {
        console.error('[STABLE SYNC] Failed to sync state:', err.message);
    }
}

sync();
