import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowLeft, Download, Share2, Crown, X, Clock, Gift, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Lunar } from 'lunar-javascript'
import SEO from '../components/SEO'
import jieqiTable from '../data/jieqi.json'

const FreeBaziReport = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthLocation: ''
  })
  
  const [report, setReport] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)

  // 监听用户观看时间
  useEffect(() => {
    if (report) {
      const timer = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1
          // 30秒后显示优惠弹窗
          if (newTime === 30 && !showOfferModal) {
            setShowOfferModal(true)
          }
          return newTime
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [report, showOfferModal])

  // 关闭弹窗
  const closeOfferModal = () => {
    setShowOfferModal(false)
  }

  // Ko-fi支付链接 - 添加返回URL参数
  const paypalLink = "https://ko-fi.com/s/b41e787977?return_url=" + encodeURIComponent(window.location.origin + '/form-bazi-discount')

  const handlePaypalPayment = () => {
    // 在新窗口打开Ko-fi支付页面
    window.open(paypalLink, '_blank', 'noopener,noreferrer')
    
    // 显示支付状态提示
    const showPaymentStatus = (message, isSuccess = false) => {
      const notification = document.createElement('div')
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        isSuccess ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
      }`
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 3000)
    }
    
    // 显示支付提示信息
    showPaymentStatus('💳 Please complete the Ko-fi payment in the newly opened tab. Return here after checkout to enter your birth details.', false)
    
    // 提示用户支付完成后填写表单
    setTimeout(() => {
      showPaymentStatus('📝 Once payment is done, click the button below to fill in your birth information.', false)
    }, 3000)
    
    closeOfferModal()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 五行元素映射表
  const elementMapping = {
    // 天干五行
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire', 
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water',
    // 地支五行
    '寅': 'Wood', '卯': 'Wood',
    '巳': 'Fire', '午': 'Fire',
    '辰': 'Earth', '戌': 'Earth', '丑': 'Earth', '未': 'Earth',
    '申': 'Metal', '酉': 'Metal',
    '子': 'Water', '亥': 'Water'
  }

  const yinYangMap = {
    '甲': 'Yang', '乙': 'Yin',
    '丙': 'Yang', '丁': 'Yin',
    '戊': 'Yang', '己': 'Yin',
    '庚': 'Yang', '辛': 'Yin',
    '壬': 'Yang', '癸': 'Yin'
  }

  const generatingElementMap = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood'
  }

  const elementProducingMap = {
    Wood: 'Water',
    Fire: 'Wood',
    Earth: 'Fire',
    Metal: 'Earth',
    Water: 'Metal'
  }

  const controllingElementMap = {
    Wood: 'Earth',
    Fire: 'Metal',
    Earth: 'Water',
    Metal: 'Wood',
    Water: 'Fire'
  }

  const elementControllingMap = {
    Wood: 'Metal',
    Fire: 'Water',
    Earth: 'Wood',
    Metal: 'Fire',
    Water: 'Earth'
  }

  const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  const DAY_MS = 24 * 60 * 60 * 1000

  const tenGodLabelMap = {
    Friend: '比肩 (Friend)',
    RobWealth: '劫财 (Rob Wealth)',
    EatingGod: '食神 (Eating God)',
    HurtingOfficer: '伤官 (Hurting Officer)',
    DirectWealth: '正财 (Direct Wealth)',
    IndirectWealth: '偏财 (Indirect Wealth)',
    DirectOfficer: '正官 (Direct Officer)',
    SevenKillings: '七杀 (Seven Killings)',
    DirectResource: '正印 (Direct Resource)',
    IndirectResource: '偏印 (Indirect Resource)'
  }

  const tenGodCategoryMap = {
    Friend: 'Peers & Identity',
    RobWealth: 'Peers & Competition',
    EatingGod: 'Output & Creativity',
    HurtingOfficer: 'Output & Influence',
    DirectWealth: 'Wealth & Assets',
    IndirectWealth: 'Wealth & Opportunities',
    DirectOfficer: 'Authority & Structure',
    SevenKillings: 'Authority & Challenges',
    DirectResource: 'Support & Learning',
    IndirectResource: 'Support & Insight'
  }

  const tenGodGuidance = {
    Friend: 'Self-driven momentum and alignment with like-minded collaborators are key. Set clear boundaries so peer support stays constructive.',
    RobWealth: 'Competitive peer energy boosts ambition but also resource leakage. Focus on win-win deals and clear financial agreements.',
    EatingGod: 'Gentle output favors sharing knowledge and nurturing audiences. Lean into content creation, mentoring, and education.',
    HurtingOfficer: 'Bold expression helps you break ceilings, yet authority conflicts may flare. Refine messaging before challenging leadership.',
    DirectWealth: 'Structured, steady income pathways respond best. Think budgets, operations, and mature asset allocation.',
    IndirectWealth: 'Entrepreneurial chances and speculative plays emerge. Vet opportunities quickly and stay agile.',
    DirectOfficer: 'Systems, compliance, and leadership roles reward discipline. Showcase consistency and integrity.',
    SevenKillings: 'High-pressure environments accelerate growth; protect your health and negotiate power dynamics consciously.',
    DirectResource: 'Learning, mentorship, and institutional support nourish you. Invest in formal study and certifications.',
    IndirectResource: 'Intuition and unconventional insights guide decisions. Keep space for research, reflection, and spiritual practice.'
  }

  // 地支关系映射
  const branchLabels = {
    year: 'Year Pillar',
    month: 'Month Pillar',
    day: 'Day Pillar',
    hour: 'Hour Pillar'
  }

  const palaceFocusMap = {
    year: 'social circles & root environment',
    month: 'career rhythm & team structure',
    day: 'marriage palace & intimate bonds',
    hour: 'children, creative projects & long-term vision'
  }

  const clashPairs = {
    '子': '午', '午': '子',
    '丑': '未', '未': '丑',
    '寅': '申', '申': '寅',
    '卯': '酉', '酉': '卯',
    '辰': '戌', '戌': '辰',
    '巳': '亥', '亥': '巳'
  }

  const sixHarmonyPairs = {
    '子': '丑', '丑': '子',
    '寅': '亥', '亥': '寅',
    '卯': '戌', '戌': '卯',
    '辰': '酉', '酉': '辰',
    '巳': '申', '申': '巳',
    '午': '未', '未': '午'
  }

  const punishmentMap = {
    '子': ['卯'],
    '卯': ['子'],
    '寅': ['巳'],
    '巳': ['寅'],
    '丑': ['戌', '未'],
    '戌': ['丑', '未'],
    '未': ['丑', '戌'],
    '辰': ['辰'],
    '午': ['午']
  }

  const branchRelationTone = {
    clash: {
      tone: '⚠️ Clash Alert',
      guidance: (source, target, targetPalace) =>
        `${source} clashes with ${target}, signaling turbulence or external pressure for your ${targetPalace}. Build buffers and communicate boundaries early.`
    },
    harmony: {
      tone: '✨ Combination Support',
      guidance: (source, target, targetPalace) =>
        `${source} combines with ${target}, unlocking collaboration potential in your ${targetPalace}. Lean into alliances, expand networking, and pursue cross-functional wins.`
    },
    punishment: {
      tone: '🛠️ Punishment Warning',
      guidance: (source, target, targetPalace) =>
        `${source} forms a punishment with ${target}, hinting at repetitive friction inside your ${targetPalace}. Tighten operations, review agreements, and prevent hidden drain.`
    }
  }

  const analyzeBranchDynamics = (bazi) => {
    if (!bazi) return null
    const branches = {
      year: bazi.year?.charAt(1),
      month: bazi.month?.charAt(1),
      day: bazi.day?.charAt(1),
      hour: bazi.hour?.charAt(1)
    }

    const entries = []
    const keys = Object.keys(branches)

    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const sourceKey = keys[i]
        const targetKey = keys[j]
        const sourceBranch = branches[sourceKey]
        const targetBranch = branches[targetKey]

        if (!sourceBranch || !targetBranch) continue

        if (clashPairs[sourceBranch] === targetBranch) {
          entries.push({
            type: 'clash',
            sourceKey,
            targetKey,
            sourceBranch,
            targetBranch,
            guidance: branchRelationTone.clash.guidance(branchLabels[sourceKey], branchLabels[targetKey], palaceFocusMap[targetKey])
          })
        }

        if (sixHarmonyPairs[sourceBranch] === targetBranch) {
          entries.push({
            type: 'harmony',
            sourceKey,
            targetKey,
            sourceBranch,
            targetBranch,
            guidance: branchRelationTone.harmony.guidance(branchLabels[sourceKey], branchLabels[targetKey], palaceFocusMap[targetKey])
          })
        }

        if (punishmentMap[sourceBranch]?.includes(targetBranch) || punishmentMap[targetBranch]?.includes(sourceBranch)) {
          entries.push({
            type: 'punishment',
            sourceKey,
            targetKey,
            sourceBranch,
            targetBranch,
            guidance: branchRelationTone.punishment.guidance(branchLabels[sourceKey], branchLabels[targetKey], palaceFocusMap[targetKey])
          })
        }
      }
    }

    if (entries.length === 0) {
      return {
        entries: [],
        summary: 'No major clashes, combinations, or punishments are forming inside the natal pillars. Maintain your current pace and monitor future luck cycles for activation.'
      }
    }

    const clashCount = entries.filter(item => item.type === 'clash').length
    const harmonyCount = entries.filter(item => item.type === 'harmony').length
    const punishmentCount = entries.filter(item => item.type === 'punishment').length

    const summaryParts = []
    if (clashCount > 0) summaryParts.push(`${clashCount} clash${clashCount > 1 ? 'es' : ''} require caution`)
    if (harmonyCount > 0) summaryParts.push(`${harmonyCount} combination${harmonyCount > 1 ? 's' : ''} can amplify cooperation`)
    if (punishmentCount > 0) summaryParts.push(`${punishmentCount} punishment pattern${punishmentCount > 1 ? 's' : ''} call for structure`)

    return {
      entries,
      summary: summaryParts.join('；')
    }
  }

  const strengthNarrativeMap = {
    strong: {
      wealth: 'A strong Day Master grants you the stamina to pursue aggressive growth—perfect for high-visibility roles in sectors such as technology, finance, or healthcare. Channel that surplus power into initiatives that pay dividends rather than micromanaging every task yourself.',
      love: 'You bring a commanding presence into relationships. Use that confidence to initiate honest dialogue and plan shared goals, while remembering to leave room for your partner\'s voice.',
      health: 'High-voltage energy needs conscious cooldowns. Anchor intense work weeks with structured recovery rituals to keep your nervous system steady.'
    },
    balanced: {
      wealth: 'With a balanced Day Master you can pivot between strategy and execution. Lean into cross-functional assignments that highlight your versatility and build a resilient income mix.',
      love: 'You naturally calibrate between giving and receiving affection. Maintain routines—date nights, honest check-ins, shared hobbies—to keep that harmony resilient during busy seasons.',
      health: 'Your constitution adapts well, yet consistency wins. Stick to balanced nutrition, mindful exercise, and sleep hygiene to preserve your edge.'
    },
    weak: {
      wealth: 'A weaker Day Master thrives with scaffolding—mentors, systems, and financial partners who can absorb pressure while you focus on core strengths. Prioritize reliable cash flow before chasing speculative wins.',
      love: 'You flourish in relationships that feel safe and restorative. Communicate your need for support and avoid overcommitting to caretaking roles that drain your reserves.',
      health: 'Resource-building is mission critical. Schedule restorative practices—TCM-informed nutrition, breathwork, therapy—to rebuild resilience before adding new obligations.'
    }
  }

  const strengthActionMap = {
    strong: {
      wealth: [
        'When negotiating salary or equity, target scalable roles and delegate execution so your leadership energy stays strategic.',
        'Block weekly recovery and reflection time to prevent nonstop overdrive from eroding judgment.'
      ],
      love: [
        'Plan intentional quality time and invite your partner into major decisions to keep the relationship balanced.',
        'Practice listening and emotional transparency so your confident energy does not overpower the shared rhythm.'
      ],
      health: [
        'Alternate high-intensity sessions with restorative work such as yoga, mobility, or contrast therapy.',
        'Spend time in nature or near water to release built-up heat and reset your nervous system.'
      ]
    },
    balanced: {
      wealth: [
        'Review your income mix each quarter and keep the ratio between core role and side ventures in a healthy band.',
        'Partner with a trusted financial advisor to optimize long-term vehicles such as employer-sponsored retirement accounts or personal savings plans.'
      ],
      love: [
        'Maintain consistent communication rituals (weekly check-ins, shared planning) to stay aligned.',
        'Choose learning experiences or travel that help both of you grow a joint vision.'
      ],
      health: [
        'Schedule monthly health audits—lab work, sleep checks, recovery sessions—to track key metrics.',
        "Stick to balanced nutrition and sleep routines so small swings don't snowball."
      ]
    },
    weak: {
      wealth: [
        "Build an emergency fund and insurance cushion first so unexpected costs don't drain your focus.",
        'Recruit trusted mentors or partners to share negotiation and execution load on major projects.'
      ],
      love: [
        'State boundaries and support needs clearly so your partner knows how to show up for you.',
        'Reserve solo recharge time even inside a close relationship to keep your energy steady.'
      ],
      health: [
        'Commit to frequent, moderate workouts—Pilates, brisk walks, tai chi—to rebuild stamina.',
        'Use local integrative medicine resources to support sleep, hydration, and kidney energy.'
      ]
    }
  }

  const tenGodContextAdvice = {
    wealth: {
      DirectWealth: {
        narrative: 'Direct Wealth emphasizes structured income streams and dependable cash flow. Operations, project management, and corporate finance roles highlight this advantage in professional environments that value reliability.',
        actions: [
          'Tighten budgeting, cash-flow, and tax planning with a yearly compliance review suited to your local regulations.',
          'Document standard operating procedures so the business stays steady even when you step away.'
        ]
      },
      IndirectWealth: {
        narrative: 'Indirect Wealth thrives on opportunity. Venture investing, innovation projects, or side businesses leverage your ability to spot high-upside plays.',
        actions: [
          'Use a clear opportunity filter—market size, burn rate, exit path—to avoid impulsive investments.',
          'Engage with innovation communities or industry hubs to surface quality deals faster.'
        ]
      },
      DirectOfficer: {
        narrative: 'Direct Officer brings authority and structure. Public institutions, education, healthcare, or enterprise leadership reward your sense of duty.',
        actions: [
          'Protect your personal brand so online and offline behavior reinforces trust.',
          'Pursue credentials or licenses that accelerate promotion lanes in your region.'
        ]
      },
      SevenKillings: {
        narrative: 'Seven Killings loves fast-moving, high-stakes arenas—strategy, security, defense, or risk roles. Managing intensity keeps it fruitful.',
        actions: [
          'Set risk thresholds and exit rules before projects launch so pressure stays contained.',
          'Maintain coaching or therapy support to avoid burnout under extended stress.'
        ]
      },
      EatingGod: {
        narrative: 'Eating God favors gentle output—education, storytelling, experience design, healing industries. Your knowledge becomes long-term revenue.',
        actions: [
          'Build a content asset library (courses, podcasts, articles) to attract your audience consistently.',
          'Design memberships or subscription products that scale recurring income.'
        ]
      },
      HurtingOfficer: {
        narrative: 'Hurting Officer drives rule-breaking innovation—perfect for creative, product, or media leadership. Balance boldness with stakeholder alignment.',
        actions: [
          'Stress-test messaging before pitching to authority figures to avoid unnecessary friction.',
          'Schedule quarterly innovation sprints and pair them with structured retrospectives.'
        ]
      },
      DirectResource: {
        narrative: 'Direct Resource values formal learning and institutional backing. Research, academia, medicine, or policy work compound over time.',
        actions: [
          'Apply for grants or fellowships to deepen credibility within your professional circles.',
          'Build a knowledge management system that turns research into whitepapers or advisory offers.'
        ]
      },
      IndirectResource: {
        narrative: 'Indirect Resource heightens intuition and unconventional insight—ideal for strategy consulting, forecasting, spiritual or innovative research.',
        actions: [
          'Pair data and intuition inside a repeatable decision playbook.',
          'Host niche workshops or communities that attract clients seeking deep perspective.'
        ]
      },
      Friend: {
        narrative: 'Friend (Bi Jian) highlights peer alliances. Partnerships, communities, or memberships can scale your reach—but require clear boundaries.',
        actions: [
          'Draft explicit equity and revenue-sharing agreements to keep relationships healthy.',
          'Run local communities or mastermind groups to exchange resources and leads.'
        ]
      },
      RobWealth: {
        narrative: 'Rob Wealth signals competition and resource redistribution. You crack stagnant markets but must watch spending impulses.',
        actions: [
          'Set stop-loss rules and cooling-off periods for purchases to prevent emotion-driven losses.',
          'Systematize competitive analysis and convert insights into differentiated offerings.'
        ]
      }
    },
    love: {
      DirectWealth: {
        narrative: 'Direct Wealth in relationships seeks stability and clear responsibilities. You value practical cooperation.',
        actions: [
          'Create shared financial goals—home buying, education funds—to reinforce security.',
          'Hold regular family finance reviews so transparency stays high.'
        ]
      },
      IndirectWealth: {
        narrative: 'Indirect Wealth brings spontaneity and adventure into love. Boundaries keep passion from draining resources.',
        actions: [
          'Plan creative getaways or experiences while staying mindful of budget caps.',
          'Discuss financial boundaries openly so romance supports long-term stability.'
        ]
      },
      DirectOfficer: {
        narrative: 'Direct Officer represents commitment and duty—ideal for building structured family systems.',
        actions: [
          'Clarify roles around marriage, household, or parenting so responsibility is shared.',
          'Uphold legal and ethical standards to keep work stress from spilling into the relationship.'
        ]
      },
      SevenKillings: {
        narrative: 'Seven Killings increases magnetism and intensity. Switching between passion and safety is key.',
        actions: [
          'Establish a cool-down protocol before conflicts escalate.',
          'Channel high energy into joint challenges—outdoor adventures, business projects—to convert heat into progress.'
        ]
      },
      EatingGod: {
        narrative: 'Eating God nurtures warmth—food, art, stories become love languages.',
        actions: [
          'Create culinary or cultural date experiences to build soft memories.',
          'Introduce family rituals—weekend brunch, handwritten notes—to sustain affection.'
        ]
      },
      HurtingOfficer: {
        narrative: 'Hurting Officer craves authenticity and freedom. Watch for sharp words during flare-ups.',
        actions: [
          'Use nonviolent communication techniques to express needs and limits.',
          'Schedule creative or therapeutic outlets (writing, music, counseling) to diffuse tension.'
        ]
      },
      DirectResource: {
        narrative: 'Direct Resource offers care and education, but needs spiritual resonance in love.',
        actions: [
          'Study or attend workshops together to deepen intellectual connection.',
          'Reserve weekly quiet time—meditation, prayer, reflection—to nourish soul intimacy.'
        ]
      },
      IndirectResource: {
        narrative: 'Indirect Resource adds mystery and intuition. Vulnerability keeps it healthy.',
        actions: [
          'Share dreams, intuitive hits, and inner reflections to build depth.',
          'Ask for support when emotions close off so your partner is not left guessing.'
        ]
      },
      Friend: {
        narrative: 'Friend energy favors shoulder-to-shoulder partnership and shared decision-making.',
        actions: [
          'Design a joint vision board or roadmap so goals are visible to both of you.',
          'Keep personal social circles alive to preserve healthy space.'
        ]
      },
      RobWealth: {
        narrative: 'Rob Wealth brings strong independence and competition. Collaboration skills keep it harmonious.',
        actions: [
          'Set agreements around money and time to prevent mutual depletion.',
          'Invest in couples coaching or joint learning to strengthen cooperation and trust.'
        ]
      }
    },
    health: {
      DirectWealth: {
        narrative: 'Direct Wealth creates reliable routines yet can ignore body signals. Balance output with care.',
        actions: [
          'Schedule medical checkups and workouts like non-negotiable meetings.',
          "Track nutrition and sleep so chronic fatigue doesn't sneak up."
        ]
      },
      IndirectWealth: {
        narrative: 'Indirect Wealth can spark irregular hours. Ritual keeps metabolism and immunity steady.',
        actions: [
          'Adopt portable health habits—meal prep, hydration alarms—to avoid over-reliance on takeout.',
          'Use short meditation or breath drills to reset stress between appointments.'
        ]
      },
      DirectOfficer: {
        narrative: 'Direct Officer carries responsibility and pressure, impacting nerves and cardiovascular health.',
        actions: [
          'Book bodywork or physical therapy sessions to release accumulated tension.',
          'Negotiate support at work and home to prevent chronic overtime.'
        ]
      },
      SevenKillings: {
        narrative: 'Seven Killings fuels adrenaline and risk-taking—watch out for accidents or adrenal fatigue.',
        actions: [
          'Pair intense training with safety protocols, coaching, or protective gear.',
          'Plan annual "adventure with safety" goals alongside insurance and emergency plans.'
        ]
      },
      EatingGod: {
        narrative: 'Eating God enjoys indulgence; mindful intake keeps digestion and blood sugar stable.',
        actions: [
          'Adopt a Mediterranean-inspired meal plan that balances enjoyment and health.',
          'Choose social workouts (dance, group yoga) so movement offsets richer dining.'
        ]
      },
      HurtingOfficer: {
        narrative: 'Hurting Officer seeks stimulation and can skip rest—watch nervous system balance.',
        actions: [
          'Match high-intensity workouts with recovery modalities such as ice baths or heat therapy.',
          'Implement a pre-sleep digital detox to protect autonomic balance.'
        ]
      },
      DirectResource: {
        narrative: 'Direct Resource restores well but can become sluggish; circulation is key.',
        actions: [
          'Schedule daily walks or qi-focused movement to support digestion and lymph flow.',
          'Collaborate with a nutritionist to dial down excess sugar or heavy foods.'
        ]
      },
      IndirectResource: {
        narrative: 'Indirect Resource ties health to emotional tides. Track mood-somatic patterns.',
        actions: [
          'Journal emotions alongside physical sensations to map triggers and remedies.',
          'Commit to therapy, retreats, or spiritual practice that recalibrates your system.'
        ]
      },
      Friend: {
        narrative: 'Friend energy thrives with accountability partners for health goals.',
        actions: [
          'Join fitness or run clubs where mutual encouragement sustains momentum.',
          'Set shared wellness targets with family or friends and report progress together.'
        ]
      },
      RobWealth: {
        narrative: 'Rob Wealth can lead to erratic schedules. Strong self-discipline protects vitality.',
        actions: [
          'Fix consistent bed and wake times—use devices only as reminders, not temptations.',
          'Attach natural consequences to late nights or heavy meals so habits shift steadily.'
        ]
      }
    }
  }

  // 分析八字中的五行能量
  const analyzeFiveElements = (bazi) => {
    const elements = {
      Wood: 0,
      Fire: 0,
      Earth: 0,
      Metal: 0,
      Water: 0
    }
    
    // 统计每个柱中的五行
    Object.values(bazi).forEach(pillar => {
      const stem = pillar.charAt(0)
      const branch = pillar.charAt(1)
      
      if (elementMapping[stem]) {
        elements[elementMapping[stem]]++
      }
      if (elementMapping[branch]) {
        elements[elementMapping[branch]]++
      }
    })
    
    // 找出主导元素
    const maxCount = Math.max(...Object.values(elements))
    const dominantElements = Object.entries(elements)
      .filter(([_, count]) => count === maxCount)
      .map(([element, _]) => element)
    
    // 计算五行平衡度
    const totalElements = Object.values(elements).reduce((sum, count) => sum + count, 0)
    const balanceScore = 1 - (maxCount / totalElements) * 0.5
    
    return {
      elements,
      dominantElements,
      balanceScore,
      maxCount,
      totalElements
    }
  }

  const analyzeDayMasterStrength = (bazi, fiveElements) => {
    if (!bazi || !fiveElements) return null

    const dayStem = bazi.day?.charAt(0)
    const dayBranch = bazi.day?.charAt(1)
    const dayElement = elementMapping[dayStem]

    if (!dayStem || !dayElement) {
      return null
    }

    const polarity = yinYangMap[dayStem] || 'Yang'
    const producerElement = elementProducingMap[dayElement] || null
    const outputElement = generatingElementMap[dayElement] || null
    const wealthElement = controllingElementMap[dayElement] || null
    const officerElement = elementControllingMap[dayElement] || null

    let supportScore = (fiveElements.elements[dayElement] || 0) + (producerElement ? (fiveElements.elements[producerElement] || 0) : 0)
    let drainScore = (outputElement ? (fiveElements.elements[outputElement] || 0) : 0) + (officerElement ? (fiveElements.elements[officerElement] || 0) : 0)

    const monthBranch = bazi.month?.charAt(1)
    const monthElement = elementMapping[monthBranch]
    let seasonalSupport = 0

    if (monthElement === dayElement) {
      seasonalSupport = 1.5
    } else if (monthElement === producerElement) {
      seasonalSupport = 1
    } else if (monthElement === outputElement || monthElement === officerElement) {
      seasonalSupport = -1
    }

    if (seasonalSupport > 0) {
      supportScore += seasonalSupport
    } else if (seasonalSupport < 0) {
      drainScore += Math.abs(seasonalSupport)
    }

    const relativeScore = supportScore - drainScore

    let strength = 'balanced'
    if (relativeScore >= 2) {
      strength = 'strong'
    } else if (relativeScore <= -2) {
      strength = 'weak'
    }

    const strengthDescriptions = {
      strong: `Your ${dayElement} Day Master leans strong, supported by abundant self and resource energy. Focus on channeling output and wealth elements to release surplus power while safeguarding rest.`,
      balanced: `Your ${dayElement} Day Master remains relatively balanced. Maintain the current mix of support and output, and adjust only when major luck cycles shift your elemental landscape.`,
      weak: `Your ${dayElement} Day Master trends weak, indicating limited support from self or resource elements. Prioritize nourishment—mentors, education, and restorative routines—before pushing bold expansion.`
    }

    const strengthLabels = {
      strong: 'Strong',
      balanced: 'Balanced',
      weak: 'Weak'
    }

    return {
      dayStem,
      dayBranch,
      dayElement,
      polarity,
      producerElement,
      outputElement,
      wealthElement,
      officerElement,
      supportScore: Number(supportScore.toFixed(1)),
      drainScore: Number(drainScore.toFixed(1)),
      relativeScore: Number(relativeScore.toFixed(1)),
      seasonalSupport,
      strength,
      strengthLabel: strengthLabels[strength],
      summary: strengthDescriptions[strength],
      focusElements: {
        supportive: [dayElement, producerElement].filter(Boolean),
        balancing: [outputElement, officerElement].filter(Boolean)
      }
    }
  }

  const getTenGod = (dayStem, targetStem) => {
    if (!dayStem || !targetStem) return null

    const dayElement = elementMapping[dayStem]
    const targetElement = elementMapping[targetStem]
    if (!dayElement || !targetElement) return null

    const dayPolarity = yinYangMap[dayStem]
    const targetPolarity = yinYangMap[targetStem]
    const polaritySame = dayPolarity === targetPolarity

    if (targetElement === dayElement) {
      return polaritySame ? 'Friend' : 'RobWealth'
    }

    const producingElement = elementProducingMap[dayElement]
    if (targetElement === producingElement) {
      return polaritySame ? 'IndirectResource' : 'DirectResource'
    }

    const generatedElement = generatingElementMap[dayElement]
    if (targetElement === generatedElement) {
      return polaritySame ? 'EatingGod' : 'HurtingOfficer'
    }

    const wealthElement = controllingElementMap[dayElement]
    if (targetElement === wealthElement) {
      return polaritySame ? 'IndirectWealth' : 'DirectWealth'
    }

    const officerElement = elementControllingMap[dayElement]
    if (targetElement === officerElement) {
      return polaritySame ? 'SevenKillings' : 'DirectOfficer'
    }

    return null
  }

  const analyzeTenGods = (bazi) => {
    if (!bazi) return null
    const stems = {
      year: bazi.year?.charAt(0),
      month: bazi.month?.charAt(0),
      day: bazi.day?.charAt(0),
      hour: bazi.hour?.charAt(0)
    }

    const counts = {
      Friend: 0,
      RobWealth: 0,
      EatingGod: 0,
      HurtingOfficer: 0,
      DirectWealth: 0,
      IndirectWealth: 0,
      DirectOfficer: 0,
      SevenKillings: 0,
      DirectResource: 0,
      IndirectResource: 0
    }

    const detailEntries = []
    const positions = {
      year: 'Year Stem',
      month: 'Month Stem',
      hour: 'Hour Stem'
    }

    Object.entries(positions).forEach(([key, label]) => {
      const targetStem = stems[key]
      if (!targetStem) return

      const tenGod = getTenGod(stems.day, targetStem)
      if (tenGod) {
        counts[tenGod] += 1
      }

      detailEntries.push({
        position: label,
        stem: targetStem,
        element: elementMapping[targetStem] || 'Unknown',
        polarity: yinYangMap[targetStem] || 'Yang',
        tenGod,
        tenGodLabel: tenGod ? tenGodLabelMap[tenGod] : '—'
      })
    })

    const dominantGods = Object.entries(counts)
      .filter(([, value]) => value > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({
        key,
        label: tenGodLabelMap[key],
        category: tenGodCategoryMap[key],
        count: value,
        guidance: tenGodGuidance[key]
      }))

    const summary = dominantGods.length > 0
      ? `Primary influence: ${dominantGods[0].label}. ${dominantGods[0].guidance}${dominantGods[1] ? ` Secondary influence: ${dominantGods[1].label}. ${dominantGods[1].guidance}` : ''}`
      : 'No dominant Ten Gods pattern detected beyond the Day Master itself. Continue observing how future cycles activate different heavenly stems.'

    return {
      details: detailEntries,
      counts,
      dominantGods,
      summary
    }
  }

  const stepThroughCycle = (current, collection, step) => {
    const index = collection.indexOf(current)
    if (index === -1) return current
    const length = collection.length
    const nextIndex = (index + step + length) % length
    return collection[nextIndex]
  }

  const parseSolarToDate = (solarObj) => {
    if (!solarObj || typeof solarObj !== 'object') return null
    const year = typeof solarObj.getYear === 'function' ? solarObj.getYear() : undefined
    const month = typeof solarObj.getMonth === 'function' ? solarObj.getMonth() : undefined
    const day = typeof solarObj.getDay === 'function' ? solarObj.getDay() : undefined
    const hour = typeof solarObj.getHour === 'function' ? solarObj.getHour() : 0
    const minute = typeof solarObj.getMinute === 'function' ? solarObj.getMinute() : 0
    const second = typeof solarObj.getSecond === 'function' ? solarObj.getSecond() : 0

    if ([year, month, day].every(value => typeof value === 'number')) {
      return new Date(year, (month || 1) - 1, day || 1, hour || 0, minute || 0, second || 0)
    }

    const ymdhms = typeof solarObj.toYmdHms === 'function' ? solarObj.toYmdHms() : null
    if (typeof ymdhms === 'string') {
      const [datePart, timePart = '00:00:00'] = ymdhms.trim().split(/[\sT]+/)
      if (datePart) {
        const [y, m, d] = datePart.split('-').map(Number)
        const [hh = 0, mm = 0, ss = 0] = timePart.split(':').map(Number)
        if (![y, m, d].some(v => Number.isNaN(v))) {
          return new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, ss || 0)
        }
      }
    }

    return null
  }

  const extractJieQiDate = (jieQi) => {
    if (!jieQi) return null
    if (jieQi instanceof Date) return jieQi

    const solarObj = typeof jieQi.getSolar === 'function' ? jieQi.getSolar() : jieQi
    return parseSolarToDate(solarObj)
  }

  const getReferenceJieQiDate = (lunar, forward) => {
    if (!lunar) return null
    const methodCandidates = forward
      ? ['getNextJieQi', 'getNextJie', 'getNextQi']
      : ['getPrevJieQi', 'getPrevJie', 'getPrevQi']

    for (const method of methodCandidates) {
      const fn = typeof lunar[method] === 'function' ? lunar[method].bind(lunar) : null
      if (fn) {
        const result = fn()
        const date = extractJieQiDate(result)
        if (date) return date
      }
    }

    const tableFn = typeof lunar.getJieQiTable === 'function' ? lunar.getJieQiTable.bind(lunar) : null
    if (tableFn) {
      const table = tableFn()
      if (table) {
        let entries = []
        if (table instanceof Map) {
          entries = Array.from(table.entries())
        } else if (Array.isArray(table)) {
          entries = table
        } else if (typeof table === 'object') {
          entries = Object.entries(table)
        }

        const points = entries
          .map(([, value]) => extractJieQiDate(value))
          .filter(Boolean)
          .sort((a, b) => a - b)

        if (points.length > 0) {
          const solar = lunar.getSolar?.()
          const baseDate = parseSolarToDate(solar)
          if (!baseDate) return null

          if (forward) {
            return points.find(date => date > baseDate) || null
          }
          for (let i = points.length - 1; i >= 0; i--) {
            if (points[i] < baseDate) {
              return points[i]
            }
          }
        }
      }
    }

    return null
  }

  const parseIsoDate = (isoString) => {
    if (typeof isoString !== 'string') return null
    const date = new Date(isoString)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const getJieQiFromTable = (birthDate, forward) => {
    const year = birthDate.getFullYear()
    const yearCandidates = forward ? [year, year + 1] : [year, year - 1]

    const points = yearCandidates.flatMap((y) => {
      const record = jieqiTable?.[y]
      if (!record) return []
      return Object.values(record)
        .map(parseIsoDate)
        .filter(Boolean)
    }).sort((a, b) => a - b)

    if (points.length === 0) return null

    if (forward) {
      return points.find(date => date > birthDate) || null
    }

    for (let i = points.length - 1; i >= 0; i--) {
      if (points[i] < birthDate) {
        return points[i]
      }
    }
    return null
  }

  const calculateDaYunStartAge = (birthDate, forward) => {
    try {
      const tableDate = getJieQiFromTable(birthDate, forward)
      if (tableDate) {
        const diffDays = Math.abs(tableDate.getTime() - birthDate.getTime()) / DAY_MS
        if (diffDays > 0) {
          return Math.max(1, Math.ceil(diffDays / 3))
        }
      }

      const lunar = Lunar.fromDate(birthDate)
      const referenceDate = getReferenceJieQiDate(lunar, forward)
      if (referenceDate) {
        const diffDays = Math.abs(referenceDate.getTime() - birthDate.getTime()) / DAY_MS
        if (diffDays > 0) {
          return Math.max(1, Math.ceil(diffDays / 3))
        }
      }
    } catch (error) {
      console.warn('DaYun start age calculation fallback to default', error)
    }
    return 6
  }

  const buildDaYun = (bazi, profile = {}) => {
    if (!bazi) return null
    const { dateOfBirth, timeOfBirth, gender } = profile
    if (!dateOfBirth || !gender) return null

    const birthDateTimeString = `${dateOfBirth}T${timeOfBirth || '12:00'}`
    const birthDateObj = new Date(birthDateTimeString)
    if (Number.isNaN(birthDateObj.getTime())) return null

    const dayStem = bazi.day?.charAt(0)
    const monthStem = bazi.month?.charAt(0)
    const monthBranch = bazi.month?.charAt(1)
    if (!dayStem || !monthStem || !monthBranch) return null

    const birthYear = birthDateObj.getFullYear()
    const forward = (yinYangMap[dayStem] === 'Yang' && gender === 'Male') ||
      (yinYangMap[dayStem] === 'Yin' && gender === 'Female')

    const direction = forward ? 1 : -1
    const startAge = calculateDaYunStartAge(birthDateObj, forward)
    const startYear = birthYear + startAge

    let currentStem = monthStem
    let currentBranch = monthBranch

    const cycles = []
    for (let i = 0; i < 8; i++) {
      currentStem = stepThroughCycle(currentStem, heavenlyStems, direction)
      currentBranch = stepThroughCycle(currentBranch, earthlyBranches, direction)

      const cycleStartYear = startYear + i * 10
      const cycleEndYear = cycleStartYear + 9
      const tenGod = getTenGod(dayStem, currentStem)

      cycles.push({
        index: i + 1,
        startYear: cycleStartYear,
        endYear: cycleEndYear,
        stem: currentStem,
        branch: currentBranch,
        element: elementMapping[currentStem] || elementMapping[currentBranch],
        tenGod,
        tenGodLabel: tenGod ? tenGodLabelMap[tenGod] : '—',
        guidance: tenGod ? tenGodGuidance[tenGod] : 'Maintain balanced routines; observe how this cycle activates key relationships and responsibilities.'
      })
    }

    return {
      startAge,
      direction: forward ? 'forward' : 'backward',
      cycles
    }
  }

  const getYearStemBranch = (year) => {
    const stemIndex = (year - 4) % 10
    const branchIndex = (year - 4) % 12
    const stem = heavenlyStems[(stemIndex + 10) % 10]
    const branch = earthlyBranches[(branchIndex + 12) % 12]
    return { stem, branch }
  }

  const analyzeYearlyBranchImpact = (branch, natalBranches) => {
    const interactions = []
    const seen = new Set()

    Object.entries(natalBranches).forEach(([key, natalBranch]) => {
      if (!natalBranch) return

      const targetLabel = branchLabels[key]
      const targetPalace = palaceFocusMap[key]

      const registerInteraction = (type, guidance) => {
        const dedupeKey = `${type}-${key}`
        if (seen.has(dedupeKey)) return
        seen.add(dedupeKey)
        interactions.push({
          type,
          targetKey: key,
          targetLabel,
          targetPalace,
          guidance
        })
      }

      if (clashPairs[branch] === natalBranch) {
        registerInteraction(
          'clash',
          branchRelationTone.clash.guidance('流年', targetLabel, targetPalace)
        )
      }

      if (sixHarmonyPairs[branch] === natalBranch) {
        registerInteraction(
          'harmony',
          branchRelationTone.harmony.guidance('流年', targetLabel, targetPalace)
        )
      }

      if (punishmentMap[branch]?.includes(natalBranch) || punishmentMap[natalBranch]?.includes(branch)) {
        registerInteraction(
          'punishment',
          branchRelationTone.punishment.guidance('流年', targetLabel, targetPalace)
        )
      }
    })

    return interactions
  }

  const buildAnnualTrends = (bazi, dayMaster, yearsCount = 12) => {
    if (!bazi) return null
    const natalBranches = {
      year: bazi.year?.charAt(1),
      month: bazi.month?.charAt(1),
      day: bazi.day?.charAt(1),
      hour: bazi.hour?.charAt(1)
    }

    const currentYear = new Date().getFullYear()
    const trends = []

    for (let i = 0; i < yearsCount; i++) {
      const year = currentYear + i
      const { stem, branch } = getYearStemBranch(year)
      const element = elementMapping[stem] || elementMapping[branch]
      const tenGod = dayMaster?.dayStem ? getTenGod(dayMaster.dayStem, stem) : null

      const interactions = analyzeYearlyBranchImpact(branch, natalBranches)
      let summary = `${year} is a ${stem}${branch} year, emphasizing ${element || 'mixed'} elemental themes.`
      if (tenGod && tenGodGuidance[tenGod]) {
        summary += ` ${tenGodGuidance[tenGod]}`
      }
      if (interactions.length > 0) {
        const highlights = interactions.reduce(
          (acc, item) => {
            if (!acc[item.type]) acc[item.type] = new Set()
            acc[item.type].add(item.targetPalace)
            return acc
          },
          {}
        )
        const parts = []
        if (highlights.clash) parts.push(`Clash focus: ${Array.from(highlights.clash).join(' / ')}`)
        if (highlights.harmony) parts.push(`Collaboration window: ${Array.from(highlights.harmony).join(' / ')}`)
        if (highlights.punishment) parts.push(`Repetitive stress: ${Array.from(highlights.punishment).join(' / ')}`)
        summary += ` Pay attention to: ${parts.join('; ')}.`
      }

      trends.push({
        year,
        stem,
        branch,
        element,
        tenGod,
        tenGodLabel: tenGod ? tenGodLabelMap[tenGod] : '—',
        summary,
        interactions
      })
    }

    return {
      startYear: currentYear,
      entries: trends
    }
  }

  const getStrengthNarrative = (dayMaster, context) => {
    if (!dayMaster) return ''
    const level = dayMaster.strength
    return strengthNarrativeMap[level]?.[context] || ''
  }

  const getStrengthActions = (dayMaster, context) => {
    if (!dayMaster) return []
    const level = dayMaster.strength
    return strengthActionMap[level]?.[context] || []
  }

  const getTopTenGod = (tenGods) => tenGods?.dominantGods?.[0]?.key || null

  const getTenGodNarrative = (tenGodKey, context) => {
    if (!tenGodKey) return ''
    return tenGodContextAdvice[context]?.[tenGodKey]?.narrative || ''
  }

  const getTenGodActions = (tenGodKey, context) => {
    if (!tenGodKey) return []
    return tenGodContextAdvice[context]?.[tenGodKey]?.actions || []
  }

  const enrichSection = (base, context, dayMaster, tenGodKey) => {
    const segments = [base]
    const narratives = []
    const actions = new Set()

    const strengthNarrative = getStrengthNarrative(dayMaster, context)
    if (strengthNarrative) narratives.push(strengthNarrative)

    const tenGodNarrative = getTenGodNarrative(tenGodKey, context)
    if (tenGodNarrative) narratives.push(tenGodNarrative)

    getStrengthActions(dayMaster, context).forEach(item => actions.add(item))
    getTenGodActions(tenGodKey, context).forEach(item => actions.add(item))

    if (narratives.length > 0) {
      segments.push(narratives.join('\n\n'))
    }

    if (actions.size > 0) {
      segments.push(`行动建议：\n- ${Array.from(actions).join('\n- ')}`)
    }

    return segments.join('\n\n')
  }

  const enrichSummary = (base, dayMaster, tenGods, branchDynamics) => {
    const segments = [base]
    if (dayMaster?.summary) {
      segments.push(`日主调性：${dayMaster.summary}`)
    }
    if (tenGods?.summary) {
      segments.push(`Ten God focus: ${tenGods.summary}`)
    }
    if (branchDynamics?.summary) {
      segments.push(`地支互动：${branchDynamics.summary}`)
    }
    segments.push('Next step: align these insights with your personal timeline and consider booking a one-on-one consultation for deeper guidance when you need it.')
    return segments.join('\n\n')
  }

  // 根据五行能量生成报告模板
  const generateElementBasedReport = (data, fiveElements, dayMaster, tenGods, branchDynamics) => {
    const { dominantElements, balanceScore, elements } = fiveElements
    const topTenGod = getTopTenGod(tenGods)
    let baseReport

    if (dominantElements.includes('Metal')) {
      baseReport = {
        wealth: generateMetalWealthAnalysis(data, elements),
        love: generateMetalLoveAnalysis(data, elements),
        health: generateMetalHealthAnalysis(data, elements),
        summary: generateMetalSummary(data, elements)
      }
    } else if (dominantElements.includes('Wood')) {
      baseReport = {
        wealth: generateWoodWealthAnalysis(data, elements),
        love: generateWoodLoveAnalysis(data, elements),
        health: generateWoodHealthAnalysis(data, elements),
        summary: generateWoodSummary(data, elements)
      }
    } else if (dominantElements.includes('Fire')) {
      baseReport = {
        wealth: generateFireWealthAnalysis(data, elements),
        love: generateFireLoveAnalysis(data, elements),
        health: generateFireHealthAnalysis(data, elements),
        summary: generateFireSummary(data, elements)
      }
    } else if (dominantElements.includes('Water')) {
      baseReport = {
        wealth: generateWaterWealthAnalysis(data, elements),
        love: generateWaterLoveAnalysis(data, elements),
        health: generateWaterHealthAnalysis(data, elements),
        summary: generateWaterSummary(data, elements)
      }
    } else if (dominantElements.includes('Earth')) {
      baseReport = {
        wealth: generateEarthWealthAnalysis(data, elements),
        love: generateEarthLoveAnalysis(data, elements),
        health: generateEarthHealthAnalysis(data, elements),
        summary: generateEarthSummary(data, elements)
      }
    } else {
      baseReport = {
        wealth: generateBalancedWealthAnalysis(data, elements),
        love: generateBalancedLoveAnalysis(data, elements),
        health: generateBalancedHealthAnalysis(data, elements),
        summary: generateBalancedSummary(data, elements)
      }
    }

    return {
      wealth: enrichSection(baseReport.wealth, 'wealth', dayMaster, topTenGod),
      love: enrichSection(baseReport.love, 'love', dayMaster, topTenGod),
      health: enrichSection(baseReport.health, 'health', dayMaster, topTenGod),
      summary: enrichSummary(baseReport.summary, dayMaster, tenGods, branchDynamics),
      balanceScore
    }
  }

  // 金属性报告模板
  const generateMetalWealthAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    const waterCount = elements.Water
    
    if (metalCount >= 4) {
      return "Your Bazi chart shows exceptionally strong Metal energy, indicating great potential for wealth accumulation through structured investments and financial planning. Your analytical mind and disciplined approach make you excellent at managing money and identifying profitable opportunities. Focus on careers in finance, banking, or technology. Your wealth peak will be between ages 35-50."
    } else if (waterCount > 0) {
      return "Your Metal-Water combination creates excellent wealth potential. Metal provides structure while Water brings flow and adaptability. You excel in dynamic financial environments and can adapt to market changes. Consider careers in investment banking, real estate development, or international trade. Your wealth-building strategy should balance conservative planning with calculated risks."
    } else {
      return "Your Metal energy indicates a methodical approach to wealth building. You prefer stable, long-term investments over high-risk ventures. Your analytical skills help you make sound financial decisions. Focus on building a solid foundation through steady savings and conservative investments. Your wealth will grow steadily over time."
    }
  }

  const generateMetalLoveAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    const fireCount = elements.Fire
    
    if (metalCount >= 4) {
      return "Your strong Metal energy makes you highly principled in relationships. You value loyalty, commitment, and intellectual connection. You may appear reserved initially but are deeply devoted once committed. Your ideal partner should be intelligent, honest, and share your values. Communication is key - express your feelings openly to avoid misunderstandings."
    } else if (fireCount > 0) {
      return "Your Metal-Fire combination creates an interesting dynamic in love. Metal provides structure while Fire brings passion and warmth. You need both emotional connection and intellectual stimulation. Your relationships will be intense and meaningful. Find a partner who can balance your logical nature with emotional understanding."
    } else {
      return "Your Metal energy brings stability and loyalty to relationships. You are reliable and committed, but may need to work on emotional expression. Your love life benefits from clear communication and mutual respect. You thrive in long-term, committed relationships built on trust and shared values."
    }
  }

  const generateMetalHealthAnalysis = (data, elements) => {
    const metalCount = elements.Metal
    
    if (metalCount >= 4) {
      return "Your strong Metal energy affects your respiratory and skin systems. Pay attention to lung health and maintain good air quality. Regular breathing exercises and outdoor activities in clean environments are beneficial. Your skin may be sensitive, so use gentle skincare products. Stress management is crucial as Metal energy can lead to tension."
    } else {
      return "Your Metal energy influences your respiratory system and skin. Maintain good posture and breathing habits. Regular exercise, especially activities that improve lung capacity, will benefit your health. Pay attention to skin care and avoid harsh chemicals. Balance work and rest to prevent stress-related issues."
    }
  }

  const generateMetalSummary = (data, elements) => {
    const metalCount = elements.Metal
    
    if (metalCount >= 4) {
      return "Your Bazi chart reveals a strong Metal personality - analytical, principled, and determined. Your greatest strength lies in your ability to create structure and maintain discipline. Success comes through careful planning and systematic approach. Focus on developing emotional intelligence to balance your logical nature. Your life path emphasizes building lasting foundations through hard work and integrity."
    } else {
      return "Your Metal energy provides a solid foundation for life success. You approach challenges methodically and value quality over quantity. Your analytical mind helps you make wise decisions. Focus on building strong relationships and maintaining work-life balance. Your steady approach will lead to long-term success and fulfillment."
    }
  }

  // 木属性报告模板
  const generateWoodWealthAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    const fireCount = elements.Fire
    
    if (woodCount >= 4) {
      return "Your abundant Wood energy indicates excellent growth potential in wealth creation. You have natural leadership abilities and entrepreneurial spirit. Your wealth comes through expansion, innovation, and helping others grow. Consider careers in education, consulting, or starting your own business. Your wealth peak will be between ages 30-45 through continuous growth and development."
    } else if (fireCount > 0) {
      return "Your Wood-Fire combination creates dynamic wealth potential. Wood provides growth while Fire brings energy and visibility. You excel in creative industries, marketing, or any field that combines innovation with communication. Your wealth-building strategy should focus on leveraging your creativity and networking skills. Success comes through collaboration and sharing your vision."
    } else {
      return "Your Wood energy indicates growth-oriented wealth building. You prefer investments that have potential for expansion and development. Your natural leadership qualities help you identify opportunities and inspire others. Focus on careers that allow for growth and learning. Your wealth will increase steadily as you develop your skills and expand your influence."
    }
  }

  const generateWoodLoveAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your strong Wood energy makes you naturally caring and nurturing in relationships. You have a strong sense of justice and fairness. You may be idealistic about love and need to balance your giving nature with self-care. Your relationships thrive on mutual growth and support. Find a partner who appreciates your caring nature and supports your personal development."
    } else {
      return "Your Wood energy brings growth and nurturing qualities to relationships. You are supportive and encouraging, helping partners reach their potential. You value honesty and fairness in love. Your relationships benefit from open communication and shared goals. You thrive in partnerships that allow both individuals to grow together."
    }
  }

  const generateWoodHealthAnalysis = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your strong Wood energy affects your liver and nervous system. Pay attention to stress management and emotional balance. Regular exercise, especially stretching and yoga, will benefit your health. Your liver may be sensitive, so maintain a healthy diet and avoid excessive alcohol. Green vegetables and fresh foods are particularly beneficial for your constitution."
    } else {
      return "Your Wood energy influences your liver and nervous system. Regular exercise and outdoor activities will help maintain your vitality. Pay attention to stress levels and practice relaxation techniques. A diet rich in green vegetables and fresh foods will support your health. Maintain regular sleep patterns for optimal well-being."
    }
  }

  const generateWoodSummary = (data, elements) => {
    const woodCount = elements.Wood
    
    if (woodCount >= 4) {
      return "Your Bazi chart reveals a strong Wood personality - growth-oriented, caring, and idealistic. Your greatest strength lies in your ability to nurture growth in yourself and others. Success comes through continuous learning and helping others develop. Focus on balancing your giving nature with self-care. Your life path emphasizes personal and collective growth through education, leadership, and service."
    } else {
      return "Your Wood energy provides a foundation for growth and development. You have natural leadership qualities and a caring nature. Your success comes through helping others and continuous self-improvement. Focus on maintaining balance between giving and receiving. Your growth-oriented approach will lead to meaningful achievements and fulfilling relationships."
    }
  }

  // 火属性报告模板
  const generateFireWealthAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    const earthCount = elements.Earth
    
    if (fireCount >= 4) {
      return "Your intense Fire energy indicates dynamic wealth creation through passion and charisma. You have natural marketing abilities and can inspire others to invest in your vision. Your wealth comes through leadership, public speaking, or creative industries. Be careful with impulsive financial decisions. Your wealth peak will be between ages 25-40 through bold initiatives and personal charisma."
    } else if (earthCount > 0) {
      return "Your Fire-Earth combination creates stable yet dynamic wealth potential. Fire provides energy and visibility while Earth brings practicality and stability. You excel in fields that combine creativity with structure, such as event planning, real estate, or consulting. Your wealth-building strategy should balance bold initiatives with careful planning."
    } else {
      return "Your Fire energy indicates wealth creation through passion and creativity. You have natural leadership abilities and can inspire others. Your wealth comes through careers that allow you to express your creativity and charisma. Focus on developing patience and planning skills to complement your natural enthusiasm. Your wealth will grow through your ability to motivate and lead others."
    }
  }

  const generateFireLoveAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your strong Fire energy makes you passionate and charismatic in relationships. You have intense emotions and need partners who can handle your passionate nature. You may be impulsive in love and need to develop patience. Your relationships are exciting and dynamic. Find a partner who appreciates your enthusiasm and can provide emotional stability."
    } else {
      return "Your Fire energy brings passion and warmth to relationships. You are enthusiastic and loving, creating exciting connections. You need emotional expression and appreciation in love. Your relationships benefit from open communication and shared activities. You thrive in partnerships that allow for emotional expression and mutual support."
    }
  }

  const generateFireHealthAnalysis = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your strong Fire energy affects your heart and circulatory system. Pay attention to heart health and stress management. Regular cardiovascular exercise is beneficial, but avoid overexertion. Your metabolism may be fast, so maintain regular eating patterns. Cooling foods and plenty of water will help balance your constitution. Practice stress-reduction techniques."
    } else {
      return "Your Fire energy influences your heart and circulatory system. Regular exercise and stress management are important for your health. Pay attention to your heart health and maintain a balanced diet. Cooling foods and adequate hydration will support your vitality. Practice relaxation techniques to maintain emotional balance."
    }
  }

  const generateFireSummary = (data, elements) => {
    const fireCount = elements.Fire
    
    if (fireCount >= 4) {
      return "Your Bazi chart reveals a strong Fire personality - passionate, charismatic, and dynamic. Your greatest strength lies in your ability to inspire and motivate others. Success comes through leadership, creativity, and personal charisma. Focus on developing patience and emotional balance. Your life path emphasizes using your passion and energy to create positive change and inspire others."
    } else {
      return "Your Fire energy provides enthusiasm and creativity to your life. You have natural leadership abilities and can inspire others. Your success comes through expressing your passion and creativity. Focus on developing patience and emotional balance. Your enthusiastic approach will lead to exciting opportunities and meaningful achievements."
    }
  }

  // 水属性报告模板
  const generateWaterWealthAnalysis = (data, elements) => {
    const waterCount = elements.Water
    const woodCount = elements.Wood
    
    if (waterCount >= 4) {
      return "Your abundant Water energy indicates wealth through wisdom, knowledge, and adaptability. You have excellent intuition for business opportunities and can navigate complex situations. Your wealth comes through intellectual pursuits, research, or international business. You excel in fields requiring deep knowledge and strategic thinking. Your wealth peak will be between ages 40-55 through accumulated wisdom and experience."
    } else if (woodCount > 0) {
      return "Your Water-Wood combination creates excellent wealth potential through knowledge and growth. Water provides wisdom while Wood brings expansion and leadership. You excel in education, consulting, or any field that combines knowledge with helping others grow. Your wealth-building strategy should focus on leveraging your wisdom and teaching abilities."
    } else {
      return "Your Water energy indicates wealth creation through wisdom and adaptability. You have excellent intuition and can identify opportunities others miss. Your wealth comes through careers that require deep thinking and strategic planning. Focus on developing your knowledge and expertise. Your wealth will grow through your ability to navigate complex situations and provide valuable insights."
    }
  }

  const generateWaterLoveAnalysis = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your strong Water energy makes you deeply emotional and intuitive in relationships. You have profound emotional depth and need partners who can understand your complex nature. You may be mysterious and need time to open up. Your relationships are deep and meaningful. Find a partner who appreciates your emotional depth and provides emotional security."
    } else {
      return "Your Water energy brings emotional depth and intuition to relationships. You are sensitive and caring, creating deep emotional connections. You need emotional security and understanding in love. Your relationships benefit from deep communication and emotional support. You thrive in partnerships that allow for emotional expression and mutual understanding."
    }
  }

  const generateWaterHealthAnalysis = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your strong Water energy affects your kidneys and reproductive system. Pay attention to kidney health and maintain good hydration. Your emotional health significantly impacts your physical well-being. Regular meditation and stress management are crucial. Avoid excessive salt and maintain a balanced diet. Your constitution benefits from warm foods and regular rest."
    } else {
      return "Your Water energy influences your kidneys and emotional health. Maintain good hydration and pay attention to your emotional well-being. Regular meditation and stress management will benefit your health. A balanced diet with adequate hydration is important. Practice emotional self-care and maintain regular sleep patterns."
    }
  }

  const generateWaterSummary = (data, elements) => {
    const waterCount = elements.Water
    
    if (waterCount >= 4) {
      return "Your Bazi chart reveals a strong Water personality - wise, intuitive, and emotionally deep. Your greatest strength lies in your wisdom and ability to navigate complex situations. Success comes through accumulated knowledge and emotional intelligence. Focus on developing emotional balance and self-expression. Your life path emphasizes using your wisdom and intuition to help others and create meaningful change."
    } else {
      return "Your Water energy provides wisdom and emotional depth to your life. You have excellent intuition and can understand complex situations. Your success comes through developing your knowledge and emotional intelligence. Focus on maintaining emotional balance and expressing your feelings. Your wise approach will lead to deep understanding and meaningful relationships."
    }
  }

  // 土属性报告模板
  const generateEarthWealthAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    const fireCount = elements.Fire
    
    if (earthCount >= 4) {
      return "Your strong Earth energy indicates wealth through stability, reliability, and practical skills. You excel in building solid foundations and maintaining long-term success. Your wealth comes through real estate, agriculture, or any field requiring patience and practical knowledge. You prefer steady, reliable investments over risky ventures. Your wealth peak will be between ages 45-60 through accumulated assets and stable growth."
    } else if (fireCount > 0) {
      return "Your Earth-Fire combination creates excellent wealth potential through practical creativity. Earth provides stability while Fire brings energy and visibility. You excel in fields that combine practical skills with creativity, such as architecture, interior design, or culinary arts. Your wealth-building strategy should focus on building solid foundations while expressing your creative talents."
    } else {
      return "Your Earth energy indicates wealth creation through stability and practical skills. You have excellent organizational abilities and can build lasting foundations. Your wealth comes through careers that require reliability and practical knowledge. Focus on developing your skills and building long-term relationships. Your wealth will grow steadily through your practical approach and reliability."
    }
  }

  const generateEarthLoveAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your strong Earth energy makes you reliable and nurturing in relationships. You are practical and down-to-earth, providing stability and security to partners. You may be reserved in expressing emotions but show love through actions. Your relationships are built on trust and mutual support. Find a partner who appreciates your practical nature and provides emotional warmth."
    } else {
      return "Your Earth energy brings stability and reliability to relationships. You are practical and caring, creating secure and supportive partnerships. You value trust and mutual support in love. Your relationships benefit from practical cooperation and shared responsibilities. You thrive in partnerships that provide both emotional and practical support."
    }
  }

  const generateEarthHealthAnalysis = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your strong Earth energy affects your digestive system and overall stability. Pay attention to digestive health and maintain regular eating patterns. Your constitution benefits from warm, cooked foods and regular routines. Avoid excessive cold or raw foods. Regular exercise and outdoor activities will help maintain your vitality. Focus on building strong physical foundations."
    } else {
      return "Your Earth energy influences your digestive system and overall stability. Maintain regular eating patterns and pay attention to digestive health. A diet rich in warm, cooked foods will support your constitution. Regular exercise and outdoor activities are beneficial. Focus on building strong physical and emotional foundations."
    }
  }

  const generateEarthSummary = (data, elements) => {
    const earthCount = elements.Earth
    
    if (earthCount >= 4) {
      return "Your Bazi chart reveals a strong Earth personality - practical, reliable, and nurturing. Your greatest strength lies in your ability to build solid foundations and provide stability. Success comes through patience, practical skills, and reliable service. Focus on developing emotional expression and flexibility. Your life path emphasizes creating stability and security for yourself and others through practical wisdom and reliable service."
    } else {
      return "Your Earth energy provides stability and practicality to your life. You have excellent organizational abilities and can build lasting foundations. Your success comes through practical skills and reliable service. Focus on developing emotional expression and flexibility. Your practical approach will lead to stable achievements and meaningful contributions to others."
    }
  }

  // 平衡五行报告模板
  const generateBalancedWealthAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates versatile wealth potential across multiple areas. You have the flexibility to adapt to different financial opportunities and market conditions. Your wealth comes through a combination of skills and adaptability. Focus on developing diverse income streams and maintaining financial flexibility. Your wealth will grow steadily through balanced decision-making and adaptability."
  }

  const generateBalancedLoveAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates harmonious relationships with good emotional intelligence. You can adapt to different relationship dynamics and maintain healthy boundaries. Your love life benefits from your ability to understand and balance different perspectives. Focus on maintaining emotional balance and clear communication. You thrive in relationships that allow for mutual growth and understanding."
  }

  const generateBalancedHealthAnalysis = (data, elements) => {
    return "Your balanced Bazi chart indicates good overall health potential with few major vulnerabilities. Your constitution benefits from a balanced lifestyle and varied activities. Maintain regular exercise, balanced nutrition, and stress management. Your health will be stable with proper care and attention to all aspects of well-being."
  }

  const generateBalancedSummary = (data, elements) => {
    return "Your balanced Bazi chart reveals a harmonious personality with good adaptability and emotional intelligence. Your greatest strength lies in your ability to maintain balance and adapt to different situations. Success comes through flexibility, balanced decision-making, and harmonious relationships. Focus on maintaining this balance while developing your unique strengths. Your life path emphasizes creating harmony and balance in all areas of life."
  }

  const generateBaziReport = async (e) => {
    e.preventDefault()
    setIsGenerating(true)

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 计算八字
    const bazi = calculateBazi(formData.dateOfBirth, formData.timeOfBirth)
    
    // 分析五行能量
    const fiveElements = analyzeFiveElements(bazi)
    const dayMasterInsights = analyzeDayMasterStrength(bazi, fiveElements)
    const tenGodsProfile = analyzeTenGods(bazi)
    const branchDynamics = analyzeBranchDynamics(bazi)
    const dayun = buildDaYun(bazi, formData)
    const annualTrends = buildAnnualTrends(bazi, dayMasterInsights)
    
    // 根据五行能量生成报告
    const elementBasedReport = generateElementBasedReport(formData, fiveElements, dayMasterInsights, tenGodsProfile, branchDynamics)

    // 生成完整报告
    const generatedReport = {
      name: formData.fullName,
      bazi: bazi,
      fiveElements: fiveElements,
      dayMaster: dayMasterInsights,
      tenGods: tenGodsProfile,
      branchDynamics,
      dayun,
      annualTrends,
      wealth: elementBasedReport.wealth,
      love: elementBasedReport.love,
      health: elementBasedReport.health,
      summary: elementBasedReport.summary
    }

    setReport(generatedReport)
    setIsGenerating(false)
  }

  const calculateBazi = (date, time) => {
    // 使用lunar-javascript库进行准确的八字计算
    const birthDate = new Date(date + (time ? 'T' + time : 'T12:00'))
    
    // 获取农历日期
    const lunar = Lunar.fromDate(birthDate)
    
    // 获取八字
    const bazi = lunar.getBaZi()
    
    return {
      year: bazi[0].toString(),
      month: bazi[1].toString(),
      day: bazi[2].toString(),
      hour: bazi[3].toString()
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Report copied to clipboard!')
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  if (report) {
    const extractActions = (sectionText = '') => {
      const marker = 'Action Suggestions:'
      if (!sectionText.includes(marker)) return []
      return sectionText
        .slice(sectionText.indexOf(marker) + marker.length)
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.replace(/^-+/, '').trim())
        .filter(Boolean)
    }

    const overviewInsights = []
    if (report.dayMaster?.summary) {
      overviewInsights.push(`Day Master Insight: ${report.dayMaster.summary}`)
    }
    if (report.tenGods?.summary) {
      overviewInsights.push(`Ten God Profile: ${report.tenGods.summary}`)
    }
    if (report.branchDynamics?.summary) {
      overviewInsights.push(`Branch Interactions: ${report.branchDynamics.summary}`)
    }

    const timingHighlights = []
    if (report.dayun?.cycles?.length) {
      const currentYear = new Date().getFullYear()
      const activeCycle = report.dayun.cycles.find(cycle => currentYear >= cycle.startYear && currentYear <= cycle.endYear) || report.dayun.cycles[0]
      if (activeCycle) {
        timingHighlights.push(`Current Major Cycle (${activeCycle.startYear}-${activeCycle.endYear}): ${activeCycle.guidance}`)
      }
      const nextCycle = report.dayun.cycles.find(cycle => activeCycle && cycle.startYear > activeCycle.startYear)
      if (nextCycle) {
        timingHighlights.push(`Next Major Cycle (${nextCycle.startYear}-${nextCycle.endYear}): ${nextCycle.guidance}`)
      }
    }
    if (report.annualTrends?.entries?.length) {
      const currentYear = new Date().getFullYear()
      const upcomingYear = report.annualTrends.entries.find(entry => entry.year >= currentYear) || report.annualTrends.entries[0]
      if (upcomingYear) {
        timingHighlights.push(`Upcoming Year ${upcomingYear.year}: ${upcomingYear.summary}`)
      }
    }

    const actionPool = [
      ...extractActions(report.wealth),
      ...extractActions(report.love),
      ...extractActions(report.health)
    ]
    const prioritizedActions = Array.from(new Set(actionPool)).slice(0, 6)

    return (
      <>
        <SEO 
          title={`${report.name}'s Free Bazi Reading Report | Professional Chinese Numerology Analysis`}
          description={`Get ${report.name}'s personalized Bazi reading report with detailed analysis of wealth, love, health, and life path based on traditional Chinese numerology. Free comprehensive Bazi chart analysis.`}
          keywords={`bazi reading report, ${report.name} bazi analysis, free bazi chart, chinese numerology report, bazi wealth analysis, bazi love compatibility, bazi health reading, personalized bazi reading`}
          canonical={`${window.location.origin}/free-bazi-report`}
          ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
          ogType="article"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${report.name}'s Bazi Reading Report`,
            "description": `Personalized Bazi analysis for ${report.name} covering wealth, love, health, and life path`,
            "author": {
              "@type": "Organization",
              "name": "FatePath"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FatePath"
            },
            "datePublished": new Date().toISOString(),
            "image": `${window.location.origin}/images/bazi-reading.jpg`
          }}
        />
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Report Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-3 sm:mb-4">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white">
              {report.name}'s Bazi Reading Report
            </h1>
            <p className="text-base sm:text-lg text-mystic-300">
              Personalized Bazi analysis based on your birth information
            </p>
          </motion.div>

          {(overviewInsights.length > 0 || timingHighlights.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Insight Summary</h2>
              {overviewInsights.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Core Signals</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-mystic-200 space-y-1">
                    {overviewInsights.map((item, index) => (
                      <li key={`overview-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {timingHighlights.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Timing Highlights</h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-mystic-200 space-y-1">
                    {timingHighlights.map((item, index) => (
                      <li key={`timing-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {prioritizedActions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Priority Action Checklist</h2>
              <p className="text-sm sm:text-base text-mystic-300 mb-3">Focus on these moves first to convert insight into traction:</p>
              <ul className="list-disc list-inside text-sm sm:text-base text-mystic-200 space-y-1">
                {prioritizedActions.map((item, index) => (
                  <li key={`action-${index}`}>{item}</li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Bazi Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Your Bazi Chart</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Year Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.year}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Month Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.month}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Day Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.day}</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-mystic-800/50 rounded-lg border border-mystic-700/50">
                <div className="text-xs sm:text-sm text-mystic-400 mb-1 sm:mb-2">Hour Pillar</div>
                <div className="text-lg sm:text-2xl font-bold text-white">{report.bazi.hour}</div>
              </div>
            </div>
          </motion.div>

          {/* Five Elements Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Five Elements Energy Analysis</h2>
            
            {/* Dominant Elements */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Dominant Elements</h3>
              <div className="flex flex-wrap gap-2">
                {report.fiveElements.dominantElements.map((element, index) => (
                  <span
                    key={index}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                      element === 'Metal' ? 'bg-gray-600 text-white' :
                      element === 'Wood' ? 'bg-green-600 text-white' :
                      element === 'Fire' ? 'bg-red-600 text-white' :
                      element === 'Water' ? 'bg-blue-600 text-white' :
                      'bg-yellow-600 text-black'
                    }`}
                  >
                    {element} Energy
                  </span>
                ))}
              </div>
            </div>

            {/* Element Distribution */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Element Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                {Object.entries(report.fiveElements.elements).map(([element, count]) => (
                  <div key={element} className="text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-1 sm:mb-2 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg ${
                      element === 'Metal' ? 'bg-gray-600' :
                      element === 'Wood' ? 'bg-green-600' :
                      element === 'Fire' ? 'bg-red-600' :
                      element === 'Water' ? 'bg-blue-600' :
                      'bg-yellow-600'
                    }`}>
                      {count}
                    </div>
                    <div className="text-xs sm:text-sm text-mystic-300">{element}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance Score */}
            <div className="text-center p-4 bg-mystic-800/30 rounded-lg border border-mystic-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Energy Balance Score</h3>
              <div className="text-2xl font-bold text-gold-400 mb-2">
                {Math.round(report.fiveElements.balanceScore * 100)}%
              </div>
              <p className="text-sm text-mystic-300">
                {report.fiveElements.balanceScore > 0.7 ? 'Excellent Balance' :
                 report.fiveElements.balanceScore > 0.5 ? 'Good Balance' :
                 report.fiveElements.balanceScore > 0.3 ? 'Moderate Balance' :
                 'Strong Element Dominance'}
              </p>
            </div>
          </motion.div>

          {report.dayMaster && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Day Master Strength Overview</h2>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-mystic-200">
                <div>
                  <p><span className="text-mystic-400 mr-2">Day Master:</span>{report.dayMaster.dayStem} ({report.dayMaster.dayElement}) · {report.dayMaster.polarity}</p>
                  <p><span className="text-mystic-400 mr-2">Strength:</span>{report.dayMaster.strengthLabel}</p>
                </div>
                <div>
                  <p><span className="text-mystic-400 mr-2">Support Score:</span>{report.dayMaster.supportScore}</p>
                  <p><span className="text-mystic-400 mr-2">Load Score:</span>{report.dayMaster.drainScore}</p>
                </div>
              </div>

              <p className="text-mystic-200 leading-relaxed mt-4 sm:mt-6">{report.dayMaster.summary}</p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gold-300 mb-2">Supportive Elements</h4>
                  <p className="text-mystic-200 text-sm">{report.dayMaster.focusElements.supportive.join(' / ') || '—'}</p>
                </div>
                <div className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gold-300 mb-2">Balancing Elements</h4>
                  <p className="text-mystic-200 text-sm">{report.dayMaster.focusElements.balancing.join(' / ') || '—'}</p>
                </div>
              </div>
            </motion.div>
          )}

          {report.tenGods && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Ten Gods Profile</h2>
              <p className="text-mystic-200 leading-relaxed mb-4 sm:mb-6">{report.tenGods.summary}</p>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                {report.tenGods.details.map((item, index) => (
                  <div key={`${item.position}-${index}`} className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                    <p className="text-xs text-mystic-400 mb-1">{item.position}</p>
                    <p className="text-lg font-semibold text-white mb-1">{item.stem}</p>
                    <p className="text-sm text-mystic-300 mb-1">{item.tenGodLabel}</p>
                    <p className="text-xs text-mystic-400">{item.element} · {item.polarity}</p>
                  </div>
                ))}
              </div>

              {report.tenGods.dominantGods && report.tenGods.dominantGods.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Dominant Influences</h3>
                  <div className="space-y-2">
                    {report.tenGods.dominantGods.slice(0, 3).map((god, index) => (
                      <div key={`${god.key}-${index}`} className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                        <div className="flex items-center justify-between text-sm text-mystic-300 mb-1">
                          <span>{god.label}</span>
                          <span>×{god.count}</span>
                        </div>
                        <p className="text-xs text-mystic-400 mb-1">{god.category}</p>
                        <p className="text-sm text-mystic-200 leading-relaxed">{god.guidance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {report.dayun?.cycles && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Major Luck Cycles (Da Yun)</h2>
              <p className="text-mystic-200 text-sm sm:text-base leading-relaxed mb-4">
                Starting age: {report.dayun.startAge} · {report.dayun.direction === 'forward' ? 'Forward sequence' : 'Reverse sequence'}
              </p>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {report.dayun.cycles.map((cycle) => (
                  <div key={cycle.index} className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-sm text-mystic-300">
                      <span>Cycle {cycle.index} ({cycle.startYear} - {cycle.endYear})</span>
                      <span className="font-semibold text-white">{cycle.stem}{cycle.branch}</span>
                    </div>
                    <div className="text-xs text-mystic-400">
                      Ten God: {cycle.tenGodLabel} · Element: {cycle.element || 'Mixed'}
                    </div>
                    <p className="text-sm text-mystic-200 leading-relaxed">
                      {cycle.guidance}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {report.annualTrends?.entries && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.44 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Annual Outlook Snapshot</h2>
              <p className="text-mystic-200 text-sm sm:text-base leading-relaxed mb-4">
                Coverage: {report.annualTrends.startYear} - {report.annualTrends.entries.slice(-1)[0]?.year}
              </p>
              <div className="space-y-4">
                {report.annualTrends.entries.map((entry) => (
                  <div key={entry.year} className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="text-white font-semibold text-lg">{entry.year}</div>
                      <div className="text-xs text-mystic-400">
                        {entry.stem}{entry.branch} · Element: {entry.element || 'Mixed'} · Ten God: {entry.tenGodLabel}
                      </div>
                    </div>
                    <p className="text-sm text-mystic-200 leading-relaxed mt-2">{entry.summary}</p>
                    {entry.interactions.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {entry.interactions.map((interaction, index) => (
                          <li key={index} className="text-xs text-mystic-300 leading-relaxed border border-mystic-700/60 rounded-md p-3">
                            <span className="block text-gold-300 font-semibold mb-1">{branchRelationTone[interaction.type].tone}</span>
                            <span>{interaction.guidance}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {report.branchDynamics && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mystic-card p-4 sm:p-8 mb-6 sm:mb-8"
            >
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-4 sm:mb-6 text-gold-400">Branch Interactions & Timing Signals</h2>
              <p className="text-mystic-200 leading-relaxed mb-4 sm:mb-6">
                {report.branchDynamics.summary}
              </p>

              {report.branchDynamics.entries.length > 0 ? (
                <div className="space-y-4">
                  {report.branchDynamics.entries.map((item, index) => (
                    <div key={`${item.type}-${index}`} className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="text-sm text-gold-300 font-semibold">
                          {branchRelationTone[item.type].tone}
                        </div>
                        <div className="text-xs text-mystic-400">
                          {branchLabels[item.sourceKey]} ({item.sourceBranch}) ↔ {branchLabels[item.targetKey]} ({item.targetBranch})
                        </div>
                      </div>
                      <p className="text-sm text-mystic-200 mt-3 leading-relaxed">
                        {item.guidance}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-mystic-800/40 border border-mystic-700/40 rounded-lg p-4 text-sm text-mystic-300">
                  Four pillars currently maintain neutral interactions. Monitor upcoming luck cycles for future triggers.
                </div>
              )}
            </motion.div>
          )}

          {/* Report Sections */}
          <div className="space-y-8">
            {/* Wealth Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">💰</span>
                Wealth Analysis
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.wealth}</p>
            </motion.div>

            {/* Love Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">💕</span>
                Love & Relationships
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.love}</p>
            </motion.div>

            {/* Health Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">🏥</span>
                Health & Wellness
              </h3>
              <p className="text-mystic-200 leading-relaxed">{report.health}</p>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mystic-card p-8"
            >
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gold-400 flex items-center">
                <span className="mr-2">📋</span>
                Summary & Guidance
              </h3>
              <div className="space-y-5 text-mystic-200 text-sm sm:text-base leading-relaxed">
                {overviewInsights.length > 0 && (
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">Core Takeaways</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {overviewInsights.slice(0, 3).map((item, index) => (
                        <li key={`summary-overview-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {timingHighlights.length > 0 && (
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">Timing Reminders</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {timingHighlights.slice(0, 2).map((item, index) => (
                        <li key={`summary-timing-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {report.summary && (
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">Integration Notes</h4>
                    <p>{report.summary}</p>
                  </div>
                )}
                {prioritizedActions.length > 0 && (
                  <div>
                    <h4 className="text-base font-semibold text-white mb-2">Next Moves</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {prioritizedActions.slice(0, 3).map((item, index) => (
                        <li key={`summary-action-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={() => copyToClipboard(document.querySelector('.mystic-card').innerText)}
              className="flex-1 flex items-center justify-center space-x-2 bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors py-3 px-6 rounded-lg"
            >
              <Share2 className="h-5 w-5" />
              <span>Copy Report</span>
            </button>
            
            <Link
              to="/services"
              className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all duration-300"
            >
              <Crown className="h-5 w-5" />
              <span>View Detailed Service</span>
            </Link>
          </motion.div>

          

                     {/* Back Link */}
           <div className="mt-8 text-center">
             <Link
               to="/"
               className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
             >
               <ArrowLeft className="h-4 w-4" />
               <span>Back to Home</span>
             </Link>
           </div>
         </div>

         {/* Special Offer Modal */}
         <AnimatePresence>
           {showOfferModal && (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
               onClick={closeOfferModal}
             >
               <motion.div
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.8, opacity: 0 }}
                 className="bg-gradient-to-br from-mystic-900 to-mystic-800 border-2 border-gold-500/50 rounded-2xl p-8 max-w-md w-full relative"
                 onClick={(e) => e.stopPropagation()}
               >
                 {/* Close Button */}
                 <button
                   onClick={closeOfferModal}
                   className="absolute top-4 right-4 text-mystic-400 hover:text-white transition-colors"
                 >
                   <X className="h-6 w-6" />
                 </button>

                 {/* Header */}
                 <div className="text-center mb-6">
                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4">
                     <Gift className="h-8 w-8 text-white" aria-hidden="true" />
                   </div>
                   <h3 className="text-2xl font-cinzel font-bold text-white mb-2">
                     Quick Bazi Reading - Only $10!
                   </h3>
                   <p className="text-mystic-300">
                     You've been reading for {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                   </p>
                 </div>

                 {/* Offer Content */}
                 <div className="space-y-4 mb-6">
                   <div className="bg-mystic-800/50 rounded-lg p-4 border border-mystic-700/50">
                     <h4 className="text-lg font-semibold text-gold-400 mb-2">
                       ⚡ Quick Bazi Reading Package
                     </h4>
                     <ul className="text-mystic-200 space-y-2 text-sm">
                       <li>✓ Essential personality analysis</li>
                       <li>✓ Career direction guidance</li>
                       <li>✓ Life path insights</li>
                       <li>✓ Key strengths & challenges</li>
                       <li>✓ Basic recommendations</li>
                     </ul>
                   </div>

                   <div className="text-center">
                     <div className="text-3xl font-bold text-gold-400 mb-2">
                       <span className="line-through text-mystic-400 text-xl">$38</span>
                       <span className="ml-2">$10</span>
                     </div>
                     <p className="text-mystic-300 text-sm">
                       Affordable entry-level option - Save 74%
                     </p>
                   </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="space-y-3">
                                       <button
                      onClick={handlePaypalPayment}
                      className="touch-target w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 flex items-center justify-center space-x-2 animate-optimized"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.067 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM12.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406h-1.406c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51zM7.5 8.478c.492.315.844.825.844 1.406 0 .58-.352 1.09-.844 1.406-.492.315-1.156.51-1.875.51H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.352 0 .703-.195.703-.406 0-.21-.351-.406-.703-.406H4.219c-.492 0-.844-.195-.844-.51 0-.315.352-.51.844-.51h1.406c.719 0 1.383.195 1.875.51z"/>
                      </svg>
                      <span>KO-FI</span>
                    </button>
                   
                   <button
                     onClick={closeOfferModal}
                     className="touch-target w-full bg-mystic-800/50 border border-mystic-700/50 text-mystic-300 rounded-lg hover:bg-mystic-700/50 transition-colors animate-optimized"
                   >
                     Maybe Later
                   </button>
                 </div>

                 {/* Urgency Message */}
                 <div className="mt-4 text-center">
                   <p className="text-xs text-mystic-400">
                     ⏰ This offer expires when you leave this page
                   </p>
                 </div>
               </motion.div>
             </motion.div>
           )}
         </AnimatePresence>
       </div>
     </>
     )
   }

  return (
    <>
      <SEO 
        title="Free Bazi Reading Report | Professional Chinese Numerology Analysis"
        description="Get your free personalized Bazi reading report with detailed analysis of wealth, love, health, and life path. Professional Chinese numerology expert analysis."
        keywords="free bazi reading report, bazi chart analysis, chinese numerology report, bazi wealth analysis, bazi love compatibility, bazi health reading, personalized bazi reading"
        canonical={`${window.location.origin}/free-bazi-report`}
        ogImage={`${window.location.origin}/images/bazi-reading.jpg`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "headline": "Free Bazi Reading Report",
          "description": "Get your free personalized Bazi reading report with detailed analysis",
          "url": `${window.location.origin}/free-bazi-report`
        }}
      />
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-gold-500 to-yellow-500 mb-4 sm:mb-6">
            <Star className="h-8 w-8 sm:h-10 sm:w-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-3 sm:mb-4 text-white tracking-wide">
            Free Bazi Reading Report
          </h1>
          <p className="text-lg sm:text-xl text-mystic-300">
            Enter your birth information to get your personalized Bazi analysis instantly
          </p>
          
          {/* SEO Content Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-mystic-400 mb-2">
              Discover your destiny through ancient Chinese numerology with our free Bazi reading report
            </p>
            <p className="text-sm text-mystic-400">
              Professional BaZi chart analysis for wealth, love, health, and life path guidance
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mystic-card p-6 sm:p-8"
        >
          <form onSubmit={generateBaziReport} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-mystic-200 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input w-full bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-mystic-200 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystic-200 mb-2">
                Time of Birth *
              </label>
              <input
                type="time"
                id="timeOfBirth"
                name="timeOfBirth"
                required
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors text-base"
              />
            </div>

            {/* Birth Location */}
            <div>
              <label htmlFor="birthLocation" className="block text-sm font-medium text-mystic-200 mb-2">
                Birth Location *
              </label>
              <input
                type="text"
                id="birthLocation"
                name="birthLocation"
                required
                value={formData.birthLocation}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-3 bg-mystic-800/50 border border-mystic-700/50 rounded-lg text-white placeholder-mystic-400 focus:border-gold-500/50 focus:outline-none transition-colors text-base"
                placeholder="City, Country (e.g., New York, USA)"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full group inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gold-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-black"></div>
                    <span>Generating Your Report...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" />
                    <span>Generate Free Report</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* FAQ Section for SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mystic-card p-6 sm:p-8 mt-8"
        >
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-gold-400">
            Frequently Asked Questions About BaZi Reading Reports
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What is a BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                A BaZi reading report is a comprehensive analysis of your birth chart based on ancient Chinese numerology. It reveals your elemental balance, personality traits, and life patterns to help you understand your destiny and make better life decisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                How accurate is this free BaZi chart analysis?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Our free BaZi reading report provides accurate analysis based on traditional Chinese numerology principles. The accuracy depends on the precision of your birth information, especially the exact time of birth. For the most accurate results, provide the most precise birth time available.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What information do I need for a BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                You need your full name, gender, exact date of birth, time of birth (as precise as possible), and birth location. The more accurate your birth time, the more precise your BaZi chart analysis will be.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                How long does it take to generate my BaZi reading report?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Your personalized BaZi reading report is generated instantly after you submit your birth information. The analysis includes wealth patterns, love compatibility, health insights, and life path guidance based on your unique birth chart.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Is this Chinese numerology report really free?
              </h3>
              <p className="text-mystic-300 text-sm leading-relaxed">
                Yes, our basic BaZi reading report is completely free. We provide comprehensive analysis including your BaZi chart, five elements analysis, and personalized insights for wealth, love, and health. We also offer premium detailed readings for those seeking deeper analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mystic-card p-6 sm:p-8 mt-6"
        >
          <h2 className="text-xl sm:text-2xl font-cinzel font-bold mb-6 text-gold-400">
            Explore More Chinese Numerology Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/services"
              className="p-4 bg-mystic-800/50 border border-mystic-700/50 rounded-lg hover:border-gold-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400">
                Professional BaZi Consultation
              </h3>
              <p className="text-mystic-300 text-sm">
                Get detailed one-on-one consultation with our expert Chinese numerology master
              </p>
            </Link>
            
            <Link
              to="/wealth-sign"
              className="p-4 bg-mystic-800/50 border border-mystic-700/50 rounded-lg hover:border-gold-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-400">
                Ancient Chinese Wisdom Oracle
              </h3>
              <p className="text-mystic-300 text-sm">
                Experience our sacred oracle tool for daily guidance and wisdom
              </p>
            </Link>
          </div>
        </motion.div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-mystic-300 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default FreeBaziReport 