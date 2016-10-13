
$.ajaxSetup({ 
    type: "POST",
    error: errorHandle
})

function beforeHandle(){
    $(".tableContent").removeClass("tableShow");
    $(".beforeSearch").addClass("tableShow").removeClass("searchDo");
    $(".searchUndo").addClass("searchDo");
}
function successHandlesub(){
    $(".unitsContent1").addClass("beforeShowBox");
    $(".beforeShow").addClass("beforeHideBox");
}
function successHandle(data){
   if(data.state==1){
    $(".beforeSearch").removeClass('tableShow').addClass("searchDo");
    $(".tableContent").addClass('tableShow');
    $(".searchUndo").addClass("searchDo");
    return data.result;
    console.log(data.result);
   }
   else{
    $(".beforeSearch").removeClass('tableShow').addClass("searchDo");
    $(".searchUndo").removeClass("searchDo");
    $(".tableContent").removeClass('tableShow');
    }
}
function successHandleSec(data){
   if(data.state==0){
    $(".beforeSearch").removeClass('tableShow').addClass("searchDo");
    $(".tableContent").addClass('tableShow');
    $(".searchUndo").addClass("searchDo");
    return data.result;
    console.log(data.result);
   }
}
function errorHandle(data){
    // alert("网络异常！");
    $(".beforeSearch").removeClass('tableShow').addClass("searchDo");
    $(".searchUndo").removeClass("searchDo");
}
function askNKRPsta(entitys,year1,year2,pageindex,type,centermoney1,centermoney2,totalmoney1,totalmoney2,orderby,schoolOnly){
    var ajax = $.ajax({
        url: "/askNKRPsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "type": type,//项目类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "centermoney1":centermoney1,//中央经费左侧
        "centermoney2":centermoney2,//中央经费右侧
        "totalmoney1":totalmoney1,//总经费左侧
        "totalmoney2":totalmoney2,//总经费右侧
        "orderby":orderby,//orderby=1按总经费查询 orderby=2按数量排序
        "pageindex":pageindex,
        "schoolOnly":schoolOnly
        }
    });
    return ajax;
}
function askNNSFsta(entitys,year1,year2,type,money1,money2,pageindex,orderby,applicationcode){
    var ajax = $.ajax({
        url: "/askNNSFsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "applicationcode": applicationcode,//申请代码
        "entitys": entitys, //选择的学校列表
        "type": type,//项目类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "money1":money1,//经费左侧
        "money2":money2,//经费右侧
        "pageindex":pageindex,//分页数
        "orderby":orderby//orderby=1按总经费查询 orderby=2按数量排序
        }
    });
    return ajax;
}
function askHSS(subject,name,type,manager,entity,year1,year2,money1,money2,pageindex){
    var ajax = $.ajax({
        url: "/askHSS",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
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
function askNKRP(entity,type,name,year1,year2,centermoney1,centermoney2,totalmoney1,totalmoney2,manager){
    var ajax = $.ajax({
        url: "/askNKRP",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "name":name,
            "type":type,
            "year1":year1,
            "year2":year2,
            "entity":entity,
            "manager":manager,
            "totalmoney1":totalmoney1,
            "totalmoney2":totalmoney2,
            "centermoney1":centermoney1,
            "centermoney2":centermoney2
        }
    });
    return ajax;
}
 function LandNKRPstatype(){
    var ajax = $.ajax({
        url: "/LandNKRPstatype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function LandNKRPname(sub){
    var ajax = $.ajax({
        url: "/LandNKRPname",
        type: "POST",
        data:{
        "sub": sub //查询时返回的子串
        }
    })
    return ajax;
}
function LandNSSFtype(){//社科项目类型
    var ajax = $.ajax({
        url: "/LandNSSFtype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
 function LandNSSFsystem(){//社科系统
    var ajax = $.ajax({
        url: "/LandNSSFsystem",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
 function LandNSSFsubject(){//社科学科
    var ajax = $.ajax({
        url: "/LandNSSFsubject",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askNSSFsta(entitys,year1,year2,subject,system,type,pageindex,orderby){//社科统计查询
    var ajax = $.ajax({
        url: "/askNSSFsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//申请科目（还是领域之类的）
        "system": system,//项目系统
        "entitys": entitys, //选择的学校列表
        "type": type,//项目类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex,//分页数
        "orderby":orderby//orderby=1按总经费查询 orderby=2按数量排序
        }
    });
    return ajax;
}
function askNSSF(subject,name,type,manager,entity,year1,year2,pageindex){//社科明细查询
    var ajax = $.ajax({
        url: "/askNSSF",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject, //项目科目？
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
 function LandHSSsubject(){//教育部学科分类
    var ajax = $.ajax({
        url: "/LandHSSsubject",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
 function LandHSStype(){//教育部类型
    var ajax = $.ajax({
        url: "/LandHSStype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askHSSsta(entitys,year1,year2,type,_class,subject,pageindex){//教育部统计查询
    var ajax = $.ajax({
        url: "/askHSSsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科分类
        "_class": _class,//项目类别
        "entitys": entitys, //选择的学校列表
        "type": type,//项目类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askHSS(subject,name,type,manager,entity,year1,year2,_class,pageindex){//教育部明细查询
    var ajax = $.ajax({
        url: "/askHSS",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject, //项目科目？
        "_class": _class,//项目类别
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
function askMPsta( entitys,year1,year2,pageindex,_index1,_index2){
    var ajax = $.ajax({
        url: "/askMPsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "_index1":_index1,//当选批次左侧
        "_index2":_index2,//当选批次右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askMP(entity,name,type,year1,year2,pageindex,_index1,_index2){
    var ajax = $.ajax({
        url: "/askMP",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entity": entity, //当选单位
        "name":name,//姓名
        "type":type,//人才类型
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "_index1":_index1,//当选批次左侧
        "_index2":_index2,//当选批次右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
 function LandMPtype(){
    var ajax = $.ajax({
        url: "/LandMPtype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askSAsta(entitys,year1,year2,subject,pageindex,gender,department,ageofElected1,ageofElected2){
    var ajax = $.ajax({
        url: "/askSAsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科
        "department": department,//学部
        "gender": gender,//性别
        "entitys": entitys, //选择的学校列表
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "ageofElected1":ageofElected1,//当选年龄左侧
        "ageofElected2":ageofElected2,//当选年龄右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
 function LandSAdepartment(){
    var ajax = $.ajax({
        url: "/LandSAdepartment",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askSA(entity,year1,year2,subject,pageindex,gender,department,ageofElected1,ageofElected2,name){
    var ajax = $.ajax({
        url: "/askSA",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科
        "department": department,//学部
        "name": name,//学部
        "gender": gender,//性别
        "entity": entity, //当选学校
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "ageofElected1":ageofElected1,//当选年龄左侧
        "ageofElected2":ageofElected2,//当选年龄右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askCJSchsta(entitys,year1,year2,subject,pageindex){
    var ajax = $.ajax({
        url: "/askCJSchsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科分类
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askCJSch(entity,year1,year2,subject,pageindex,name,type){
    var ajax = $.ajax({
        url: "/askCJSch",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//岗位名称
        "entity": entity, //推荐单位
        "name": name,//教授姓名
        "type":type,//聘任类型
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
 function LandCJschtype(){
    var ajax = $.ajax({
        url: "/LandCJschtype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askTYsta(entitys,year1,year2,subject,pageindex){
    var ajax = $.ajax({
        url: "/askTYsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//专业领域
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askTY(entity,year1,year2,subject,pageindex,name){
    var ajax = $.ajax({
        url: "/askTY",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//专业领域
        "name":name,//姓名
        "entity": entity, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function Landentity0(sub){//依托单位查询
    var ajax = $.ajax({
        url: "/Landentity0",
        type: "POST",
        data:{
        "sub": sub //查询时返回的子串
        }

    });
    return ajax;
}
function LandEntity(){//依托单位显示
    var ajax = $.ajax({
        url: "/LandEntity",
        type: "POST",
        // beforeSend:beforeHandlesub,
        success:successHandlesub,
        data:{
        }
    });
    return ajax;
}
// function askNKRPsta(entitys,type,year1,year2,money1,money2,pageindex,orderby,applicationcode){//重要项目统计查询
//     var ajax = $.ajax({
//         url: "/askNKRPsta",
//         type: "POST",
//         traditional:true,
//         beforeSend:beforeHandle,
//         success:successHandle,
//         data:{
//         "applicationcode": applicationcode,//申请代码
//         "entitys": entitys, //选择的学校列表
//         "type": type,//项目类型
//         "year1":year1,//年度范围左侧
//         "year2":year2,//年度范围右侧
//         "money1":money1,//经费左侧
//         "money2":money2,//经费右侧
//         "pageindex":pageindex,//分页数
//         "orderby":orderby//orderby=1按总经费查询 orderby=2按数量排序
//         }
//     });
//     return ajax;
// }
function LandNNSFtype(){//自然科学基金资助类别
    var ajax = $.ajax({
        url: "/LandNNSFtype",
        type: "POST",
        data:{}

    });
    return ajax;
}
function askNNSF(entity,type,year1,year2,money1,money2,name,manager,pageindex,applicationcode){//自然科学基金查询
    var ajax = $.ajax({
        url: '/askNNSF',
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{

        "applicationcode": applicationcode, //选择的学校列表
        "name":name,//项目名称
        "type": type,//项目类型
        "manager":manager,//负责人
        "entity":entity,//机构
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "money1":money1,//总经费左侧
        "money2":money2,//总经费右侧
        "pageindex":pageindex//值为3则返回2001至3000条数据

        }
    });
    return ajax;
}
function LandSAsubject(sub){
    var ajax = $.ajax({
        url: "/LandSAsubject",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
        }

    });
    return ajax;
}
function LandNNSFname(sub){
    var ajax = $.ajax({
        url: "/LandSAsubject",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
        }

    });
    return ajax;
}
 function LandEAdepartment(){//工程学部
    var ajax = $.ajax({
        url: "/LandEAdepartment",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function askEAsta(entitys,year1,year2,subject,pageindex,gender,department,ageofElected1,ageofElected2){//工程统计
    var ajax = $.ajax({
        url: "/askEAsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科
        "department": department,//学部
        "gender": gender,//性别
        "entitys": entitys, //选择的学校列表
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "ageofElected1":ageofElected1,//当选年龄左侧
        "ageofElected2":ageofElected2,//当选年龄右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askEA(entity,year1,year2,subject,pageindex,gender,department,ageofElected1,ageofElected2,name){//工程明细
    var ajax = $.ajax({
        url: "/askEA",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "subject": subject,//学科
        "department": department,//学部
        "name": name,//学部
        "gender": gender,//性别
        "entity": entity, //当选学校
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "ageofElected1":ageofElected1,//当选年龄左侧
        "ageofElected2":ageofElected2,//当选年龄右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function LandEAsubject(sub){//工程专业
    var ajax = $.ajax({
        url: "/LandEAsubject",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
    }

    });
    return ajax;
}
function LandCJSsubject(sub){//长江岗位
    var ajax = $.ajax({
        url: "/LandCJSsubject",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
        }

    });
    return ajax;
}
function LandTYsubject(sub){
    var ajax = $.ajax({
        url: "/LandTYsubject",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
    }

    });
    return ajax;
}
function askNKSsta(entitys,pageindex){//重点学科统计
    var ajax = $.ajax({
        url: "/askNKSsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askNKS(entity,type,name,pageindex){//重点学科明细
    var ajax = $.ajax({
        url: "/askNKS",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entity": entity, //选择的学校列表
        "type": type, //类型
        "name": name, //项目名称
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askNSsta(entitys,_index,pageindex){//特色专业统计
    var ajax = $.ajax({
        url: "/askNSsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "_index":_index,//当选批次
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askNS(entity,_index,name,pageindex){//特色专业明细
    var ajax = $.ajax({
        url: "/askNS",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entity": entity, //选择的学校列表
        "_index":_index,//当选批次
        "name":name,//专业名称
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askMSDsta(entitys,subject,turn,place1,place2,pageindex){//教育第三轮统计
    var ajax = $.ajax({
        url: "/askMSDsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "subject":subject,//一级学科
        "turn":turn,//批次
        "place1":place1,//排名左
        "place2":place2,//排名右
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askMSD(entity,subject,turn,place1,place2,score1,score2,pageindex){//教育第三轮明细
    var ajax = $.ajax({
        url: "/askMSD",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entity": entity, //选择的学校列表
        "subject":subject,//一级学科
        "turn":turn,//批次
        "place1":place1,//排名左
        "place2":place2,//排名右
        "score1":score1,//学科分数左
        "score2":score2,//学科分数右
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function getStatistics(entitys,year1,year2,first_unit,participate_unit,level){//国家科技奖统计
    var ajax = $.ajax({
        url: "/NationalScience/getStatistics",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "first_unit":first_unit,
            "participate_unit":participate_unit,
            "first_year":year1,
            "last_year":year2,
            "unit":entitys,
            "level":level
        }
    });
    return ajax;
}
function getDetail(type,user,first_user,participate_user,participate_unit,first_year,last_year,name,unit,rows,level,start){//国家科技奖统计
    var ajax = $.ajax({
        url: "/NationalScience/getDetail",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "type":type,
            "user":user,
            "first_user":first_user,
            "participate_user":participate_user,
            "participate_unit":participate_unit,
            "first_year":first_year,
            "last_year":last_year,
            "level":level,
            "name":name,
            "unit":unit,
            "level":level,
            "start":start,
            "rows":rows
        }
    });
    return ajax;
}
function getSearchUnits(sub){//科技奖单位搜索
    var ajax = $.ajax({
        url: "/NationalScience/getUnitLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function getSearchProject(sub){//科技奖项目搜索
    var ajax = $.ajax({
        url: "/NationalScience/getNameLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });getName
    return ajax;
}
function getEducationSearchUnits(sub){//教育奖单位搜索
    var ajax = $.ajax({
        url: "/EducationScience/getUnitLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function getEducationSearchProject(sub){//教育奖项目搜索
    var ajax = $.ajax({
        url: "/EducationScience/getNameLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function getLearnSearchUnits(sub){//教学成果奖单位搜索
    var ajax = $.ajax({
        url: "/LearnScience/getUnitLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function getLearnSearchProject(sub){//教学成果名称搜索
    var ajax = $.ajax({
        url: "/LearnScience/getNameLike",
        type: "POST",
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function educationScienceSta(entitys,year1,year2,first_unit,participate_unit,level){//教育部科技奖统计
    var ajax = $.ajax({
        url: "/EducationScience/getStatistics",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "first_unit":first_unit,
            "participate_unit":participate_unit,
            "first_year":year1,
            "last_year":year2,
            "unit":entitys,
            "level":level
        }
    });
    return ajax;
}
function educationScience(type,user,first_user,participate_user,participate_unit,first_year,last_year,name,unit,rows,level,start){//教育科技奖明细
    var ajax = $.ajax({
        url: "/EducationScience/getDetail",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "type":type,
            "user":user,
            "first_user":first_user,
            "participate_user":participate_user,
            "participate_unit":participate_unit,
            "first_year":first_year,
            "last_year":last_year,
            "level":level,
            "name":name,
            "unit":unit,
            "level":level,
            "start":start,
            "rows":rows
        }
    });
    return ajax;
}
function LearnScienceSta(entitys,year1,year2,first_unit,participate_unit){//教学成果奖统计
    var ajax = $.ajax({
        url: "/LearnScience/getStatistics",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "first_unit":first_unit,
            "participate_unit":participate_unit,
            "first_year":year1,
            "last_year":year2,
            "unit":entitys
        }
    });
    return ajax;
}
function LearnScience(type,user,first_user,participate_user,participate_unit,first_year,last_year,name,unit,rows,level,start){//教学成果奖明细
    var ajax = $.ajax({
        url: "/LearnScience/getDetail",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            "type":type,
            "user":user,
            "first_user":first_user,
            "participate_user":participate_user,
            "participate_unit":participate_unit,
            "first_year":first_year,
            "last_year":last_year,
            "level":level,
            "name":name,
            "unit":unit,
            "level":level,
            "start":start,
            "rows":rows
        }
    });
    return ajax;
}
function askOY(entity,applicationcode,research,manager,year1,year2,pageindex){//杰青明细
    var ajax = $.ajax({
        url: "/askOY",
        type: "POST",
        data:{
        "entity": entity,//学科
        "applicationcode": applicationcode,//学部
        "research": research,//学部
        "manager": manager,//性别
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askOYsta(entitys,year1,year2,applicationcode,schoolOnly,pageindex){//杰青明细
    var ajax = $.ajax({
        url: "/askOYsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        'year1':year1,
        'year2':year2,
        'entitys':entitys,
        'applicationcode':applicationcode,
        'schoolOnly':schoolOnly,
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askEY(entity,applicationcode,research,manager,year1,year2,pageindex){//优青明细
    var ajax = $.ajax({
        url: "/askEY",
        type: "POST",
        data:{
        "entity": entity,//学科
        "applicationcode": applicationcode,//学部
        "research": research,//学部
        "manager": manager,//性别
        "year1":year1,//当选年度左侧
        "year2":year2,//当选年度右侧
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askEYsta(entitys,year1,year2,applicationcode,schoolOnly,pageindex){//优青明细
    var ajax = $.ajax({
        url: "/askEYsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        'year1':year1,
        'year2':year2,
        'entitys':entitys,
        'applicationcode':applicationcode,
        'schoolOnly':schoolOnly,
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askNSFCIG(entity,research,head,year1,year2,money1,money2,pageindex){
    var ajax = $.ajax({
        url: "/askNSFCIG",
        type: "POST",
        data:{
        "entity": entity, //当选单位
        "research":research,//姓名
        "head":head,//人才类型
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "money1":money1,//当选批次左侧
        "money2":money2,//当选批次右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askNSFCIGsta(entitys,year1,year2,money1,money2,pageindex){//国家基金委统计
    var ajax = $.ajax({
        url: "/askNSFCIGsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //当选单位
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "money1":money1,//当选批次左侧
        "money2":money2,//当选批次右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askIT(entity,research,head,year1,year2,pageindex){
    var ajax = $.ajax({
        url: "/askIT",
        type: "POST",
        data:{
        "entity": entity, //当选单位
        "research":research,//姓名
        "head":head,//人才类型
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askITsta(entitys,year1,year2,pageindex){
    var ajax = $.ajax({
        url: "/askITsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "pageindex":pageindex//分页数
        }
    });
    return ajax;
}
function askVC(entity,name,manager,year1,year2,_index1,_index2,pageindex){//公开课明细
    var ajax = $.ajax({
        url: "/askVC",
        type: "POST",
        data:{
        "entity": entity, //选择的学校列表
        "name":name,//当选批次
        "manager":manager,//分页数
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "_index1":_index1,
        "_index2":_index2,
        "pageindex":pageindex
        }
    });
    return ajax;
}
function askVCsta(entitys,year1,year2,_index1,_index2,pageindex){//公开课明细
    var ajax = $.ajax({
        url: "/askVCsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//公布年度左侧
        "year2":year2,//公布年度右侧
        "_index1":_index1,
        "_index2":_index2,
        "pageindex":pageindex
        }
    });
    return ajax;
}
function askNSC(entity,year1,year2,name,manager,pageindex){//共享课明细
    var ajax = $.ajax({
        url: "/askNSC",
        type: "POST",
        data:{
        "entity": entity, //选择的学校列表
        "year1":year1,//当选批次
        "year2":year2,//分页数
        "name":name,
        "manager":manager,
        "pageindex":pageindex
        }
    });
    return ajax;
}
function askNSCsta(entitys,year1,year2,pageindex){//共享课明细
    var ajax = $.ajax({
        url: "/askNSCsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//当选批次
        "year2":year2,//分页
        "pageindex":pageindex
        }
    });
    return ajax;
}
 function LandEYresearch(sub){//优青研究领域搜索
    var ajax = $.ajax({
        url: "/LandEYresearch",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function LandEYapplicationcode(sub){//优青申请代码搜索
    var ajax = $.ajax({
        url: "/LandEYapplicationcode",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function LandOYapplicationcode(sub){//杰青申请代码搜索
    var ajax = $.ajax({
        url: "/LandOYapplicationcode",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function LandOYresearch(sub){//杰青研究领域搜索
    var ajax = $.ajax({
        url: "/LandOYresearch",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function LandITresearch(sub){//教育部创新研究领域搜索
    var ajax = $.ajax({
        url: "/LandITresearch",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function LandNSFCIGresearch(sub){
    var ajax = $.ajax({
        url: "/LandNSFCIGresearch",
        type: "POST",// or GET
        data:{
            "sub":sub
        }
    });
    return ajax;
}
function askCUMOEfund(entitys,year1,year2,totalincoming1,totalincoming2,totalexpenditure1,totalexpenditure2,pageindex){//教育部直属明细查询
    var ajax = $.ajax({
        url: "/askCUMOEfund",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "totalincoming1":totalincoming1,//总拨入左侧
        "totalincoming2":totalincoming2,//总拨入右侧
        "totalexpenditure1":totalexpenditure1,//总拨入左侧
        "totalexpenditure2":totalexpenditure2,//总拨入右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askCUMOEfundsta(entitys,year1,year2,totalincoming1,totalincoming2,totalexpenditure1,totalexpenditure2,pageindex){//教育部直属明细查询
    var ajax = $.ajax({
        url: "/askCUMOEfundsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "totalincoming1":totalincoming1,//总拨入左侧
        "totalincoming2":totalincoming2,//总拨入右侧
        "totalexpenditure1":totalexpenditure1,//总拨入左侧
        "totalexpenditure2":totalexpenditure2,//总拨入右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}

function askPatent(entitys,year1,year2,pageindex,type){//专利数据查询
    var ajax = $.ajax({
        url: "/askPatent",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function CreateOrdinaryAccount(name,password,type,nickname,department,mail,phone,entity){//新增用户数据
    var ajax=$.ajax({
            url: "/CreateOrdinaryAccount",
            type: "POST",
            data:{
                'name':name,
                'password':password,
                'type':type,
                'nickname':nickname,
                'department':department,
                'mail':mail,
                'phone':phone,
                'entity':entity
            }
        });
    return ajax;
}
function UpdateAccount(entity,id,password,type,nickname,department,mail,phone){
    var ajax=$.ajax({
            url: "/UpdateAccount",
            type: "POST",
            data:{
                'id':id,
                'entity':entity,
                'password':password,
                'type':type,
                'nickname':nickname,
                'department':department,
                'mail':mail,
                'phone':phone
            }
        });
    return ajax;
}
function CreateEntityAccount(entity,name,password,type,nickname,department,mail,phone){
    var ajax=$.ajax({
            url: "/CreateEntityAccount",
            type: "POST",
            data:{
                'entity':entity,
                'name':name,
                'password':password,
                'type':type,
                'nickname':nickname,
                'department':department,
                'mail':mail,
                'phone':phone
            }
        });
    return ajax;
}
function GiveAccountfromEntity(entity){//某大学的普通用户信息表
    var ajax=$.ajax({
            url: "/GiveAccountfromEntity",
            type: "POST",
            data:{
                "entity":entity
            }
        });
    return ajax;
}
function GiveEntityAccount(){//某大学的普通用户信息表
    var ajax=$.ajax({
            url: "/GiveEntityAccount",
            type: "POST",
            data:{
            }
        });
    return ajax;
}
function LandNKSname(sub){//重点学科学科名称搜索
    var ajax = $.ajax({
        url: "/LandNKSname",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串
        }
    });
    return ajax;
}
function LandNSname(sub){
    var ajax = $.ajax({
        url: "/LandNSname",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串

        }
    })
    return ajax;
}
 function LandMOESDsubject(){//教育部第三轮学科名称
    var ajax = $.ajax({
        url: "/LandMOESDsubject",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function LandNSCname(sub){//共享课课程名称搜索
    var ajax = $.ajax({
        url: "/LandNSCname",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串

        }
    })
    return ajax;
}
function LandVCname(sub){//公开课课程名称搜索
    var ajax = $.ajax({
        url: "/LandVCname",
        type: "POST",
        data:{

        "sub": sub //查询时返回的子串

     }
    })
    return ajax;
}
function askBD(entitys,year1,year2,nowtotalincome1,nowtotalincome2,nowtotalexpenditure1,nowtotalexpenditure2,totalincome1,totalincome2,totalexpenditure1,totalexpenditure2,pageindex){
    var ajax = $.ajax({
        url: "/askBD",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "nowtotalincome1":nowtotalincome1,//总拨入左侧
        "nowtotalincome2":nowtotalincome2,//总拨入右侧
        "nowtotalexpenditure1":nowtotalexpenditure1,//总拨入左侧
        "nowtotalexpenditure2":nowtotalexpenditure2,//总拨入右侧
        "totalincome1":totalincome1,//总拨入左侧
        "totalincome2":totalincome2,//总拨入右侧
        "totalexpenditure1":totalexpenditure1,//总拨入左侧
        "totalexpenditure2":totalexpenditure2,//总拨入右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askBDsta(entitys,year1,year2,nowtotalincome1,nowtotalincome2,nowtotalexpenditure1,nowtotalexpenditure2,totalincome1,totalincome2,totalexpenditure1,totalexpenditure2,pageindex){
    var ajax = $.ajax({
        url: "/askBDsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "nowtotalincome1":nowtotalincome1,//总拨入左侧
        "nowtotalincome2":nowtotalincome2,//总拨入右侧
        "nowtotalexpenditure1":nowtotalexpenditure1,//总拨入左侧
        "nowtotalexpenditure2":nowtotalexpenditure2,//总拨入右侧
        "totalincome1":totalincome1,//总拨入左侧
        "totalincome2":totalincome2,//总拨入右侧
        "totalexpenditure1":totalexpenditure1,//总拨入左侧
        "totalexpenditure2":totalexpenditure2,//总拨入右侧
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askSTF(entitys,year1,year2,totalincoming1,totalincoming2,sciencefund1,sciencefund2,expenditure1,expenditure2,pageindex){
    var ajax = $.ajax({
        url: "/askSTF",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "totalincoming1":totalincoming1,
        "totalincoming2":totalincoming2,
        "sciencefund1":sciencefund1,
        "sciencefund2":sciencefund2,
        "expenditure1":expenditure1,
        "expenditure2":expenditure2,
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function askSTFsta(entitys,year1,year2,totalincoming1,totalincoming2,sciencefund1,sciencefund2,expenditure1,expenditure2,pageindex){
    var ajax = $.ajax({
        url: "/askSTFsta",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
        "entitys": entitys, //选择的学校列表
        "year1":year1,//年度范围左侧
        "year2":year2,//年度范围右侧
        "totalincoming1":totalincoming1,
        "totalincoming2":totalincoming2,
        "sciencefund1":sciencefund1,
        "sciencefund2":sciencefund2,
        "expenditure1":expenditure1,
        "expenditure2":expenditure2,
        "pageindex":pageindex//分页数

        }
    });
    return ajax;
}
function STtransfer(unit,order,first_year,last_year){//教育部科技奖统计
    var ajax = $.ajax({
        url: "/STtransfer",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandleSec,
        data:{
            'unit':unit,
            'order':order,
            'first_year':first_year,
            'last_year':last_year
        }
    });
    return ajax;
}
function BlogPaperSta(entitys,year1,year2,disciplines,subject){//优博统计
    var ajax = $.ajax({
        url: "/BlogPaper/statistic",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandleSec,
        data:{
            'unit':entitys,
            'disciplines':disciplines,
            'subject':subject,
            'first_year':year1,
            'last_year':year2
        }
    });
    return ajax;
}
 function BlogPaperDisplines(){//学科门类名称
    var ajax = $.ajax({
        url: "/BlogPaper/disciplines",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function BlogPaperDetail(unit,disciplines,first_year,last_year,subject,author,title){//优博明细
    var ajax = $.ajax({
        url: "/BlogPaper/detail",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandleSec,
        data:{
            'unit':unit,
            'disciplines':disciplines,
            'subject':subject,
            'first_year':first_year,
            'last_year':last_year,
            'author':author,
            'title':title
        }
    });
    return ajax;
}
function ImportantRewardsSta(unit,category,first_year,last_year){//重要奖励统计
    var ajax = $.ajax({
        url: "/ImportantRewards/statistic",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandleSec,
        data:{
            'unit':unit,
            'category':category,
            'first_year':first_year,
            'last_year':last_year
        }
    });
    return ajax;
}
function ImportantRewardsDetail(unit,category,first_year,last_year,reward_name,user){//重要奖励明细
    var ajax = $.ajax({
        url: "/ImportantRewards/detail",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandleSec,
        data:{
            'unit':unit,
            'category':category,
            'first_year':first_year,
            'last_year':last_year,
            'reward_name':reward_name,
            'user':user
        }
    });
    return ajax;
}
 function LandHSSAlevel(){//人文社科奖励类型
    var ajax = $.ajax({
        url: "/LandHSSAlevel",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function LandHSSAsubject(){//人文社科学科名称
    var ajax = $.ajax({
        url: "/LandHSSAsubject",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function LandHSSAsta(entitys,year1,year2,pageindex,subject,level,_index1,_index2){//人文社科统计
    var ajax = $.ajax({
        url: "/askHSSAsta",
        type: "POST",// or GET
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            'pageindex':pageindex,
            'subject':subject,
            'level':level,
            'entitys':entitys,
            'year1':year1,
            'year2':year2,
            '_index1':_index1,
            '_index2':_index2
        }
    });
    return ajax;
}
function LandEntityprovince(){//返回所有的省份类型
    var ajax = $.ajax({
        url: "/LandEntityprovince",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function LandEntitytype(){//返回所有的大学类型
    var ajax = $.ajax({
        url: "/LandEntitytype",
        type: "POST",// or GET
        data:{

        }
    });
    return ajax;
}
function newEntity(id,name,type,province,upperid,uppername,topid,topname,isleaf,istop){//新增大学
    var ajax = $.ajax({
        url: "/newEntity",
        type: "POST",// or GET
        data:{
            "id":id,
            "name":name,
            "type":type,
            "province":province,
            "upperid":upperid,
            "uppername":uppername,
            "topid":topid,
            "topname":topname,
            "isleaf":isleaf,
            "istop":istop
        }
    });
    return ajax;
}
function askEntity(id,name,province){//查询大学
    var ajax = $.ajax({
        url: "/askEntity",
        type: "POST",// or GET
        data:{
            "id":id,
            "name":name,
            "province":province
        }
    });
    return ajax;
}
function updateEntity(oldid,id,name,type,province,upperid,uppername,topid,topname,isleaf,istop){//新增大学
    var ajax = $.ajax({
        url: "/updateEntity",
        type: "POST",// or GET
        data:{
            "oldid":oldid,
            "id":id,
            "name":name,
            "type":type,
            "province":province,
            "upperid":upperid,
            "uppername":uppername,
            "topid":topid,
            "topname":topname,
            "isleaf":isleaf,
            "istop":istop
        }
    });
    return ajax;
}
function getESIData(entitys){//获得ESI数据
    var ajax = $.ajax({
        url: "/esi/get",
        type: "POST",
        traditional:true,
        beforeSend:beforeHandle,
        success:successHandle,
        data:{
            'unit':entitys
        }
    });
    return ajax;
}


