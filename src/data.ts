/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Merchant {
  id: string;
  name: string;
  category: 'dining' | 'supermarket' | 'pharmacy' | 'laundry' | 'repair' | 'other';
  address: string;
  phone: string;
  distance: string;
  rating: number;
  lat: number;
  lng: number;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  icon: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  tag: 'notice' | 'activity';
}

export interface MutualAid {
  id: string;
  type: 'flea' | 'help';
  title: string;
  description: string;
  user: string;
  date: string;
  price?: string;
}

export const MERCHANTS: Merchant[] = [
  { id: '1', name: '美味炸酱面', category: 'dining', address: '呼伦贝尔南路22号', phone: '13812345678', distance: '150m', rating: 4.5, lat: 40.812, lng: 111.678 },
  { id: '2', name: '万惠超市', category: 'supermarket', address: '亿利社区北门', phone: '0471-8888999', distance: '300m', rating: 4.8, lat: 40.815, lng: 111.675 },
  { id: '3', name: '大药房(亿利店)', category: 'pharmacy', address: '呼伦贝尔南路30号', phone: '13988887777', distance: '450m', rating: 4.9, lat: 40.810, lng: 111.680 },
  { id: '4', name: '洁净洗衣店', category: 'laundry', address: '亿利社区小区内3号楼', phone: '13566665555', distance: '200m', rating: 4.3, lat: 40.813, lng: 111.682 },
  { id: '5', name: '老张家电维修', category: 'repair', address: '呼伦贝尔南路临街', phone: '13744443333', distance: '600m', rating: 4.7, lat: 40.818, lng: 111.670 },
  { id: '6', name: '正宗蒙餐', category: 'dining', address: '呼伦贝尔南路45号', phone: '0471-7766554', distance: '800m', rating: 4.6, lat: 40.805, lng: 111.672 },
];

export const CONTACTS: Contact[] = [
  { id: 'c1', name: '亿利社区居委会', role: '社区服务', phone: '0471-1112222', icon: 'Building2' },
  { id: 'c2', name: '金地物业中心', role: '物业管理', phone: '0471-3334444', icon: 'ShieldCheck' },
  { id: 'c3', name: '南路社区卫生站', role: '卫生医疗', phone: '0471-5556666', icon: 'Stethoscope' },
  { id: 'c4', name: '呼伦贝尔南路派出所', role: '安全报警', phone: '0471-7778888', icon: 'PhoneCall' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: '关于本周末社区停水检修的通知', date: '2024-04-26', content: '由于供水管网检修，本周六（4月27日）早8点至晚6点将暂停供水，请居民提前做好储水准备。', tag: 'notice' },
  { id: 'a2', title: '“绿动生活”植树节志愿者招募', date: '2024-04-20', content: '为建设绿色屏障，社区将于5月1日组织义务植树活动，欢迎广大居民报名参加。', tag: 'activity' },
  { id: 'a3', title: '免费义诊进社区活动预告', date: '2024-04-15', content: '下周三卫生站将在小广场举行义诊，提供血压、血糖检测及健康咨询。', tag: 'activity' },
];

export const MUTUAL_AID: MutualAid[] = [
  { id: 'm1', type: 'flea', title: '九成新儿童餐椅', description: '由于孩子不再需要，低价转让自用九成新餐椅，功能完好。', user: '王阿姨', date: '2小时前', price: '¥50' },
  { id: 'm2', type: 'help', title: '代取快递', description: '本人目前在北门，可以顺便帮邻居带个快递。', user: '李先生', date: '15分钟前' },
  { id: 'm3', type: 'flea', title: '高中教材全套', description: '免费送给有需要的邻居，理科教材。', user: '小赵', date: '1天前', price: '免费' },
];
