
export const WIDTH = document.body.clientWidth;

export const HEIGHT = document.body.clientHeight;

export const WIDTH_RATE = WIDTH / 1520; //和 设计图之间的换算率

export const HEIGHT_RATE = HEIGHT / 1396; //和 设计图之间的换算率

export const ME_INFO = { name: '浅唱年华',remark:'', type:'me', state: false, stateTxt: '离线', sex: '1', age: 19, birthday: '1993-9-2',  qAge: 3, tel: '17348052002', qq: '1104220796', 
			mail: '1104220796@qq.com', explain: 'IT是条不归路！', headImg: 'me'};


// 获取可编辑div的光标位置
export const  posInsertTxt = (content, type) => {
	var $editor = document.getElementById("editor");
	var $document = $editor.contentDocument || $editor.contentWindow.document;
	var element = $document.body;
	var doc = element.ownerDocument || element.document;
	var win = doc.defaultView || doc.parentWindow;
	var sel;
	if (typeof win.getSelection != "undefined") {//谷歌、火狐
		sel = win.getSelection();
		if (sel.rangeCount > 0) {//选中的区域
			var range = win.getSelection().getRangeAt(0);
			range.deleteContents();
			//文本
			if (type === 'txt') {
				var el = document.createElement("div");
				el.setAttribute('data-img','txt');
            		el.innerHTML = content;
	            var frag = document.createDocumentFragment(), lastNode;
	            if (el.firstChild) {
	            		//这里在虚拟节点位置加入的是 文本节点,不是元素节点
	            		lastNode = frag.appendChild(el.firstChild);
	            }
			}
			//图像
			if (type === 'img') {
				var el = document.createElement("img");
				el.src = content;
				var frag = document.createDocumentFragment(), lastNode;
				lastNode = frag.appendChild(el);
			}
			//图像文字
			if ( type === 'imgTxt' ) {
				var el = document.createElement("div");
				el.innerHTML = content;
				var frag = document.createDocumentFragment(), lastNode;
				lastNode = frag.appendChild(el);
			}
            //在范围初插入节点
            range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            element.focus();
		}
	}
}

