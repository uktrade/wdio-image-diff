import Handlebars from 'handlebars'
import fs from 'fs-extra'
import path from 'path'
import paths from '../config/config'

export const generateTemplate = testStatus => {
  Handlebars.registerHelper('testStateIcon', state => {
    if (state === 'pass') {
      return '<span class="success">&#10004;</span>'
    }
    return '<span class="error">&#10006;</span>'
  })

  Handlebars.registerHelper('equal', (lvalue, rvalue, options) => {
    // eslint-disable-next-line no-undef
    if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters")
    if(lvalue != rvalue) {
      return options.inverse(this)
    } else {
      return options.fn(this)
    }
  })

  let templateFile = fs.readFileSync(path.resolve(__dirname, '../reporter/template.hbs'), 'utf8')
  const template = Handlebars.compile(templateFile)

  return template(testStatus)
}

export const createReport = testStatus => {
  const template = generateTemplate(testStatus)
  fs.writeFilSync(paths.report, template)
}
