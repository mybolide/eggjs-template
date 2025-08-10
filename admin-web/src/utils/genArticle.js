export function extractDataFromHtml(htmlString) {
    // 提取title
    const titleMatch = htmlString.match(/(标题：[\s\S]*?\n)|<?#?title>?([\s\S]*?)<?\/#?title>?/);
    const title = titleMatch ? (titleMatch[1] || titleMatch[2]): '';

    // 提取keyword
    const keywordMatch = htmlString.match(/<#?keyword>([\s\S]*?)<\/#?keyword>|<#?keywords>([\s\S]*?)<\/#?keywords>/);
    let keyword = keywordMatch ? (keywordMatch[1] || keywordMatch[2]) : '';

    // 提取description
    const descriptionMatch = htmlString.match(/<#?description>([\s\S]*?)<\/#?description>|<#?desc>([\s\S]*?)<\/#?desc>/);
    const description = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2]) : '';

    // 删除匹配到的标记及其内容
    let cleanedHtml = htmlString.replace(/(标题：[\s\S]*?\n)|<#?title>[\s\S]*?<\/#?title>|<#?keyword>[\s\S]*?<\/#?keyword>|<#?keywords>[\s\S]*?<\/#?keywords>|<#?description>[\s\S]*?<\/#?description>|<#?desc>[\s\S]*?<\/#?desc>/g, '');

    cleanedHtml = cleanedHtml.replace('SEO关键字：', '').replace('SEO描述：', '').replace('关键字：', '').replace('描述：', '').replace('SEO关键字：', '').replace('描述', '').replace('关键字', '').replace('描述', '')

    // 删除cleanedHtml开头的所有\n
    cleanedHtml = cleanedHtml.replace(/^\n+/g, '').replace(/^\s*#+\s*/, '').replace(/\s*#+\s*$/, '');
    keyword = keyword.replace(/，/g, ',');
    try {
        return {
            title: title.trim().replace('标题：', '').replace('<title>', '').replace('</title>', '').replace('<#title>', '').replace('</#title>', ''),
            keyword: keyword ? keyword.trim() : '',
            description: description ? description.trim() : '',
            cleanedHtml: cleanedHtml? cleanedHtml.trim().replace(/\*\*(.*?)\*\*/g, '**$1** ') : ''
        };
    } catch (error) {
        logError(new Date().getTime(), htmlString)
        console.info(error)

    }
    
}
