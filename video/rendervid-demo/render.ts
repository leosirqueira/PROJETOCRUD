import {readFileSync} from 'fs';
import {resolve} from 'path';
import {createNodeRenderer} from '@rendervid/renderer-node';
import type {Template} from '@rendervid/core';

async function main() {
  const template: Template = JSON.parse(
    readFileSync(resolve(__dirname, 'template.json'), 'utf-8'),
  );

  const renderer = createNodeRenderer({
    gpu: {rendering: false, encoding: 'auto', fallback: true},
    puppeteer: {args: ['--no-sandbox', '--disable-setuid-sandbox']},
  });

  const outputPath = resolve(__dirname, 'output/projetocrud-hero.mp4');

  const result = await renderer.renderVideo({
    template,
    inputs: {
      badgeText: 'PROJETOCRUD · DEMO',
      headline: 'CRUD completo com\nReact, Express e Postgres',
      feature1: 'Frontend React 19 + React Router',
      feature2: 'API Express 5 com CORS',
      feature3: 'Persistência em PostgreSQL via pg',
      ctaText: 'Ver no GitHub',
      primaryColor: '#38bdf8',
      secondaryColor: '#a78bfa',
    },
    outputPath,
    onProgress: (p) => {
      process.stdout.write(`\r[${p.phase}] ${p.percent.toFixed(1)}%   `);
    },
  });

  console.log(
    `\nDone in ${(result.renderTime / 1000).toFixed(1)}s — ${(result.fileSize / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(`Output: ${outputPath}`);
}

main().catch((err) => {
  console.error('Render failed:', err);
  process.exit(1);
});
