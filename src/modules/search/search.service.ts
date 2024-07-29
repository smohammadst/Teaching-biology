import { BlogModel, IBlog } from "../blog/model/blog.model"
import { CourseModel, ICourse } from "../course/model/course.model"
import { NotFound } from "http-errors"

class SearchService {
    constructor(
        private readonly blogRepository = BlogModel<IBlog>,
        private readonly courseRepository = CourseModel<ICourse>
    ) { }
    
    async searchBlog(query: string | string[] | any) {
        const search = await this.blogRepository.find({
            title: { $regex: ".*" + query + ".*", $options: "i" },
            shortText: { $regex: ".*" + query + ".*", $options: "i" },
            status: true,
        })
        if (!search) throw NotFound("مقاله ایی یافت نشد")
        return { blog: search }
    }

    async searchCourse(query: string | string[] | any) {
        const search = await this.courseRepository.find({
            title: { $regex: ".*" + query + ".*", $options: "i" },
            shortText: { $regex: ".*" + query + ".*", $options: "i" },
            status: true,
        })
        if (!search) throw NotFound("دوره ایی یافت نشد")
        return { course: search }
    }

    async searchAll(query: string | string[] | any) {
        const blog = await this.searchBlog(query)
        const course = await this.searchCourse(query)
        return { blog, course }
    }
}

const searchService = new SearchService

export {
    searchService as SearchService
}