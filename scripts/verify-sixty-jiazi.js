import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取60甲子数据
const dataPath = path.join(__dirname, '..', 'public', 'datasets', 'sixty-jiazi.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('=== 60甲子数据验证报告 ===\n');

// 1. 检查记录总数
console.log(`1. 记录总数: ${data.data.length}`);
if (data.data.length === 60) {
  console.log('   ✅ 记录总数正确 (60个)');
} else {
  console.log('   ❌ 记录总数不正确');
}

// 2. 检查天干分布
const stemCounts = {};
const expectedStemCounts = {
  '甲': 6, '乙': 6, '丙': 6, '丁': 6, '戊': 6,
  '己': 6, '庚': 6, '辛': 6, '壬': 6, '癸': 6
};

data.data.forEach(item => {
  const stem = item.heavenlyStem.chinese;
  stemCounts[stem] = (stemCounts[stem] || 0) + 1;
});

console.log('\n2. 天干分布检查:');
let stemCheckPassed = true;
for (const [stem, count] of Object.entries(expectedStemCounts)) {
  const actualCount = stemCounts[stem] || 0;
  if (actualCount === count) {
    console.log(`   ✅ ${stem}: ${actualCount}/${count}`);
  } else {
    console.log(`   ❌ ${stem}: ${actualCount}/${count} (期望: ${count})`);
    stemCheckPassed = false;
  }
}

// 3. 检查地支分布
const branchCounts = {};
const expectedBranchCounts = {
  '子': 5, '丑': 5, '寅': 5, '卯': 5, '辰': 5, '巳': 5,
  '午': 5, '未': 5, '申': 5, '酉': 5, '戌': 5, '亥': 5
};

data.data.forEach(item => {
  const branch = item.earthlyBranch.chinese;
  branchCounts[branch] = (branchCounts[branch] || 0) + 1;
});

console.log('\n3. 地支分布检查:');
let branchCheckPassed = true;
for (const [branch, count] of Object.entries(expectedBranchCounts)) {
  const actualCount = branchCounts[branch] || 0;
  if (actualCount === count) {
    console.log(`   ✅ ${branch}: ${actualCount}/${count}`);
  } else {
    console.log(`   ❌ ${branch}: ${actualCount}/${count} (期望: ${count})`);
    branchCheckPassed = false;
  }
}

// 4. 检查组合唯一性
const combinations = data.data.map(item => item.combination);
const uniqueCombinations = new Set(combinations);

console.log('\n4. 组合唯一性检查:');
if (combinations.length === uniqueCombinations.size) {
  console.log(`   ✅ 所有组合都是唯一的 (${combinations.length}/${uniqueCombinations.size})`);
} else {
  console.log(`   ❌ 存在重复组合 (${combinations.length}/${uniqueCombinations.size})`);
}

// 5. 检查天干地支配对规律
console.log('\n5. 天干地支配对规律检查:');
console.log('   前10个组合:');
for (let i = 0; i < 10; i++) {
  const item = data.data[i];
  console.log(`   ${item.cycleNumber}. ${item.combination} (${item.heavenlyStem.chinese}${item.earthlyBranch.chinese})`);
}

console.log('\n   第11-20个组合:');
for (let i = 10; i < 20; i++) {
  const item = data.data[i];
  console.log(`   ${item.cycleNumber}. ${item.combination} (${item.heavenlyStem.chinese}${item.earthlyBranch.chinese})`);
}

// 6. 检查五行关系
console.log('\n6. 五行关系检查:');
const relationships = {};
data.data.forEach(item => {
  const rel = item.elementalRelationship;
  relationships[rel] = (relationships[rel] || 0) + 1;
});

console.log('   五行关系分布:');
for (const [rel, count] of Object.entries(relationships)) {
  console.log(`   ${rel}: ${count}个`);
}

// 7. 总体评估
console.log('\n=== 总体评估 ===');
const totalChecks = 4; // 记录总数、天干分布、地支分布、组合唯一性
let passedChecks = 0;

if (data.data.length === 60) passedChecks++;
if (stemCheckPassed) passedChecks++;
if (branchCheckPassed) passedChecks++;
if (combinations.length === uniqueCombinations.size) passedChecks++;

console.log(`通过检查: ${passedChecks}/${totalChecks}`);

if (passedChecks === totalChecks) {
  console.log('🎉 60甲子数据验证通过！数据完整且正确。');
} else {
  console.log('⚠️  60甲子数据存在问题，需要进一步检查。');
}

// 8. 显示完整的60甲子列表
console.log('\n=== 完整60甲子列表 ===');
data.data.forEach(item => {
  console.log(`${item.cycleNumber.toString().padStart(2, '0')}. ${item.combination} (${item.heavenlyStem.chinese}${item.earthlyBranch.chinese})`);
});

