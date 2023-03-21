import NewsService from "./NewsService.js";

class NewsController {
    async create(req, res) {
        try {
            const news = await NewsService.createNews(req.body);
            res.status(200).json(news);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getRouter(req, res) {
        if (Object.keys(req.query).length) {
            try {
                const news = await NewsService.getNewsPage(req.query.page, req.query.limit);
                res.status(200).json(news);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            try {
                const news = await NewsService.getAll();
                res.status(200).json(news);
            } catch (e) {
                res.status(500).json(e.message);
            }
        }
    }
    async getOne(req, res) {
        try {
            const {id} = req.params;
            const news = await NewsService.getOne(id);
            return res.status(200).json(news)
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const newsUpdate = await NewsService.update(req.body);
            return res.status(200).json(newsUpdate);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async deleteOne(req, res) {
        try {
            const {id} = req.params;
            const deletedElem = await NewsService.deleteOne(id);
            res.status(200).json(deletedElem);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new NewsController();