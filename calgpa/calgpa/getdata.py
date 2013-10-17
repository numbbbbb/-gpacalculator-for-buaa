from ghost import Ghost
import time
import base64
from PIL import Image
from io import BytesIO
import itertools
import operator
import sys
import random
import os


standhash = {}
finalnumber = ''
allyear = ['2008-2009-1', '2008-2009-2', '2009-2010-1', '2009-2010-2', '2010-2011-1', '2010-2011-2', '2011-2012-1', '2011-2012-2', '2012-2013-1', '2012-2013-2', '2013-2014-1', '2013-2014-2', '2014-2015-1', '2014-2015-2', '2015-2016-1']
#allyear = ['2012-2013-1']


def hamming_dist(hash1, hash2):
    return sum(itertools.imap(operator.ne, hash1, hash2))


def get_hash(img):
    image = img.resize((9, 13), Image.ANTIALIAS).convert("L")
    pixels = list(image.getdata())
    avg = sum(pixels) / len(pixels)
    return "".join(map(lambda p: "1" if p > avg else "0", pixels))


def compareit(img):
    min0 = 100000
    thenumber = -1
    img = get_hash(img)
    for i in range(0, 10):
        if hamming_dist(standhash[i], img) < min0:
            min0 = hamming_dist(standhash[i], img)
            thenumber = i
    if min0 != 100:
        return (min0, thenumber)


def tryit(img, pointx):
    maxmin = 1000
    thenumber = 0
    gap = 0
    for i in range(0, 5):
        img1 = img.transform((9, 13), Image.EXTENT, (pointx + i, 7, pointx + i + 9, 20))
        (min1, thenumber1) = compareit(img1)
        if min1 < maxmin:
            maxmin = min1
            thenumber = thenumber1
            gap = i
    return (gap, thenumber)


def getdata():
    countnumber = 0
    correctnumber = 0
    global finalnumber, standhash
    for i in range(0, 10):
        standhash[i] = get_hash(Image.open(os.path.join(os.path.dirname(__file__), '../static/img/yzm/stand').replace('\\', '/') + str(i) + ".png"))
    for j in range(0, 1):
        ghost = Ghost()
        page, resources = ghost.open('http://202.112.132.147:7001/ieas2')
        page, resources = ghost.evaluate(
        '''function getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    getBase64Image(document.getElementById('yzmmsg'));
    ''')
        img1 = Image.open(BytesIO(base64.b64decode(page)))
        #img1 = Image.open("/Users/selfdir/Documents/calgpa/static/img/wrong0.626485832093.png")
        pointx = 10
        for i in range(0, 4):
            (gap, thenumber) = tryit(img1, pointx)
            finalnumber += str(thenumber)
            if thenumber == 1:
                pointx = pointx + gap + 8
            else:
                pointx = pointx + gap + 9
        #print finalnumber
        result, resources = ghost.set_field_value("input[id=username]", sys.argv[1])
        result, resources = ghost.set_field_value("input[id=password]", sys.argv[2])
        result, resources = ghost.set_field_value("input[id=code]", finalnumber)
        #ghost.capture_to('/Users/selfdir/Documents/calgpa/static/img/xxxx.png')
        try:
            page, resources = ghost.evaluate(
        '''login();
    ''', expect_loading=True)
            if page.url == "http://202.112.132.147:7001/ieas2/login":
                #correctnumber += 1
                for j in allyear:
                    page, resources = ghost.open('http://202.112.132.147:7001/ieas2/cj/xs_findcj?xnxqMap=' + j)
                    print page.content
                    print "woshifengexian"
        except:
            print "fuckkkkkkkkkk"
        return finalnumber
        finalnumber = ''
        countnumber += 1
        #print str(correctnumber * 100.0 / countnumber) + '%'
        ghost.exit()


getdata()
