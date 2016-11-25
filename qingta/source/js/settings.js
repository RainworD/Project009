var thisyear = 2016;
var years_seperate_1=[1955,1957,1980];
var years_seperate_2=setYear(1990,2016);
var years_seperate_3=setYear(2005,2009);
var years_seperate_4=setYear(2012,2015);
function setYear(year_1,year_2){
	var year_Array=[];
	for(var i=year_2;i>year_1-1;i--){
		year_Array.push(i);
	}
	return year_Array;
} 
var defaultSetting={ 
	"years_continue1":[2012,thisyear],
	"years_continue2":[2007,2014],
	"rewards": ["",""]
}
var annualActualBudgetDataSetting={//决算
	"years_seperate":setYear(2012,2015),
	
}
var annualBudgetDataSetting={//预算
	"years_seperate":setYear(2013,2016),
}
var authorizePatentsSetting={//授权专利
	"years_seperate":setYear(2006,2015),
}
var CJScholarSetting={//长江学者
	"years_seperate":[1999,2000,2001,2002,2004,2005,2006,2007,2008,2009,2011,2012,2014,2015],
}
var collageResearchFundsSetting={//高校科技活动科技经费
	"years_seperate":setYear(2007,2014),
}
var collegeTechnologyTopicFundsSetting={//高校科技课题数据
	"years_seperate":setYear(2007,2014),
}
var educationArtSocietyProjectSetting={//教育部人文社科项目
	"years_seperate":setYear(2005,2016),
}
var educationDepartmentCollageResearchFundsSetting={//教育部直属高校科技经费拨入与支出
	"years_seperate":setYear(2007,2014),
}
var educationPartInnovationTeamSetting={//教育部创新团队
	"years_seperate":setYear(2004,2016),
}
var educationSubjectEvaluateSetting={//教育部学科评估
}
var educationTechnologyAwardsSetting={//教育部科技奖
	"years_seperate":setYear(2000,2015),
}
var excellentSetting={//国家优博论文
	"years_seperate":setYear(1999,2013),
}
var ImportantAwardsDataSetting={//重要奖励数据
	"years_seperate":setYear(1989,2016),
}
var keyDisciplineSetting={//国家重点学科
}
var nationalEssentialResourcePublicLessonSetting={//国家级视频公开课
	"years_seperate":setYear(2012,2016),
}
var nationalEssentialResourceSharedLessonSetting={//国家级精品资源共享课
	"years_seperate":[2016],
}
var nationalFeaturedProfessionalSetting={//国家级特色专业
	"number":["第一批","第二批","第三批","第四批","第五批","第六批","第七批"]
}
var nationalOYPSetting={//国家杰出青年基金
	"years_seperate":setYear(1997,2016),
}
var nationalTeachingResultsSetting={//国家级教学成果奖
	"years_seperate":[2001,2005,2009,2014],
}
var nationalThreeAwardsSetting={//国家科学技术奖
	"years_seperate":setYear(2008,2015),
}
var nationEnginerAcademicSetting={//中国工程院院士
	"years_seperate":[1994,1995,1996,1997,1999,2001,2003,2005,2007,2009,2011,2013,2015],
}
var nationEYSetting={//国家优秀青年基金
	"years_seperate":setYear(2012,2016),
}
var nationFundInnovationGroupSetting={//国家基金委创新群体
	"years_seperate":setYear(2000,2016),
}
var nationNatureTechnologyFundSetting={//国家自然科学基金
	"years_seperate":setYear(1997,2016),
}
var nationPointDevelopPlanSetting={//国家重点研发计划
	"years_seperate":[2016],
}
var nationSocietyFundSetting={//国家社会科学基金
	"years_seperate":setYear(2005,2016),
}
var nationTechnologyAcademicSetting={//中国科学院院士
	"years_seperate":[1955,1957,1980,1991,1993,1995,1997,1999,2001,2003,2005,2007,2009,2011,2013,2015],
}
var peopleArtExcellentResultsSetting={//人文社科优秀成果奖
	"years_seperate":[2013,2016],
}
var peoplePlanBeChoosenSetting={//万人计划
	"years_seperate":setYear(2012,2016),
}
var schoolMatchGoalDataAnalysisSetting={//高校对标数据
	"years_seperate":years_seperate_1.concat(years_seperate_2.reverse()),
}
var techResultsandTransformSetting={//科技成果与技术转让
	"years_seperate":setYear(2007,2014),
}
var youthThousandSetting={//青年千人
	"years_seperate":setYear(2011,2016),
}
var basicInformationOfTheSchoolSetting={//学校基本情况
	"years_seperate":[2014],
}
var basicInformationOfStudentsSetting={//在校生基本情况
	"years_seperate":[2014],
}
var basicInformationOfTeachersSetting={//专任教师基本情况
	"years_seperate":[2014],
}
var ministryOfESTCommissionSetting={//教育部科技委
	"years_seperate":[2009,2016],
}
var ChinaPostdoctoralFundSetting={//中国博士后科学基金
	"years_seperate":setYear(2004,2016)
}
var disciplineReviewGroupMembersSetting={//学科评议组成员
	"years_seperate":[2009,2014]
}
var ministryofSTITSetting={//科技部创新人才
	"years_seperate":setYear(2012,2015)
}
var oneplanToAttractIntellectualBaseSetting={//“111”计划引智基地
	"years_seperate":[2011,2013,2014]
}
var ministryOfIndustryKeyLaboratorySetting={//工信部重点实验室
	"years_seperate":[2015,2016]
}
var nationalHighendTTKConstructionUnitSetting={//高端智库
	"years_seperate":[2015]
}

var nationalEngineeringTechnologyResearchCenterSetting={//工程技术研究中心
	"years_seperate":[2014]
}

var nationalCenterforCMSetting={//国家临床医学研究中心
	"years_seperate":[2013,2014,2016]
}
var nationalLaboratorySetting={//国家实验室
	"years_seperate":[1984,1988,1991,2000,2003,2006]
}
var theStateAdministrationOfCHKResearchBaseSetting={//国家临床医学研究中心
	"years_seperate":[2005,2006,2008,2010,2014,2015]
}
var stateKeyLaboratorySetting={//国家重点实验室
	"years_seperate":[2015]
}
var experimentalTeachingCenterSetting={//国家级实验教学中心
	"years_seperate":(years_seperate_3.reverse()).concat(years_seperate_4.reverse()),
}
var VirtualSimulationExperimentTeachingCenterSetting={//国家仿真实验室
	"years_seperate":[2014,2015]
}








