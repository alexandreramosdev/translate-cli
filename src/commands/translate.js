module.exports = {
  name: 'translate',
  alias: ['trans'],
  run: async toolbox => {
    require('dotenv').config()
    const TranslatorV3 = require('ibm-watson/language-translator/v3')
    const translator = new TranslatorV3({
      iam_apikey: process.env.API_KEY,
      url: 'https://gateway-syd.watsonplatform.net/language-translator/api/',
      version: '2018-05-01'
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
