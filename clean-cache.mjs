import fs from 'fs';
try {
  fs.rmSync('.next', { recursive: true, force: true });
  console.log('✅ Successfully cleared the corrupted .next cache!');
} catch (e) {
  console.error('❌ Failed to clear cache due to file locks. Please close your running dev server (CTRL+C) and try again.', e.message);
}
