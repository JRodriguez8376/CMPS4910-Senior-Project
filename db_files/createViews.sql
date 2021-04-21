CREATE OR REPLACE VIEW recent_infected AS 
    SELECT * from infected 
    WHERE infection_date 
    BETWEEN (NOW() - INTERVAL '2 WEEKS' ) AND (NOW() + INTERVAL '1 DAY');

CREATE OR REPLACE VIEW infected_users AS
    SELECT device_id, email, passwrd, threat_date, threat_level, infection_date
    FROM users JOIN recent_infected
    ON recent_infected.fk_device_id = users.device_id;

CREATE OR REPLACE VIEW hotspots AS

    SELECT device_id_1, device_id_2, latitude, longitude FROM potential_contact
    --WHERE compared = 1
    ;
CREATE OR REPLACE VIEW user_notifications AS
    SELECT device_id, email, threat_level, notifications_id, date_time_recieved
    FROM users JOIN notifications
    on users.device_id = notifications.fk_device_id;

CREATE OR REPLACE VIEW user_info AS
    SELECT email, threat_level, threat_date 
    FROM users;
CREATE OR REPLACE VIEW user_status AS
    SELECT email, status_name, caution_level
    FROM users 
    JOIN has
    ON users.device_id = has.fk_device_id
    JOIN statuses
    ON has.fk_status_id = statuses.status_id;

CREATE OR REPLACE VIEW bluetooth_contact AS 
    SELECT u1.device_id as device_id_1, u1.bt_uuid as bt_uuid_1, u2.device_id as device_id_2, u2.bt_uuid as bt_uuid_2
    FROM USERS u1
    JOIN USERS u2
    ON u1.device_id != u2.device_id AND u1.bt_uuid != u2.bt_uuid;
