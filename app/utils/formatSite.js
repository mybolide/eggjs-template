const dayjs = require('dayjs')
const filterType = [1, 2, 3, 6, 7, 8, 9, 10]
const filterEmoji = str => {
  return str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
}
const filterImags = arr => {
  if (arr.length > 3) {
    arr = arr.slice(0, 3)
  }
  return JSON.stringify(arr)
}
module.exports = {
  formatProductChannalTypes (data) {
    const result = []
    data.map(item => {
      if (item.id > 0) {
        let tags = item.features && item.features.map(innerItem => {
          return innerItem.title
        })
        const baseTags = ['汽车', '科技', '自动驾驶', '新能源汽车', '文化', '旅游', '生活']
        tags = tags.concat(baseTags)
        let title = filterEmoji(item.title) || ''
        title = title.replace(/\s*/g, "")
        title = title.length > 40 ? title.substring(0, 39) : title
        const body = filterEmoji(item.description) || filterEmoji(item.guide) || title
        const iamges = item.imageUrls.length > 0 ? item.imageUrls : [item.surfacePlot]
        result.push({
          id: item.id,
          createdAt: dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
          appId: 19362955,
          body: body.length > 500 ? body.substring(0, 500) : body,
          ext: JSON.stringify({ img_urls: iamges.join(','), author_name: item.nickname, author_portrait_url: item.avatar, publish_time: dayjs(item.releaseTime).format('YYYY年MM月DD日') }),
          feedSubType: '新能源汽车',
          feedType: '汽车',
          images: filterImags(iamges),
          mappSubType: 1001, // item.type === 3 ? 1002 : 1001,
          mappType: 1000,
          path: `/pages/communityResult/index?id=${item.id}`,
          tags: JSON.stringify(tags),
          title,
          contentId: item.id,
          authorName: item.nickname,
          type: 1,
        })
      }
    })
    return result
  },
  getPraiseBody (data) {
    const tags = [] // [data.buyCarPurpose]
    const body = []
    let imags = data.surfacePlot ? [data.surfacePlot] : []
    data.coreDimensions.map(item => {
      // tags.push(item.name)
      body.push(item.description)
      imags = imags.concat(item.medias.map(item => item.image))
    })
    data.dimensions.map(item => {
      imags = imags.concat(item.medias.map(item => item.image))
    })
    return { tags, imags, body: body.join(';') }
  },
  formatPraise (data) {
    const result = []
    data.map(item => {
      if (item.id > 0) {
        const iwomVo = this.getPraiseBody(item.iwomVo);
        let tags = iwomVo.tags
        const baseTags = ['汽车', '科技', '自动驾驶', '新能源汽车', '文化', '旅游', '生活']
        tags = tags.concat(baseTags)
        let title = filterEmoji(item.title) || ''
        title = title.replace(/\s*/g, "")
        title = title.length > 40 ? title.substring(0, 39) : title

        const body = iwomVo.body// filterEmoji(item..description) || filterEmoji(item.guide) || title
        const iamges = iwomVo.imags// item.imageUrls.length > 0 ? item.imageUrls : [item.surfacePlot]
        result.push({
          id: item.id,
          createdAt: dayjs(item.releaseTime).format('YYYY-MM-DD HH:mm:ss'),
          appId: 19362955,
          body: body.length > 500 ? body.substring(0, 500) : body,
          ext: JSON.stringify({ img_urls: iamges.join(','), author_name: item.nickname, author_portrait_url: item.avatar, publish_time: dayjs(item.releaseTime).format('YYYY年MM月DD日') }),
          feedSubType: '新能源汽车',
          feedType: '汽车',
          images: filterImags(iamges),
          mappSubType: 1001, // item.type === 3 ? 1002 : 1001,
          mappType: 1000,
          path: `/pages/community/detail/praise/praise?id=${item.id}`,
          tags: JSON.stringify(tags),
          title,
          contentId: item.id,
          authorName: item.nickname,
          type: 2
        })
      }
    })
    return result
  }
}
