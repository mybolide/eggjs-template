const crypto = require("crypto")
function clearDeep (obj) {
  if (!obj || !typeof obj === 'object') return
  const keys = Object.keys(obj)
  for (const key of keys) {
    const val = obj[key]
    if (
      typeof val === 'undefined' ||
      ((typeof val === 'object' || typeof val === 'string') && !val)
    ) {
      // 如属性值为null或undefined或''，则将该属性删除
      delete obj[key]
    } else if (typeof val === 'object') {
      // 属性值为对象，递归调用
      clearDeep(obj[key])
      if (Object.keys(obj[key]).length === 0) {
        // 如某属性的值为不包含任何属性的独享，则将该属性删除
        delete obj[key]
      }
    }
  }
}

function dataToTree (data) {
  data = JSON.parse(JSON.stringify(data))
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });
  //        console.log(map);
  const val = [];
  data.forEach(function (item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item.parentId];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}
function md5 (s) {
  // 注意参数需要为string类型，否则会报错
  return crypto.createHash('md5').update(String(s)).digest('hex');
}
// function _getChilds(id, array) {
//   let childs = []
//   for(let arr of array) {
//     if (arr.parentId === id) {
//       childs.push(arr)
//     }
//   }
//   for (let child of childs) {
//     let childscopy = _getChilds(child.id, array)
//     if (childscopy.length > 0) {
//       child.children = childscopy;
//     }
//   }
//   return childs
// }
// function dataToTree(params) {
//   params = JSON.parse(JSON.stringify(params))
//   let result = []
//   for(let param of params) {
//     if (param.parentId === 0) {
//       const parent = param
//       parent.children = _getChilds(parent.id, params);//获取子节点
//       result.push(parent)
//     }
//   }
//   return result
// }

module.exports = {
  sleep (time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  },
  clearDeep,
  dataToTree,
  md5
}
