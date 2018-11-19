module.exports = (webpackConfig, env) => {
	// 别名配置
	const data = webpackConfig.resolve.alias;
//	webpackConfig.resolve.extensions = [".js", ".json", ".jsx"];
	webpackConfig.resolve.alias = {
	    '@': `${__dirname}/src`,
	    ...data
	}
	return webpackConfig
}