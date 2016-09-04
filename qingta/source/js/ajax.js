
$.ajaxSetup({ 
    type: "POST",
    success: successHandle,
    error: errorHandle
})


function successHandle(data){
    if(data.state == 0){
        alert("操作失败！");
    }

}
function errorHandle(data){
    alert("网络异常！")
}
function askNKRPsta(entitys,type,year1,year2,centermoney1,centermoney2,totalmoney1,totalmoney2,orderby){
    var ajax = $.ajax({
        url: "/askNKRPsta",
        type: "POST",
        traditional:true,
        data:{
        "entitys": entitys, //选择的学校列表
        "type": type,//项目类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "centermoney1":centermoney1,//中央经费左侧
        "centermoney2":centermoney2,//中央经费右侧
        "totalmoney1":totalmoney1,//总经费左侧
        "totalmoney2":totalmoney2,//总经费右侧
        "orderby":orderby//orderby=1按总经费查询 orderby=2按数量排序
        }
    });
    return ajax;
}
function askHSS(subject,name,type,manager,entity,year1,year2,money1,money2,pageindex){
    var ajax = $.ajax({
        url: "/askHSS",
        data:{
        "subject": subject, //项目科目？
        "_class": _class, //项目类别
        "name":name,//项目名称
        "type": type,//项目类型
        "manager":manager,//负责人
        "entity":entity,//机构
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//值为3则返回2001至3000条数据

        }
    });
    return ajax;
}