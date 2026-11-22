// Pre-publish gate: types + real browser scenarios (tests/e2e/critical.mjs) against a running site,
// and a journal line tied to the commit. Usage: node scripts/pre-publish-check.mjs [baseUrl]
// Needs the site running (default http://localhost:3000, npm run dev:turbo). Exit 1 = do not publish.
import { spawnSync } from 'node:child_process'
import { appendFileSync, mkdirSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3000'
const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' }).status === 0
const git = (...a) => spawnSync('git', a, { encoding: 'utf8' }).stdout.trim()

const steps = [
  ['typecheck', () => run('npx', ['tsc', '--noEmit'])],
  ['e2e', () => run('node', ['tests/e2e/critical.mjs', base])],
]
const result = {}
for (const [name, fn] of steps) {
  result[name] = fn() ? 'ok' : 'FAIL'
  if (result[name] === 'FAIL') break
}
const ok = Object.values(result).every((v) => v === 'ok') && Object.keys(result).length === steps.length
mkdirSync('.claude/logs', { recursive: true })
appendFileSync('.claude/logs/pre-publish.log', `${new Date().toISOString()} ${git('rev-parse', '--short', 'HEAD')} ${git('branch', '--show-current')} ${base} ${JSON.stringify(result)} ${ok ? 'PASS' : 'BLOCK'}\n`)
console.log(ok ? '\nPre-publish checks passed.' : '\nPre-publish checks FAILED: publishing blocked.')
process.exit(ok ? 0 : 1)
