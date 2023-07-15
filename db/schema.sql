DROP DATABASE IF EXISTS TechBlog_db;
CREATE DATABASE TechBlog_db;
use TechBlog_db;

select p.content , c.content, u.username, u.email from Posts p JOIN Users u ON p.user_id = u.id JOIN Comments c ON p.id = c.post_id;