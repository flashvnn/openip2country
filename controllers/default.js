const geoip = require('fast-geoip');


exports.install = function() {
	ROUTE('GET /', function() {
		this.success(false);
	});
	ROUTE('GET /country', ip2country);
};

function ip2country() {
	var self = this;
	var ip = self.query.ip || null;
	!ip && self.invalid(self.success(false));
	ip && geoip.lookup(ip).then(geo => {
		self.success(geo.country);
	}).catch(() => self.success(false));
}
