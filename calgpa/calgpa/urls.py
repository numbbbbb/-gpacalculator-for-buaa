from django.conf.urls import patterns, include, url
from views import *
import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    (r'^admin/', include(admin.site.urls)),
    (r'^showscore/(.+)/$', showscore),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    (r'^main/$', main),
    (r'^$', index),
    (r'^deldata/$', deldata),
    (r'[\s\S]*', index),
    # Examples:
    # url(r'^$', 'calgpa.views.home', name='home'),
    # url(r'^calgpa/', include('calgpa.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
