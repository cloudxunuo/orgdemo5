-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2013 年 04 月 19 日 06:22
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 数据库: `orgdemo`
-- 

-- --------------------------------------------------------

-- 
-- 表的结构 `detail`
-- 

CREATE TABLE `detail` (
  `MAIN_ID` varchar(18) NOT NULL,
  `ID` varchar(18) NOT NULL,
  `STATUS` varchar(2) default NULL,
  `AUDITOR` varchar(20) default NULL,
  `REAL_AUDITOR` varchar(20) default NULL,
  `VERIFY_DESC` varchar(100) default NULL,
  `VERIFY_DATE` date default NULL,
  `VERIFY_DEPART` varchar(20) default NULL,
  `VERIFY_LEVEL` varchar(10) default NULL,
  `FIELD1` varchar(10) default NULL,
  `FIELD2` varchar(10) default NULL,
  PRIMARY KEY  (`MAIN_ID`,`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 
-- 导出表中的数据 `detail`
-- 

INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', '33333', 'Y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', '123', 'N', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', '12345', 'y', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', '2222', 'N', 'sasa', 'asas', NULL, '2012-04-12', NULL, NULL, NULL, NULL);
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG004', 'N', '李峰', '许强', '审核不合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG005', 'N', '李峰', '许强', '审核不合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG006', 'Y', '马建山', '许强', '审核合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG007', 'Y', '马建山', '许强', '审核合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG008', 'Y', '马建山', '许强', '审核合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG009', 'Y', '马建山', '许强', '审核合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', 'CG010', 'Y', '马建山', '许强', '审核合格', '2013-01-04', '一车间', '部门经理', '1', '1');
INSERT INTO `detail` VALUES ('SQ20120903ADMI0002', '001', 'Y', '12321', 'zxz', NULL, '2012-04-15', NULL, NULL, NULL, NULL);
