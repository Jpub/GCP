CREATE TABLE events (
	event_time TIMESTAMP NOT NULL,
	event_type STRING(64) NOT NULL
) PRIMARY KEY(event_time);