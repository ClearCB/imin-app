
-- Create the "local" schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS "local";
-- Create the "auth" schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS "auth";

-- Create the "action" table in the "auth" schema with UUID primary key
CREATE TABLE "auth"."action" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);

-- Create the "role" table in the "auth" schema with UUID primary key
CREATE TABLE "auth"."role" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);

-- Create the "permission" table in the "auth" schema with UUID primary key
CREATE TABLE "auth"."permission" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL
);

-- Create the "action_permission" table in the "auth" schema
CREATE TABLE "auth"."action_permission" (
    action_id UUID,
    permission_id UUID,
    PRIMARY KEY (action_id, permission_id),
    FOREIGN KEY (action_id) REFERENCES "auth"."action"(id),
    FOREIGN KEY (permission_id) REFERENCES "auth"."permission"(id)
);

-- Create the "role_permission" association table in the "auth" schema
CREATE TABLE "auth"."role_permission" (
    role_id UUID,
    permission_id UUID,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id),
    FOREIGN KEY (permission_id) REFERENCES "auth"."permission"(id)
);

-- Create the "user" table with UUID primary key
CREATE TABLE "auth"."user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(55),
    email VARCHAR(55),
    password VARCHAR(255)
);

-- Create the "community" table with UUID primary key
CREATE TABLE community (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55)
);

-- Create the "event" table with UUID primary key and UUID foreign keys
CREATE TABLE "event" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID,
    user_id UUID,
    title VARCHAR(55),
    FOREIGN KEY (community_id) REFERENCES community(id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id)
);

-- Create the "membership" table with UUID foreign keys
CREATE TABLE membership (
    community_id UUID,
    user_id UUID,
    role_id UUID,
    PRIMARY KEY (user_id, community_id, role_id),
    FOREIGN KEY (community_id) REFERENCES community(id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id)
);

-- Create the "attendance" table with UUID foreign keys
CREATE TABLE attendance (
    user_id UUID,
    event_id UUID,
    role_id UUID,
    PRIMARY KEY (user_id, event_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id),
    FOREIGN KEY (event_id) REFERENCES "event"(id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id)
);

-- Inserting sample data into the "auth.action" table
INSERT INTO auth.action (id, name) VALUES
    ('dab3ef61-7d3e-4a3c-ba07-4634462fc2ee', 'Action1'),
    ('f02e0e6d-5d8a-41b4-b0a9-99b6d9fddc3e', 'Action2');

-- Inserting sample data into the "auth.role" table
INSERT INTO auth.role (id, name) VALUES
    ('8d4bb6e1-4f45-4a6b-b4e1-524fb0e47e45', 'Role1'),
    ('ca4c5500-1944-4bb0-9d5a-4b4aef0e6a5a', 'Role2');

-- Inserting sample data into the "auth.permission" table
INSERT INTO auth.permission (id, name) VALUES
    ('4567e3df-9e05-4e4f-b7f0-90e2de5f85a9', 'Permission1'),
    ('7a493825-1ef2-4a3d-9d7a-f15328c88f3d', 'Permission2');

-- Inserting sample data into the "auth.action_permission" table
INSERT INTO auth.action_permission (action_id, permission_id) VALUES
    ('dab3ef61-7d3e-4a3c-ba07-4634462fc2ee', '4567e3df-9e05-4e4f-b7f0-90e2de5f85a9'),
    ('f02e0e6d-5d8a-41b4-b0a9-99b6d9fddc3e', '7a493825-1ef2-4a3d-9d7a-f15328c88f3d');

-- Inserting sample data into the "auth.role_permission" table
INSERT INTO auth.role_permission (role_id, permission_id) VALUES
    ('8d4bb6e1-4f45-4a6b-b4e1-524fb0e47e45', '4567e3df-9e05-4e4f-b7f0-90e2de5f85a9'),
    ('ca4c5500-1944-4bb0-9d5a-4b4aef0e6a5a', '7a493825-1ef2-4a3d-9d7a-f15328c88f3d');

-- Inserting sample data into the "auth.user" table
INSERT INTO auth.user (id, username) VALUES
    ('a7b54281-5bfb-41bb-9f67-460a4ab6ed78', 'User1'),
    ('14b37d52-cb5f-41eb-bd0a-21e91ab42046', 'User2');

-- Inserting sample data into the "community" table
INSERT INTO community (id, name) VALUES
    ('1fc05227-992f-40a4-9c80-845ab5267e0e', 'Community1'),
    ('328d1f6d-dce9-4d92-b92c-d72e4b32a493', 'Community2');

-- Inserting sample data into the "event" table
INSERT INTO event (id, community_id, user_id, title) VALUES
    ('e1613763-32ad-4b67-8b13-dbf13d617f30', '1fc05227-992f-40a4-9c80-845ab5267e0e', 'a7b54281-5bfb-41bb-9f67-460a4ab6ed78', 'Event1'),
    ('b7cd47a3-510f-4fe1-b1e0-6f1a47a7f43d', '328d1f6d-dce9-4d92-b92c-d72e4b32a493', '14b37d52-cb5f-41eb-bd0a-21e91ab42046', 'Event2');

-- Inserting sample data into the "membership" table
INSERT INTO membership (community_id, user_id, role_id) VALUES
    ('1fc05227-992f-40a4-9c80-845ab5267e0e', 'a7b54281-5bfb-41bb-9f67-460a4ab6ed78', '8d4bb6e1-4f45-4a6b-b4e1-524fb0e47e45'),
    ('328d1f6d-dce9-4d92-b92c-d72e4b32a493', '14b37d52-cb5f-41eb-bd0a-21e91ab42046', 'ca4c5500-1944-4bb0-9d5a-4b4aef0e6a5a');

-- Inserting sample data into the "attendance" table
INSERT INTO attendance (user_id, event_id, role_id) VALUES
    ('a7b54281-5bfb-41bb-9f67-460a4ab6ed78', 'e1613763-32ad-4b67-8b13-dbf13d617f30', '8d4bb6e1-4f45-4a6b-b4e1-524fb0e47e45'),
    ('14b37d52-cb5f-41eb-bd0a-21e91ab42046', 'b7cd47a3-510f-4fe1-b1e0-6f1a47a7f43d', 'ca4c5500-1944-4bb0-9d5a-4b4aef0e6a5a');
