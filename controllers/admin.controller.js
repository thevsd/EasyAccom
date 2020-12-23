const db = require('../helpers/db');
const Post = db.Post;
const User = db.User;

const permit_update = async (req, res, next) => {

	if (req.userData.user_type !== "Admin") {
		console.log("You are not an Admin!");
		res.status(401).json({ message: 'You are not an Admin!' });
		return;
	}

	let target;
	try {
		target = await User.findOne({ email: req.body.email }, '-password');
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	target.update_permit = true;

	try {
		await target.save();
	} catch (err) {
		res.status(500).json({ message: 'Update permit failed' });
		return next(err);
	}
	res.status(200).json(target);
}

const permit_account = async (req, res, next) => {
	if (req.userData.user_type !== "Admin") {
		console.log(req.userData.user_id);
		res.status(401).json({ message: 'You are not an Admin!' });
		return;
	}

	let target;
	try {
		target = await User.findOne({ email: req.body.email }, '-password');
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	target.status = true;

	try {
		await target.save();
	} catch (err) {
		res.status(500).json({ message: 'Update permit failed' });
		return next(err);
	}
	res.status(200).json(target);
}

const confirmExtend = async (req, res, next) => {
	let post;
	try {
		post = await Post.findById(req.body.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (req.userData.user_type !== "Admin") {
		res
			.status(401)
			.json({ message: 'You are not Admin!' });
		return;
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}
	
	post.extend_date = post.backup_extend;
	post.backup_extend = Date.now();
	post.pay_to_extend = 0;

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Confirm Extend failed' });
		return next(err);
	}
	res.status(200).json(post);
};

const confirm = async (req, res, next) => {
	let post;
	try {
		post = await Post.findById(req.body.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (req.userData.user_type !== "Admin") {
		res
			.status(401)
			.json({ message: 'You are not Admin!' });
		return;
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}
	
	post.status = true;

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Confirm status failed' });
		return next(err);
	}
	res.status(200).json(post);
};

exports.permit_account = permit_account;
exports.permit_update = permit_update;
exports.confirm = confirm;
exports.confirmExtend = confirmExtend;