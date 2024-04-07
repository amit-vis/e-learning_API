const {Anthropic} = require('@anthropic-ai/sdk');

// integrated the chat AI
const anthropic = new Anthropic({
    apiKey: process.env.OPEN_API_KEY
})

module.exports = anthropic;