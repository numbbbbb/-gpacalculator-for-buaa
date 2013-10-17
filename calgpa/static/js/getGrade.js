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
function testifready(){
  try{
  $("body");
  main_func();
}
catch(e){
setTimeout("function testifready(){try{$(\"body\");main_func();}catch(e){setTimeout(\"testifready()\", 200);}};testifready();", 200);
}
}
testifready();
}

loadjscssfile("http://code.jquery.com/jquery-1.10.2.min.js", "js");  

function main_func(){
  var target_url = "gpa.buaahelper.com";
  var sendInfo = "";
  var tempgrade = 0;
  var the_domain = window.location.host;
  if (the_domain == "202.112.132.147:7001" || the_domain == "202.112.132.144:7001") {
    $("noframeset").remove();
  var insert_part = '<div style="opacity:0.9;height:100%;position:fixed;width:100%;background:#222;z-index:150;display:none;"><img id="shelter" style="position:fixed;" src="http://' + target_url + '/static/img/spinner.gif" alt="" width="330" height="28.5" /><center><font color=white><p id="word" style="font-size:16px;">成绩信息获取中，请稍候</p></font></center></div>'
  $("html").prepend(insert_part);
  $("#shelter").css("top","30%");
        $("#shelter").css("left",(($(window).width()/2-165)/$(window).width()*100)+"%");
         $("#word").css("margin-top","21%");
         $("#shelter").parent().css("display","");
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
    $.ajax({
  type: 'POST',
  url: "/ieas2/cj/xs_findcj",
  data: {
      xnxqMap:val
    },
  success: function(data){
      sendInfo = sendInfo + data + 'woshifengexian';
    },
  dataType: "html",
  async:false
});
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
  }
  else if (the_domain == "124.205.18.175" || the_domain == "124.205.18.176") {
    var targetInfo = '';
    sendInfo = $("#iframeautoheight").contents().find("#DataGrid1").find("tr");
    count = 0
    sendInfo.each(function(){
      if (count != 0){
        count1 = 0;
      $(this).find("td").each(function (){
        if (count1 == 1 || count1 == 3 || count1 == 4 || count1 == 6 || count1 == 11 || count1 == 13){
          if (count1 == 11){
            if ($(this).next().html().replace(/(^\s*)|(\s*$)/g, "") != '&nbsp;'){
              targetInfo += $(this).next().html().replace(/(^\s*)|(\s*$)/g, "") + 'tdfengexian';
            }
            else{
              targetInfo += $(this).html().replace(/(^\s*)|(\s*$)/g, "") + 'tdfengexian';
            }
          }
          else{
        targetInfo += $(this).html().replace(/(^\s*)|(\s*$)/g, "") + 'tdfengexian';
      }
      }
      count1 += 1;
      })
      targetInfo += 'trfengexian';
    }
    count += 1;
    })
  }
  else if (the_domain == "gsmis.graduate.buaa.edu.cn"){
    var targetInfo = '';
    count = 0
    thelength = $(window.frames[0].frames[1].document).find("tr.tablefont2").length;
    $(window.frames[0].frames[1].document).find("tr.tablefont2").each(function(){
      if (count != 0 && count != thelength - 1 && count != thelength - 2){
        count1 = 0;
      $(this).find("td").each(function (){
        if (count1 == 2 || count1 == 1){   
        targetInfo += $(this).html().replace(/(\s*)/g, "") + 'tdfengexian';
      }
      else if (count1 == 3){
        $(this).children().first().remove();
        targetInfo += $(this).html().replace(/(\s*)/g, "") + 'tdfengexian';
      }
      else if (count1 == 4){
        tempgrade = $(this).html().replace(/(\s*)/g, "") + 'tdfengexian'
      }
      else if (count1 == 9){
        targetInfo += $(this).html().replace(/(\s*)/g, "") + 'tdfengexian';
        targetInfo += tempgrade;
      }
      count1 += 1;
      })
      targetInfo += 'trfengexian';
    }
    count += 1;
    });
  };
    the_url = "http://" + target_url + "/main/?callback=?";
    $.getJSON(the_url,{
      grade:JSON.stringify(targetInfo)
    },
function(data){
location.href ="http://" + target_url + "/showscore/"+data.result+"/";
}
); 

};