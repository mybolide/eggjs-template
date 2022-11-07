<?xml version="1.0" encoding="utf-8"?>

<DOCUMENT> 
  {{#each data}}
  <item> 
    <key>{{id}}lixiangqiche</key>  
    <display> 
      <title>{{subString title 50}}</title>  
      <description><![CDATA[{{subString body 50}}]]></description>  
      <pic>{{flterImg images}}</pic>
      <create_time>{{createdAt}}</create_time>  
      <from>理想汽车</from>  
      <url>http://www.lixiang.com</url>
      <lightapp_url>pages/communityResult/index?id={{contentId}}</lightapp_url>  
      <lightappid_url>tt6a5b1ce6f57e84b1</lightappid_url> 
      <execute>{{flterExecute ttStatus}}</execute>
    </display> 
  </item> 
  {{/each}}
</DOCUMENT>
