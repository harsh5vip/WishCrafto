import goodMorningAutoList from './goodMorningAutoList.json';
import goodNightAutoList from './goodNightAutoList.json';

export const DAILY_STATUS_CATEGORIES = [
  { id: 'good-morning', label: '🌅 Good Morning', icon: '🌅' },
  { id: 'good-night', label: '🌙 Good Night', icon: '🌙' }
];

export const DAILY_STATUS_FEED = {
  'good-morning': goodMorningAutoList,
  'good-night': goodNightAutoList
};
