'use strict';

// tasksAppForm 测试数据
module.exports = {
  // 测试数据1：正常完成的任务
  testData1: {
    visitDate: '2024-01-15',
    startTime: '2024-01-15 08:00:00',
    endTime: '2024-01-15 12:00:00',
    currentStageId: 'stage_001',
    summaryOfActivities: '今天对玉米田进行了全面检查，发现作物生长良好，土壤湿度适中。进行了常规的除草工作，并检查了灌溉系统的运行状况。',
    statusIndicator: 'green',
    descriptionOfChallenges: '发现部分区域有轻微的虫害迹象，需要及时处理。',
    recommendedActions: '建议在下周进行有针对性的害虫防治，加强对受影响区域的监控。',
    previousReportActedOn: 1,
    photos: 'https://example.com/photos/farm1_20240115_001.jpg,https://example.com/photos/farm1_20240115_002.jpg',
    latitude: '39.9042',
    longitude: '116.4074',
    stageQuestionsAnswers: [
      {
        taskId: 'task_001',
        stageId: 'stage_001',
        questionId: 'q_001',
        question: '作物生长状况如何？',
        answerValue: '生长良好，叶片绿色健康'
      },
      {
        taskId: 'task_001',
        stageId: 'stage_001',
        questionId: 'q_002',
        question: '是否发现病虫害？',
        answerValue: '发现轻微虫害'
      },
      {
        taskId: 'task_001',
        stageId: 'stage_001',
        questionId: 'q_003',
        question: '灌溉系统是否正常？',
        answerValue: '运行正常'
      }
    ]
  },

  // 测试数据2：有问题需要关注的任务
  testData2: {
    visitDate: '2024-01-16',
    startTime: '2024-01-16 09:30:00',
    endTime: '2024-01-16 14:30:00',
    currentStageId: 'stage_002',
    summaryOfActivities: '对大豆田进行了详细检查，发现部分区域出现了叶片发黄现象。检测了土壤pH值和营养成分，发现氮肥不足。',
    statusIndicator: 'yellow',
    descriptionOfChallenges: '土壤营养不足，特别是氮元素缺乏。部分植株出现营养不良症状，可能影响产量。',
    recommendedActions: '立即补充氮肥，建议使用液体肥料进行叶面喷施。增加灌溉频次，确保养分充分吸收。',
    previousReportActedOn: 0,
    photos: 'https://example.com/photos/farm2_20240116_001.jpg,https://example.com/photos/farm2_20240116_002.jpg,https://example.com/photos/farm2_20240116_003.jpg',
    latitude: '31.2304',
    longitude: '121.4737',
    stageQuestionsAnswers: [
      {
        taskId: 'task_002',
        stageId: 'stage_002',
        questionId: 'q_004',
        question: '土壤营养状况如何？',
        answerValue: '氮元素不足'
      },
      {
        taskId: 'task_002',
        stageId: 'stage_002',
        questionId: 'q_005',
        question: '植株健康程度？',
        answerValue: '部分植株营养不良'
      }
    ]
  },

  // 测试数据3：紧急情况需要立即处理
  testData3: {
    visitDate: '2024-01-17',
    startTime: '2024-01-17 07:00:00',
    endTime: '2024-01-17 11:00:00',
    currentStageId: 'stage_003',
    summaryOfActivities: '紧急检查小麦田，发现大面积真菌感染。病害蔓延速度较快，已影响约30%的种植区域。立即采取了隔离措施。',
    statusIndicator: 'red',
    descriptionOfChallenges: '严重的真菌病害爆发，蔓延速度快，威胁整个田块的收成。天气湿润加剧了病害传播。',
    recommendedActions: '立即进行全面杀菌剂喷洒，隔离感染区域，加强通风排湿。必要时考虑部分区域的作物清除。',
    previousReportActedOn: 1,
    photos: 'https://example.com/photos/farm3_20240117_001.jpg,https://example.com/photos/farm3_20240117_002.jpg,https://example.com/photos/farm3_20240117_003.jpg,https://example.com/photos/farm3_20240117_004.jpg',
    latitude: '22.3193',
    longitude: '114.1694',
    stageQuestionsAnswers: [
      {
        taskId: 'task_003',
        stageId: 'stage_003',
        questionId: 'q_006',
        question: '是否发现病害？',
        answerValue: '发现严重真菌感染'
      },
      {
        taskId: 'task_003',
        stageId: 'stage_003',
        questionId: 'q_007',
        question: '感染面积有多大？',
        answerValue: '约30%的种植区域'
      },
      {
        taskId: 'task_003',
        stageId: 'stage_003',
        questionId: 'q_008',
        question: '是否已采取应急措施？',
        answerValue: '已进行隔离和初步处理'
      }
    ]
  },

  // 测试数据4：收获期检查
  testData4: {
    visitDate: '2024-01-18',
    startTime: '2024-01-18 06:00:00',
    endTime: '2024-01-18 10:00:00',
    currentStageId: 'stage_004',
    summaryOfActivities: '水稻田收获前最后检查，作物成熟度良好，预计下周可以开始收获。检查了收获设备的准备情况。',
    statusIndicator: 'green',
    descriptionOfChallenges: '部分低洼地区因积水导致成熟度略有不均，需要分批收获。',
    recommendedActions: '优先收获成熟度高的区域，低洼地区延后3-5天收获。准备烘干设备应对可能的高湿度。',
    previousReportActedOn: 1,
    photos: 'https://example.com/photos/farm4_20240118_001.jpg,https://example.com/photos/farm4_20240118_002.jpg',
    latitude: '30.5728',
    longitude: '104.0668',
    stageQuestionsAnswers: [
      {
        taskId: 'task_004',
        stageId: 'stage_004',
        questionId: 'q_009',
        question: '作物成熟度如何？',
        answerValue: '整体成熟度良好'
      },
      {
        taskId: 'task_004',
        stageId: 'stage_004',
        questionId: 'q_010',
        question: '预计收获时间？',
        answerValue: '下周开始收获'
      },
      {
        taskId: 'task_004',
        stageId: 'stage_004',
        questionId: 'q_011',
        question: '收获设备是否就绪？',
        answerValue: '设备检查完毕，状态良好'
      }
    ]
  },

  // 测试数据5：播种期准备工作
  testData5: {
    visitDate: '2024-01-19',
    startTime: '2024-01-19 08:30:00',
    endTime: '2024-01-19 13:30:00',
    currentStageId: 'stage_005',
    summaryOfActivities: '春季播种前土地准备工作，完成了土壤翻耕和平整。检查了播种设备的调试情况，准备了优质种子。',
    statusIndicator: 'green',
    descriptionOfChallenges: '部分区域土壤过于干燥，需要提前灌溉以达到适宜的播种湿度。',
    recommendedActions: '在播种前2-3天对干燥区域进行适量灌溉，确保土壤湿度达到播种要求。检查天气预报，选择合适的播种时机。',
    previousReportActedOn: 0,
    photos: 'https://example.com/photos/farm5_20240119_001.jpg',
    latitude: '45.7536',
    longitude: '126.6480',
    stageQuestionsAnswers: [
      {
        taskId: 'task_005',
        stageId: 'stage_005',
        questionId: 'q_012',
        question: '土地准备情况如何？',
        answerValue: '翻耕和平整工作已完成'
      },
      {
        taskId: 'task_005',
        stageId: 'stage_005',
        questionId: 'q_013',
        question: '土壤湿度是否适宜播种？',
        answerValue: '部分区域偏干，需要灌溉'
      },
      {
        taskId: 'task_005',
        stageId: 'stage_005',
        questionId: 'q_014',
        question: '种子质量如何？',
        answerValue: '优质种子，发芽率良好'
      }
    ]
  }
}; 