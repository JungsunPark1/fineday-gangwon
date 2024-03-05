import { atom } from 'recoil';

//현재 미세먼지가 가장 낮은 [지역, 수치]
export const currentSpotAtom = atom({
  key: 'currentSpot',
  default: [' ', 0], // 초기 상태, API 호출로 업데이트!
});

export const goseongCurrentAtom = atom({
  key: 'goseongCurrent',
  default: ['고성(DMZ)', 0],
});

export const yangyangCurrentAtom = atom({
  key: 'yangyangCurrent',
  default: ['양양읍', 0],
});

export const pyeongchangCurrentAtom = atom({
  key: 'pyeongchangCurrent',
  default: ['평창읍', 0],
});

export const gangneungCurrentAtom = atom({
  key: 'gangneungCurrent',
  default: ['주문진읍', 0],
});

export const sokchoCurrentAtom = atom({
  key: 'sokchoCurrent',
  default: ['금호동', 0],
});
