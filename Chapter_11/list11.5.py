import webapp2

class HelloWorld(webapp2.RequestHandler):
	def get(self):
		self.response.write('Hello from service 2!');

app = webapp2.WSGIApplication([
	('/', HelloWorld),
])