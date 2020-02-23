const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const OAuth = require('oauth');
const header = {
    "X-Yahoo-App-Id": "vj9IJC6u"
};
const request = new OAuth.OAuth(
    null,
    null,
    'dj0yJmk9bnV2bjlKTWFCNDNiJmQ9WVdrOWRtbzVTVXBETm5VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTA5',
    'a2b554681ea83b02807fa87cbee0ff4da69f1c09',
    '1.0',
    null,
    'HMAC-SHA1',
    null,
    header
);

const port = process.env.PORT || 4000;

app.get('/getDetailsById', (req, res) => {
	request.get(
		`https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${req.query.woeid}&format=json`,
		null,
		null,
		function (err, data) {
			if (err) {
				console.log('error in get details by id api', err);
			} else {
				res.send({
					message: "success",
					data: JSON.parse(data)
				});
			}
		}
	)
});

getDetailsById = id => {
	return new Promise((resolve, reject) => {
		request.get(
			`https://weather-ydn-yql.media.yahoo.com/forecastrss?woeid=${id}&format=json`,
			null,
			null,
			function (err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		)
	});
}

app.get('/getDetailsForMultipleCities', (req, res) => {
	let promises = req.query.woeid.map(id => {
		return getDetailsById(id).then(data => JSON.parse(data));
	});
	Promise.all(promises).then(data => {
		res.send({
			message: "success",
			data
		});
	}).catch(err => console.log('error in get details for multiple cities api', err));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(port);
console.log(`running on ${port}`);