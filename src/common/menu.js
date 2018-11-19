import { isUrl } from '@/utils/tool';

const menuData = [{
		name: 'dashboard',
		icon: 'dashboard',
		path: 'dashboard',
		children: [{
				name: '分析页',
				path: 'analysis',
			},
			{
				name: '监控页',
				path: 'monitor',
			},
			{
				name: '工作台',
				path: 'workplace',
				// hideInBreadcrumb: true,
				// hideInMenu: true,
			},
		],
	},
	{
		name: '素材管理',
		icon: 'form',
		path: 'material',
		children: [{
				name: '内容',
				path: 'substance',
			},
			{
				name: '作者',
				path: 'author',
			}
		]
	},
	//{
	//  name: '异常页',
	//  icon: 'warning',
	//  path: 'exception',
	//  children: [
	//    {
	//      name: '403',
	//      path: '403',
	//    },
	//    {
	//      name: '404',
	//      path: '404',
	//    },
	//    {
	//      name: '500',
	//      path: '500',
	//    },
	//    {
	//      name: '触发异常',
	//      path: 'trigger',
	//      hideInMenu: true,
	//    },
	//  ],
	//},
	{
		name: '系统管理',
		icon: 'setting',
		path: 'sys',
		authority: 'guest',
		children: [{
				name: '权限管理',
				path: 'power',
			},
			{
				name: '数据字典',
				path: 'dict',
			},
			{
				name: '菜单管理',
				path: 'menu',
			},
			{
				name: '用户管理',
				path: 'user',
			}
		],
	},
];

function formatter(data, parentPath = '/', parentAuthority) {
	return data.map(item => {
		let {
			path
		} = item;
		if(!isUrl(path)) {
			path = parentPath + item.path;
		}
		const result = {
			...item,
			path,
			authority: item.authority || parentAuthority,
		};
		if(item.children) {
			result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
		}
		return result;
	});
}

export default formatter(menuData);