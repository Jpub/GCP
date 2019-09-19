CREATE INDEX paychecks_by_amount ON paychecks(amount_cents);
CREATE INDEX paychecks_per_employee_by_amount_interleaved
		ON paychecks(employee_id, amount_cents),
		INTERLEAVE IN employees;