const Courses = require('../model/courses');
const {Op} = require('sequelize');
const {errorHandler} = require('../config/errorHandler')

module.exports.create = async (req, res, next)=>{
    try {
        if(!req.user || req.user.isSuperadmin===false){
            throw new errorHandler("Not Authorized to Add course!!", 401)
        }
        const existingCourse = await Courses.findOne({where:{
            title: req.body.title
        }});

        if(existingCourse){
            throw new errorHandler("Same Name course is exist already!!", 400)
        }

        const newCourse = await Courses.create(req.body);
        return res.status(200).json({
            message: "Course has been created!!",
            success: true,
            course: newCourse
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports.update = async (req, res, next)=>{
    try {
        if(!req.user || req.user.isSuperadmin===false){
            throw new errorHandler("Not Authorized to update the course!!", 401)
        }
        const findCourse = await Courses.findByPk(req.params.id);
        if(!findCourse){
            throw new errorHandler("Course is does not exist or not found", 400)
        }
        await Courses.update(req.body, {where:{
            id: findCourse.id
        }});

        const updatedCourse = await Courses.findByPk(findCourse.id)
        return res.status(200).json({
            message: "Course updated Successfully!!",
            success: true,
            course: updatedCourse
        })
    } catch (error) {
        next(error)
    }
}

module.exports.delete = async (req, res, next)=>{
    try {
        if(!req.user || req.user.isSuperadmin===false){
            throw new errorHandler("Not Authorized to Delete the course!!", 401)
        }
        const findCourse = await Courses.findByPk(req.params.id);
        if(!findCourse){
            throw new errorHandler("Course is does not exist or not found", 400)
        }
        const deletedItem = await findCourse.destroy();
        return res.status(200).json({
            message: "Item Deleted successfully!!",
            success: true,
            course: deletedItem
        })
    } catch (error) {
        next(error)
    }
}

module.exports.viewCourse = async (req, res, next)=>{
    try {
        const page = req.query.page? parseInt(req.query.page):1;
        const limit = req.query.limit? parseInt(req.query.limit):2;
        const offset = (page-1)*limit;

        const getCourses = await Courses.findAndCountAll({
            limit: limit,
            offset: offset
        })
        if(!getCourses){
            throw new errorHandler("Course not exist or not available!!", 400)
        }
        return res.status(200).json({
            message: "Courses lists!!",
            success: true,
            courses: getCourses.rows,
            totalCount: getCourses.count,
            currentPage: page,
            totalPages: Math.ceil(getCourses.count/limit)
        })
    } catch (error) {
        next(error)
    }
}

module.exports.filteredData = async (req, res, next)=>{
    try {
        let {page = 1, limit=2, category, level, popularity} = req.query;
        

        const whereClause = {};
        
        if(category){
            whereClause.category = category;
        }
        if(level){
            whereClause.level = level;
        }
        if(popularity){
            whereClause.popularity = {[Op.lte]:popularity}
        }

        const courses = await Courses.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: (page-1)*limit,
            order: [['createdAt', 'DESC']]
        })

        if(!courses){
            throw new errorHandler("Corses not found or does not exist!!", 400)
        }

        return res.status(200).json({
            message: "Here is the filtered data!!",
            success: true,
            courses: courses.count,
            totalPage: Math.ceil(courses.count/limit),
            currentPage: page,
            courses: courses.rows
        })
    } catch (error) {
        next(error)
    }
}