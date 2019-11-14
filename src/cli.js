import arg from 'arg'
import fs from 'fs-extra'

import path from './config'
import { readDir } from './utils'

const parseArgumentsIntoOptions = rawArgs => {
 const args = arg(
   {
     '--update': Boolean,
     '-u': '--update',
   },
   {
     argv: rawArgs.slice(2),
   }
 )

 return {
   updateBaseline: args['--update'] || false,
 }
}

export function cli(args) {
 let options = parseArgumentsIntoOptions(args)

 if (options.updateBaseline) {
   // Only update image if it failed the comparison
   const filesToUpdate = readDir(path.dir.diff)
   if (filesToUpdate) {
     filesToUpdate.forEach(file => {
       fs.copySync(path.dir.comparison + '/' + file, path.dir.baseline + '/' + file)
     })
   }
 }
}
