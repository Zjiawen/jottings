/**
 * [动画函数增强版]
 * @param  {Element}   ele      [动画元素]
 * @param  {Object}   opt      [动画属性与目标值]
 * @param  {[Function]} callback [回调函数]
 */
function animate(ele,opt,callback){
    // 自定义属性timerLen记录定时器数量
    ele.timerLen = 0;

    for(var attr in opt){
        ele.timerLen++;
        (function(attr){
            var timerName = attr + 'Timer';//leftTimer,fontSizeTimer
            var target = opt[attr];
            // 添加前先清除之前的同名定时器
            clearInterval(ele[timerName]);


            ele[timerName] = setInterval(function(){
                // 获取当前值
                var current = getCss(ele,attr);

                // 提取单位
                var unit = current.match(/[a-z]*$/)[0];

                // 提取当前值(number)
                current = parseFloat(current);

                // 计算缓冲速度
                var speed = (target-current)/10;


                // 针对opacity属性操作
                if(attr === 'opacity'){
                    speed = speed>0 ? 0.05 : -0.05;
                }else{
                    // 避免speed过小或为0
                    speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
                }

                current = current + speed;

                // 目标值判断
                if(current === target){
                    clearInterval(ele[timerName]);

                    // 重置当前值
                    current = target;

                    ele.timerLen--;

                    // 动画完成后执行回调函数
                    if(typeof callback === 'function' && ele.timerLen === 0){
                        callback();
                    }
                }


                // 设置样式
                ele.style[attr] = current + unit;
            },30)

        })(attr);
    }
}