const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const mutationScript = process.argv[2];

if (!mutationScript) {
    console.error('Usage: node safe_push.js <mutation_script.js>');
    process.exit(1);
}

const BACKUP_DIR = path.join(__dirname, 'backups');
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(BACKUP_DIR, `backup_${timestamp}.tar.gz`);

try {
    // 1. Pre-push Backup (Full Dataset)
    console.log('[SAFE PUSH] Starting pre-push backup...');
    execSync(`npx sanity dataset export production "${backupFile}"`, { stdio: 'inherit' });
    console.log(`[SAFE PUSH] Backup saved to ${backupFile}`);

    // 2. Execute the actual mutation
    console.log(`[SAFE PUSH] Executing mutation script: ${mutationScript}...`);
    execSync(`npx sanity exec "${mutationScript}" --with-user-token`, { stdio: 'inherit' });
    
    // 3. Post-push Sync (Update Local Stable State)
    console.log('[SAFE PUSH] Mutation successful. Syncing local stable state...');
    execSync(`npx sanity exec scratch/sync_stable_state.js --with-user-token`, { stdio: 'inherit' });

    // 4. Log the operation
    const logEntry = {
        timestamp: new Date().toISOString(),
        script: mutationScript,
        backup: backupFile,
        status: 'SUCCESS'
    };
    const logPath = path.join(__dirname, 'sanity_log.json');
    const logs = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath)) : [];
    logs.push(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

    console.log('[SAFE PUSH] Operation completed successfully.');

} catch (err) {
    console.error('[SAFE PUSH] CRITICAL ERROR:', err.message);
    process.exit(1);
}
