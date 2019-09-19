import webapp2
from google.appengine.api import taskqueue

class MyProfileHandler(webapp2.RequestHandler):
	def get(self):
		self.response.write('This is your profile.')

	def post(self):
		task = taskqueue.add(
			url='/send-email',
			params={'email': self.request.get('email')})

class SendEmailHandler(webapp2.RequestHandler):
	def post(self):
		some_email_library.send_email(
			email=self.request.get('email'))

app = webapp2.WSGIApplication([
	('/my-profile', MyProfileHandler),
	('/send-email', SendEmailHandler),
])