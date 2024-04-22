CREATE SCHEMA IF NOT EXISTS "dbo";
CREATE SCHEMA IF NOT EXISTS "auth";

CREATE TABLE "auth"."action" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE "auth"."role" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE "auth"."permission" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE "auth"."action_permission" (
    action_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    PRIMARY KEY (action_id, permission_id),
    FOREIGN KEY (action_id) REFERENCES "auth"."action"(id),
    FOREIGN KEY (permission_id) REFERENCES "auth"."permission"(id)
);

CREATE TABLE "auth"."role_permission" (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id),
    FOREIGN KEY (permission_id) REFERENCES "auth"."permission"(id)
);

CREATE TABLE "auth"."user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(40) check (role in ('ADMIN','USER'))
);

CREATE TABLE  "dbo".community (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL UNIQUE
);

CREATE TABLE "dbo".location (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(55) NOT NULL UNIQUE,
    latitude FLOAT,
    longitude FLOAT
);

CREATE TABLE "dbo"."event" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(55) NOT NULL,
    small_description VARCHAR(155) NOT NULL,
    large_description TEXT,
    is_online boolean,
    location_id UUID NOT NULL,
    FOREIGN KEY (location_id) REFERENCES "dbo".location(id)
);

CREATE TABLE "dbo".event_user (
    event_id UUID NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES "dbo".event(id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id)
);

CREATE TABLE "dbo".event_communities (
    event_id UUID NOT NULL,
    community_id UUID NOT NULL,
    PRIMARY KEY (event_id, community_id),
    FOREIGN KEY (event_id) REFERENCES "dbo".event(id),
    FOREIGN KEY (community_id) REFERENCES "dbo".community(id)
);

CREATE TABLE "dbo".membership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID NOT NULL,
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    UNIQUE (user_id, community_id, role_id),
    FOREIGN KEY (community_id) REFERENCES "dbo".community(id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id)
);

CREATE TABLE "dbo".attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    role_id UUID NOT NULL,
    UNIQUE (user_id, event_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "auth"."user"(id),
    FOREIGN KEY (event_id) REFERENCES "dbo"."event"(id),
    FOREIGN KEY (role_id) REFERENCES "auth"."role"(id)
);


INSERT INTO "auth"."action" (id, name) VALUES
  ('b8ecacdd-4e68-4a4c-b3de-65f22a289f44', 'create'),
  ('3c1565c9-f768-42b7-90b4-9ac6c4b7f92a', 'read'),
  ('95bfaa3a-2f18-4c4f-9216-5d178c9ef3aa', 'update'),
  ('ffb28a87-cda5-4654-a8d8-b7fc0849b0b9', 'delete');

INSERT INTO "auth"."role" (id, name) VALUES
  ('890e8756-f624-46a1-9f05-0c8f73cb2122', 'admin'),
  ('d3f8634d-93c0-4636-aa7d-4f9c6322d499', 'user');

INSERT INTO "auth"."permission" (id, name) VALUES
  ('07d20559-83fb-448f-894e-f82f6f44d7d7', 'create_event'),
  ('f3a57b3a-b1e5-47b7-a1ad-5b91e99db3cf', 'delete_event'),
  ('42f4bc99-3e4e-4a7c-9f22-d90af8d49c67', 'edit_event');

INSERT INTO "auth"."action_permission" (action_id, permission_id) VALUES
  ('b8ecacdd-4e68-4a4c-b3de-65f22a289f44', '07d20559-83fb-448f-894e-f82f6f44d7d7'),
  ('ffb28a87-cda5-4654-a8d8-b7fc0849b0b9', 'f3a57b3a-b1e5-47b7-a1ad-5b91e99db3cf'),
  ('95bfaa3a-2f18-4c4f-9216-5d178c9ef3aa', '42f4bc99-3e4e-4a7c-9f22-d90af8d49c67');

INSERT INTO "auth"."role_permission" (role_id, permission_id) VALUES
  ('890e8756-f624-46a1-9f05-0c8f73cb2122', '07d20559-83fb-448f-894e-f82f6f44d7d7'),
  ('890e8756-f624-46a1-9f05-0c8f73cb2122', 'f3a57b3a-b1e5-47b7-a1ad-5b91e99db3cf'),
  ('d3f8634d-93c0-4636-aa7d-4f9c6322d499', '07d20559-83fb-448f-894e-f82f6f44d7d7'),
  ('d3f8634d-93c0-4636-aa7d-4f9c6322d499', 'f3a57b3a-b1e5-47b7-a1ad-5b91e99db3cf'),
  ('d3f8634d-93c0-4636-aa7d-4f9c6322d499', '42f4bc99-3e4e-4a7c-9f22-d90af8d49c67');

INSERT INTO "auth"."user" (id, username, password, role) VALUES
  ('1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'john_doe', '$2a$10$AZCwDfZBWochcelWIxeo4udksBBctSccxZ/ZrcJkMFblSqxJTfkZu','ADMIN'),
  ('1fa34d17-6d33-4b16-a75b-d2b6f165bdfd', 'admin', '$2a$10$AZCwDfZBWochcelWIxeo4udksBBctSccxZ/ZrcJkMFblSqxJTfkZu','ADMIN'),
  ('2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'jane_doe', '$2a$10$AZCwDfZBWochcelWIxeo4udksBBctSccxZ/ZrcJkMFblSqxJTfkZu','USER');

INSERT INTO "dbo".community (id, name) VALUES
  ('3ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Tech Enthusiasts'),
  ('4ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Book Club');

INSERT INTO "dbo".location (id, name, latitude, longitude) VALUES
  ('1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Tech Hub', 40.7128, -74.0060),
  ('2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Library', 41.8781, -87.6298);

INSERT INTO "dbo"."event" (id, title, small_description, large_description, is_online, location_id) VALUES
  ('5ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Tech Talk', 'Join us for an insightful tech discussion.', 'This event will cover various topics in the field of technology.', true, '1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e'),
  ('6ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'Book Reading', 'Come and enjoy a captivating book reading session.', 'We will be exploring the themes of the book and discussing its impact.', false, '2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e');

INSERT INTO "dbo".event_user (event_id, user_id) VALUES
  ('5ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e'),
  ('6ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e');

INSERT INTO "dbo".event_communities (event_id, community_id) VALUES
  ('5ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '3ae70aa2-2f09-4c0f-8940-f8ad514cfb4e'),
  ('6ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '4ae70aa2-2f09-4c0f-8940-f8ad514cfb4e');

INSERT INTO "dbo".membership (id, community_id, user_id, role_id) VALUES
  ('2c45b48f-1e8a-4e3e-9b24-62a14a1d4822','3ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '890e8756-f624-46a1-9f05-0c8f73cb2122'),
  ('71fe2c89-dcd2-4a2b-94c9-59a7dc1e0eae','4ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'd3f8634d-93c0-4636-aa7d-4f9c6322d499');

INSERT INTO "dbo".attendance (id, user_id, event_id, role_id) VALUES
  ('de4d96d3-122f-4a35-840d-93af2ad6a7b9','1ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '5ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '890e8756-f624-46a1-9f05-0c8f73cb2122'),
  ('8f6e5b94-2043-45bf-b3f5-743d36b94fe8','2ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', '6ae70aa2-2f09-4c0f-8940-f8ad514cfb4e', 'd3f8634d-93c0-4636-aa7d-4f9c6322d499');