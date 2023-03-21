import Person from "../authModel/Person.js";
import NewsService from "../News/NewsService.js";
import News from "../News/News.js";

class ProfileController {
    async addNews(req, res) {
        try {
            const {newsId} = req.body;
            const user = await Person.findOne({_id: req.user._id});
            let isAlreadyHave = user.savedNews.toString().split(',').includes(newsId);
            if(isAlreadyHave) return res.status(400).json({message: 'the news has already added'})
            const news = await NewsService.getOne(newsId);
            await user.savedNews.push(news);
            await user.save();
            return res.status(200).json({news})
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

    async getSavedNews(req, res) {
        try {
            const userId = req.user._id;
            const user = await Person.findOne({_id: userId});
            const wtf = user.savedNews.toString().split(',');
            let result = [];
            for (let i of wtf) {
                let temp = await NewsService.getOne(i);
                result.push(temp)
            }
            return res.status(200).json(result)
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

    async deleteNews(req, res) {
        try {
            const {newsId} = req.query;
            const user = await Person.findOne({_id: req.user._id});
            let isAlreadyHave = user.savedNews.toString().split(',').includes(newsId);
            if(!isAlreadyHave) return res.status(400).json({message: 'cannot found news'})
            await Person.findOneAndUpdate({_id: req.user._id}, {$pull: {savedNews: newsId}});
            await user.save();
            return res.status(200).json({message: 'all ok'})
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

}

export default new ProfileController();