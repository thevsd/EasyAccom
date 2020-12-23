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
	let post;
	try {
		post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	post.views += 1;

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Post views update failed' });
		return next(err);
	}

	res.json(post);
};

const create = async (req, res, next) => {
	if (req.params.user_id !== req.userData.user_id) {
		res.status(401).json({ message: 'Authorization failed' });
		return;
	}

	var extendDate = new Date();
	extendDate.setDate(extendDate.getDate() + 7);

	const post = new Post({
		user_id: req.params.user_id,
		title: req.body.title,
        address: req.body.address,
        type: req.body.type,
		price: req.body.price,
		priceType: req.body.priceType,
		nearby: req.body.nearby,
		roomType: req.body.roomType,
		roomNum: req.body.roomNum,
		area: req.body.area,
		shared: req.body.shared,
        bath: req.body.bath,
        kitchen: req.body.kitchen,
        ac: req.body.ac,
        balcony: req.body.balcony,
        elec_water: req.body.elec_water,
        others: req.body.others,
        contact: req.body.contact,
		picture: req.file.path,
		rateSum: 0,
		rateCount: 0,
        date: Date.now(),
        status: false,
		rented: false,
		extend_date: extendDate,
		backup_extend: Date.now(),
		pay_to_extend: 0,
		views: 0,
		likes: 0,
	});

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Post creating failed' });
		return next(err);
	}

	res.status(201).json(post);
};

const update = async (req, res, next) => {
	let post;
	try {
		post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (post.user_id !== req.userData.user_id) {
		res
			.status(401)
			.json({ message: 'You are not allowed to modify this post' });
		return;
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
    }
    
    // All fields to update: Fuck this sparta code
    if (!post.status) {
        if (req.body.title) {
            post.title = req.body.title;
        }
        if (req.body.address) {
            post.address = req.body.address;
        }
        if (req.body.proximity) {
            post.proximity = req.body.proximity;
        }
        if (req.body.type) {
            post.type = req.body.type;
        }
        if (req.body.price) {
            post.price = req.body.price;
        }
        if (req.body.area) {
            post.area = req.body.area;
        }
        if (req.body.bath) {
            post.bath = req.body.bath;
        }
        if (req.body.kitchen) {
            post.kitchen = req.body.kitchen;
        }
        if (req.body.ac) {
            post.ac = req.body.ac;
        }
        if (req.body.balcony) {
            post.balcony = req.body.balcony;
        }
        if (req.body.elec_water) {
            post.elec_water = req.body.elec_water;
        }
        if (req.body.others) {
            post.others = req.body.others;
        }
        if (req.body.contact) {
            post.contact = req.body.contact;
        }
    } else {
        if (req.body.rented) {
            post.rented = req.body.rented;
        }
    }

	// Delete old images and replace with new ones (if needed)
	if (req.file) {
		fs.unlink(post.cover, (err) => console.log(err));
		post.picture = req.file.path;
	}

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Update failed' });
		return next(err);
	}
	res.status(200).json(post);
};

const _delete = async (req, res, next) => {
	let post;
	try {
		post = await post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (post.user_id !== req.userData.user_id) {
		res
			.status(401)
			.json({ message: 'You are not allowed to delete this post' });
		return;
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}

	await post.deleteOne(post);
	res.status(201).json({});
};

const like = async (req, res, next) => {
	let post;
	try {
		post = await Post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (req.userData.user_id) {
		res
			.status(401)
			.json({ message: 'You are not logged in!' });
		return;
	}

	if (!post) {
		res.status(404).json({ message: 'Post not found' });
		return;
	}
	
	post.likes += 1;

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Like failed' });
		return next(err);
	}
	res.status(200).json(post);
};

const extend = async (req, res, next) => {
	// Get the current post
	let post;
	try {
		post = await post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if (post.user_id !== req.userData.user_id) {
		res
			.status(401)
			.json({ message: 'You are not allowed to extend this post' });
		return;
	}

	// Get current date
	var pricePerDay = 20000;
	var date = post.extend_date;
	var extendTo = req.body.extend_date;

	var diff = (date.getTime() - extendTo.getTime()) / (1000 * 3600 * 24);
	var price = diff * pricePerDay;

	// Update payment and extended date
	post.backup_extend = extendTo;
	post.pay_to_extend += price;

	try {
		await post.save();
	} catch (err) {
		res.status(500).json({ message: 'Extend failed' });
		return next(err);
	}
	res.status(200).json(post);
};

const rate = async (req, res, next) => {
	// Get the current post
	let post;
	try {
		post = await post.findById(req.params.post_id);
	} catch (err) {
		res.status(500).json({ message: 'Fetch failed' });
		return next(err);
	}

	if(req.userData.user_type === "Owner" ) {
		res.status(401).json({ message: 'Owner cant rate' });
		return;
	}

	post.rateSum += req.body.rating;
	post.rateCount++;
};

exports.getAll = getAll;
exports.getByUser = getByUser;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.delete = _delete;
exports.extend = extend;
exports.like = like;
exports.rate = rate;
