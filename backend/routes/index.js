const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/children', function(req, res, next) {
	//res.send(true);
	//res.render('index', { title: 'Express' });
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// router.get("/getimage", function(req, res, next) {
//   let fs = require("fs");
//   fs.readFile("./backend/images/" + req.query.file, function(err, data) {
//     res.writeHead(200, { "Content-Type": "image/jpeg" });
//     res.end(data);
//   });
// });

module.exports = router;
