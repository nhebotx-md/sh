const k = {
  d: (text) => `\x1b[90m${text}\x1b[0m`, // dim (abu)
  p: (text) => `\x1b[36m${text}\x1b[0m`, // cyan
  s: (text) => `\x1b[32m${text}\x1b[0m`, // success
  e: (text) => `\x1b[31m${text}\x1b[0m`, // error
}

function logCompact(categories) {
  console.log('\n📦 Plugins Loaded\n')

  let total = 0

  for (let cat in categories) {
    const count = categories[cat].length
    total += count

    console.log(`📂 ${cat.padEnd(10)} : ${count}`)
  }

  console.log(`\n└─ Total    : ${total}\n`)
}

function logHeader(title) {
  console.log(`\n${k.s('📦 ' + title)}`)
}

function logPlugin(name, category) {
  console.log(`  ${k.d("├─")} ${k.p(name)} ${k.d(`[${category}]`)}`)
}

function logFooter(total) {
  console.log(`${k.d('└─')} Total: ${total}\n`)
}

module.exports = {
  k,
  logHeader,
  logPlugin,
  logFooter,
  logCompact
}