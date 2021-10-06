CREATE TABLE week(
  id serial primary key not null,
    the_day text not null);

CREATE TABLE waiters(
  id serial primary key not null,
    waiter_name text not null);


INSERT INTO week (the_day) VALUES ('Sunday');
INSERT INTO week (the_day) VALUES ('Monday');
INSERT INTO week (the_day) VALUES ('Tuesday');
INSERT INTO week (the_day) VALUES ('Wednesday');
INSERT INTO week (the_day) VALUES ('Thursday');
INSERT INTO week (the_day) VALUES ('Friday');
INSERT INTO week (the_day) VALUES ('Saturday');
