        --- User Table ---
CREATE TABLE IF NOT EXISTS users
(
    device_id SERIAL NOT NULL,
    email character varying(50),
    passwrd character varying(250),
    b_day date,
    token character varying(250),
    bt_uuid uuid,
    fb_token character varying(250),
    threat_level integer,
    threat_date timestamp,
    
    
    CONSTRAINT user_pkey PRIMARY KEY (device_id)
)
TABLESPACE pg_default;

    ALTER TABLE users
    OWNER to contacttracing;
    ALTER TABLE users ALTER COLUMN threat_level SET DEFAULT 0;

    -- Locations Table --
CREATE TABLE IF NOT EXISTS locations
(
    fk_device_id integer,
    fk_device_id_2 integer,
    longitude numeric,
    latitude numeric,
    time_recorded timestamp,

    CONSTRAINT locations_pkey FOREIGN KEY (fk_device_id) 
    REFERENCES users(device_id)
    
)
TABLESPACE pg_default;

    ALTER TABLE users
    OWNER to contacttracing;

        --- Status Table ---
CREATE TABLE IF NOT EXISTS statuses
(
    status_id integer NOT NULL,
    status_name character varying(50),
    caution_level int,

    CONSTRAINT statuses_pkey PRIMARY KEY (status_id)
)
TABLESPACE pg_default;

    ALTER TABLE statuses
    OWNER to contacttracing;
    
        --- Virus Table ---
CREATE TABLE IF NOT EXISTS virus
(
    is_infected integer NOT NULL,
    strain_name character varying(30),

    CONSTRAINT virus_pkey PRIMARY KEY (is_infected)
)
TABLESPACE pg_default;

    ALTER TABLE virus
    OWNER to contacttracing;


    --- Contact Point table ---
CREATE TABLE IF NOT EXISTS potential_contact
(
    device_id_1 integer NOT NULL,
    device_id_2 integer NOT NULL,

    latitude numeric,
    longitude numeric,
    time_met timestamp,
    compared integer,

    CONSTRAINT potential_contact_fkey1 FOREIGN KEY (device_id_1) REFERENCES users(device_id),
    CONSTRAINT potential_contact_fkey2 FOREIGN KEY (device_id_2) REFERENCES users(device_id)
)
TABLESPACE pg_default;

    ALTER TABLE potential_contact
    OWNER to contacttracing;
    ALTER TABLE potential_contact ALTER COLUMN compared SET DEFAULT 0;

    --- Visits Table ---

CREATE TABLE IF NOT EXISTS infected
(
    fk_device_id integer NOT NULL,
    fk_is_infected integer NOT NULL,
    infection_date date DEFAULT NOW(),


    CONSTRAINT fk_infected_device_id FOREIGN KEY (fk_device_id)
    REFERENCES users(device_id),

    CONSTRAINT fk_infected_is_infected FOREIGN KEY (fk_is_infected)
    REFERENCES virus(is_infected)
)
TABLESPACE pg_default;

    ALTER TABLE infected
    OWNER to contacttracing;

        --- Has table ---
CREATE TABLE IF NOT EXISTS has
(
    fk_status_id int NOT NULL,
    fk_device_id int NOT NULL,

    CONSTRAINT fk_has_status_id FOREIGN KEY (fk_status_id)
    REFERENCES statuses(status_id),
    CONSTRAINT fk_has_device_id FOREIGN KEY (fk_device_id)
    REFERENCES users(device_id)
)
TABLESPACE pg_default;

    ALTER TABLE has
    OWNER to contacttracing;

    -- Notifications table--
CREATE TABLE IF NOT EXISTS notifications
(
    fk_device_id int NOT NULL,

    notifications_id SERIAL,
    date_time_recieved timestamptz,


    CONSTRAINT fk_notifications_device_id FOREIGN KEY (fk_device_id)
    REFERENCES users(device_id)
)
TABLESPACE pg_default;

    ALTER TABLE has
    OWNER to contacttracing;