exports.page = function(req, res) {
	var query = req.param("page").toLowerCase();
	res.render(query, { title: "Computing Travelling Salesman Problem" }, function(err, body) {
		if(err) {
			res.render('404', { title: "Computing Travelling Salesman Problem" });
		} else {
			res.end(body);
		}
	});
}
