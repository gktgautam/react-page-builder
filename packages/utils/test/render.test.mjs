import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

function loadTsModule(tsPath) {
  const code = readFileSync(tsPath, 'utf8');
  const { outputText } = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      importsNotUsedAsValues: 'remove'
    }
  });
  const module = { exports: {} };
  const dirname = path.dirname(tsPath);
  function requireTs(p) {
    if (p.startsWith('./') || p.startsWith('../')) {
      const resolved = path.resolve(dirname, p.endsWith('.ts') ? p : p + '.ts');
      return loadTsModule(resolved);
    }
    return require(p);
  }
  vm.runInNewContext(
    outputText,
    { module, exports: module.exports, require: requireTs, __dirname: dirname, __filename: tsPath }
  );
  return module.exports;
}

const renderPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/render.ts'
);
const { renderToHtml } = loadTsModule(renderPath);

test('escapes text content', () => {
  const node = { type: 'Text', props: { desktop: { text: '5 > 3 & 2 < 4' } } };
  const html = renderToHtml(node);
  assert.equal(html, '<p>5 &gt; 3 &amp; 2 &lt; 4</p>');
});

test('escapes quotes in text', () => {
  const node = {
    type: 'Text',
    props: { desktop: { text: '"Hello" & \u0027World\u0027' } }
  };
  const html = renderToHtml(node);
  assert.equal(html, '<p>&quot;Hello&quot; &amp; &#39;World&#39;</p>');
});

test('escapes attribute values', () => {
  const node = {
    type: 'Button',
    props: { desktop: { href: 'https://example.com?a=1&b=2', label: '<Click>' } }
  };
  const html = renderToHtml(node);
  assert.equal(html, '<a href="https://example.com?a=1&amp;b=2">&lt;Click&gt;</a>');
});

test('escapes quotes in attributes', () => {
  const node = {
    type: 'Button',
    props: { desktop: { title: '"Hello" and \u0027World\u0027', label: 'btn' } }
  };
  const html = renderToHtml(node);
  assert.equal(html, '<a title="&quot;Hello&quot; and &#39;World&#39;">btn</a>');
});

test('uses breakpoint overrides', () => {
  const node = {
    type: 'Text',
    props: { desktop: { text: 'Desktop' }, mobile: { text: 'Mobile' } }
  };
  const html = renderToHtml(node, 'mobile');
  assert.equal(html, '<p>Mobile</p>');
});

