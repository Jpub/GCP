import re
import apache_beam as beam

with beam.Pipeline() as pipeline:
	(pipeline
		| beam.io.ReadFromText(input_file)
		| 'Split' >> (beam.FlatMap(lambda x: re.findall(r'[A-Za-z\']+', x))
			.with_output_types(unicode))
		| 'Filter' >> beam.Filter(lambda x: x.lower().startswith('a'))
		| 'Count' >> beam.combiners.Count.Globally()
		| beam.io.WriteToText(output_file)
	)