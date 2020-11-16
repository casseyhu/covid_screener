CREATE SCHEMA covidscreen;
USE covidscreen;

CREATE TABLE Employee (
	employeeID VARCHAR(20),
    email VARCHAR(50),
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    PRIMARY KEY (employeeID),
    UNIQUE (email)
);

CREATE TABLE EmployeeTest (
	testBarcode VARCHAR(50),
    employeeID VARCHAR(20) NOT NULL,
    collectionTime DATETIME,
    collectedBy VARCHAR(20),
    PRIMARY KEY (testBarcode),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (collectedBy) REFERENCES Employee(employeeID)
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


-- COLLECTORS
INSERT INTO Employee VALUES ('200', 'collector1@gmail.com', 'collector1', 'col');
INSERT INTO Employee VALUES ('201', 'collector2@gmail.com', 'collector2', 'lec');
INSERT INTO Employee VALUES ('210', 'collector3@gmail.com', 'collector3', 'tor');

-- EMPLOYEES
INSERT INTO Employee VALUES ('100', 'bob@gmail.com', 'bob', 'jones');
INSERT INTO Employee VALUES ('101', 'cassey@gmail.com', 'cassey', 'who');
INSERT INTO Employee VALUES ('102', 'eddie@gmail.com', 'eddie', 'shoe');
INSERT INTO Employee VALUES ('110', 'patrick@gmail.com', 'patrick', 'star');
INSERT INTO Employee VALUES ('120', 'sponge@gmail.com', 'spongebob', 'squarepants');

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









