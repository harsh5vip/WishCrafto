import goodMorningAutoList from './goodMorningAutoList.json';
import goodNightAutoList from './goodNightAutoList.json';
import janmashtamiAutoList from './janmashtamiAutoList.json';

export const DAILY_STATUS_CATEGORIES = [
  { id: 'good-morning', label: '🌅 Good Morning', icon: '🌅' },
  { id: 'good-night', label: '🌙 Good Night', icon: '🌙' },
  { id: 'janmashtami', label: '🦚 Janmashtami', icon: '🦚' }
];

export const DAILY_STATUS_FEED = {
  'good-morning': goodMorningAutoList,
  'good-night': goodNightAutoList,
  'janmashtami': janmashtamiAutoList
};
