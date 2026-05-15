const { getCliClient } = require('sanity/cli');
const fs = require('fs');
const path = require('path');

const client = getCliClient();
const STABLE_STATE_PATH = path.join(__dirname, '..', 'src', 'sanity', 'data', 'stable_state.json');

async function restore() {
    if (!fs.existsSync(STABLE_STATE_PATH)) {
        console.error('[RESTORE] No stable state file found at:', STABLE_STATE_PATH);
        return;
    }

    const state = JSON.parse(fs.readFileSync(STABLE_STATE_PATH));
    console.log(`[RESTORE] Restoring state from ${state.timestamp}...`);

    for (const project of state.projects) {
        try {
            // Use createOrReplace to ensure we don't duplicate
            await client.createOrReplace({
                ...project,
                _type: 'project'
            });
            console.log(`[RESTORE] Restored project: ${project.title}`);
        } catch (err) {
            console.error(`[RESTORE] Failed to restore project ${project.title}:`, err.message);
        }
    }

    for (const exp of state.experiences) {
        try {
            await client.createOrReplace({
                ...exp,
                _type: 'experience'
            });
            console.log(`[RESTORE] Restored experience: ${exp.company}`);
        } catch (err) {
            console.error(`[RESTORE] Failed to restore experience ${exp.company}:`, err.message);
        }
    }

    console.log('[RESTORE] Restoration complete.');
}

restore();
