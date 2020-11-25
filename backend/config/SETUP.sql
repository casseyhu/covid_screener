DROP SCHEMA covidscreen;
CREATE SCHEMA covidscreen;
USE covidscreen;


CREATE TABLE Employee (
	employeeID VARCHAR(20),
    email VARCHAR(50),
    password CHAR(64),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    PRIMARY KEY (employeeID),
    UNIQUE (email)
);

CREATE TABLE LabEmployee (
    labID VARCHAR(20),
    email VARCHAR(50),
    password CHAR(64),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    PRIMARY KEY (labID),
    UNIQUE (email)
);

CREATE TABLE EmployeeTest (
	testBarcode VARCHAR(50),
    employeeID VARCHAR(20) NOT NULL,
    collectionTime DATETIME,
    collectedBy VARCHAR(20),
    PRIMARY KEY (testBarcode),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (collectedBy) REFERENCES LabEmployee(labID)
);

CREATE TABLE Pool (
	poolBarcode VARCHAR(50),
    PRIMARY KEY (poolBarcode)
);

CREATE TABLE Well (
	wellBarcode VARCHAR(50),
    PRIMARY KEY (wellBarcode)
);

CREATE TABLE PoolMap (
	testBarcode VARCHAR(50),
    poolBarcode VARCHAR(50),
    FOREIGN KEY (testBarcode) REFERENCES EmployeeTest(testBarcode)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE WellTesting (
	poolBarcode VARCHAR(50),
    wellBarcode VARCHAR(50),
    testingStartTime DATETIME,
    testingEndTime DATETIME,
    result VARCHAR(20),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
    	ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (wellBarcode) REFERENCES Well(wellBarcode)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    CHECK (result IN ('in progress', 'negative', 'positive'))
);

-- EMPLOYEES (PASSWORD: first name)
INSERT INTO Employee VALUES ('100', 'bob@gmail.com', '81b637d8fcd2c6da6359e6963113a1170de795e4b725b84d1e0b4cfd9ec58ce9', 'bob', 'jones');
INSERT INTO Employee VALUES ('101', 'cassey@gmail.com', '94ddda8953df195f199c3a51c8e7194e644fff9dd271a3ab6d2e6bb264025c18', 'cassey', 'who');
INSERT INTO Employee VALUES ('102', 'eddie@gmail.com', '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d', 'eddie', 'shoe');
INSERT INTO Employee VALUES ('103', 'patrick@gmail.com', '23ddda4810068cc44360dffd31b6c5a9ad13fb9e6a69c9354a5d1b07f1b9843f', 'patrick', 'star');
INSERT INTO Employee VALUES ('104', 'sponge@gmail.com', 'f0e2e750791171b0391b682ec35835bd6a5c3f7c8d1d0191451ec77b4d75f240', 'spongebob', 'squarepants');
INSERT INTO Employee VALUES ('105', 'melanie@gmail.com', 'dfef5e53f9848472560a3e680a310d097ecc75919740646df38d31cab7aa07ac', 'melanie', 'cheeto');
INSERT INTO Employee VALUES ('106', 'paul@gmail.com', '29ebbcb9b217a3b14aa29e320d91d23840e5ae3fbb62c0a4660ccc23863ed9b8', 'paul', 'fodor');
INSERT INTO Employee VALUES ('107', 'kevin@gmail.com', '85f5e10431f69bc2a14046a13aabaefc660103b6de7a84f75c4b96181d03f0b5', 'kevin', 'mcd');


-- LAB EMPLOYEES/COLLECTORS: (SAME PASSWORDS: admin)
INSERT INTO LabEmployee VALUES ('200', 'collector1@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'collector1', 'col');
INSERT INTO LabEmployee VALUES ('201', 'collector2@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'collector2', 'lec');
INSERT INTO LabEmployee VALUES ('202', 'collector3@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'collector3', 'tor');
INSERT INTO LabEmployee VALUES ('203', 'collector4@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'collector4', 'tor');
INSERT INTO LabEmployee VALUES ('204', 'collector5@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'collector5', '??');


-- EMPLOYEE TESTS (testBarcode, employeeID, collectionTime, collectedBy)
INSERT INTO EmployeeTest VALUES ('001', '101', '2020-10-30 15:20:00', '200');
INSERT INTO EmployeeTest VALUES ('002', '102', '2020-09-20 12:15:30', '200');
INSERT INTO EmployeeTest VALUES ('003', '102', '2020-11-06 17:40:40', '201');
INSERT INTO EmployeeTest VALUES ('004', '103', '2020-10-30 15:25:00', '201');
INSERT INTO EmployeeTest VALUES ('005', '104', '2020-10-30 05:56:20', '201');
INSERT INTO EmployeeTest VALUES ('006', '101', '2020-09-30 11:25:00', '202');
INSERT INTO EmployeeTest VALUES ('007', '104', '2020-10-30 05:56:20', '202');
INSERT INTO EmployeeTest VALUES ('008', '106', '2020-10-30 11:25:00', '203');
INSERT INTO EmployeeTest VALUES ('009', '105', '2020-09-30 08:56:20', '203');
INSERT INTO EmployeeTest VALUES ('010', '101', '2020-10-30 10:25:00', '204');
INSERT INTO EmployeeTest VALUES ('011', '105', '2020-09-30 08:56:20', '204');
INSERT INTO EmployeeTest VALUES ('012', '102', '2020-10-29 10:25:00', '202');
INSERT INTO EmployeeTest VALUES ('013', '105', '2020-09-12 12:56:20', '201');

-- POOLS
INSERT INTO Pool VALUES ('POOL01');
INSERT INTO Pool VALUES ('POOL02');
INSERT INTO Pool VALUES ('POOL03');

-- WELLS
INSERT INTO Well VALUES ('WELL01');
INSERT INTO Well VALUES ('WELL02');
INSERT INTO Well VALUES ('WELL03');

-- MAP EMPLOYEE TEST TO A POOL (testBarcode, poolBarcode)
INSERT INTO PoolMap VALUES ('001', 'POOL01');
INSERT INTO PoolMap VALUES ('002', 'POOL03');
INSERT INTO PoolMap VALUES ('003', 'POOL03');
INSERT INTO PoolMap VALUES ('004', 'POOL01');
INSERT INTO PoolMap VALUES ('005', 'POOL01');
INSERT INTO PoolMap VALUES ('006', 'POOL02');
INSERT INTO PoolMap VALUES ('007', 'POOL03');
INSERT INTO PoolMap VALUES ('008', 'POOL03');
INSERT INTO PoolMap VALUES ('009', 'POOL01');
INSERT INTO PoolMap VALUES ('010', 'POOL01');
INSERT INTO PoolMap VALUES ('011', 'POOL02');
INSERT INTO PoolMap VALUES ('012', 'POOL01');
INSERT INTO PoolMap VALUES ('013', 'POOL02');

-- A well contains a single pool
INSERT INTO WellTesting VALUES ('POOL01', 'WELL01', '2020-11-01 00:00:00', '2020-11-01 23:00:00', 'negative');
INSERT INTO WellTesting VALUES ('POOL02', 'WELL02', '2020-11-02 01:00:00', '2020-11-02 10:50:00', 'in progress');
INSERT INTO WellTesting VALUES ('POOL03', 'WELL03', '2020-11-05 02:10:00', '2020-11-05 23:50:00', 'positive');

-- fetch employee data
-- SELECT E.collectionTime, W.result FROM EmployeeTest E, PoolMap P, WellTesting W 
-- WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = '101';

-- fetch all tests
-- SELECT employeeID, testBarcode FROM EmployeeTest;

-- delete a test
-- DELETE FROM EmployeeTest WHERE EmployeeID = '102' AND collectedBy = '202';

-- create pool mappings

-- delete pool
DELETE FROM Pool WHERE poolBarcode = 'POOL03';


SELECT * FROM PoolMap;
SELECT * FROM EmployeeTest;
-- update pool mapping

-- update well result

-- delete well result

select * from poolmap;

