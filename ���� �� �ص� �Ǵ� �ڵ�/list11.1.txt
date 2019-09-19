import webapp2

class HelloWorld(webapp2.RequestHandler):
	def get(self):
	self.response.write('Hello from App Engine!');

app = webapp2.WSGIApplication([
	('/', HelloWorld),
])