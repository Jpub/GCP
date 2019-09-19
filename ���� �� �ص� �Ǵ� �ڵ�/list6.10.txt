CREATE TABLE employees (
	employee_id INT64 NOT NULL,
	name STRING(1024) NOT NULL,
	start_date DATE NOT NULL
) PRIMARY KEY(employee_id);

CREATE TABLE paychecks (
	employee_id INT64 NOT NULL,
	paycheck_id INT64 NOT NULL,
	effective_date DATE NOT NULL,
	amount_cents INT64 NOT NULL
) PRIMARY KEY(employee_id, paycheck_id),
	INTERLEAVE IN PARENT employees ON DELETE CASCADE;