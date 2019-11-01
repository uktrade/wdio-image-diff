import arg from 'arg'
import fs from 'fs-extra'

import path from './config'

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
   fs.copySync(path.dir.comparison, path.dir.baseline)
 }
}
