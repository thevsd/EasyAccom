const fs = require('fs');
const db = require('../helpers/db');
const Post = db.Post;

const getAll = async (req, res, next) => {
	let posts;
	try {
		posts = await Post.find().sort({ date: -1 });
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	res.json(posts);
};

const getByUser = async (req, res, next) => {
	let posts;
	try {
		posts = await Post.find({ user: req.params.user }).sort({ date: -1 });
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}
	if (!posts) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	res.json(posts);
};

const getById = async (req, res, next) => {
	let Post;
	try {
		Post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (!Post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	res.json(Post);
};

const create = async (req, res, next) => {
	if (req.params.user_id !== req.userData.user_id) {
		res.status(401).json({ message: 'Authorization failed' });
		return;
	}

	const Post = new Post({
		user_id: req.params.user_id,
		title: req.body.title,
        address: req.body.address,
        type: req.body.type,
        price: req.body.price,
        proximity: req.body.proximity,
        area: req.body.area,
        bath: req.body.bath,
        kitchen: req.body.kitchen,
        ac: req.body.ac,
        balcony: req.body.balcony,
        elec_water: req.body.elec_water,
        others: req.body.others,
        contact: req.body.contact,
		picture: req.file.path,
        date: Date.now(),
        status: false,
	});

	try {
		await Post.save();
	} catch (err) {
		res.status(500).json({ message: 'Post creating failed' });
		return next(err);
	}

	res.status(201).json(Post);
};

const update = async (req, res, next) => {
	let Post;
	try {
		Post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (Post.user !== req.userData.name) {
		res
			.status(401)
			.json({ message: 'You are not allowed to modify this post' });
		return;
	}

	if (!Post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	if (req.body.title) {
		Post.title = req.body.title;
	}
	if (req.body.content) {
		Post.content = req.body.content;
	}

	Post.date = req.body.date;
	Post.displayDate = req.body.displayDate;

	// Delete old images and replace with new ones (if needed)
	if (req.file) {
		fs.unlink(Post.cover, (err) => console.log(err));
		Post.cover = req.file.path;
	}

	try {
		await Post.save();
	} catch (err) {
		res.status(500).json({ message: 'Update failed' });
		return next(err);
	}
	res.status(200).json(Post);
};

const _delete = async (req, res, next) => {
	let Post;
	try {
		Post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (Post.user !== req.userData.name) {
		res
			.status(401)
			.json({ message: 'You are not allowed to delete this post' });
		return;
	}

	if (!Post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	await Post.deleteOne(Post);
	res.status(201).json({});
};

exports.getAll = getAll;
exports.getByUser = getByUser;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.delete = _delete;
