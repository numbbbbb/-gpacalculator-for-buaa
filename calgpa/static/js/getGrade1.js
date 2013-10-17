function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref);
  boomboom();
}

loadjscssfile("http://code.jquery.com/jquery-1.10.2.min.js", "js");            //参数：地址，事件
function boomboom(){
  alert($("body").find("#frmme").contents().length);
  var target_frame = $('#frmme').contents().find('frame[name="mainFrame"]');
  alert(target_frame.html());
  alert($(target_frame[0].contentWindow.document).html());
  return;
  var target_url = "gpa.buaahelper.com";
  var sendInfo="";
  //$("frameset").remove();
  $("noframeset").remove();
  var insert_part = '<div style="opacity:0.9;height:100%;position:fixed;width:100%;background:#222;z-index:150;display:none;"><img id="shelter" style="position:fixed;" src="http://' + target_url + '/static/img/spinner.gif" alt="" width="330" height="28.5" /><center><font color=white><p id="word" style="font-size:16px;">成绩信息获取中，请稍候</p></font></center></div>'
  $("html").prepend(insert_part);
  $("#shelter").css("top","30%");
        $("#shelter").css("left",(($(window).width()/2-165)/$(window).width()*100)+"%");
         $("#word").css("margin-top","21%");
         $("#shelter").parent().css("display","");
  $.ajaxSetup({ 
    async: false 
    }); 
  var option=["2008-2009-1",
      "2008-2009-2",
      "2009-2010-1",
      "2009-2010-2",
      "2010-2011-1",
      "2010-2011-2",
      "2011-2012-1",
      "2011-2012-2",
      "2012-2013-1",
      "2012-2013-2",
      "2013-2014-1",
      "2013-2014-2",
      "2014-2015-1",
      "2014-2015-2",
      "2015-2016-1"];
  $.each(option,function(i,val){
    $.post("/ieas2/cj/xs_findcj",
    {
      xnxqMap:val
    },
    function(data){
      sendInfo=sendInfo+data+'woshifengexian';
    },"html");
  });
  var targetInfo = '';
  var count = 0;
  $(sendInfo).children('table').each(function(){
    if ($(this).html().length > 300){
    $(this).find('tr').not(".fontbold").each(function(){
      $(this).find('td').each(function(){
        if ($(this).html() != '' && $(this).html().replace(/(^\s*)|(\s*$)/g, "").length < 30){
        targetInfo += $(this).html().replace(/(^\s*)|(\s*$)/g, "") + 'tdfengexian';
      }
      })
      targetInfo += 'trfengexian';
    });
  }
  })
  the_url = "http://" + target_url + "/main/?callback=?";
    $.getJSON(the_url,{
      grade:JSON.stringify(targetInfo)
    },
function(data){
location.href ="http://" + target_url + "/showscore/"+data.result+"/";
}

); 

}