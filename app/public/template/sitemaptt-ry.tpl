<?xml version="1.0" encoding="utf-8"?>

<DOCUMENT version="1"> 
  {{#each data}}
  <item> 
    <key> <![CDATA[{{id}}lixiangqiche]]> </key>  
    <display type="object"> 
      <title type="string"> <![CDATA[{{subString title 35}}]]> </title>
      <tmaid type="string"> <![CDATA[tt6a5b1ce6f57e84b1]]> </tmaid>
      <lightappid_path type="string"> <![CDATA[tt6a5b1ce6f57e84b1]]> </lightappid_path>
      <lightapp_path type="string"> <![CDATA[pages/communityResult/index?id={{contentId}}]]> </lightapp_path>  
      <slogan type="string"> <![CDATA[理想汽车-没有里程焦虑的智能电动大型SUV]]> </slogan>  
      <description type="string"> <![CDATA[{{subString body 35}}]]> </description>  
      <logo type="object"> 
        <square type="object"> 
          <url type="string"> <![CDATA[https://s.ampmake.com/www/image/ipad-logo.png]]> </url>  
         <height type="integer"> <![CDATA[153]]> </height>  
         <width type="integer"> <![CDATA[153]]> </width>
        </square>
      </logo>  
      <funcs type="array"> 
        <value type="object"> 
          <name type="string"> <![CDATA[预约试驾]]> </name>  
          <lightapp_link_path type="string"> <![CDATA[pages/webview/index?url=%2Fdrive%2Fshop.html%3FinviterId%3D%26activityId%3D9000004%26transparent%3D2]]> </lightapp_link_path>  
          <lightappid_link_path type="string"> <![CDATA[tt6a5b1ce6f57e84b1]]> </lightappid_link_path>  
          <path type="string"> <![CDATA[https://www.lixiang.com/drive/shop.html?inviterId=&activityId=&transparent=2]]> </path> 
        </value>  
        <value type="object"> 
          <name type="string"> <![CDATA[2020款车型]]> </name>  
          <lightapp_link_path type="string"> <![CDATA[pages/imgPreview/index/index]]> </lightapp_link_path>  
          <lightappid_link_path type="string"> <![CDATA[tt6a5b1ce6f57e84b1]]> </lightappid_link_path>  
          <path type="string"> <![CDATA[https://www.lixiang.com/vis/pic/pc]]> </path> 
        </value> 
      </funcs> 
    </display> 
  </item> 
  {{/each}}
</DOCUMENT>
