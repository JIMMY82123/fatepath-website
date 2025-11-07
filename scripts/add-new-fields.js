import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取现有数据
const dataPath = path.join(__dirname, '..', 'public', 'datasets', 'sixty-jiazi-enhanced.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 生成人际关系信息
const generateRelationshipInfo = (stem, branch) => {
  const stemBase = stem.element.replace(/Yang |Yin /, '');
  const isYang = stem.element.startsWith("Yang");
  
  // 人际关系风格
  let relationshipStyle = "Balanced";
  if (stemBase === "Wood") relationshipStyle = isYang ? "Leadership-oriented" : "Supportive";
  if (stemBase === "Fire") relationshipStyle = isYang ? "Passionate" : "Nurturing";
  if (stemBase === "Earth") relationshipStyle = isYang ? "Stable" : "Harmonious";
  if (stemBase === "Metal") relationshipStyle = isYang ? "Direct" : "Refined";
  if (stemBase === "Water") relationshipStyle = isYang ? "Intellectual" : "Intuitive";
  
  // 最佳合作伙伴
  const bestPartners = [];
  if (stemBase === "Wood") bestPartners.push("Fire", "Water");
  if (stemBase === "Fire") bestPartners.push("Earth", "Wood");
  if (stemBase === "Earth") bestPartners.push("Metal", "Fire");
  if (stemBase === "Metal") bestPartners.push("Water", "Earth");
  if (stemBase === "Water") bestPartners.push("Wood", "Metal");
  
  // 沟通方式
  const communicationStyle = [];
  if (stemBase === "Wood") communicationStyle.push("Direct", "Growth-focused");
  if (stemBase === "Fire") communicationStyle.push("Enthusiastic", "Inspirational");
  if (stemBase === "Earth") communicationStyle.push("Practical", "Patient");
  if (stemBase === "Metal") communicationStyle.push("Precise", "Authoritative");
  if (stemBase === "Water") communicationStyle.push("Analytical", "Adaptive");
  
  // 团队角色
  const teamRole = [];
  if (stemBase === "Wood") teamRole.push("Leader", "Innovator");
  if (stemBase === "Fire") teamRole.push("Motivator", "Creative");
  if (stemBase === "Earth") teamRole.push("Stabilizer", "Coordinator");
  if (stemBase === "Metal") teamRole.push("Organizer", "Quality Controller");
  if (stemBase === "Water") teamRole.push("Strategist", "Problem Solver");
  
  return {
    relationshipStyle,
    bestPartners: bestPartners.slice(0, 2),
    communicationStyle: communicationStyle.slice(0, 2),
    teamRole: teamRole.slice(0, 2)
  };
};

// 生成情感与婚姻信息
const generateLoveInfo = (stem, branch) => {
  const stemBase = stem.element.replace(/Yang |Yin /, '');
  const isYang = stem.element.startsWith("Yang");
  
  // 情感风格
  let loveStyle = "Balanced";
  if (stemBase === "Wood") loveStyle = isYang ? "Ambitious lover" : "Gentle companion";
  if (stemBase === "Fire") loveStyle = isYang ? "Passionate partner" : "Warm nurturer";
  if (stemBase === "Earth") loveStyle = isYang ? "Stable provider" : "Loyal supporter";
  if (stemBase === "Metal") loveStyle = isYang ? "Strong protector" : "Refined partner";
  if (stemBase === "Water") loveStyle = isYang ? "Intellectual lover" : "Intuitive soulmate";
  
  // 最佳结婚年龄
  const marriageAge = [];
  if (stemBase === "Wood") marriageAge.push(25, 32);
  if (stemBase === "Fire") marriageAge.push(23, 30);
  if (stemBase === "Earth") marriageAge.push(27, 35);
  if (stemBase === "Metal") marriageAge.push(26, 33);
  if (stemBase === "Water") marriageAge.push(24, 31);
  
  // 理想伴侣特质
  const idealPartnerTraits = [];
  if (stemBase === "Wood") idealPartnerTraits.push("Supportive", "Growth-minded");
  if (stemBase === "Fire") idealPartnerTraits.push("Understanding", "Passionate");
  if (stemBase === "Earth") idealPartnerTraits.push("Reliable", "Patient");
  if (stemBase === "Metal") idealPartnerTraits.push("Respectful", "Organized");
  if (stemBase === "Water") idealPartnerTraits.push("Intelligent", "Adaptable");
  
  // 婚姻挑战
  const marriageChallenges = [];
  if (stemBase === "Wood" && isYang) marriageChallenges.push("Dominance", "Impatience");
  if (stemBase === "Wood" && !isYang) marriageChallenges.push("Indecisiveness", "Over-sensitivity");
  if (stemBase === "Fire" && isYang) marriageChallenges.push("Jealousy", "Mood swings");
  if (stemBase === "Fire" && !isYang) marriageChallenges.push("Emotional dependency", "Self-sacrifice");
  if (stemBase === "Earth" && isYang) marriageChallenges.push("Stubbornness", "Rigidity");
  if (stemBase === "Earth" && !isYang) marriageChallenges.push("Indecisiveness", "Over-caution");
  if (stemBase === "Metal" && isYang) marriageChallenges.push("Perfectionism", "Coldness");
  if (stemBase === "Metal" && !isYang) marriageChallenges.push("Over-refinement", "Detachment");
  if (stemBase === "Water" && isYang) marriageChallenges.push("Restlessness", "Unpredictability");
  if (stemBase === "Water" && !isYang) marriageChallenges.push("Isolation", "Overthinking");
  
  return {
    loveStyle,
    marriageAge: marriageAge.slice(0, 2),
    idealPartnerTraits: idealPartnerTraits.slice(0, 2),
    marriageChallenges: marriageChallenges.slice(0, 2)
  };
};

// 生成学习与教育信息
const generateEducationInfo = (stem, branch) => {
  const stemBase = stem.element.replace(/Yang |Yin /, '');
  const isYang = stem.element.startsWith("Yang");
  
  // 学习风格
  let learningStyle = "Balanced";
  if (stemBase === "Wood") learningStyle = isYang ? "Active learner" : "Reflective learner";
  if (stemBase === "Fire") learningStyle = isYang ? "Enthusiastic learner" : "Creative learner";
  if (stemBase === "Earth") learningStyle = isYang ? "Practical learner" : "Patient learner";
  if (stemBase === "Metal") learningStyle = isYang ? "Systematic learner" : "Precise learner";
  if (stemBase === "Water") learningStyle = isYang ? "Analytical learner" : "Intuitive learner";
  
  // 最佳学科
  const bestSubjects = [];
  if (stemBase === "Wood") bestSubjects.push("Business", "Leadership", "Environmental Science");
  if (stemBase === "Fire") bestSubjects.push("Marketing", "Arts", "Psychology");
  if (stemBase === "Earth") bestSubjects.push("Agriculture", "Construction", "Management");
  if (stemBase === "Metal") bestSubjects.push("Engineering", "Law", "Mathematics");
  if (stemBase === "Water") bestSubjects.push("Technology", "Research", "Philosophy");
  
  // 学习环境偏好
  const learningEnvironment = [];
  if (stemBase === "Wood") learningEnvironment.push("Outdoor activities", "Group projects");
  if (stemBase === "Fire") learningEnvironment.push("Interactive sessions", "Creative spaces");
  if (stemBase === "Earth") learningEnvironment.push("Structured classes", "Practical workshops");
  if (stemBase === "Metal") learningEnvironment.push("Quiet study areas", "Systematic approach");
  if (stemBase === "Water") learningEnvironment.push("Flexible schedules", "Research labs");
  
  // 最佳学习时间
  const bestLearningTime = [];
  if (stemBase === "Wood") bestLearningTime.push("Morning", "Spring");
  if (stemBase === "Fire") bestLearningTime.push("Afternoon", "Summer");
  if (stemBase === "Earth") bestLearningTime.push("Late morning", "Late summer");
  if (stemBase === "Metal") bestLearningTime.push("Evening", "Autumn");
  if (stemBase === "Water") bestLearningTime.push("Night", "Winter");
  
  return {
    learningStyle,
    bestSubjects: bestSubjects.slice(0, 3),
    learningEnvironment: learningEnvironment.slice(0, 2),
    bestLearningTime: bestLearningTime.slice(0, 2)
  };
};

// 生成财富分析信息
const generateWealthInfo = (stem, branch) => {
  const stemBase = stem.element.replace(/Yang |Yin /, '');
  const isYang = stem.element.startsWith("Yang");
  
  // 财富潜力
  let wealthPotential = "Moderate";
  if (stemBase === "Wood") wealthPotential = isYang ? "High growth potential" : "Steady accumulation";
  if (stemBase === "Fire") wealthPotential = isYang ? "High risk-reward" : "Creative income";
  if (stemBase === "Earth") wealthPotential = isYang ? "Stable wealth" : "Conservative growth";
  if (stemBase === "Metal") wealthPotential = isYang ? "High value creation" : "Refined wealth";
  if (stemBase === "Water") wealthPotential = isYang ? "Innovative wealth" : "Intellectual assets";
  
  // 最佳投资领域
  const investmentAreas = [];
  if (stemBase === "Wood") investmentAreas.push("Real estate", "Growth stocks", "Green energy");
  if (stemBase === "Fire") investmentAreas.push("Technology", "Entertainment", "Innovation");
  if (stemBase === "Earth") investmentAreas.push("Agriculture", "Infrastructure", "Government bonds");
  if (stemBase === "Metal") investmentAreas.push("Precious metals", "Manufacturing", "Financial services");
  if (stemBase === "Water") investmentAreas.push("Technology", "Research", "International markets");
  
  // 财富时机
  const wealthTiming = [];
  if (stemBase === "Wood") wealthTiming.push("25-35", "40-50");
  if (stemBase === "Fire") wealthTiming.push("23-33", "38-48");
  if (stemBase === "Earth") wealthTiming.push("27-37", "42-52");
  if (stemBase === "Metal") wealthTiming.push("26-36", "41-51");
  if (stemBase === "Water") wealthTiming.push("24-34", "39-49");
  
  // 理财建议
  const financialAdvice = [];
  if (stemBase === "Wood") financialAdvice.push("Long-term investments", "Diversification");
  if (stemBase === "Fire") financialAdvice.push("High-growth opportunities", "Risk management");
  if (stemBase === "Earth") financialAdvice.push("Stable investments", "Conservative approach");
  if (stemBase === "Metal") financialAdvice.push("Quality investments", "Systematic approach");
  if (stemBase === "Water") financialAdvice.push("Innovative investments", "Research-based decisions");
  
  return {
    wealthPotential,
    investmentAreas: investmentAreas.slice(0, 3),
    wealthTiming: wealthTiming.slice(0, 2),
    financialAdvice: financialAdvice.slice(0, 2)
  };
};

// 生成风水与居住信息
const generateFengShuiInfo = (stem, branch) => {
  const stemBase = stem.element.replace(/Yang |Yin /, '');
  const isYang = stem.element.startsWith("Yang");
  
  // 最佳居住方位
  const bestLivingDirections = [];
  if (stemBase === "Wood") bestLivingDirections.push("East", "Southeast");
  if (stemBase === "Fire") bestLivingDirections.push("South", "Northeast");
  if (stemBase === "Earth") bestLivingDirections.push("Center", "Southwest");
  if (stemBase === "Metal") bestLivingDirections.push("West", "Northwest");
  if (stemBase === "Water") bestLivingDirections.push("North", "Southeast");
  
  // 居住环境偏好
  const livingEnvironment = [];
  if (stemBase === "Wood") livingEnvironment.push("Near trees", "Elevated areas");
  if (stemBase === "Fire") livingEnvironment.push("Sunny locations", "High energy areas");
  if (stemBase === "Earth") livingEnvironment.push("Flat land", "Stable ground");
  if (stemBase === "Metal") livingEnvironment.push("Mountain views", "Clean areas");
  if (stemBase === "Water") livingEnvironment.push("Near water", "Quiet areas");
  
  // 室内装饰建议
  const decorationAdvice = [];
  if (stemBase === "Wood") decorationAdvice.push("Green plants", "Wooden furniture");
  if (stemBase === "Fire") decorationAdvice.push("Red accents", "Bright lighting");
  if (stemBase === "Earth") decorationAdvice.push("Yellow tones", "Ceramic items");
  if (stemBase === "Metal") decorationAdvice.push("White/white", "Metal accents");
  if (stemBase === "Water") decorationAdvice.push("Blue tones", "Curved shapes");
  
  // 避免的居住环境
  const avoidEnvironments = [];
  if (stemBase === "Wood") avoidEnvironments.push("Metal-heavy areas", "Dry environments");
  if (stemBase === "Fire") avoidEnvironments.push("Water-heavy areas", "Dark spaces");
  if (stemBase === "Earth") avoidEnvironments.push("Wood-heavy areas", "Unstable ground");
  if (stemBase === "Metal") avoidEnvironments.push("Fire-heavy areas", "Chaotic spaces");
  if (stemBase === "Water") avoidEnvironments.push("Earth-heavy areas", "Confined spaces");
  
  return {
    bestLivingDirections: bestLivingDirections.slice(0, 2),
    livingEnvironment: livingEnvironment.slice(0, 2),
    decorationAdvice: decorationAdvice.slice(0, 2),
    avoidEnvironments: avoidEnvironments.slice(0, 2)
  };
};

// 为每个数据记录添加新字段
data.data.forEach(item => {
  const stem = item.heavenlyStem;
  const branch = item.earthlyBranch;
  
  // 添加人际关系信息
  item.relationshipInfo = generateRelationshipInfo(stem, branch);
  
  // 添加情感与婚姻信息
  item.loveInfo = generateLoveInfo(stem, branch);
  
  // 添加学习与教育信息
  item.educationInfo = generateEducationInfo(stem, branch);
  
  // 添加财富分析信息
  item.wealthInfo = generateWealthInfo(stem, branch);
  
  // 添加风水与居住信息
  item.fengShuiInfo = generateFengShuiInfo(stem, branch);
});

// 更新元数据
data.metadata.name = "Comprehensive Sixty Jiazi Dataset";
data.metadata.description = "Complete comprehensive data for the 60 Jiazi (甲子) combinations with all aspects of life analysis including relationships, love, education, wealth, and feng shui";
data.metadata.version = "3.0.0";
data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
data.metadata.enhancements = [
  "Time information and age calculations",
  "Enhanced elemental analysis",
  "Health information and advice",
  "Favorable seasons, directions, colors, and numbers",
  "Relationship and interpersonal dynamics",
  "Love, marriage, and emotional guidance",
  "Learning styles and educational preferences",
  "Wealth potential and investment advice",
  "Feng shui and living environment guidance"
];

// 更新schema
data.schema.fields.push(
  {
    name: "relationshipInfo",
    type: "object",
    description: "Interpersonal relationship information including style, partners, and communication",
    example: {
      relationshipStyle: "Leadership-oriented",
      bestPartners: ["Fire", "Water"],
      communicationStyle: ["Direct", "Growth-focused"]
    }
  },
  {
    name: "loveInfo",
    type: "object",
    description: "Love and marriage information including style, timing, and challenges",
    example: {
      loveStyle: "Ambitious lover",
      marriageAge: [25, 32],
      idealPartnerTraits: ["Supportive", "Growth-minded"]
    }
  },
  {
    name: "educationInfo",
    type: "object",
    description: "Learning and education preferences including style, subjects, and environment",
    example: {
      learningStyle: "Active learner",
      bestSubjects: ["Business", "Leadership", "Environmental Science"],
      learningEnvironment: ["Outdoor activities", "Group projects"]
    }
  },
  {
    name: "wealthInfo",
    type: "object",
    description: "Wealth potential and financial advice including investment areas and timing",
    example: {
      wealthPotential: "High growth potential",
      investmentAreas: ["Real estate", "Growth stocks", "Green energy"],
      wealthTiming: ["25-35", "40-50"]
    }
  },
  {
    name: "fengShuiInfo",
    type: "object",
    description: "Feng shui and living environment guidance including directions and decoration",
    example: {
      bestLivingDirections: ["East", "Southeast"],
      livingEnvironment: ["Near trees", "Elevated areas"],
      decorationAdvice: ["Green plants", "Wooden furniture"]
    }
  }
);

// 保存更新后的数据
const outputPath = path.join(__dirname, '..', 'public', 'datasets', 'sixty-jiazi-comprehensive.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`全面增强版60甲子数据已生成并保存到: ${outputPath}`);
console.log(`总共更新了 ${data.data.length} 个甲子组合`);

// 验证新字段
console.log('\n=== 新字段验证 ===');
const firstItem = data.data[0];
console.log(`\n1. ${firstItem.combination} 的新字段:`);
console.log(`  人际关系风格: ${firstItem.relationshipInfo.relationshipStyle}`);
console.log(`  情感风格: ${firstItem.loveInfo.loveStyle}`);
console.log(`  学习风格: ${firstItem.educationInfo.learningStyle}`);
console.log(`  财富潜力: ${firstItem.wealthInfo.wealthPotential}`);
console.log(`  最佳居住方位: ${firstItem.fengShuiInfo.bestLivingDirections.join(', ')}`);

console.log('\n=== 字段统计 ===');
console.log(`总字段数: ${Object.keys(firstItem).length}`);
console.log(`新增字段数: 5`);
console.log(`版本: ${data.metadata.version}`);



























