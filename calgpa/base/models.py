from django.db import models


class Thescore(models.Model):
	randstr = models.CharField(max_length=16)
	thehtml = models.TextField(max_length=200000)
	
	def __unicode__(self):
		return self.randstr
