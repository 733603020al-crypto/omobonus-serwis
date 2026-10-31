// Прикреплённые файлы формы переживают смену языка (полную перезагрузку страницы) через IndexedDB:
// sessionStorage мал (~5 МБ) и раздувает файлы в base64. Запись живёт не дольше 10 минут.

const DB_NAME = 'omobonus-form-files'
const STORE = 'drafts'
const KEY = 'contact'
const MAX_AGE_MS = 10 * 60 * 1000

type StoredFile = { name: string; type: string; lastModified: number; blob: Blob }
type Entry = { ts: number; files: StoredFile[] }

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return reject(new Error('no indexedDB'))
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
    req.onblocked = () => reject(new Error('blocked'))
  })
}

function run<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T> | void): Promise<T | undefined> {
  return openDb().then(
    db =>
      new Promise<T | undefined>((resolve, reject) => {
        const tx = db.transaction(STORE, mode)
        const req = fn(tx.objectStore(STORE))
        tx.oncomplete = () => { db.close(); resolve(req ? req.result : undefined) }
        tx.onerror = tx.onabort = () => { db.close(); reject(tx.error ?? new Error('tx failed')) }
      })
  )
}

/** Кладёт файлы в IndexedDB (rejects, если не получилось). */
export async function saveAttachments(files: File[]): Promise<void> {
  if (!files.length) return clearAttachments()
  const entry: Entry = {
    ts: Date.now(),
    files: files.map(f => ({ name: f.name, type: f.type, lastModified: f.lastModified, blob: f })),
  }
  await run('readwrite', s => s.put(entry, KEY))
}

export async function clearAttachments(): Promise<void> {
  try { await run('readwrite', s => s.delete(KEY)) } catch {}
}

let loadOnce: Promise<File[]> | null = null

/** Читает файлы и сразу очищает хранилище; устаревшие (>10 мин) удаляет. Повторный вызов — тот же результат. */
export function takeAttachments(): Promise<File[]> {
  if (!loadOnce) {
    loadOnce = (async () => {
      try {
        const entry = (await run<Entry>('readonly', s => s.get(KEY) as IDBRequest<Entry>)) as Entry | undefined
        if (!entry) return []
        await clearAttachments()
        if (Date.now() - entry.ts > MAX_AGE_MS) return []
        return entry.files.map(f => new File([f.blob], f.name, { type: f.type, lastModified: f.lastModified }))
      } catch {
        return []
      }
    })()
  }
  return loadOnce
}
