USE master
GO

-- Conditional database removal
IF EXISTS (SELECT name FROM sys.databases WHERE name = 'studentcompass')
BEGIN
	DROP DATABASE studentcompass
END

BEGIN TRAN

-- Database creation
CREATE DATABASE studentcompass
GO

USE studentcompass
GO

-- Conditional schemas removal
IF OBJECT_ID('app', 'SCHEMA') IS NOT NULL DROP SCHEMA app;

GO

-- Schemas creation
CREATE SCHEMA app
GO

COMMIT TRAN