var pageNumber = 20
	var baseTree = null
	var baseData = null
	Vue.component('fund-apply-code', {
		template: $(fund_apply_code_template).html(),
		data: function(){
			return {
				page: -1,
				table_codes: [],
				hideSearchBar: false,
				search_level: "",
				search_code: "",
				search_name: [],
				search_name_string: "",
				edit_code: "", // 编辑框内代码编号
				edit_name: "", // 编辑框内代码名称
				edit_level: "", // 编辑框内级次, 新增数据时不显示
				selectedFundCode: {
					id: "",
					name: "",
					code: ""
				},
				selectedId: null,
				parentNode_string: "",
				search_str: ""
			}
		},
		methods: {
			searchNode: function(id){
				var zTreeObj = $.fn.zTree.getZTreeObj(id)
				var find = searchAndScrollToNode_(zTreeObj, this.search_str, 'name', 'code')
				if (!find) {
					this.search_str = ""
				}
			},
			closeModifyModal: function(save){
				var self = this
				if (save) {
					if (this.selectedId == null) {
						if (this.edit_code == "" || this.edit_name == "") {
							alert('请完整填写代码编号与名称')
						} else {
							var parentId = this.selectedFundCode.id || null
							var params = null
							if (parentId !== null) {
								params = {
									code: this.edit_code,
									name: this.edit_name,
									parent: parentId
								}
							} else {
								params = {
									code: this.edit_code,
									name: this.edit_name
								}
							}
							var self = this
							Promise.resolve($.ajax({
								url: '/FundCode/add',
								error: function(){},
								data: params 
							})).then(function(res){
								if (res.state == '0') {
									self.initData()
									hideModal($(self.$els.modifymodal))
								} else {
									return Promise.reject(new Error(res.state))
								}
							}).catch(function(e){
								console.dir(e)
								alert('新增申请代码失败')
							})
						}
					} else {
						if (this.edit_code == "" || this.edit_name == "") {
							alert('请完整填写代码编号与名称')
						} else {
							var parentId = this.selectedFundCode.id || null
							var params = null
							if (parentId !== null) {
								params = {
									id: this.selectedId.id,
									code: this.edit_code,
									name: this.edit_name,
									parent: parentId
								}
							} else {
								params = {
									id: this.selectedId.id,
									code: this.edit_code,
									name: this.edit_name
								}
							}
							var self = this
							Promise.resolve($.ajax({
								url: '/FundCode/update',
								error: function(){},
								data: params 
							})).then(function(res){
								if (res.state == '0') {
									self.initData()
									hideModal($(self.$els.modifymodal))
								} else {
									return Promise.reject(new Error(res.state))
								}
							}).catch(function(e){
								console.dir(e)
								alert('修改申请代码失败')
							})
						}
					}
					return
				}
				hideModal($(this.$els.modifymodal))
			},
			openModifyModal: function(code){
				if (code === false) {
					this.selectedId = null
				} else {
					this.selectedId = JSON.parse(JSON.stringify(code))
				}
				if (this.selectedId == null) {
					this.edit_code = ""
					this.edit_name = ""
					this.selectedFundCode.id = ""
					this.selectedFundCode.code = ""
					this.selectedFundCode.name = ""
				} else {
					this.edit_code = code.code
					this.edit_name = code.name
					this.selectedFundCode.id = code.parent_id
					this.selectedFundCode.name = code.parent_name
					this.selectedFundCode.code = code.parent_code
				}
				openModal($(this.$els.modifymodal))
			},
			getPageOrder: function($index){
				return this.page * pageNumber + $index + 1
			},
			getZTreeObj: function(){
				return $.fn.zTree.getZTreeObj('fund-tree')
			},
			getParentZTreeObj: function(){
				return $.fn.zTree.getZTreeObj('fund-parent-tree')
			},
			pushItemToSearch: function(checkedNode){
				var self = this
				var _node = {
					id: checkedNode.id,
					name: checkedNode.name,
					code: checkedNode.code,
					level: checkedNode.level + 1,
					leaf: checkedNode.leaf
				}
				self.search_name.push(_node)
				_node.nodeTree = checkedNode
			},
			removeItemFromSearch: function(node){
				var self = this
				var zTreeObj = self.getZTreeObj()
				zTreeObj.checkNode(node, false, true)
				var checkNodes = zTreeObj.getCheckedNodes()
				self.search_name = []
				checkNodes.forEach(function(node){
					self.pushItemToSearch(node)
				})
			},
			clearSearchQuery: function(){
				var zTreeObj = this.getZTreeObj()
				zTreeObj.checkAllNodes(false)
				zTreeObj.expandAll(false)
				this.search_name = []
				this.search_code = ""
				this.search_level = ""
				this.initPagination()
			},
			openFundCodeParentModal: function(){
				openModal($(this.$els.parentmodal))
			},
			closeFundCodeParentModal: function(save){
				var zTreeObj = this.getParentZTreeObj()
				var selectedNodes = zTreeObj.getSelectedNodes()
				if (selectedNodes.length > 0 && save) {
					var selectedNode = selectedNodes[0]
					this.selectedFundCode.id = selectedNode.id
					this.selectedFundCode.name = selectedNode.name
					this.selectedFundCode.code = selectedNode.code
				} 
				
				hideModal($(this.$els.parentmodal))
			},
			openSearchNameModal: function(){
				openModal($(this.$els.searchmodal))
			},
			closeSearchNameModal: function(){
				hideModal($(this.$els.searchmodal))
			},
			deleteCode: function(code){
				var self = this
				if (confirm('确定删除:"' + code.name + '"吗?')) {
					Promise.resolve($.ajax({
						url: '/FundCode/delete?id=' + code.id
					})).then(function(res){
						if (res.state == '0') {
							self.initData()
						} else {
							alert('删除申请代码失败')
						}
					}).catch(function(e){
						console.dir(e)
						alert('删除申请代码失败')
					})
				}
			},
			initData: function(){
				var self = this
				self.table_codes = []
				Promise.resolve($.ajax({
					url: '/FundCode/get',
					error: function(){}
				})).then(function(res){
					if (res.state == 0) {
						baseTree = res.data
						baseData = transferTreeToArray(baseTree)
						self.initPagination()
						self.initZtree()
					} else {
						return Promise.reject(new Error(res.state))
					}
				}).catch(function(e){
					console.dir(e)
					alert('获取数据失败')
				})
			},
			initZtree: function(){
				var self = this
				console.dir(baseTree)
				$.fn.zTree.init($("#fund-tree"), {
					check:{
						chkStyle:"checkbox",
						enable:true
					},
					view: {
						showIcon: false,
						showLine: false,
						addDiyDom: addDiyDom
					},
					callback: {
						onCheck: function(event, treeId, treeNode){
							var zTreeObj = self.getZTreeObj()
							var checkNodes = zTreeObj.getCheckedNodes()
							self.search_name = []
							checkNodes.forEach(function(node){
								self.pushItemToSearch(node)
							})
						}
					}
				}, baseTree)
				$.fn.zTree.init($("#fund-parent-tree"), {
					check:{
						chkStyle:"checkbox",
						enable:false
					},
					view: {
						showIcon: false,
						showLine: false,
						addDiyDom: addDiyDom
					}
				}, baseTree)
			},
			initPagination: function(length){
				var self = this
				var filtered_data = null
				if (self.search_name.length > 0) {
					filtered_data = self.search_name.map(function(item){
						return {
							name: item.name,
							id: item.id,
							leaf: item.leaf,
							level: item.level,
							code: item.code,
							parent_id: item.nodeTree.id,
							parent_name: item.nodeTree.name
						}
					})
				} else {
					filtered_data = baseData
				}
				if (self.search_code !== "") {
					filtered_data = filtered_data.filter(function(item){
						return item.code.indexOf(self.search_code) !== -1
					})
				}
				if (self.search_level !== "") {
					filtered_data = filtered_data.filter(function(item){
						return item.level == self.search_level
					})
				}
				var length = filtered_data.length
				$('.M-box').pagination({
					totalData: length,
					showData: pageNumber,
					prevContent:'<i class="fa fa-angle-left"></i>',		//上一页内容
					nextContent:'<i class="fa fa-angle-right"></i>',		//下一页内容
					coping: true,
					jump:true,
					callback: function(api){
						var page = api.getCurrent()
						self.page = page - 1
						self.table_codes = JSON.parse(JSON.stringify(filtered_data.slice(self.page * pageNumber, (self.page + 1) * pageNumber)))
					}
				})
				self.page = 0
				self.table_codes = JSON.parse(JSON.stringify(filtered_data.slice(0, 20)))
			}
		},
		watch: {
			search_name: function(val){
				this.search_name_string = val.slice(0, 3).map(function(node){
					return node.name
				}).join(',')
			},
			selectedFundCode: {
				handler: function(val){
					if (val && val.code && val.name) {
						this.parentNode_string = '('+ val.code + ')' + val.name
					} else {
						this.parentNode_string = ""
					}
				},
				deep: true	
			}
		},
		ready: function(){
			this.initData()
		}
	})
	new Vue({
		el: '#fund_apply_code_container'
	})
	
	function transferTreeToArray(tree) {
		var ret = []
		function _addNode(tree, parentTree) { // tree的数组
			tree.forEach(function(subTree){
				ret.push({
					name: subTree.name,
					id: subTree.id,
					leaf: subTree.leaf,
					level: subTree.level,
					code: subTree.code,
					parent_id: parentTree.id,
					parent_name: parentTree.name,
					parent_code: parentTree.code
				})
				_addNode(subTree.children, subTree)
			})
		}
		_addNode(tree, {id: null, name: ""})
		return ret
	}
	function addDiyDom(treeId, treeNode){
		var code_span = $('<span class="node_name node_name-code"></span>')
		code_span.attr('id', 'treeDemo_'+ treeId + '_code')
		  .text(treeNode.code)
		  .insertBefore($('#' + treeNode.tId + "_span"))
	}