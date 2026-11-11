import fs from 'node:fs'
import { isDeepStrictEqual } from 'node:util'

// updatedAt describes a published data change, not each successful API check.
export function writeSnapshotIfChanged(filePath, data) {
    if (fs.existsSync(filePath)) {
        const { updatedAt: _updatedAt, ...previous } = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        if (isDeepStrictEqual(previous, data)) return false
    }

    const temporaryPath = `${filePath}.tmp`
    fs.writeFileSync(temporaryPath, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2))
    fs.renameSync(temporaryPath, filePath)
    return true
}
