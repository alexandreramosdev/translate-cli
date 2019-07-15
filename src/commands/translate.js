module.exports = {
  name: 'translate',
  alias: ['trans'],
  run: async toolbox => {
    const credential = require('../../credentials/language-translator.json')
    const TranslatorV3 = require('ibm-watson/language-translator/v3')
    const translator = new TranslatorV3({
      iam_apikey: credential.iam_apikey,
      url: credential.url,
      version: credential.version
    })
    const { print, parameters } = toolbox

    translator.translate(
      {
        text: parameters.first.toLowerCase(),
        source: parameters.second || 'en',
        target: parameters.third || 'pt'
      }
    )
      .then(translation => print.info(`> ${translation.translations[0].translation}\n`))
      .catch(err => print.error('error', err))
  }
}
