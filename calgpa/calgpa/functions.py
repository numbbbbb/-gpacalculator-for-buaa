import re

class IgnoreCrsfMiddleware(object):
	def process_request(self,request, **karg):
		if re.match(r'^/main/?$',request.path):
			request.csrf_processing_done = True
			return None