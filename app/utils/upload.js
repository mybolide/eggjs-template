const { BosClient, VodClient } = require('@baiducloud/sdk')
const path = require("path")
const clientConfig = {
    credentials: {
        ak: '14bb6d05db79479fa26dbe71bcfa8aa7', // 您的AK
        sk: '58bf3f95f8474d67865b188cee744ad8' // 您的SK
    },
    endpoint: 'http://bj.bcebos.com'
};
const bucket = 'fw-static'
let bdClient = null
/**

 * @param {*} key 文件名
 * @param {*} filePath
 * @returns 
 */
const putFromFile = async (key, file) => {
    if (!bdClient) {
        bdClient = new BosClient(clientConfig);
    }
    const ext = path.extname(file.filename).toLocaleLowerCase()
    await bdClient.putObjectFromFile(bucket, `${key}${ext}`, file.filepath)
    const url = `https://cdn.fontmeta.cn/${key}${ext}`
    return url
}

const putFromBuffer = async (stream, key, ext, mimeType) => {
    if (!bdClient) {
        bdClient = new BosClient(clientConfig);
    }
    await bdClient.putObject(bucket, key, stream, {
        "Content-Type": mimeType
    })

    const url = `https://cdn.fontmeta.cn/${key}${ext}`
    return url
}

module.exports = {
    putFromBuffer,
    putFromFile
}