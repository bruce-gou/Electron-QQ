//本地存储
export const SaveLocal = (name, val) => {
	let data = val;
	if(data instanceof Object){
		data = JSON.stringify(data);
	}
	sessionStorage.setItem(name, data);
}
//获取本地存储
export const GetLocal = (name) => {
	return sessionStorage.getItem(name);
}
//删除本地存储
export const DelLocal = (name) => {
	sessionStorage.removeItem(name);
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export function isUrl(path) {
  return reg.test(path);
}