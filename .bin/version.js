#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const plist = require('plist')
const semver = require('semver')

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

const PLIST_PATH = path.join(
  __dirname,
  '..',
  'ios',
  'ouchiMessenger',
  'Info.plist',
)
console.log(process.argv)
const section = process.argv[2]

if (!['patch', 'minor', 'major'].includes(section)) {
  process.stderr.write(
    'invalid argument: one of `patch`, `minor` or `section` must be argued.',
  )
  process.exit(1)
}

read(PLIST_PATH)
  .then(data => {
    const thisPList = plist.parse(data.toString())
    const { CFBundleShortVersionString: thisVersion } = thisPList
    const nextSemver = semver.inc(thisVersion, section)

    const nextPList = plist.build({
      ...plist.parse(data.toString()),
      CFBundleShortVersionString: nextSemver,
    })
    return nextPList
  })
  .then(nextPList => write(PLIST_PATH, nextPList))
  .then(() => process.exit(0))
  .catch(err => {
    process.stderr.write(err)
    process.exit(2)
  })
