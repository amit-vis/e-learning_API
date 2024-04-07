module.exports.home = async (req, res)=>{
    return res.status(200).json({
        message: "Welcome to E-Learning Plateform!!",
        success: true
    })
}