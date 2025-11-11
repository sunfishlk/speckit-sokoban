import { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "初学者",
    map: [
      "######",
      "#@  .#",
      "# $  #",
      "######"
    ],
    width: 6,
    height: 4,
    targetCount: 1
  },
  {
    id: 2,
    name: "第二关",
    map: [
      " #######",
      " #     #",
      " # $@$ #",
      "## ... ##",
      "#  ###  #",
      "#       #",
      "#########"
    ],
    width: 9,
    height: 7,
    targetCount: 3
  },
  {
    id: 3,
    name: "第三关",
    map: [
      "  #####",
      "  #   #",
      "  #$  #",
      "### ..#",
      "#  $@ #",
      "# #   #",
      "#    ##",
      "######"
    ],
    width: 7,
    height: 8,
    targetCount: 2
  }
];
