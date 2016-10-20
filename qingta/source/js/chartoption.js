Number.parseInt = parseInt
Number.isFinite = Number.isFinite || function(value) {
    return typeof value === "number" && isFinite(value);
}
Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
}

function renderToPdf(p) {
	p.then(function(html_){
		/*var formData = new FormData()
		formData.append('file', new File([new Blob([html_])], 'print.html'))
*/
		return Promise.resolve($.ajax({
			url: '/getpdf',
			data: {
				text: html_
			},
			type: 'POST'
		}))

	}).then(function(res){
		if (res.path) {
			var win = window.open(res.path, '_blank')
			//win.focus()
		} else {
			return Promise.reject(new Error(res.error))
		}
	}).catch(function(e){
		alert('渲染失败:' + e.message)
	})
}
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var curYear = (new Date()).getFullYear()

var toInt = Number.parseInt

function makeTenItems(){
	return makeItems(10)
}

function makeItems(length){
	var ret = new Array(length)
	for (var i = 0; i < length ; i++) {
		ret[i] = 0
	}
	return ret
}

function makeYears(){
	var ret = []
	for (var _year = curYear - 9; _year < curYear + 1; _year++) {
		ret.push(_year)
	}
	return ret
}
function makeOddYears(){
	var ret = []
	for (var _year = curYear - 19; _year < curYear + 1; _year+=2) {
		ret.push(_year)
	}
	return ret
}

function yearToIndex(yearStr){
	var _year = toInt(yearStr)
	return 9 - curYear + _year
}

function yearOddToIndex(yearStr){
	var _year = toInt(yearStr)
	return (19 - curYear + _year) / 2 | 0	
}

var _chartOption = {}
function getJSON(json_name, notDefault){
	if (notDefault === undefined) {
		json_name = '../source/chart-options/' + json_name + '.json'
	}

	if (_chartOption[json_name]) {
		return Promise.resolve(_chartOption[json_name])
	} else {
		return Promise.resolve($.getJSON(json_name)).then(function(res){
			_chartOption[json_name] = res 
			return Promise.resolve(res)
		}).catch(function(e){
			return Promise.reject
		})
	}
}

var json_array = [
	'K001', 'K002-1', 'K002-2', 'K003', 'K004-1', 'K004-2', 
	'R001-1', 'R001-2', 'R001-3',
	'J001-1', 'J001-2', 'J002',
	'X001', 'X002-1', 'X003', 'X004', 
	'Z001-1', 'Z001-2', 'Z002', 'Z003',
	'F001', 'F002', 'F003' ]

json_array.forEach(function(json_name){
	getJSON(json_name)
})

var _landEntityCache = null
function getLandEntity(latest) {
	if (latest === true || _landEntityCache === null) {
		return Promise.resolve($.ajax({
			url: '/LandEntity',
			error: function(){}
		})).then(function(res){
			_landEntityCache = res 
			return Promise.resolve(res)
		})
	} else {
		return Promise.resolve(_landEntityCache)
	}
}

getLandEntity().then(function(){})

_prevHash = null
$(window).on('hashchange.landEntityChange', function(){
	if (!_prevHash && _prevHash == '#/unitsBaseDataRepair.html') {
		getLandEntity(true).then(function(){})
	}
	_prevHash = window.location.hash
})


function loadPoints(university, result, points){
	var promises = []
	var _point, _promise
	points.forEach(function(point){
		_point = POINT_MARK[point]
		if (!_point) {
			alert('错误格式')
		}
		_promise = _point(university)
		promises.push(_promise)
	})

	return Promise.all(promises)
	.then(function(formattedData){
		formattedData.forEach(function(item){
			result.push(item)
		})
		return Promise.resolve()
	})
}


var POINT_MARK = {
	"K001": function(university) {
		return Promise.resolve($.ajax({
				url: '/k001',
				data: {
					entity: university.id,
					error: function(){}
				}
			})).then(function(res){
				var result = res.result || []

				var curYear = Number.parseInt(res.year) || curYear

				var years = makeYears()
				var quantities = makeTenItems()
				var moneyArr = makeTenItems()
				var minMoney = Infinity
				result.forEach(function(item){
					var year = toInt(item[0])
					var quantity = toInt(item[1])
					var money = toInt(item[2])
					var index = 9 - (curYear - year)
					quantities[index] = quantity
					moneyArr[index] = money
					if (minMoney > money) {
						minMoney = money
					}
				})

				var minMoney = Number.isFinite(minMoney) ? minMoney : 0
				return Promise.resolve({
					title: '国家自然科学基金总体立项数据分析',
					tabs: [
						{
							name: '总体分析',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart){
								var options_promise = getJSON('K001')
								return options_promise.then(function(res){
									res.xAxis.data = years
									res.series[0].data = quantities
									res.series[1].data = moneyArr
									res.yAxis[1].min = minMoney
									return Promise.resolve(res)
								})
							}
						}
					]
				})
			})
	},
	"K002": function(university) {
		return Promise.all([
			Promise.resolve({
				name: '分年份总体分析',
				options: ['近10年', '近5年', '近3年', '近1年'],
				options_placeholder: "最近年份选择",
				getOptions: function(_option, chart){
					var obj = {'近10年':10, '近5年':5, '近3年':3, '近1年':1} 
					return Promise.all([
						getJSON('K002-1'),
						Promise.resolve($.ajax({
							url: "/k002-1",
							data: {
								"entity": university.id,
								"numofyear": obj[_option]
							}
						}))
					]).then(function(resArr){
						var chartOption = resArr[0]
						var res = resArr[1]

						var _result = res.result || []
						var result = _result.map(function(item){
							return {
								department:item[0],
								quantity:toInt(item[1]),
								money:toInt(item[2])
							}
						})
						result.sort(function(depA, depB){
							return depB.quantity - depA.quantity
						})
						var other = result.slice(3).reduce(function(prev, cur){
							prev.quantity += cur.quantity
							prev.money += cur.money
							return prev
						}, {
							department: "其他学部",
							quantity: 0,
							money: 0
						})
						var ret = result.slice(0, 6).concat(other)

						var colors = chartOption.color

						chartOption.legend.data = ret.map(function(item){
							return item.department
						})
						chartOption.series[0].data = ret.map(function(item, index){
							return {
								name: item.department,
								value: item.quantity,
								itemStyle: {
									normal: {
										color: colors[index]
									}
								}
							}
						})
						chartOption.series[1].data = ret.map(function(item, index){
							return {
								name: item.department,
								value: item.money,
								itemStyle: {
									normal: {
										color: colors[index]
									}
								}
							}
						})
						return Promise.resolve(chartOption)
					})
				}
			}), /* K002-1 */
			Promise.resolve({
				name: '分学部分析',
				options: ["数理科学部", "化学科学部","生命科学部","地球科学部","工程与材料科学部","信息科学部","管理科学部","医学科学部","计划局","联合基金领域","办公室","国际合作局"
				],
				options_placeholder: "学部选择",
				getOptions: function(_option, chart){
					return Promise.all([
							getJSON('K002-2'),
							Promise.resolve($.ajax({
								url: "/k002-2",
								data: {
									entity: university.id,
									department: _option
								}
							}))
						]).then(function(resArr){
							var chartOption = resArr[0]
							var res = resArr[1].result || []

							var quantities = makeTenItems()
							var moneyArr = makeTenItems()
							res.forEach(function(item){
								var index = yearToIndex(item[0])
								var quantity = toInt(item[1])
								var money = toInt(item[2])
								quantities[index] = quantity
								moneyArr[index] = money
							})
							chartOption.xAxis.data = makeYears()
							chartOption.series[0].data = quantities
							chartOption.series[1].data = moneyArr
							return Promise.resolve(chartOption)
						})
				}
			}) /* K002-2 */
		]).then(function(tabs){
			return Promise.resolve({
				title: '国家自然科学基金分学部数据分析',
				tabs: tabs
			})
		})
	},
	"K003": function(university) {
		return Promise.resolve($.ajax({
			url: "/LandNSSFtype"
		})).then(function(_options){
			var options = _options.result || []
			options.unshift('总体')
			return Promise.resolve({
				title: '国家社科基金总体立项数据分析',
				tabs: [
					{
						name: '',
						options: options,
						options_placeholder: "选择类别",
						getOptions: function(_option, chart){
							return Promise.all([
								getJSON('K003'),
								Promise.resolve($.ajax({
									url: "/k003",
									data: _option == '总体' ? {
										entity: university.id
									} : {
										entity: university.id,
										type: _option
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								chartOption.xAxis.data = makeYears()
								var quantities = makeTenItems()
								res.forEach(function(item) {
									var index = yearToIndex(item[0])
									quantities[index] = toInt(item[1])
								})
								chartOption.series[0].data = quantities
								return Promise.resolve(chartOption)
							})
						}
					}
				]
			})
		})
	},
	"K004": function(university) {
		return Promise.all([
			Promise.resolve($.ajax({
				url: '/LandNSSFsubject'
			})).then(function(subjects){
				var options = subjects.result || []
				options.unshift('全部')
				return Promise.resolve({
					name: '分学科立项数分析',
					options: options,
					options_placeholder: "选择学科",
					getOptions: function(option, chart){
						return Promise.all([
							getJSON('K004-1'),
							Promise.resolve($.ajax({
								url: '/k004-1',
								data: option == '全部' ? {
									entity: university.id
								} : {
									entity: university.id,
									subject: option
								}
							}))
						]).then(function(resArr){
							var chartOption = resArr[0]
							var res = resArr[1].result || []

							chartOption.yAxis.data = makeYears()

							var quantities = makeTenItems()
							res.forEach(function(item){
								var index = yearToIndex(item[0])
								quantities[index] = toInt(item[1])
							})
							chartOption.series[0].data.forEach(function(item, index){
								item.value = quantities[index]
							})
							return Promise.resolve(chartOption)
						})
					}
				})
			}),
			Promise.resolve({
				name: '分学科占比分析',
				options: ['近10年', '近5年', '近3年', '近1年'],
				options_placeholder: "选择学科",
				getOptions: function(option, chart){
					var object = { '近10年': 10,'近5年': 5,'近3年': 3,'近1年': 1 }
					return Promise.all([
						getJSON('K004-2'),
						Promise.resolve($.ajax({
							url: "/K004-2",
							data: {
								entity: university.id,
								numofyear: object[option]
							}
						}))
					]).then(function(resArr){
						var chartOption = resArr[0]
						var _res = resArr[1].result || []

						_res = _res.filter(function(item){
							return item[0] !== '' || item[0]
						})

						_res.sort(function(a,b){
							return b[1] - a[1]
						})

						var ret = _res.slice(0,7)
							.map(function(item){
								return {
									subject: item[0],
									value: item[1]
								}
							})
							.concat([
								_res.slice(7).reduce(function(prev, cur){
									prev.value += cur[1]
									return prev
								}, {
									subject: '其他学科',
									value: 0
								})
							])
							.sort(function(a, b){
								return a.value - b.value
							})

						chartOption.legend.data = ret.map(function(item){
							return item.subject
						})
						chartOption.yAxis[0].data = chartOption.legend.data 
						chartOption.series[0].data = ret.map(function(item){
							return {
								name: item.subject,
								value: item.value
							}
						})
						//console.dir(ret)
						chartOption.series[1].data = ret.map(function(item, index){
							return {
								name: item.subject,
								value: item.value,
								itemStyle: {
									normal: {
										color: chartOption.color[index]
									}
								}
							}
						})

						return Promise.resolve(chartOption)
					})
				}
			})
		]).then(function(tabs){
			return Promise.resolve({
				title: '国家社科基金学科数据分析',
				tabs: tabs
			})
		})
	},
	"R001": function(university) {
		return Promise.all([
				Promise.resolve($.ajax({
					url: '/R001-1',
					data: {
						entity: university.id
					}
				})).then(function(res){
					var engineeringAcademy = res.EngineeringAcademy || []
					var sciencesAcademy = res.SciencesAcademy || []
					var years = makeOddYears()
					var eA = makeTenItems()
					var sA = makeTenItems()

					engineeringAcademy.forEach(function(item){
						var index = yearOddToIndex(item[0])
						var persons = toInt(item[1])
						eA[index] = persons
					})
					sciencesAcademy.forEach(function(item){
						var index = yearOddToIndex(item[0])
						var persons = toInt(item[1])
						sA[index] = persons
					})

					return Promise.resolve({
						name: '两院院士数据分析',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							var options_promise = getJSON('R001-1')
							return options_promise.then(function(res){
								res.xAxis.data = years
								res.series[0].data = sA
								res.series[1].data = eA
								return Promise.resolve(res)
							})
						}
					})
				}),
				Promise.resolve($.ajax({
					url: '/R001-2',
					data: {
						entity: university.id
					}
				})).then(function(res){
					var outstandingYouth = res.OutstandingYouth || []
					var changJiangScholar = res.ChangJiangScholar || []
					var years = makeYears()
					var oY = makeTenItems()
					var cS = makeTenItems()

					outstandingYouth.forEach(function(item){
						var index = yearToIndex(item[0])
						var persons = toInt(item[1])
						oY[index] = persons
					})
					changJiangScholar.forEach(function(item){
						var index = yearToIndex(item[0])
						var persons = toInt(item[1])
						cS[index] = persons
					})

					return Promise.resolve({
						name: '杰青&长江数据分析',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							var options_promise = getJSON('R001-2')
							return options_promise.then(function(res){
								res.xAxis.data = years
								res.series[0].data = oY
								res.series[1].data = cS
								return Promise.resolve(res)
							})
						}
					})
				}),
				Promise.resolve($.ajax({
					url: '/R001-3',
					data: {
						entity: university.id
					}
				})).then(function(res){
					var excellentYouths = res.ExcellentYouths || []
					var thousandsYouths = res.ThousandsYouths || []
					var years = makeYears()
					var eY = makeTenItems()
					var tY = makeTenItems()

					excellentYouths.forEach(function(item){
						var index = yearToIndex(item[0])
						var persons = toInt(item[1])
						eY[index] = persons
					})
					thousandsYouths.forEach(function(item){
						var index = yearToIndex(item[0])
						var persons = toInt(item[1])
						tY[index] = persons
					})

					return Promise.resolve({
						name: '优青&青千数据分析',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							var options_promise = getJSON('R001-3')
							return options_promise.then(function(res){
								res.xAxis.data = years
								res.series[0].data = eY
								res.series[1].data = tY
								return Promise.resolve(res)
							})
						}
					})
				})
			]).then(function(tabs){
				return Promise.resolve({
					title: '人才数据分析',
					tabs: tabs
				})
			})
	},
	"J001": function(university) {
		return {
				title: '国家三大奖数据分析 & 教育部科技奖数据分析',
				tabs: [
					{
						name: '国家三大奖数据分析',
						options: ['全部', '第一单位'],
						options_placeholder: "选择单位",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('J001-1'),
								Promise.resolve($.ajax({
									url: '/NationalScience/getSchoolStatistics',
									data: {
										unit: university.id,
										first_unit: option === "全部",
										participate_unit: true
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].data || []
								chartOption.xAxis.data = makeYears()

								var natural = makeTenItems()
								var tech = makeTenItems()
								var science = makeTenItems()
								var all = makeTenItems()

								res.forEach(function(item){
									var index = yearToIndex(item.year)
									if (index < 0) { return }
									natural[index] = item.natural
									science[index] = item.science
									tech[index] = item.tech
									all[index] = item.natural + item.science + item.tech
								})

								chartOption.series[0].data = natural
								chartOption.series[1].data = tech
								chartOption.series[2].data = science
								chartOption.series[3].data = all

								return Promise.resolve(chartOption)
							})
						}
					},
					{
						name: '教育部科技奖数据分析',
						options: ['全部', '第一单位'],
						options_placeholder: "选择单位",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('J001-2'),
								Promise.resolve($.ajax({
									url: '/EducationScience/getSchoolStatistics',
									data: {
										unit: university.id,
										first_unit: option === "全部",
										participate_unit: true
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].data || []

								chartOption.xAxis.data = makeYears()

								var natural = makeTenItems()
								var invention = makeTenItems()
								var tech = makeTenItems()
								var youth = makeTenItems()
								var patent = makeTenItems()
								var all = makeTenItems()

								res.forEach(function(item){
									var index = yearToIndex(item.year)
									if (index < 0) { return }
									natural[index] = item['自然科学奖']
									invention[index] = item['技术发明奖']
									tech[index] = item['科技进步奖']
									youth[index] = item['青年科学奖']
									patent[index] = item['专利奖']
									
									all[index] = item['自然科学奖'] + item['技术发明奖'] + item['科技进步奖'] + item['青年科学奖'] + item['专利奖']
								})
								
								chartOption.xAxis.data = makeYears()
								chartOption.series[0].data = natural
								chartOption.series[1].data = invention
								chartOption.series[2].data = tech
								chartOption.series[3].data = youth
								chartOption.series[4].data = patent
								chartOption.series[5].data = all
								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"J002": function(university) {
		return {
				title: '国家教学成果奖数据分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('J002'),
								Promise.resolve($.ajax({
									url: '/LearnScience/getSchoolStatistics',
									data: {
										unit: university.id
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var _res = resArr[1].data || []

								var res = _res.filter(function(item){
									return !(item['特等奖'] === 0 &&
										item['一等奖'] === 0 &&
										item['二等奖'] === 0)
								}).sort(function(itemA, itemB){
									return itemA.year - itemB.year
								})

								var special = makeItems(res.length)
								var award_1 = makeItems(res.length)
								var award_2 = makeItems(res.length)
								var all = makeItems(res.length)

								res.forEach(function(item, index){
									special[index] = item['特等奖']
									award_1[index] = item['一等奖']
									award_2[index] = item['二等奖'] 
									all[index] = item['特等奖'] + item['一等奖'] + item['二等奖'] 
								})

								chartOption.xAxis.data = res.map(function(item){
									return item.year
								})

								chartOption.series[0].data = special
								chartOption.series[1].data = award_1
								chartOption.series[2].data = award_2
								chartOption.series[3].data = all

								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"X001": function(university) {
		return Promise.resolve($.ajax({
				url: "/X001",
				data: {
					entity: university.id
				}
			})).then(function(res){
				var result = res.result || [[], [], []]
				var turn_one = result[0]
				var turn_two = result[1]
				var turn_three = result[2]

				return {
					title: '学科数据分析',
					tabs: [
						{
							name: '学科数据分析',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X001')
								return options_promise.then(function(res){
									res.xAxis.data = [
										"TOP1", "TOP3", "TOP5", "TOP10", "TOP20", "TOP50"
									]
									res.series[0].data = turn_one 
									res.series[1].data = turn_two
									res.series[2].data = turn_three
									return Promise.resolve(res)
								})
							}
						}
					]
				}
			})
	},
	"X002": function(university) {
		return Promise.resolve($.ajax({
				url: "/esi/get",
				data: {
					unit: university.id
				}
			})).then(function(res){
				var result = res.esi || []

				var _date = new Date()
				var esiData = result.map(function(item){
					var time = item.in_time
					_date.setTime(time)
					var year = _date.getFullYear() + '年' + _date.getMonth() + '月'
					return {
						year: year,
						international_rank: item.international_rank,
						total_reference: item.total_reference,
						total_paper: item.total_paper,
						average_paper: item.average_paper
					}
				})

				return {
					title: 'ESI学科数据总体分析',
					tabs: [
						{
							name: '国际排名趋势',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X002-1')
								return options_promise.then(function(chartOption){
									chartOption.legend.data = ['国际排名趋势']
									chartOption.series.name = '国际排名趋势'
									chartOption.xAxis.data = esiData.map(function(item){
										return item.year
									})
									chartOption.series.data = esiData.map(function(item){
										return item.international_rank
									})
									return Promise.resolve(chartOption)
								})
							}
						},
						{
							name: '总论文数',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X002-1')
								return options_promise.then(function(chartOption){
									chartOption.legend.data = ['总论文数']
									chartOption.series.name = '总论文数'
									chartOption.xAxis.data = esiData.map(function(item){
										return item.year
									})
									chartOption.series.data = esiData.map(function(item){
										return item.total_paper
									})
									return Promise.resolve(chartOption)
								})
							}
						},
						{
							name: '总被引用数',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X002-1')
								return options_promise.then(function(chartOption){
									chartOption.legend.data = ['总被引用数']
									chartOption.series.name = '总被引用数'
									chartOption.xAxis.data = esiData.map(function(item){
										return item.year
									})
									chartOption.series.data = esiData.map(function(item){
										return item.total_reference
									})
									return Promise.resolve(chartOption)
								})
							}
						},
						{
							name: '篇均被引用数',
							options: [],
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X002-1')
								return options_promise.then(function(chartOption){
									chartOption.legend.data = ['篇均被引用数']
									chartOption.series.name = '篇均被引用数'
									chartOption.xAxis.data = esiData.map(function(item){
										return item.year
									})
									chartOption.series.data = esiData.map(function(item){
										return item.average_paper
									})
									return Promise.resolve(chartOption)
								})
							}
						}
					]
				}
			})
	},
	"X003": function(university){
		return Promise.resolve($.ajax({
				url: "/esi/get",
				data: {
					unit: university.id
				}
			})).then(function(res){
				var result = res.esi || []

				var _date = new Date()
				var esiData = {}
				var years = []

				result.forEach(function(item){
					var time = item.in_time
					_date.setTime(time)
					var year = _date.getFullYear() + '年' + _date.getMonth() + '月'

					years.push(year)
					esiData[year] = item.esiNotSelect.map(function(item){
						return {
							name: item.name,
							value: parseFloat(item.percent)*100
						}
					}).sort(function(a, b) {
						return b.value - a.value
					})
				})

				return {
					title: '未入选全球1%学科数据差距分析',
					tabs: [
						{
							name: '',
							options: years,
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X003')
								return options_promise.then(function(chartOption){
									var esiNotSelect = esiData[option] || []
									chartOption.xAxis.data = esiNotSelect.map(function(item){
										return item.name
									})
									chartOption.series.data = esiNotSelect.map(function(item){
										return item.value
									})
									return Promise.resolve(chartOption)
								})
							}
						}
					]
				}
			})
	},
	"X004": function(university){
		return Promise.resolve($.ajax({
				url: "/esi/get",
				data: {
					unit: university.id
				}
			})).then(function(res){
				var result = res.esi || []

				var _date = new Date()
				var esiData = {}
				var years = []

				result.forEach(function(item){
					var time = item.in_time
					_date.setTime(time)
					var year = _date.getFullYear() + '年' + _date.getMonth() + '月'

					years.push(year)
					esiData[year] = item.esiSelect.map(function(item){
						return {
							name: item.name,
							value: parseFloat(item.percent)*100
						}
					}).sort(function(a, b) {
						return a.value - b.value
					})
				})

				return {
					title: '已入选全球1%学科数据分析',
					tabs: [
						{
							name: '',
							options: years,
							options_placeholder: "",
							getOptions: function(option, chart) {
								var options_promise = getJSON('X004')
								return options_promise.then(function(chartOption){
									var esiSelect = esiData[option] || []
									chartOption.xAxis.data = esiSelect.map(function(item){
										return item.name
									})
									chartOption.series.data = esiSelect.map(function(item){
										if (item.value < 10) {
											return {
												itemStyle: {
													normal: {
														color: 'rgb(255, 193, 0)'
													}
												},
												value: item.value
											}
										}
										return item.value
									})
									return Promise.resolve(chartOption)
								})
							}
						}
					]
				}
			})
	},
	"F001": function(university) {
		return {
				title: '年度科技经费总体拨入与支出数据分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('F001'),
								Promise.resolve($.ajax({
									url: '/F001',
									data: {
										entity: university.id
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var in_ = makeItems(8)
								var out_ = makeItems(8)

								var years = new Array(8)
								for (var i = 0; i < 8; i++) {
									years[i] = curYear + i - 7
								}

								res.forEach(function(item){
									var index = item[0] - curYear + 7
									in_[index] = item[1]
									out_[index] = item[2]
								})

								chartOption.xAxis.data = years
								chartOption.series[0].data = in_
								chartOption.series[1].data = out_
								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"F002": function(university) {
		return {
				title: '年度拨入科技经费结构分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('F002'),
								Promise.resolve($.ajax({
									url: '/F002',
									data: {
										entity: university.id
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var goverment = makeItems(8)
								var enter = makeItems(8)
								var other = makeItems(8)

								var years = new Array(8)
								for (var i = 0; i < 8; i++) {
									years[i] = curYear + i - 7
								}

								chartOption.yAxis.data = years

								res.forEach(function(item){
									var index = item[0] - curYear + 7
									goverment[index] = item[1]
									enter[index] = item[2]
									other[index] = item[3]
								})

								chartOption.series[0].data = goverment
								chartOption.series[1].data = enter
								chartOption.series[2].data = other
								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"F003": function(university) {
		return {
				title: '年度科技课题数量与投入人数数据分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('F003'),
								Promise.resolve($.ajax({
									url: '/F003',
									data: {
										entity: university.id
									}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var quantities = makeItems(8)
								var persons = makeItems(8)

								var average = makeItems(8)

								res.forEach(function(item){
									var index = item[0] - curYear + 7
									quantities[index] = item[1]
									persons[index] = item[2]
									average[index] = item[3]
								})

								var number_str = "number"
								var min = Math.min.apply(null, average.filter(function(num){
									return typeof num === number_str
								}))
								var max = Math.max.apply(null, average.filter(function(num){
									return typeof num === number_str
								}))

								var min = (min*100 | 0 - 2) / 100
								var max = (max*100 | 0 + 2) / 100

								if (Number.isNaN(min)) {
									min = "auto"
								} 
								if (Number.isNaN(max)) {
									max = "auto"
								}

								chartOption.xAxis.data = [2008,2009,2010,2011,2012,2013,2014,2015].reverse()
									chartOption.yAxis[1].min = min
									chartOption.yAxis[1].max = max
								chartOption.series[0].data = quantities.reverse()
								chartOption.series[1].data = persons.reverse()
								chartOption.series[2].data = average.reverse()
								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"Z001": function(university) {
		return {
				title: '授权专利数据分析',
				tabs: [
					{
						name: '总体分析',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('Z001-1'),
								Promise.resolve($.ajax({
									url: '/Z001-1',
									data: {
										entity: university.id
									},
									error: function(){}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var quantities = makeTenItems()
								chartOption.xAxis.data = makeYears()

								res.forEach(function(item){
									var index = yearToIndex(item)
									quantities[index] = toInt(item[1])
								})
								chartOption.series[0].data = quantities
								return Promise.resolve(chartOption)
							})
						}
					},
					{
						name: '分项分析',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('Z001-2'),
								Promise.resolve($.ajax({
									url: '/Z001-2',
									data: {
										entity: university.id
									},
									error: function(){}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var invention = makeTenItems()
								var practical = makeTenItems()
								var design = makeTenItems()

								chartOption.xAxis.data = makeYears()

								res.forEach(function(item){
									var index = yearToIndex(item)
									invention[index] = toInt(item[1])
									practical[index] = toInt(item[2])
									design[index] = toInt(item[3])
								})

								chartOption.series[0].data = invention
								chartOption.series[1].data = practical
								chartOption.series[2].data = design

								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"Z002": function(university) {
		return {
				title: '技术转让合同数与收入数据分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('Z002'),
								Promise.resolve($.ajax({
									url: '/Z002',
									data: {
										entity: university.name
									},
									error: function(){}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var quantities = makeItems(8)
								var money = makeItems(8)

								var years = new Array(8)
								for (var i = 0; i < 8; i++) {
									years[i] = curYear + i - 7
								}

								res.forEach(function(item){
									var index = item[0] - curYear + 7
									quantities[index] = item[1]
									money[index] = item[2]
								})

								chartOption.xAxis.data = years


								chartOption.series[0].data = quantities
								chartOption.series[1].data = money

								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	},
	"Z003": function(university) {
		return {
				title: '学术论文发表数量数据分析',
				tabs: [
					{
						name: '',
						options: [],
						options_placeholder: "",
						getOptions: function(option, chart){
							return Promise.all([
								getJSON('Z003'),
								Promise.resolve($.ajax({
									url: '/Z003',
									data: {
										entity: university.name
									},
									error: function(){}
								}))
							]).then(function(resArr){
								var chartOption = resArr[0]
								var res = resArr[1].result || []

								var other = makeItems(8)
								var global_ = makeItems(8)
								var all = makeItems(8)

								var years = new Array(8)
								for (var i = 0; i < 8; i++) {
									years[i] = curYear + i - 7
								}

								res.forEach(function(item){
									var index = item[0] - curYear + 7
									other[index] = item[1]
									global_[index] = item[2]
									all[index] = item[1] + item[2]
								})

								chartOption.xAxis.data = years


								chartOption.series[0].data = other
								chartOption.series[1].data = global_
								chartOption.series[2].data = all

								return Promise.resolve(chartOption)
							})
						}
					}
				]
			}
	}
}