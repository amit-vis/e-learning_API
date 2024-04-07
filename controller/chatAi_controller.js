const anthropic = require('../config/chatAi');
const { errorHandler } = require('../config/errorHandler');

module.exports.query = async (req, res, next) => {
    try {
        const { query } = req.body;
        if(!query){
            throw new errorHandler("Kindly write your question!!", 400)
        }
        const response = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 50,
            temperature:0,
            messages: [{role: 'user', content: query}]
        });
        return res.status(200).json({
            message: "Here is your answer",
            response: response.content // 
        });
    } catch (error) {
        next(error)
    }
};
