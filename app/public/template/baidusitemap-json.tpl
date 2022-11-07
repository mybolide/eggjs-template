[
  {{#each data.data}}
  {
    "app_id": "{{appId}}",
    "title": "{{{subString title 200}}}",
    "body": "{{{subString body 200}}}",
    "path": "/pages/community/detail/index/index?id={{{id}}}",
    "images": {{{images}}},
    "mapp_type": "{{mappType}}",
    "mapp_sub_type": "{{mappSubType}}",
    "feed_type": "{{feedType}}",
    "feed_sub_type": "{{feedSubType}}",
    "tags": {{{tags}}},
    "ext": {{{ext}}}
  }{{{isShowDot ../data.length @index}}}
  {{/each}}
]