

CREATE OR REPLACE FUNCTION notify_algorithm()
    RETURNS TRIGGER AS 
    $$
    DECLARE

    payload TEXT;
    time_stamp timestamptz;
    fk_device_id int;
    BEGIN 
    payload = NEW.fk_device_id;
    fk_device_id = NEW.fk_device_id;
    time_stamp = NOW();
    INSERT INTO notifications(fk_device_id, date_time_recieved)
    VALUES (NEW.fk_device_id, NOW());
    PERFORM pg_notify('algorithm'::text, payload);

    RETURN NULL;
    END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_on_infected
    AFTER INSERT ON infected
    FOR EACH ROW 
    EXECUTE FUNCTION notify_algorithm();


CREATE OR REPLACE FUNCTION add_new_location()
    RETURNS TRIGGER as
    $$
    BEGIN
    INSERT INTO locations(fk_device_id, fk_device_id_2, latitude, longitude, time_recorded)
    VALUES (NEW.device_id_1, NEW.device_id_2, NEW.latitude, NEW.longitude, NEW.time_met);
    RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER new_potential_contact
    AFTER INSERT ON potential_contact
    FOR EACH ROW 
    EXECUTE FUNCTION add_new_location();

CREATE OR REPLACE FUNCTION getContacted (

)RETURNS TABLE(device_id integer) as
$$
BEGIN

RETURN QUERY
SELECT contact.device_id_2 FROM contact
JOIN contracted 
JOIN users
on users.device_id = contracted.fk_device_id
ON users.device_id = contact.device_id_1
WHERE contracted.fk_is_infected = 1;

END;


$$ LANGUAGE plpgsql; 


