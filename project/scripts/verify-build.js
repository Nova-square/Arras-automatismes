import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';
import mime from 'mime-types';

const DIST_DIR = 'dist';

async function generateIntegrityManifest() {
  const manifest = {
    files: {},
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  };

  async function processDirectory(dir) {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = fullPath.replace(DIST_DIR + '/', '');

      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        const content = await readFile(fullPath);
        const hash = createHash('sha384').update(content).digest('base64');
        const mimeType = mime.lookup(entry.name) || 'application/octet-stream';

        manifest.files[relativePath] = {
          integrity: `sha384-${hash}`,
          size: content.length,
          mimeType
        };
      }
    }
  }

  await processDirectory(DIST_DIR);
  return manifest;
}

async function verifyBuild() {
  try {
    console.log('🔍 Vérification de la build...');

    // Générer le manifeste d'intégrité
    const manifest = await generateIntegrityManifest();
    await writeFile(
      join(DIST_DIR, 'integrity.json'),
      JSON.stringify(manifest, null, 2)
    );

    // Vérifier les fichiers critiques
    const criticalFiles = ['index.html', 'assets/index.js', 'assets/index.css'];
    const missingFiles = criticalFiles.filter(
      file => !manifest.files[file]
    );

    if (missingFiles.length > 0) {
      throw new Error(`Fichiers critiques manquants : ${missingFiles.join(', ')}`);
    }

    // Vérifier la taille des bundles
    const maxBundleSize = 500 * 1024; // 500KB
    const largeBundles = Object.entries(manifest.files)
      .filter(([file, meta]) => 
        file.endsWith('.js') && meta.size > maxBundleSize
      );

    if (largeBundles.length > 0) {
      console.warn('⚠️ Bundles volumineux détectés :');
      largeBundles.forEach(([file, meta]) => {
        console.warn(`  - ${file}: ${(meta.size / 1024).toFixed(2)}KB`);
      });
    }

    console.log('✅ Vérification terminée avec succès');
    console.log(`📦 ${Object.keys(manifest.files).length} fichiers vérifiés`);

  } catch (error) {
    console.error('❌ Erreur lors de la vérification :', error);
    process.exit(1);
  }
}

verifyBuild();