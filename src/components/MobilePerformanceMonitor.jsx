import React, { useEffect, useState, useRef } from 'react';
import { Activity, Wifi, WifiOff, Battery, BatteryCharging, Smartphone } from 'lucide-react';
import { isMobile, mobileUtils } from '../utils/mobileOptimization';

// 移动端性能监控组件
const MobilePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
    memory: 0,
    network: 'unknown',
    battery: 0,
    isCharging: false,
    deviceInfo: null
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const observerRef = useRef(null);
  const performanceObserverRef = useRef(null);
  const networkObserverRef = useRef(null);
  const batteryObserverRef = useRef(null);

  useEffect(() => {
    if (!isMobile()) return;

    // 初始化性能监控
    initPerformanceMonitoring();
    
    // 初始化网络监控
    initNetworkMonitoring();
    
    // 初始化电池监控
    initBatteryMonitoring();
    
    // 获取设备信息
    setPerformanceData(prev => ({
      ...prev,
      deviceInfo: mobileUtils.getDeviceInfo()
    }));

    // 清理函数
    return () => {
      cleanup();
    };
  }, []);

  // 初始化性能监控
  const initPerformanceMonitoring = () => {
    if (!('PerformanceObserver' in window)) return;

    try {
      // 监控 Core Web Vitals
      performanceObserverRef.current = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          updatePerformanceData(entry);
          checkPerformanceWarnings(entry);
        }
      });

      performanceObserverRef.current.observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
      });

      // 监控长任务
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration);
            addWarning('检测到长任务', `任务持续时间: ${entry.duration}ms`);
          }
        }
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });

    } catch (error) {
      console.error('Performance monitoring failed:', error);
    }
  };

  // 初始化网络监控
  const initNetworkMonitoring = () => {
    if (!('connection' in navigator)) return;

    const connection = navigator.connection;
    
    const updateNetworkInfo = () => {
      setPerformanceData(prev => ({
        ...prev,
        network: connection.effectiveType || 'unknown'
      }));

      // 检查网络质量
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        addWarning('网络连接较慢', '建议在WiFi环境下使用');
      }
    };

    connection.addEventListener('change', updateNetworkInfo);
    updateNetworkInfo();
    networkObserverRef.current = connection;
  };

  // 初始化电池监控
  const initBatteryMonitoring = async () => {
    if (!('getBattery' in navigator)) return;

    try {
      const battery = await navigator.getBattery();
      
      const updateBatteryInfo = () => {
        setPerformanceData(prev => ({
          ...prev,
          battery: Math.round(battery.level * 100),
          isCharging: battery.charging
        }));

        // 检查电池状态
        if (battery.level < 0.2 && !battery.charging) {
          addWarning('电池电量低', '建议连接充电器');
        }
      };

      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);
      updateBatteryInfo();
      batteryObserverRef.current = battery;

    } catch (error) {
      console.error('Battery monitoring failed:', error);
    }
  };

  // 更新性能数据
  const updatePerformanceData = (entry) => {
    setPerformanceData(prev => {
      const newData = { ...prev };
      
      switch (entry.entryType) {
        case 'largest-contentful-paint':
          newData.lcp = Math.round(entry.startTime);
          break;
        case 'first-input':
          newData.fid = Math.round(entry.processingStart - entry.startTime);
          break;
        case 'layout-shift':
          newData.cls += entry.value;
          break;
        default:
          break;
      }
      
      return newData;
    });
  };

  // 检查性能警告
  const checkPerformanceWarnings = (entry) => {
    switch (entry.entryType) {
      case 'largest-contentful-paint':
        if (entry.startTime > 2500) {
          addWarning('页面加载较慢', `LCP: ${Math.round(entry.startTime)}ms (建议 < 2500ms)`);
        }
        break;
      case 'first-input':
        if (entry.processingStart - entry.startTime > 100) {
          addWarning('交互响应较慢', `FID: ${Math.round(entry.processingStart - entry.startTime)}ms (建议 < 100ms)`);
        }
        break;
      case 'layout-shift':
        if (entry.value > 0.1) {
          addWarning('页面布局不稳定', `CLS: ${entry.value.toFixed(3)} (建议 < 0.1)`);
        }
        break;
      default:
        break;
    }
  };

  // 添加警告
  const addWarning = (title, message) => {
    const warning = {
      id: Date.now(),
      title,
      message,
      timestamp: new Date().toLocaleTimeString()
    };

    setWarnings(prev => [warning, ...prev.slice(0, 4)]); // 最多显示5个警告

    // 自动移除警告
    setTimeout(() => {
      setWarnings(prev => prev.filter(w => w.id !== warning.id));
    }, 10000);
  };

  // 清理资源
  const cleanup = () => {
    if (performanceObserverRef.current) {
      performanceObserverRef.current.disconnect();
    }
    if (batteryObserverRef.current) {
      batteryObserverRef.current.removeEventListener('levelchange', updateBatteryInfo);
      batteryObserverRef.current.removeEventListener('chargingchange', updateBatteryInfo);
    }
  };

  // 获取性能等级
  const getPerformanceGrade = (metric, value, thresholds) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  // 获取性能等级颜色
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-mystic-400';
    }
  };

  // 获取网络图标
  const getNetworkIcon = () => {
    const { network } = performanceData;
    if (network === '4g' || network === '5g') return <Wifi className="h-4 w-4 text-green-400" />;
    if (network === '3g') return <Wifi className="h-4 w-4 text-yellow-400" />;
    if (network === '2g' || network === 'slow-2g') return <WifiOff className="h-4 w-4 text-red-400" />;
    return <Wifi className="h-4 w-4 text-mystic-400" />;
  };

  // 获取电池图标
  const getBatteryIcon = () => {
    const { battery, isCharging } = performanceData;
    if (isCharging) return <BatteryCharging className="h-4 w-4 text-green-400" />;
    if (battery > 50) return <Battery className="h-4 w-4 text-green-400" />;
    if (battery > 20) return <Battery className="h-4 w-4 text-yellow-400" />;
    return <Battery className="h-4 w-4 text-red-400" />;
  };

  if (!isMobile()) return null;

  return (
    <>
      {/* 性能监控悬浮按钮 */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-mystic-800/90 backdrop-blur-md border border-mystic-600/50 rounded-full p-3 hover:bg-mystic-700/90 transition-all duration-300 shadow-lg"
        title="移动端性能监控"
      >
        <Activity className="h-5 w-5 text-gold-400" />
      </button>

      {/* 性能监控面板 */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-mystic-900/95 backdrop-blur-md border border-mystic-600/50 rounded-lg p-4 w-80 max-h-96 overflow-y-auto shadow-xl">
          {/* 标题 */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-gold-400" />
              <span>性能监控</span>
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-mystic-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {/* 核心性能指标 */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mystic-300">LCP (最大内容绘制)</span>
              <span className={`text-sm font-medium ${getGradeColor(getPerformanceGrade('lcp', performanceData.lcp, { good: 2500, needsImprovement: 4000 }))}`}>
                {performanceData.lcp}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-mystic-300">FID (首次输入延迟)</span>
              <span className={`text-sm font-medium ${getGradeColor(getPerformanceGrade('fid', performanceData.fid, { good: 100, needsImprovement: 300 }))}`}>
                {performanceData.fid}ms
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-mystic-300">CLS (累积布局偏移)</span>
              <span className={`text-sm font-medium ${getGradeColor(getPerformanceGrade('cls', performanceData.cls, { good: 0.1, needsImprovement: 0.25 }))}`}>
                {performanceData.cls.toFixed(3)}
              </span>
            </div>
          </div>

          {/* 设备状态 */}
          <div className="space-y-2 mb-4 p-3 bg-mystic-800/50 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mystic-300">网络状态</span>
              <div className="flex items-center space-x-2">
                {getNetworkIcon()}
                <span className="text-sm text-mystic-200">{performanceData.network}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-mystic-300">电池状态</span>
              <div className="flex items-center space-x-2">
                {getBatteryIcon()}
                <span className="text-sm text-mystic-200">{performanceData.battery}%</span>
              </div>
            </div>

            {performanceData.deviceInfo && (
              <div className="text-xs text-mystic-400 pt-2 border-t border-mystic-700/50">
                <div>屏幕: {performanceData.deviceInfo.screenSize}</div>
                <div>像素比: {performanceData.deviceInfo.pixelRatio}x</div>
                <div>内存: {performanceData.deviceInfo.memory}GB</div>
                <div>核心: {performanceData.deviceInfo.cores}</div>
              </div>
            )}
          </div>

          {/* 性能警告 */}
          {warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-yellow-400">性能警告</h4>
              {warnings.map(warning => (
                <div key={warning.id} className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
                  <div className="font-medium text-yellow-400">{warning.title}</div>
                  <div className="text-yellow-300">{warning.message}</div>
                  <div className="text-yellow-400/70 text-xs mt-1">{warning.timestamp}</div>
                </div>
              ))}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex space-x-2 pt-3 border-t border-mystic-700/50">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-3 py-2 rounded text-sm hover:bg-gold-500/30 transition-colors"
            >
              刷新页面
            </button>
            <button
              onClick={() => setWarnings([])}
              className="flex-1 bg-mystic-700/50 border border-mystic-600/50 text-mystic-300 px-3 py-2 rounded text-sm hover:bg-mystic-600/50 transition-colors"
            >
              清除警告
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePerformanceMonitor;
