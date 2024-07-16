import { CourseModel, ICourse } from "../course/model/course.model";
import { CategoryDto } from "./dto/category.dto";
import { CategoryModel, ICategory } from "./model/category.model";
import { isValidObjectId, ObjectId } from "mongoose";
const createError = require("http-errors");

class categoryService {
    constructor(
        private categoryModel = CategoryModel<ICategory>,
    ) { }
    
    // Add a chapter to the desired course
    async createCategory(category: CategoryDto): Promise<object>{
        let parent: CategoryDto ;
        if(category.parent){
            parent = await this.categoryModel.findOne({title: category.parent});
            if(!parent) throw createError.NotFound("dfsdf")  
        }
        const result = await this.categoryModel.create({
            title: category.title,
            parent: category.parent
        })
        return {status:201, message: "دسته بندی با موفقیت افزوده شد"}
    }

    async findOneById(id: ObjectId) {
        const category = await this.categoryModel.findById({_id: id});
        if (!category) throw createError.NotFound("category not found");
        return category;
    }

    async getChildern(nameParent: string) {
        console.log(typeof(nameParent));
        const category = await this.categoryModel.find({parent: nameParent});
        if (!category) throw createError.NotFound("category not found");
        return category;
    }


}


const categoryServices = new categoryService()

export {
    categoryServices
}
