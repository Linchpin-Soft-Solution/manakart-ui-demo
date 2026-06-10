/* Fetch relevant, freely-licensed product photos from Wikimedia Commons
   and download them into public/images, then write a manifest the app reads.
   Run: node scripts/fetch-images.mjs */
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'images')

// product id -> curated Commons search query (most specific shot wins)
const PRODUCTS = {
  'brass-diya': 'brass diya oil lamp',
  'jute-tote': 'jute bag',
  'peanut-chikki': 'chikki peanut brittle',
  'cotton-fabric': 'cotton cloth textile',
  'spices-combo': 'indian spices',
  'terracotta-planter': 'terracotta flower pot',
  'brass-urli': 'brass bowl india',
  'jute-sack': 'jute sacks',
  'turmeric-whole': 'turmeric rhizome root',
  'handloom-stack': 'handloom cloth fabric india',
  'jaggery-block': 'jaggery gur',
  'blue-pottery-set': 'blue pottery jaipur',
}

// art key -> query (vendor covers/avatars, deal banners, fallbacks)
const ARTS = {
  diya: 'brass lamp diya lit',
  pottery: 'terracotta pottery',
  spices: 'indian spice market',
  textile: 'indian handloom cloth',
  basket: 'bamboo basket handmade india',
  jute: 'jute sacks stacked',
  chikki: 'indian sweets traditional',
  grain: 'grain sacks market',
}

const BAD = /(map|logo|icon|seal|coat[_ ]of[_ ]arms|flag|chart|diagram|location|locator|svg|award|presenting|presentation|ceremony|minister|function|sherd|museo|museum|egizio|cat|dog|pole|scratch|hemp|kentucky|harvest|xinjiang|field|plantation)/i

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** fetch with retry/backoff on 429 + transient errors */
async function fetchRetry(url, tries = 5) {
  let wait = 1500
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'manakart-demo/1.0 (demo)' } })
      if (res.status === 429) { await sleep(wait); wait *= 2; continue }
      return res
    } catch (e) {
      if (i === tries - 1) throw e
      await sleep(wait); wait *= 2
    }
  }
  throw new Error('429 after retries')
}

async function findImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search` +
    `&gsrsearch=${encodeURIComponent(query)}&gsrlimit=8&gsrnamespace=6` +
    `&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=800&format=json`
  const res = await fetchRetry(url)
  if (!res.ok) throw new Error(`search ${res.status}`)
  const data = await res.json()
  const pages = Object.values(data?.query?.pages ?? {})
  pages.sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
  for (const p of pages) {
    const info = p.imageinfo?.[0]
    if (!info) continue
    if (BAD.test(p.title)) continue
    const mime = info.mime || ''
    if (!/jpeg|png/.test(mime)) continue
    if ((info.thumbwidth ?? 0) < 360) continue
    return { thumburl: info.thumburl, mime, title: p.title }
  }
  return null
}

async function download(url, dest) {
  const res = await fetchRetry(url)
  if (!res.ok) throw new Error(`download ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  // verify magic bytes (JPEG ff d8 / PNG 89 50)
  const ok = (buf[0] === 0xff && buf[1] === 0xd8) || (buf[0] === 0x89 && buf[1] === 0x50)
  if (!ok || buf.length < 3000) throw new Error('not a valid image')
  await writeFile(dest, buf)
  return buf.length
}

async function run() {
  await mkdir(outDir, { recursive: true })
  const manifest = { products: {}, arts: {} }

  const jobs = [
    ...Object.entries(PRODUCTS).map(([k, q]) => ['products', k, q]),
    ...Object.entries(ARTS).map(([k, q]) => ['arts', k, q]),
  ]

  for (const [group, key, query] of jobs) {
    try {
      const hit = await findImage(query)
      if (!hit) { console.warn(`✗ ${key}: no result for "${query}"`); continue }
      const ext = /png/.test(hit.mime) ? 'png' : 'jpg'
      const file = `${group === 'arts' ? 'art-' : ''}${key}.${ext}`
      const bytes = await download(hit.thumburl, join(outDir, file))
      manifest[group][key] = `/images/${file}`
      console.log(`✓ ${key.padEnd(20)} ${(bytes / 1024 | 0)}KB  ${hit.title}`)
    } catch (e) {
      console.warn(`✗ ${key}: ${e.message}`)
    }
    await sleep(1100) // be polite — avoid Commons rate limiting
  }

  await writeFile(join(root, 'src', 'art', 'image-manifest.json'), JSON.stringify(manifest, null, 2))
  console.log(`\nmanifest: ${Object.keys(manifest.products).length} products, ${Object.keys(manifest.arts).length} arts`)
}

run()
