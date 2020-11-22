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
    email VARCHAR(64),
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
    FOREIGN KEY (testBarcode) REFERENCES EmployeeTest(testBarcode),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode)
);

CREATE TABLE WellTesting (
	poolBarcode VARCHAR(50),
    wellBarcode VARCHAR(50),
    testingStartTime DATETIME,
    testingEndTime DATETIME,
    result VARCHAR(20),
    FOREIGN KEY (poolBarcode) REFERENCES Pool(poolBarcode),
    FOREIGN KEY (wellBarcode) REFERENCES Well(wellBarcode),
    CHECK (result IN ('in progress', 'negative', 'positive'))
);

-- CREATE TABLE Users (
--     email VARCHAR(50),
--     pass CHAR(64), -- Using SHA256, always produces 64-len hash
--     employeeID VARCHAR(20),
--     PRIMARY KEY (email, pass),
--     FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)
-- );

-- USERS
-- INSERT INTO Users VALUES ('cassey@gmail.com', 'be178c0543eb17f5f3043021c9e5fcf30285e557a4fc309cce97ff9ca6182912', '101');

-- COLLECTORS
-- INSERT INTO Employee VALUES ('200', 'collector1@gmail.com', 'collector1', 'col');
-- INSERT INTO Employee VALUES ('201', 'collector2@gmail.com', 'collector2', 'lec');
-- INSERT INTO Employee VALUES ('210', 'collector3@gmail.com', 'collector3', 'tor');

-- EMPLOYEES
INSERT INTO Employee VALUES ('100', 'bob@gmail.com', '81b637d8fcd2c6da6359e6963113a1170de795e4b725b84d1e0b4cfd9ec58ce9', 'bob', 'jones');
INSERT INTO Employee VALUES ('101', 'cassey@gmail.com', '94ddda8953df195f199c3a51c8e7194e644fff9dd271a3ab6d2e6bb264025c18', 'cassey', 'who');
INSERT INTO Employee VALUES ('102', 'eddie@gmail.com', '3b9d8298f1b5086d012618feebb2da1a394357c1dab7523443c9f6a743c4c84d', 'eddie', 'shoe');
INSERT INTO Employee VALUES ('110', 'patrick@gmail.com', '23ddda4810068cc44360dffd31b6c5a9ad13fb9e6a69c9354a5d1b07f1b9843f', 'patrick', 'star');
INSERT INTO Employee VALUES ('120', 'sponge@gmail.com', 'f0e2e750791171b0391b682ec35835bd6a5c3f7c8d1d0191451ec77b4d75f240', 'spongebob', 'squarepants');

-- LAB EMPLOYEES/COLLECTORS
INSERT INTO LabEmployee VALUES ('200', 'collector1@gmail.com', '38a2e490b123cec82e723c85e1ab19b12060722bf32fa2f2093e755cdaf234a8', 'collector1', 'col');
INSERT INTO LabEmployee VALUES ('201', 'collector2@gmail.com', '40c6394db716203df8c6e12be730bdb0b6d5142872bebf7f129c8c326b973db2', 'collector2', 'lec');
INSERT INTO LabEmployee VALUES ('210', 'collector3@gmail.com', '0bbc09003d077a6302a49c3beb4e6eb9e3473c2a1907654e7154740818f325f9', 'collector3', 'tor');

-- EMPLOYEE TESTS
INSERT INTO EmployeeTest VALUES ('001', '101', '2020-10-30 15:20:00', '200');
INSERT INTO EmployeeTest VALUES ('002', '102', '2020-09-20 12:15:30', '200');
INSERT INTO EmployeeTest VALUES ('003', '102', '2020-11-06 17:40:40', '210');
INSERT INTO EmployeeTest VALUES ('004', '110', '2020-10-30 15:25:00', '201');
INSERT INTO EmployeeTest VALUES ('005', '120', '2020-10-30 05:56:20', '201');
INSERT INTO EmployeeTest VALUES ('006', '100', '2020-10-30 11:25:00', '210');

-- POOLS
INSERT INTO Pool VALUES ('P00L1');
INSERT INTO Pool VALUES ('P00L2');
INSERT INTO Pool VALUES ('P00L3');

-- WELLS
INSERT INTO Well VALUES ('W001');
INSERT INTO Well VALUES ('W002');
INSERT INTO Well VALUES ('W003');

-- MAP EMPLOYEE TEST TO A POOL
INSERT INTO PoolMap VALUES ('001', 'P00L1');
INSERT INTO PoolMap VALUES ('002', 'P00L2');
INSERT INTO PoolMap VALUES ('003', 'P00L1');
INSERT INTO PoolMap VALUES ('004', 'P00L2');
INSERT INTO PoolMap VALUES ('005', 'P00L1');
INSERT INTO PoolMap VALUES ('006', 'P00L3');

-- 
INSERT INTO WellTesting VALUES ('P00L1', 'W001', '2020-11-01 00:00:00', '2020-11-01 23:00:00', 'negative');
INSERT INTO WellTesting VALUES ('P00L2', 'W002', '2020-11-02 01:00:00', '2020-11-02 10:50:00', 'in progress');
INSERT INTO WellTesting VALUES ('P00L3', 'W002', '2020-11-05 02:10:00', '2020-11-05 23:50:00', 'positive');

SELECT E.collectionTime, W.result FROM EmployeeTest E, PoolMap P, WellTesting W WHERE E.testBarcode = P.testBarcode AND P.poolBarcode = W.poolBarcode AND E.employeeID = '102';



