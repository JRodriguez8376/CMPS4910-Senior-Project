-- 10 and 5 meet
INSERT INTO potential_contact(device_id_1, device_id_2, latitude, longitude, time_met, speed) values(10, 5, 35.596752, -119.350771, '2020-04-04 12:00:00', null);
INSERT INTO potential_contact(device_id_1, device_id_2, latitude, longitude, time_met, speed) values(5, 10, 35.596752, -119.350750, '2020-04-04 12:00:00', null);

insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350771, 35.596752, '2020-04-04 12:00:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350772, 35.596727, '2020-04-04 12:01:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350771, 35.596702, '2020-04-04 12:02:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350770, 35.596673, '2020-04-04 12:03:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350772, 35.596648, '2020-04-04 12:04:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350770, 35.596625, '2020-04-04 12:05:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350771, 35.596600, '2020-04-04 12:06:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350771, 35.596574, '2020-04-04 12:07:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350769, 35.596545, '2020-04-04 12:08:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350771, 35.596511, '2020-04-04 12:09:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350769, 35.596482, '2020-04-04 12:10:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350769, 35.596453, '2020-04-04 12:11:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350769, 35.596428, '2020-04-04 12:12:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350769, 35.596403, '2020-04-04 12:13:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (10, -119.350770, 35.596375, '2020-04-04 12:14:00');

insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596752, '2020-04-04 12:00:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596728, '2020-04-04 12:01:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596704, '2020-04-04 12:02:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596674, '2020-04-04 12:03:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596649, '2020-04-04 12:04:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596627, '2020-04-04 12:05:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596602, '2020-04-04 12:06:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596577, '2020-04-04 12:07:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596547, '2020-04-04 12:08:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596515, '2020-04-04 12:09:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596484, '2020-04-04 12:10:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596456, '2020-04-04 12:11:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596430, '2020-04-04 12:12:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596404, '2020-04-04 12:13:00');
insert into locations (fk_device_id, longitude, latitude, time_recorded) values (5, -119.350750, 35.596377, '2020-04-04 12:14:00');

INSERT INTO infected(fk_device_id, fk_is_infected, symptoms_begin, infection_date) values(10, 1, '2020-04-02', '2020-04-04');