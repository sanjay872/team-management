CREATE DATABASE team_management;

USE team_management;

CREATE TABLE team_members (
  id BIGINT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  member_function VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uk_team_members_email UNIQUE (email)
);

SHOW TABLES LIKE 'team_members';
DESCRIBE team_members;

SELECT id, full_name, email, member_function, role, created_at, updated_at
FROM team_members
LIMIT 10;