const CACHE_NAME = 'fatepath-v1.0.0'
const STATIC_CACHE = 'fatepath-static-v1.0.0'
const DYNAMIC_CACHE = 'fatepath-dynamic-v1.0.0'

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/images/wealth-god.jpg',
  '/images/services/bazi-reading.jpg',
  '/images/services/love-compatibility.jpg',
  '/images/services/custom-talisman.jpg',
  '/images/testimonials/sarah-johnson.jpg',
  '/images/testimonials/michael-chen.jpg',
  '/images/testimonials/emma-rodriguez.jpg',
  '/images/celebrities/madonna.jpg',
  '/images/celebrities/tom-cruise.jpg',
  '/images/celebrities/oprah-winfrey.jpg',
  '/video-background.mp4'
]

// 需要缓存的API端点
const API_CACHE = [
  'https://formbold.com/s/35AWZ',
  'https://formbold.com/s/35AWY',
  'https://formbold.com/s/35AWX'
]

// 字体缓存
const FONT_CACHE = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Cinzel:wght@400;500;600;700&display=swap'
]

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets...')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Error caching static assets:', error)
      })
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// 获取事件 - 网络优先，缓存备用
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 跳过非GET请求
  if (request.method !== 'GET') {
    return
  }

  // 跳过chrome扩展请求
  if (url.protocol === 'chrome-extension:') {
    return
  }

  // 静态资源缓存策略
  if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // API请求缓存策略
  if (isAPIRequest(request.url)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
    return
  }

  // 字体缓存策略
  if (isFontRequest(request.url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // 其他请求使用网络优先
  event.respondWith(networkFirst(request, DYNAMIC_CACHE))
})

// 判断是否为静态资源
function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('/images/') ||
         url.includes('/favicon') ||
         url.includes('/manifest.json')
}

// 判断是否为API请求
function isAPIRequest(url) {
  return API_CACHE.some(api => url.includes(api)) ||
         url.includes('formbold.com')
}

// 判断是否为字体请求
function isFontRequest(url) {
  return FONT_CACHE.some(font => url.includes(font)) ||
         url.includes('fonts.googleapis.com') ||
         url.includes('fonts.gstatic.com')
}

// 缓存优先策略
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Network error', { status: 503 })
  }
}

// 网络优先策略
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache...')
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // 返回离线页面
    if (request.destination === 'document') {
      return caches.match('/offline.html')
    }
    
    return new Response('Network error', { status: 503 })
  }
}

// 推送通知处理
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  
  const options = {
    body: event.data ? event.data.text() : 'New message from FatePath',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Services',
        icon: '/images/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/icons/icon-96x96.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('FatePath', options)
  )
})

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/services')
    )
  } else if (event.action === 'close') {
    // 关闭通知，不做任何操作
  } else {
    // 默认点击行为
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// 后台同步处理
self.addEventListener('sync', (event) => {
  console.log('Background sync:', event)
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // 执行后台同步任务
    console.log('Performing background sync...')
    
    // 这里可以添加需要后台同步的逻辑
    // 比如同步表单数据、更新缓存等
    
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// 消息处理
self.addEventListener('message', (event) => {
  console.log('Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
}) 