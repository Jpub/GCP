import argparse
import re

import apache_beam as beam
from apache_beam.options import pipeline_options

PROJECT_ID = '<your-project-id-here>'
BUCKET = 'dataflow-bucket'

def get_pipeline_options(pipeline_args):
	pipeline_args = ['--%s=%s' % (k, v) for (k, v) in {
		'project': PROJECT_ID,
		'job_name': 'dataflow-count',
		'staging_location': 'gs://%s/dataflow-staging' % BUCKET,
		'temp_location': 'gs://%s/dataflow-temp' % BUCKET,
	}.items()] + pipeline_args
	options = pipeline_options.PipelineOptions(pipeline_args)
	options.view_as(pipeline_options.SetupOptions).save_main_session = True
	return options

def main(argv=None):
	parser = argparse.ArgumentParser()
	parser.add_argument('--input', dest='input')

parser.add_argument('--output', dest='output', default='gs://%s/dataflow-count' % BUCKET)
script_args, pipeline_args = parser.parse_known_args(argv)
pipeline_opts = get_pipeline_options(pipeline_args)

with beam.Pipeline(options=pipeline_opts) as pipeline:
	(pipeline
		| beam.io.ReadFromText(script_args.input)
		| 'Split' >> (beam.FlatMap(lambda x: re.findall(r'[A-Za-z\']+', x))
			.with_output_types(unicode))
		| 'Filter' >> beam.Filter(lambda x: x.lower().startswith('a'))
		| 'Count' >> beam.combiners.Count.Globally()
		| beam.io.WriteToText(script_args.output)
	)

if __name__ == '__main__':
	main()
