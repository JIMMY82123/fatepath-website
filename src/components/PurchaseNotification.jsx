import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// 多语言名字库
const nameDatabase = {
  en: [
    'Sarah', 'Michael', 'Emma', 'James', 'Olivia', 'William', 'Sophia', 'Benjamin',
    'Isabella', 'Daniel', 'Mia', 'Matthew', 'Charlotte', 'David', 'Amelia', 'Joseph',
    'Harper', 'Andrew', 'Evelyn', 'Joshua', 'Abigail', 'Christopher', 'Emily', 'Ryan',
    'Elizabeth', 'Nathan', 'Sofia', 'Tyler', 'Avery', 'Jacob', 'Madison', 'Nicholas',
    'Scarlett', 'Ethan', 'Victoria', 'Alexander', 'Aria', 'Noah', 'Grace', 'Lucas',
    'Chloe', 'Mason', 'Lily', 'Logan', 'Natalie', 'Jackson', 'Zoe', 'Aiden',
    'Hannah', 'Carter', 'Addison', 'Liam', 'Aubrey', 'Owen', 'Eleanor', 'Wyatt',
    'Layla', 'Henry', 'Penelope', 'Sebastian', 'Riley', 'Jack', 'Lillian', 'Luke'
  ],
  ja: [
    'さくら', 'たろう', 'みお', 'ゆうき', 'あかり', 'りく', 'みゆき', 'はると',
    'なな', 'そうた', 'あい', 'りょう', 'まい', 'けん', 'ゆい', 'だいき',
    'みく', 'しん', 'あや', 'かいと', 'みお', 'りん', 'えみ', 'ひろき',
    'みさき', 'たくや', 'あいり', 'しゅう', 'みなみ', 'りょうた', 'あおい', 'ゆうと',
    'みゆ', 'そう', 'なつき', 'りく', 'みう', 'しんや', 'あいか', 'りく',
    'みお', 'けんた', 'あやか', 'だいすけ', 'みく', 'しんたろう', 'あい', 'りょうすけ',
    'みゆき', 'ひろ', 'ななみ', 'そうすけ', 'みお', 'りく', 'あかり', 'ゆうき'
  ],
  ko: [
    '지은', '민준', '서연', '도윤', '하은', '예준', '채원', '시우',
    '지우', '준서', '서윤', '건우', '지유', '현우', '수아', '윤서',
    '연우', '지원', '서현', '준혁', '예은', '민성', '채은', '시현',
    '지안', '도현', '하린', '예성', '서아', '건', '지율', '현서',
    '수연', '윤아', '연서', '지민', '서영', '준영', '예린', '민재',
    '채린', '시윤', '지혜', '도영', '하율', '예진', '서진', '건희',
    '지원', '현진', '수민', '윤지', '연아', '지현', '서은', '준아'
  ]
}

// 套餐名称（多语言）
const getPackageNames = (t) => ({
  taster: t('services.taster.name'),
  detailed: t('services.detailed.name')
})

const PurchaseNotification = ({ showOnlyWhenReportVisible = false }) => {
  const { t, i18n } = useTranslation()
  const [notifications, setNotifications] = useState([])
  const [isVisible, setIsVisible] = useState(!showOnlyWhenReportVisible)

  // 获取当前语言的名字库
  const getCurrentLanguageNames = () => {
    const lang = i18n.language || 'en'
    if (lang.startsWith('ja')) return nameDatabase.ja
    if (lang.startsWith('ko')) return nameDatabase.ko
    return nameDatabase.en
  }

  // 生成随机通知
  const generateNotification = useCallback(() => {
    const names = getCurrentLanguageNames()
    const packages = getPackageNames(t)
    
    const randomName = names[Math.floor(Math.random() * names.length)]
    const packageKeys = ['taster', 'detailed']
    const randomPackage = packageKeys[Math.floor(Math.random() * packageKeys.length)]
    const packageName = packages[randomPackage]
    
    // 随机时间：1-30分钟前
    const minutesAgo = Math.floor(Math.random() * 30) + 1
    
    return {
      id: Date.now() + Math.random(),
      name: randomName,
      package: packageName,
      minutesAgo: minutesAgo
    }
  }, [t, i18n.language])

  // 显示新通知
  useEffect(() => {
    if (!isVisible) return

    let timeouts = []
    
    // 首次延迟：1-3秒
    const initialDelay = Math.random() * 2000 + 1000
    
    const initialTimer = setTimeout(() => {
      setNotifications([generateNotification()])
      
      // 后续通知：每8-20秒随机显示一次
      const scheduleNext = () => {
        const delay = Math.random() * 12000 + 8000 // 8-20秒
        const timer = setTimeout(() => {
          const newNotification = generateNotification()
          setNotifications(prev => {
            const updated = [...prev, newNotification]
            // 限制最多显示2个通知
            return updated.slice(-2)
          })
          
          // 自动移除旧通知
          const removeTimer = setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
          }, 5000)
          timeouts.push(removeTimer)
          
          scheduleNext()
        }, delay)
        timeouts.push(timer)
      }
      
      scheduleNext()
    }, initialDelay)
    timeouts.push(initialTimer)

    return () => {
      timeouts.forEach(timer => clearTimeout(timer))
    }
  }, [isVisible, i18n.language, generateNotification])

  // 自动移除通知（5秒后）
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="mb-3 pointer-events-auto"
          >
            <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm border border-green-400/50 rounded-lg p-3 shadow-lg">
              <div className="flex items-start space-x-2">
                <ShoppingBag className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm leading-tight">
                    <span className="font-semibold">{notification.name}</span>
                    {' '}
                    {t('purchaseNotification.purchased')}
                    {' '}
                    <span className="font-medium">{notification.package}</span>
                    {' '}
                    {t('purchaseNotification.minutesAgo', { minutes: notification.minutesAgo })}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default PurchaseNotification
