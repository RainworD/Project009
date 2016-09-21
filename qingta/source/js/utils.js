/* 
 * options
 * : getOption(data): echart option
 * : getData() : array
 */
function setChart(domEl, options){
	var chart = echarts.init(domEl)

	var initOption = options[0]

	$(domEl).parent().find('.changeButton.changeButtonTab').click(function(){
		var order = $(this).index()

		var option = options[order]

		chart.clear()
		chart.setOption(
			option.getOption(
				option.getData()))

		$(this).siblings().removeClass('yellow')
		$(this).addClass('yellow')

	}).first().trigger('click')
}

// 将百分数转化为字符串
function transferPercent(val){
	var str = val.toString()
	var dotIndex = str.indexOf('.')
	if (dotIndex == -1) {
		dotIndex = str.length
		str+='.00'
	} else {
		str+='00'
	}
	return str.slice(0, dotIndex+3) + "%"
}