import { CourseModel, ICourse } from "../course/model/course.model";
import { CategoryDto } from "./dto/category.dto";
import { CategoryModel, ICategory } from "./model/category.model";
import { isValidObjectId, ObjectId } from "mongoose";
import createHttpError from "http-errors";


class categoryService {
    constructor(
        private categoryModel = CategoryModel<ICategory>,
    ) { }
    
    async createCategory(category: CategoryDto): Promise<object>{

        const {title, parent, type} = category

        console.log(typeof(category.parent));

        if (await CategoryModel.findOne({title}, {__v: 0, parent: 0}) ) {
            throw new Error(
                'این دسته بندی با این عنوان وجود دارد',
            );
        }
        if (parent && !await CategoryModel.findOne({_id: parent})) {
            throw new Error("پرنت وجود ندارد")
        }
        
        if(!parent){
            const category = await CategoryModel.create({title})
            //if(!category) throw createHttpError.InternalServerError("خطای داخلی")
                const result = await this.categoryModel.create({
                    title: category.title,
                    type: category.type
                })
        }else{
            const category = await CategoryModel.create({title, parent})
            //if(!category) throw createHttpError.InternalServerError("خطای داخلی")
                const result = await this.categoryModel.create({
                    title: category.title,
                    parent: category.parent,
                    type: category.type
                })

        }
        return {status:201, message: "دسته بندی با موفقیت افزوده شد"}
    }
    async updateCategoy(id: String,category:CategoryDto): Promise<object>{


        const {title, parent, type} = category
        if(!parent){
            let result = await this.categoryModel.updateOne({_id: id}, {$set: {title, type}})
        }else {
            let result = await this.categoryModel.updateOne({_id: id}, {$set: {title, parent, type}})
        }
        //if(!result) throw createHttpError.InternalServerError("به روز رسانی دسته بندی انجام نشد")
        return {status:200, message: "دسته بندی با موفقیت اپدیت افزوده شد"} 
        
    }
    async deleteCategory(id: String): Promise<object>{

        const result = await this.categoryModel.deleteOne({_id: id})
        //if(!result) throw createHttpError.InternalServerError("به روز رسانی دسته بندی انجام نشد")
        return {status:200, message: "دسته بندی با موفقیت حذف افزوده شد"} 
        
    }
    async findOneById(id: ObjectId) {
        const category = await this.categoryModel.findById({_id: id});
        if (!category) throw createHttpError.NotFound("کتگوری یافت نشد");
        return category;
    }

    async getChildern(nameParent: string) {
        console.log(typeof(nameParent));
        const category = await this.categoryModel.find({parent: nameParent});
        if (!category) throw createHttpError.NotFound("کتگوری یافت نشد");
        return category;
    }
    async getAllCategory() {
        const category = await this.categoryModel.find();
        if (!category) throw createHttpError.NotFound("کتگوری یافت نشد");
        return category;
    }


}


const categoryServices = new categoryService()

export {
    categoryServices
}


