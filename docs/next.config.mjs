/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.png.mcmeta$/,
			use: [
				'json-loader',
			]
		});

		return config;
	}
};

export default nextConfig;
