const Courses = require('../model/courses');
const User = require('../model/user');
const Enrollment = require('../model/enrollment');
const {EnrollenmentNotify } = require('../config/mailers');
const {errorHandler} = require('../config/errorHandler')

module.exports.create = async (req, res, next)=>{
    try {
        const findCourse = await Courses.findByPk(req.params.id);
        if(!findCourse){
            throw new errorHandler("Course does not exist or not found!!", 400)
        }
        const existingCourse = await Enrollment.findOne({where:{
            userId: req.user.id,
            courseId: findCourse.id
        }})
        if(existingCourse){
            throw new errorHandler("You have already Enrolled in this course!!", 401)
        }
        const newCourse = await Enrollment.create({userId: req.user.id, courseId: findCourse.id});
        await EnrollenmentNotify(req.user.email,req.user.firstName ,findCourse.title)
        return res.status(200).json({
            message: "You have successfully Enrolled the course!",
            success: true,
            course: newCourse,
        })
    } catch (error) {
        next(error)
    }
}

module.exports.view = async (req, res, next)=>{
    try {
        const checkEnrollCourse = await User.findByPk(req.user.id,{
            include:[{
                model: Courses,
                as: 'Courses',
                required: false,
                attributes: ['id', 'title', 'description', 'category', 'level', 'popularity'],
                through: {attributes:[]}
            }]
        })

        if(!checkEnrollCourse){
            throw new errorHandler("Courses not found or you haven't enroll!!", 400)
        }
        return res.status(200).json({
            message: "check you enroll course!!",
            success: true,
            checkEnrollCourse
        })
    } catch (error) {
        next(error)
    }
}

module.exports.removeFromEnrollnment = async (req, res, next)=>{
    try {
        const findCourse = await Enrollment.findOne({where:{
            userId: req.user.id,
            courseId: req.params.courseId
        }});
        if(!findCourse){
            throw new errorHandler("Course is does not exist or not available!!", 400)
        }

        const deletedCourse = await findCourse.destroy();
        return res.status(200).json({
            message: "You have successfull remove this course from your enrollnment!!",
            success: true,
            deletedCourse
        })
    } catch (error) {
        next(error)
    }
}
