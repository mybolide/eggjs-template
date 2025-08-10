var fs = require("fs-extra");
var path = require("path");
var handlebars = require("handlebars");
var common = require("../utils/common");


handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

const modules = "test"
const data = {
  //商品名称
  name: { type: "string", required: false, description: "商品名称", search: true, searchType: "input" },
  //商品分类名称
  classifyName: {
    type: "string",
    required: false,
    description: "商品分类名称",
  },
  
  //兑换该商品所需的积分
  pricePoints: {
    type: "integer",
    required: false,
    description: "兑换该商品所需的积分",
  },
  //库存数量
  stock: { type: "integer", required: false, description: "库存数量" },
  //商品状态1：上架、2：下架
  status: {
    type: "integer",
    required: false,
    description: "商品状态1：上架、2：下架",
    search: true,
    searchType: "select",
    selectOptions: [
      { label: "上架", value: 1 },
      { label: "下架", value: 2 },
    ]
  },
  //商品图片
  coverImg: { type: "string", required: false, description: "商品图片", type: "image" },
  //已销售
  sale: { type: "integer", required: false, description: "已销售" },
};

// 把search:true的属性，添加到searchList中
var searchList = [];
var tableCloumns = [];
for (var key in data) {
  data[key].name = key
  if (data[key].search) {
    searchList.push(data[key]);
  }
  tableCloumns.push(data[key])
}
console.info(tableCloumns)


function exportFile(fileName) {
  var pageView = common.readFile("../templates/pageView.vue.tpl");
  pageView = handlebars.compile(pageView);
  var _tempFileData = {searchList,tableCloumns, modules};
  var pageViewData = pageView(_tempFileData);
  pageViewData = pageViewData.replace(/{\[{/g, '{{').replace(/}\]}/g, '}}');
  common.writeFile(__dirname + "/views", fileName + `.vue`, pageViewData);
}

exportFile("test");
