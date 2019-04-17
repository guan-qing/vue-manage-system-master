function check_strong(sValue) {
    var modes = 0;
    if (sValue.length < 1){
    	return modes;
    }
    if (/\d/.test(sValue)){
    	modes++; //数字
    }
    if (/[a-z]/.test(sValue)){
    	modes++; //小写
    }
    if (/[A-Z]/.test(sValue)){
    	modes++; //大写  
    }
    if (/\W/.test(sValue)){
    	modes++; //特殊字符
    }
    return modes;
}
function check_value(sValue,min,max) {
	var arr=[0,0,0,0,0];
	if (sValue.length>=min && sValue.length<=max){
		arr[0]=1; //max
	}
	if (/\d/.test(sValue)){
		arr[1]=1; //数字
	}
	if (/[a-z]/.test(sValue)){
		arr[2]=1; //小写
	}
	if (/[A-Z]/.test(sValue)){
		arr[3]=1; //大写  
	}
	if (/\W/.test(sValue)){
		arr[4]=1; //特殊字符
	}
	return arr;
}
