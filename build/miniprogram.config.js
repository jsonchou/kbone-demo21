module.exports = {
	origin: 'https://test.miniprogram.com',
	entry: '/',
	router: {
		tmp: ['/'],
		stdSubject: ['/index'],
		stdSubject2: ['/index'],
	},
	redirect: {
		notFound: 'tmp',
		accessDenied: 'tmp',
	},
	generate: {
		app: 'noemit',
		subpackages: {
			kb_subject: ['stdSubject', 'stdSubject2'],
		},
	},
	app: {
		navigationBarTitleText: 'miniprogram-project',
	},
	projectConfig: {
		appid: '',
		projectname: 'kbone-demo21',
	},
	packageConfig: {
		author: 'wechat-miniprogram',
	},
}