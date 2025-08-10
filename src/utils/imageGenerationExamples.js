// AI图像生成工具使用示例
import { 
  generateDaXiaoRenImage, 
  generateTaoistRitualImage, 
  generateBatchImages,
  generateCustomImage,
  imageGenerationManager 
} from './advancedImageGenerator.js'

// 示例1: 生成"打小人"仪式图像
export const exampleDaXiaoRenGeneration = async () => {
  try {
    console.log('开始生成"打小人"仪式图像...')
    
    const result = await generateDaXiaoRenImage({
      size: "1024x1024",
      style: "chibi",
      mood: "cheerful",
      resolution: "4K"
    })
    
    console.log('图像生成成功:', result)
    return result
  } catch (error) {
    console.error('图像生成失败:', error)
    throw error
  }
}

// 示例2: 生成不同类型的道教仪式图像
export const exampleTaoistRitualGeneration = async () => {
  const ritualTypes = ['wealth', 'love', 'protection', 'healing']
  const results = []
  
  for (const ritualType of ritualTypes) {
    try {
      console.log(`开始生成${ritualType}仪式图像...`)
      
      const result = await generateTaoistRitualImage(ritualType, {
        size: "1024x1024",
        style: "traditional",
        mood: "serene"
      })
      
      results.push(result)
      console.log(`${ritualType}仪式图像生成成功:`, result)
    } catch (error) {
      console.error(`${ritualType}仪式图像生成失败:`, error)
      results.push({ success: false, error: error.message, ritualType })
    }
  }
  
  return results
}

// 示例3: 批量生成图像
export const exampleBatchGeneration = async () => {
  const prompts = [
    "A beautiful Chinese garden with cherry blossoms and traditional architecture",
    "A mystical Taoist temple in the mountains with mist and clouds",
    "Traditional Chinese calligraphy with ink and brush",
    "A peaceful meditation scene with incense and candles"
  ]
  
  try {
    console.log('开始批量生成图像...')
    
    const results = await generateBatchImages(prompts, {
      size: "1024x1024",
      batchSize: 4
    })
    
    console.log('批量图像生成完成:', results)
    return results
  } catch (error) {
    console.error('批量图像生成失败:', error)
    throw error
  }
}

// 示例4: 使用队列管理器
export const exampleQueueManagement = async () => {
  // 添加多个图像生成任务到队列
  const tasks = [
    () => generateDaXiaoRenImage({ style: "chibi" }),
    () => generateTaoistRitualImage("wealth"),
    () => generateCustomImage("A beautiful sunset over Chinese mountains"),
    () => generateCustomImage("Traditional Chinese tea ceremony")
  ]
  
  console.log('添加任务到队列...')
  tasks.forEach(task => {
    imageGenerationManager.addToQueue(task)
  })
  
  // 检查队列状态
  const status = imageGenerationManager.getQueueStatus()
  console.log('队列状态:', status)
  
  // 等待所有任务完成
  return new Promise((resolve) => {
    const checkStatus = () => {
      const currentStatus = imageGenerationManager.getQueueStatus()
      if (currentStatus.queueLength === 0 && !currentStatus.isProcessing) {
        resolve('所有队列任务已完成')
      } else {
        setTimeout(checkStatus, 1000)
      }
    }
    checkStatus()
  })
}

// 示例5: 完整的图像生成流程
export const completeImageGenerationWorkflow = async () => {
  try {
    console.log('=== 开始完整的图像生成流程 ===')
    
    // 步骤1: 生成"打小人"仪式图像
    const daXiaoRenResult = await exampleDaXiaoRenGeneration()
    
    // 步骤2: 生成财富仪式图像
    const wealthRitualResult = await generateTaoistRitualImage('wealth', {
      size: "1024x1024",
      style: "modern",
      mood: "prosperous"
    })
    
    // 步骤3: 生成自定义图像
    const customResult = await generateCustomImage(
      "A modern interpretation of traditional Chinese philosophy, combining ancient wisdom with contemporary design, minimalist style with deep meaning",
      {
        size: "1024x1024",
        style: "minimalist",
        quality: "ultra-high"
      }
    )
    
    // 步骤4: 汇总结果
    const allResults = {
      daXiaoRen: daXiaoRenResult,
      wealthRitual: wealthRitualResult,
      custom: customResult,
      generatedAt: new Date().toISOString()
    }
    
    console.log('=== 完整流程完成 ===')
    console.log('所有结果:', allResults)
    
    return allResults
  } catch (error) {
    console.error('完整流程执行失败:', error)
    throw error
  }
}

// 导出所有示例函数
export default {
  exampleDaXiaoRenGeneration,
  exampleTaoistRitualGeneration,
  exampleBatchGeneration,
  exampleQueueManagement,
  completeImageGenerationWorkflow
}
