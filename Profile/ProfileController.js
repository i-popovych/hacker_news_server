import Person from "../authModel/Person.js";

class ProfileController {
    async addNews(req, res) {
        try {
            const userId = req.user._id;
            const {newsId} = req.body;
            const user = await Person.findOne({_id: userId});
            let isHave = user.savedNewsIds.toString().split(',').includes(newsId);
            if (isHave) return res.status(400).json({message: 'the news has already added'})
            user.savedNewsIds.push(newsId);
            await user.save();
            return res.status(200).json({newsId})
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

    async getSavedNews(req, res) {
        try {
            const userId = req.user._id;
            const user = await Person.findOne({_id: userId});
            const newsList = user.savedNewsIds.toString().split(',');
            return res.status(200).json({newsList})
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

    async deleteNews(req, res) {
        try {
            const {newsId} = req.query;
            const user = await Person.findOne({_id: req.user._id});
            let isHave = user.savedNewsIds.toString().split(',').includes(newsId);
            if (!isHave) return res.status(400).json({message: 'cannot found news'})
            const newUser = await Person.updateOne({_id: req.user._id}, {$pull: {savedNewsIds: newsId}} )
            return res.status(200).json({message: 'all ok'})
        } catch (e) {
            return res.status(400).json(e.message);
        }
    }

}

export default new ProfileController();