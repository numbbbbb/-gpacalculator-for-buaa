# coding:utf-8
from django.shortcuts import render_to_response
import os
from django.http import HttpResponse
from base.models import *
from django.utils import simplejson
from django.views.decorators.csrf import ensure_csrf_cookie
import random
import json
from django.http import Http404


allchar = '0123456789ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz'


def main(request):
    print request.get_host()
    #print request.POST['grade']
    '''ok = False
    allline = ''
    counter = 0
    while not ok:
        if counter >= 3:
            return render_to_response('error.html', locals())
        thecommand = "python " + os.path.dirname(__file__) + "/getdata.py %s %s" % (request.POST['xuehao'], request.POST['mima'])
        p = os.popen(thecommand, "r")
        while 1:
            line = p.readline()
            if not line:
                break
            allline += line
            if "fuck" in line:
                ok = False
            else:
                ok = True
        counter += 1
    '''
    allline = request.GET['grade'].encode('utf-8')
    gotit = False
    while not gotit:
        randstr = ''
        for i in range(16):
            randstr += random.choice(allchar)
        try:
            Thescore.objects.get(randstr=randstr)
            gotit = False
        except:
            gotit = True
    Thescore.objects.create(randstr=randstr, thehtml=allline)
    callback = request.GET['callback']
    return HttpResponse('%s(%s)' % (callback, simplejson.dumps({'result': randstr})))


def index(request):
    return render_to_response('gpahelp.html', locals())


@ensure_csrf_cookie
def showscore(request, randstr):
    try:
        allline = Thescore.objects.get(randstr=randstr).thehtml.encode('utf-8')
    except:
        raise Http404
    part = ''
    for i in allline.split('trfengexian'):
        tempi = i.split('tdfengexian')
        if len(tempi) == 5 and tempi[4] and tempi[4] != "&nbsp;":
            part += '''<tr>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20"></td>
<td><input type="checkbox" checked></td>
</tr>''' % (tempi[1], tempi[2], tempi[3], tempi[4])
        elif (len(tempi) == 6 or len(tempi) == 7 or len(tempi) == 8) and tempi[4] and tempi[4] != "&nbsp;":
            part += '''<tr>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20">%s</td>
<td height="20">%s</td>
<td><input type="checkbox" checked></td>
</tr>''' % (tempi[1], tempi[2], tempi[3], tempi[4], tempi[5])
    thetable = '''<table class="table table-striped">
<thead><tr><th>课程名称</th><th>课程性质</th><th>学分</th><th>成绩</th><th>补考重修标记</th><th>是否计算此科目</th></tr></thead><tbody>''' + part + '</tbody></table>'''
    return render_to_response('main.html', locals())


def deldata(request):
    Thescore.objects.get(randstr=request.POST['thestr']).delete()
    return HttpResponse(simplejson.dumps({'result': 'ok'}))
