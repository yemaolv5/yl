/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  Bell, 
  Users, 
  Search, 
  ChevronRight, 
  Utensils, 
  ShoppingBag, 
  Pill, 
  RefreshCw, 
  Wrench, 
  PhoneCall,
  Calendar,
  Plus,
  MessageSquare,
  Building2,
  ShieldCheck,
  Stethoscope,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MERCHANTS, 
  CONTACTS, 
  ANNOUNCEMENTS, 
  MUTUAL_AID,
  type Merchant,
  type Contact,
  type Announcement,
  type MutualAid
} from './data';
import CommunityMap from './components/CommunityMap';

type Tab = 'home' | 'contacts' | 'community' | 'neighbors';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMerchants = useMemo(() => {
    return MERCHANTS.filter(m => 
      (activeCategory === 'all' || m.category === activeCategory) &&
      (m.name.includes(searchQuery) || m.address.includes(searchQuery))
    );
  }, [activeCategory, searchQuery]);

  const categoryIcons: Record<string, any> = {
    dining: Utensils,
    supermarket: ShoppingBag,
    pharmacy: Pill,
    laundry: RefreshCw,
    repair: Wrench,
  };

  const navItems = [
    { id: 'home', label: '生活圈', icon: MapPin },
    { id: 'contacts', label: '电话簿', icon: Phone },
    { id: 'community', label: '公告', icon: Bell },
    { id: 'neighbors', label: '邻里', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-md bg-white px-6 pt-5 pb-3 border-b-2 border-red-600 sticky top-0 z-50 shadow-sm shadow-slate-200/40">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Custom SVG Flower Logo */}
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                {/* 4 Petals */}
                <path d="M50 50 Q75 10 90 40 Q100 70 50 50" fill="#dc2626" />
                <path d="M50 50 Q90 75 60 90 Q30 100 50 50" fill="#dc2626" />
                <path d="M50 50 Q25 90 10 60 Q0 30 50 50" fill="#dc2626" />
                <path d="M50 50 Q10 25 40 10 Q70 0 50 50" fill="#dc2626" />
                {/* Center Emblem */}
                <circle cx="50" cy="50" r="18" fill="white" stroke="#f59e0b" strokeWidth="2" />
                <g fill="#f59e0b" transform="translate(38, 38) scale(0.5)">
                   <path d="M11 7c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 3h2v2h-2v-2zm0 4h2v6h-2v-6z" />
                   <path d="M25 44c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" transform="translate(-1, -1)"/>
                   {/* Simplified Hammer/Sickle representation */}
                   <path d="M24 12c-4.42 0-8 3.58-8 8v1h4v-1c0-2.21 1.79-4 4-4s4 1.79 4 4v7h4v-7c0-4.42-3.58-8-8-8z" />
                   <path d="M12 32h24v4H12z" />
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">智汇红心</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">科享万家 · 亿利社区</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-slate-700">15℃ 多云</p>
            <p className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold">2026年4月27日</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="搜索周边商户、便民服务..." 
            className="w-full bg-slate-100 border border-slate-200 rounded-md py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-red-600 focus:bg-white outline-none transition-all placeholder:text-slate-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="w-full max-w-md px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Neighborhood Map */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1 h-3 bg-red-600 rounded-full"></span>
                  周边便民地图
                </h2>
                <CommunityMap merchants={filteredMerchants} />
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-6 gap-2">
                {[
                  { id: 'all', label: '全部', icon: Search, color: 'bg-slate-100 text-slate-600 border-slate-200' },
                  { id: 'dining', label: '餐饮', icon: Utensils, color: 'bg-orange-50 text-orange-600 border-orange-100' },
                  { id: 'supermarket', label: '超市', icon: ShoppingBag, color: 'bg-green-50 text-green-600 border-green-100' },
                  { id: 'pharmacy', label: '药店', icon: Pill, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                  { id: 'laundry', label: '洗衣', icon: RefreshCw, color: 'bg-purple-50 text-purple-600 border-purple-100' },
                  { id: 'repair', label: '维修', icon: Wrench, color: 'bg-amber-50 text-amber-600 border-amber-100' },
                ].map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className={`w-full aspect-square rounded border transition-all flex items-center justify-center ${activeCategory === cat.id ? 'bg-primary-600 border-primary-700 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <cat.icon size={20} />
                    </div>
                    <span className={`text-[10px] font-bold ${activeCategory === cat.id ? 'text-primary-700' : 'text-slate-500'}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Merchant List */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-1 h-3 bg-red-600 rounded-full"></span>
                    附近推荐
                  </h2>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">15min Circle</span>
                </div>
                {filteredMerchants.map((m) => (
                  <div key={m.id} className="card-dense p-3 flex items-center gap-3 active:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative shrink-0">
                       <span className="text-sm font-black text-slate-300">{m.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-bold text-slate-800 truncate pr-2 group-hover:text-red-600 transition-colors">{m.name}</h3>
                        <span className="text-[9px] text-slate-400 font-bold whitespace-nowrap">{m.distance}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{m.address}</p>
                    </div>
                    <a href={`tel:${m.phone}`} className="h-8 px-3 bg-red-600 text-white rounded text-[10px] font-bold flex items-center justify-center hover:bg-red-700 transition-colors">
                      进入
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'contacts' && (
            <motion.div 
              key="contacts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-3 bg-orange-500 rounded-full"></span>
                便民电话簿
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {CONTACTS.map((c) => (
                  <div key={c.id} className="card-dense p-3 group active:bg-slate-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter mb-0.5">{c.role}</p>
                      <h3 className="text-xs font-bold text-slate-800">{c.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">{c.phone}</p>
                      <a 
                        href={`tel:${c.phone}`}
                        className="mt-2 w-full py-1.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold flex items-center justify-center gap-1 group-hover:bg-red-600 group-hover:text-white transition-all"
                      >
                        <PhoneCall size={10} />
                        拨号
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 card-dense bg-red-50/50 border-red-100 p-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500 rounded border border-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-100">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-red-900 text-xs">紧急救助中心</h4>
                  <p className="text-[10px] text-red-700/70 mt-1 leading-relaxed">
                    如遇紧急突发情况，请拨打 110/120。<br/>社区应急小组 24H 待命。
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div 
              key="community"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-3"
            >
              <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-3 bg-red-600 rounded-full"></span>
                社区公告
              </h2>

              <div className="space-y-2">
                {ANNOUNCEMENTS.map((a) => (
                  <div key={a.id} className="card-dense p-4 border-l-4 border-l-red-600">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${a.tag === 'notice' ? 'text-red-600' : 'text-orange-600'}`}>
                        {a.tag === 'notice' ? 'Important Notice' : 'Upcoming Activity'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">{a.date}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 leading-tight mb-1">{a.title}</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      {a.content.substring(0, 40)}...
                    </p>
                  </div>
                ))}
              </div>

              <div className="card-dense p-4 mt-6">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">活动日历</h3>
                <div className="flex justify-between gap-1 text-center">
                  {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
                    <div key={day} className={`flex-1 p-1 rounded ${i === 1 ? 'bg-red-600 text-white' : 'bg-slate-50 border border-slate-200'}`}>
                      <div className="text-[8px] opacity-70">{day}</div>
                      <div className="text-[11px] font-black">{23 + i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'neighbors' && (
            <motion.div 
              key="neighbors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-3 bg-red-600 rounded-full"></span>
                  邻里集市
                </span>
                <button className="text-[10px] text-red-600 font-bold hover:underline">发布物品 +</button>
              </h2>

              <div className="space-y-2">
                {MUTUAL_AID.map((m) => (
                  <div key={m.id} className="card-dense p-2 flex gap-3 group active:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-slate-100 rounded border border-slate-200 shrink-0 flex items-center justify-center text-slate-300">
                      {m.type === 'flea' ? <ShoppingBag size={20} /> : <Wrench size={20} />}
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[11px] font-bold text-slate-800 truncate">{m.title}</h3>
                        {m.price && <span className="text-[11px] font-bold text-orange-600">{m.price}</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-medium">{m.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{m.user} · {m.date}</span>
                        <span className="text-[8px] bg-slate-50 border border-slate-200 px-1 rounded font-bold text-slate-400">2号楼</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-dense bg-primary-600 p-5 text-white flex items-center justify-between">
                <div className="pr-4">
                  <h3 className="text-sm font-bold mb-1">加入社区志愿者</h3>
                  <p className="text-[10px] text-primary-100 opacity-80 leading-tight">参与社区服务，获取“爱心积分”兑换便民礼品</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center shrink-0">
                  <Heart size={20} fill="white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 w-[calc(100%-2rem)] max-w-md bg-white border border-slate-200 rounded-full px-4 h-14 flex justify-around items-center z-50 shadow-lg shadow-slate-200/50">
        {navItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-0.5 transition-all outline-none ${activeTab === item.id ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <item.icon 
              size={18} 
              className="mt-0.5 transition-transform active:scale-90"
              strokeWidth={activeTab === item.id ? 2.5 : 2}
            />
            <span className={`text-[8px] font-bold uppercase tracking-widest ${activeTab === item.id ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
            {activeTab === item.id && <motion.div layoutId="underline" className="w-4 h-0.5 bg-red-600 rounded-full mt-0.5" />}
          </button>
        ))}
      </nav>
    </div>
  );
}

