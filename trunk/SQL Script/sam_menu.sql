-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2013 年 04 月 18 日 00:10
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `orgdemo`
-- 

-- --------------------------------------------------------

-- 
-- 表的结构 `sam_menu`
-- 

CREATE TABLE `sam_menu` (
  `SYS_CODE` varchar(10) collate utf8_unicode_ci default NULL,
  `MENU_CODE` varchar(30) collate utf8_unicode_ci NOT NULL default ' ',
  `MENU_NAME` varchar(30) collate utf8_unicode_ci default NULL,
  `MENU_LEVEL` int(4) default '1',
  `MENU_INDEX` int(4) default '1',
  `MENU_FATHER` varchar(30) collate utf8_unicode_ci default NULL,
  `PROG_URL` varchar(50) collate utf8_unicode_ci default NULL,
  `PROG_PARAM` varchar(50) collate utf8_unicode_ci default NULL,
  `LEAF_FLAG` varchar(5) collate utf8_unicode_ci default 'N',
  `TASK_FLAG` char(1) collate utf8_unicode_ci default 'N',
  `COUNT_TASK_SQL` varchar(255) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`MENU_CODE`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 
-- 导出表中的数据 `sam_menu`
-- 

INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06026', '负责人确认', 4, 6026, 'sfc0602', '/cerp/sfc0604', 'RECHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07', '晶片磨边管理', 2, 70, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05025', '填写性能测试结果', 4, 5025, 'sfc0502', '/cerp/sfc0502', 'STEST', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0701', '晶片接收', 3, 701, 'sfc07', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03011', '登记进炉时间', 4, 3011, 'sfc0301', '/cerp/sfc0301', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05026', '确认性能测试结果', 4, 5026, 'sfc0502', '/cerp/sfc0502', 'SCONFIRM', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc04', '晶体加工管理', 2, 40, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0401', '晶体接收', 3, 4011, 'sfc0410', '/cerp/sfc0401', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07011', '晶片接收', 4, 7011, 'sfc0701', '/cerp/sfc0701', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0702', '磨边', 3, 702, 'sfc07', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0802', '研磨工作记录', 3, 802, 'sfc08', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07012', '晶片来料检验', 4, 7012, 'sfc0701', '/cerp/sfc0702', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07021', '磨边工作记录', 4, 7021, 'sfc0702', '/cerp/sfc0703', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08021', '填写随工单', 4, 8021, 'sfc0802', '/cerp/sfc0802', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09012', '晶片来料检验', 4, 9012, 'sfc0901', '/cerp/sfc0902', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09022', '研磨返工接收', 4, 9022, 'sfc0902', '/cerp/sfc0904', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1001', '晶片接收', 3, 1, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10021', '抛光返工记录', 4, 1, 'sfc1002', '/cerp/sfc1003', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10011', '晶片接收', 4, 1, 'sfc1001', '/cerp/sfc1001', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1004', '装盒', 3, 4, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10041', '随工单管理', 4, 1, 'sfc1004', '/cerp/sfc1006', 'QUERY4', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc', '生产计划管理', 1, 2, 'root', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0801', '晶片接收', 3, 801, 'sfc08', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08031', '返修晶片接收', 4, 8031, 'sfc0803', '/cerp/sfc0804', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02022', '备料查询', 4, 2022, 'sfc0202', '/cerp/sfc0202', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0803', '研磨返工处理', 3, 803, 'sfc08', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1003', '清洗工作记录', 3, 3, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09051', '抛光返工接收', 4, 9051, 'sfc0905', '/cerp/sfc0908', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0905', '抛光返工处理', 3, 905, 'sfc09', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0203', '装料管理', 3, 203, 'sfc02', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02031', '填写晶种制作单', 4, 2031, 'sfc0203', '/cerp/sfc0203', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02032', '查询晶种制作单', 4, 2032, 'sfc0203', '/cerp/sfc0203', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03014', '查询晶体生长工作单', 4, 3014, 'sfc0301', '/cerp/sfc0301', 'SGRQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0161', '晶片基本信息', 3, 60, 'mdm01a', '/cerp/MDM/MDM0161', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03015', '出炉检验', 4, 3015, 'sfc0301', '/cerp/sfc0301', 'SOCHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03041', '甲醇炉定义', 4, 3041, 'sfc0304', '/cerp/sfc0304', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03016', '坩埚交接申请', 4, 3016, 'sfc0301', '/cerp/sfc0301', 'SHAND', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0304', '甲醇炉管理', 3, 304, 'sfc03', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0410', '晶体接收', 3, 401, 'sfc04', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0451', '填写晶体入库单', 3, 4051, 'sfc0450', '/cerp/sfc0451', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0402', '查询晶体交接记录', 3, 4012, 'sfc0410', '/cerp/sfc0401', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0420', '外圆加工', 3, 402, 'sfc04', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0430', '晶体外观检测', 3, 403, 'sfc04', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0406', '填写晶体外观检测记录', 3, 4031, 'sfc0430', '/cerp/sfc0406', 'INSERT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0440', '主副边定位', 3, 404, 'sfc04', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0407', '填写主副边定位结果', 3, 4041, 'sfc0440', '/cerp/sfc0407', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0408', '主副边定位复验', 3, 4042, 'sfc0440', '/cerp/sfc0408', 'OPERATE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0409', '主副边定位检验确认', 3, 4043, 'sfc0440', '/cerp/sfc0409', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0450', '晶体入库', 3, 405, 'sfc04', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06022', '基准面加工检验', 4, 6022, 'sfc0602', '/cerp/sfc0602', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06023', '查询基准面加工记录', 4, 6023, 'sfc0602', '/cerp/sfc0602', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06024', '切片记录', 4, 6024, 'sfc0602', '/cerp/sfc0604', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08', '晶片研磨管理', 2, 80, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06025', '切片检验确认', 4, 6025, 'sfc0602', '/cerp/sfc0604', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0903', '随工单管理', 3, 903, 'sfc09', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09031', '随工单管理', 4, 9031, 'sfc0903', '/cerp/sfc0906', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09042', '抛光检验确认', 4, 9042, 'sfc0904', '/cerp/sfc0907', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09043', '负责人确认', 4, 9043, 'sfc0904', '/cerp/sfc0907', 'RECHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10044', '插CASSETTE查询', 4, 4, 'sfc1004', '/cerp/sfc1006_insert', 'SQUERY_MAIN', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08022', '研磨工作记录', 4, 8022, 'sfc0802', '/cerp/sfc0803', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09023', '研磨返工检验', 4, 9023, 'sfc0902', '/cerp/sfc0905', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10012', '晶片来料检验', 4, 2, 'sfc1001', '/cerp/sfc1002', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10033', '清洗检验确认', 4, 3, 'sfc1003', '/cerp/sfc1017', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10032', '清洗工作记录', 4, 2, 'sfc1003', '/cerp/sfc1017', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10042', '插CASSETTE记录', 4, 2, 'sfc1004', '/cerp/sfc1006_insert', 'SVIEW', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10043', '插CASSETTE复验', 4, 3, 'sfc1004', '/cerp/sfc1006_insert', 'SCHECK_MAIN', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc', '车间生产及追溯', 1, 36, 'root', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1005', '清洗结单', 3, 5, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1002', '抛光返工', 3, 2, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10051', '清洗结单', 4, 1, 'sfc1005', '/cerp/sfc1008', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc1006', '包装', 3, 6, 'sfc10', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10061', '随工单管理', 4, 1, 'sfc1006', '/cerp/sfc1009', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10063', '外袋记录', 4, 3, 'sfc1006', '/cerp/sfc1009_outter', 'SVIEW', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10062', '内袋记录', 4, 2, 'sfc1006', '/cerp/sfc1009_inner', 'SVIEW', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc01', '晶体生长计划', 2, 3, 'ppc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0202', '查询计划', 3, 4, 'ppc02', '/cerp/ppc0201', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc003', '查询计划', 3, 5, 'ppc01', '/cerp/ppc001', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc001', '编制计划', 3, 1, 'ppc01', '/cerp/ppc001', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc004', '审批计划', 3, 3, 'ppc01', '/cerp/ppc001', 'AUDIT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc01013', '切料管理', 3, 3, 'sfc01', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0201', '编制计划', 3, 1, 'ppc02', '/cerp/ppc0201', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc03', '晶片生产通知单', 2, 7, 'ppc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0203', '审批计划', 3, 2, 'ppc02', '/cerp/ppc0201', 'AUDIT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc02', '晶片生产计划', 2, 6, 'ppc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0104', '接收计划', 3, 4, 'ppc01', '/cerp/ppc0104', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0301', '编制通知单', 3, 1, 'ppc03', '/cerp/ppc0204', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0303', '查询通知单', 3, 3, 'ppc03', '/cerp/ppc0204', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('PPC', 'ppc0302', '暂停或重启通知单', 3, 2, 'ppc03', '/cerp/ppc0204', 'XIADA', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0104', '查询多晶配料', 4, 2, 'sfc01011', '/cerp/sfc0101s', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0106', '查询生长记录', 4, 2, 'sfc01012', '/cerp/sfc0102s', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc01', '多晶合成管理', 2, 10, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0101', '多晶配料', 4, 1, 'sfc01011', '/cerp/sfc0101', 'SQUERYINT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0105', '晶体生长记录', 4, 1, 'sfc01012', '/cerp/sfc0102', 'SQUERYINT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0107', '切料记录', 4, 1, 'sfc01013', '/cerp/sfc0103', 'CTSQUERYINT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0103', '多晶检验', 4, 2, 'sfc01013', '/cerp/sfc0101s', 'SCHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc01011', '多晶配料管理', 3, 1, 'sfc01', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc01012', '晶体生长管理', 3, 2, 'sfc01', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam', '系统辅助管理', 1, 998, 'root', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1740', '业务类型定义', 3, 10, 'sam17', '/cerp/sam/sam1740', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9910', '系统定义', 2, 10, '99', '/cerp/SAM1010', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9920', '菜单定义', 2, 20, '99', '/cerp/SAM1020', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0201', '核算期参数设置', 3, 10, 'mdm02', '/cerp/MDM/MDM0201', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9950', '系统授权', 2, 50, '99', '/cerp/SAM1050', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1750', '单据类型定义', 3, 20, 'sam17', '/cerp/sam/sam1750', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', 'root', '企业智能计算中心', 0, 1, NULL, NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1720', '审批种类定义', 3, 40, 'sam17', '/cerp/sam/sam1720', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1730', '审批步骤定义', 3, 50, 'sam17', '/cerp/sam/sam1730', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9930', '角色定义', 2, 30, '99', '/cerp/SAM1030', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9940', '用户定义', 2, 40, '99', '/cerp/SAM1040', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0202', '核算期生成与维护', 3, 20, 'mdm02', '/cerp/MDM/MDM0202', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '99', '系统管理', 1, 999, 'root', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9960', '公司定义', 2, 60, '99', '/cerp/SAM2010', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1710', '单据权限定义', 3, 30, 'sam17', '/cerp/sam/sam1710', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm', '基础数据管理', 1, 10, 'root', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm01a', '物料主文件定义', 2, 10, 'mdm', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0101', '物料分类定义', 3, 1, 'mdm01a', '/cerp/MDM/MDM0101', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0102', '物料基本信息', 3, 2, 'mdm01a', '/cerp/MDM/MDM0102', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0103', '物料辅助信息', 3, 3, 'mdm01a', '/cerp/MDM/MDM0103', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0104', '物料信息发布/作废', 3, 4, 'mdm01a', '/cerp/MDM/MDM0104', '=W', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0107', '物料字典查询', 3, 5, 'mdm01a', '/cerp/MDM/MDM0107', '=Y', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0141', '经费代码定义', 3, 30, 'mdm01a', '/cerp/MDM/MDM0141', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'MDM0131', '物料质量等级定义', 3, 40, 'mdm01a', '/cerp/MDM/MDM0131', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0121', '计量单位定义', 3, 20, 'mdm01a', '/cerp/MDM/MDM0121', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9970', '部门定义', 2, 80, '99', '/cerp/SAM2030', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9980', '职位定义', 2, 70, '99', '/cerp/SAM2020', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9990', '任务定义', 2, 90, '99', '/cerp/SAM3010', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10031', '随工单管理', 4, 1, 'sfc1003', '/cerp/sfc1005', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10034', '清洗工作记录查询', 4, 4, 'sfc1003', '/cerp/sfc1017', 'QXQuery', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05012', '晶种胚制作确认检验', 4, 5012, 'sfc0501', '/cerp/sfc0501', 'SCONFIRM', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10022', '抛光返工接收', 4, 2, 'sfc1002', '/cerp/sfc1004_jieshou', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10023', '抛光返工检验', 4, 3, 'sfc1002', '/cerp/sfc1020', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam17', '审批流程管理', 2, 10, 'sam', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08025', '研磨工作记录查询', 4, 8025, 'sfc0802', '/cerp/sfc0803', 'QXQuery', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0405', '查询晶体加工记录', 3, 405, 'sfc0420', '/cerp/sfc0403', 'SELECT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08011', '晶片接收', 4, 8011, 'sfc0801', '/cerp/sfc0801', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0404', '回（废）料明细查询', 3, 404, 'sfc0420', '/cerp/sfc0403', 'DETAIL', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0403', '晶体加工记录', 3, 403, 'sfc0420', '/cerp/sfc0403', 'QUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07024', '磨边工作记录查询', 4, 7024, 'sfc0702', '/cerp/sfc0703', 'QXQuery', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0152', '晶锭信息发布&作废', 3, 81, 'mdm01a', '/cerp/MDM/MDM0151', 'FABU', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0162', '晶片信息发布&作废', 3, 86, 'mdm01a', '/cerp/MDM/MDM0161', 'FABU', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05013', '晶种胚制作查询', 4, 5013, 'sfc0501', '/cerp/sfc0501', 'QXQuery', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', '9999', '日志维护', 2, 91, '99', '/cerp/SAM1028', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', 'sam1029', '配置项定义', 2, 799, '99', '/cerp/sam1029', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam5100', '配套表授权', 3, 60, 'sam17', '/cerp/sam5100', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SAM', 'sam1122', '与avidm同步用户部门', 2, 20, 'sam', '/cerp/sam/sam1122', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'MDM0132', '元器件质量等级定义', 3, 50, 'mdm01a', '/cerp/MDM/MDM0132', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'MDM0133', '复验类别定义', 3, 60, 'mdm01a', '/cerp/MDM/MDM0133', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'MDM0134', '产品保证单位', 3, 70, 'mdm01a', '/cerp/MDM/MDM0134', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02035', '装料单查询', 4, 2034, 'sfc0203', '/cerp/sfc0203', 'SWQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02034', '确认装料单', 4, 2034, 'sfc0203', '/cerp/sfc0203', 'SCONFIRM', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0151', '晶锭基本信息', 3, 50, 'mdm01a', '/cerp/MDM/MDM0151', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0601', '晶锭接收', 3, 601, 'sfc06', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('MDM', 'mdm0203', '同步K3数据', 3, 30, 'mdm02', '/cerp/MDM/MDM0203', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05', '晶体测试管理', 2, 50, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0501', '晶种胚制作管理', 3, 501, 'sfc05', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05011', '填写晶种胚制作记录', 4, 5011, 'sfc0501', '/cerp/sfc0501', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05022', '填写测试样片清洗记录', 4, 5022, 'sfc0502', '/cerp/sfc0502', 'SCLEAN', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05021', '填写测试样片研磨记录', 4, 5021, 'sfc0502', '/cerp/sfc0502', 'SGRIND', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05023', '填写测试样片KOH记录', 4, 5023, 'sfc0502', '/cerp/sfc0502', 'SKOH', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc05024', '查询样片记录', 4, 5024, 'sfc0502', '/cerp/sfc0502', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0502', '晶体性能测试管理', 3, 502, 'sfc05', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SYS', 'nat10', 'NatEdVC', 2, 21, '99', '/cerp/sam1021', NULL, 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06', '晶体切片管理', 2, 60, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06011', '晶锭接收', 4, 6011, 'sfc0601', '/cerp/sfc0601', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08023', '研磨检验确认', 4, 8023, 'sfc0802', '/cerp/sfc0803', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07022', '磨边检验确认', 4, 7022, 'sfc0702', '/cerp/sfc0703', 'CHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc07023', '负责人确认', 4, 7023, 'sfc0702', '/cerp/sfc0703', 'RECHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc08024', '负责人确认', 4, 8024, 'sfc0802', '/cerp/sfc0803', 'RECHECK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09', '晶片抛光管理', 2, 90, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0901', '晶片接收', 3, 901, 'sfc09', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10', '晶片清洗管理', 2, 100, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09011', '晶片接收', 4, 9011, 'sfc0901', '/cerp/sfc0901', 'RECEIVE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0902', '研磨返工', 3, 902, 'sfc09', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09021', '研磨返工', 4, 9021, 'sfc0902', '/cerp/sfc0903', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc10013', '晶片接收情况查询', 4, 3, 'sfc1001', '/cerp/sfc1001', 'Querys', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0904', '抛光工作记录', 3, 904, 'sfc09', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc09041', '抛光工作记录', 4, 9041, 'sfc0904', '/cerp/sfc0907', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02033', '填写装料工作单', 4, 2033, 'sfc0203', '/cerp/sfc0203', 'SWORK', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0202', '单晶备料', 3, 202, 'sfc02', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02', '单晶备料管理', 2, 20, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0201', 'PBN坩埚管理', 3, 201, 'sfc02', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03', '晶体生长管理', 2, 30, 'sfc', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02011', '坩埚信息定义', 4, 2011, 'sfc0201', '/cerp/sfc0201', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02012', '坩埚信息查询', 4, 2012, 'sfc0201', '/cerp/sfc0201', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02013', '坩埚交接确认', 4, 2013, 'sfc0201', '/cerp/sfc0201', 'SCONFIRM', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc02021', '单晶备料', 4, 2021, 'sfc0202', '/cerp/sfc0202', 'SQUERYINT', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0301', '晶体生长管理', 3, 301, 'sfc03', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03012', '查询进炉时间', 4, 3012, 'sfc0301', '/cerp/sfc0301', 'SQUERY', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0602', '基准面加工', 3, 602, 'sfc06', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03013', '晶体生长记录', 4, 3013, 'sfc0301', '/cerp/sfc0301', 'SGROW', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc06021', '填写基准面加工记录', 4, 6021, 'sfc0602', '/cerp/sfc0602', 'ADD', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc0302', '晶体脱膜管理', 3, 302, 'sfc03', NULL, NULL, 'N', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03021', '填写进出脱膜炉记录单', 4, 3021, 'sfc0302', '/cerp/sfc0302', 'SDEFINE', 'Y', 'N', NULL);
INSERT INTO `sam_menu` VALUES ('SFC', 'sfc03022', '查询进出脱膜炉记录单', 4, 3022, 'sfc0302', '/cerp/sfc0302', 'SQUERY', 'Y', 'N', NULL);
