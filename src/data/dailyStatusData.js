import goodMorningAutoList from './goodMorningAutoList.json';
import goodNightAutoList from './goodNightAutoList.json';
import ganeshChaturthiAutoList from './ganeshChaturthiAutoList.json';

export const DAILY_STATUS_CATEGORIES = [
  { id: 'good-morning', label: '🌅 Good Morning', icon: '🌅' },
  { id: 'good-night', label: '🌙 Good Night', icon: '🌙' },
  { id: 'ganesh-chaturthi', label: '🐘 Ganesh Chaturthi', icon: '🐘' }
];

export const DAILY_STATUS_FEED = {
  'good-morning': goodMorningAutoList,
  'good-night': goodNightAutoList,
  'ganesh-chaturthi': ganeshChaturthiAutoList
};
