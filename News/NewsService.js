import News from "./News.js"

class NewsService {
    async createNews(news) {
        const {title, countLike, authorName, countComment, linkTitle} = news;
        return await News.create({title, countLike, authorName, countComment, linkTitle});
    }

    async getAll() {
        const res = await News.find();
        return res;
    }

    async getNewsPage(page, limit) {
        const items = await News.find({}).limit(limit).skip(limit * (page - 1));
        const totalCount = await News.find().count();
        const res = {
            items,
            totalCount
        }
        return res;
    }
    async getOne(id) {
        if (!id) {
            throw new Error("id id null");
        }
        return await News.findById(id);
    }

    async update(news) {
        if (!news._id) {
            throw new Error('id is null');
        }
        const newsUpdate = await News.findByIdAndUpdate(news._id, news, {new: true});
        return newsUpdate;
    }

    async deleteOne(id) {
        if(!id) {
            throw new Error("id is null");
        }
        const deletedElem = await News.findByIdAndDelete(id);
        return deletedElem;
    }
}

export default new NewsService();