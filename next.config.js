const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
	},
});

module.exports = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://boundary.or.kr/api/:path*", // Proxy to Backend
			},
		];
	},
};
