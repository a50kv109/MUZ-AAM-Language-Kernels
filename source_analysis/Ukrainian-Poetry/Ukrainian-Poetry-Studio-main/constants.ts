
import { PoeticStyle, AuthorProfile } from './types';

export const UKRAINIAN_VOWELS = 'аеєиіїоуюяАЕЄИІЇОУЮЯ';

export const STYLES_CONFIG = [
  { id: PoeticStyle.FOLK_8_6, description: 'Коломийковий ритм, притаманний народній пісні та ранньому Кобзарю.' },
  { id: PoeticStyle.CLASSICAL, description: 'Ямб, хорей, дактиль. Сувора рима та метрика.' },
  { id: PoeticStyle.URBAN_VERS_LIBRE, description: 'Ритмізована проза, внутрішні рими, сучасний міський лексикон.' },
  { id: PoeticStyle.FABLE, description: 'Розповідний стиль з повчальним підтекстом.' },
  { id: PoeticStyle.RHYMED_STORY, description: 'Балада або довгий сюжетний вірш.' },
];

export const PROFILES_CONFIG = [
  { id: AuthorProfile.SHEVCHENKO, color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { id: AuthorProfile.FRANKO, color: 'bg-blue-100 border-blue-300 text-blue-800' },
  { id: AuthorProfile.UKRAINKA, color: 'bg-purple-100 border-purple-300 text-purple-800' },
  { id: AuthorProfile.STUS, color: 'bg-slate-100 border-slate-400 text-slate-900' },
  { id: AuthorProfile.KOSTENKO, color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  { id: AuthorProfile.ZHADAN, color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  { id: AuthorProfile.MIXED, color: 'bg-gray-100 border-gray-300 text-gray-800' },
];

export const countSyllables = (text: string): number => {
  let count = 0;
  for (const char of text) {
    if (UKRAINIAN_VOWELS.includes(char)) count++;
  }
  return count;
};
