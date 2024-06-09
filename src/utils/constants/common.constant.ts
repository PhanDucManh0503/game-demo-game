const GAME_TYPES = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'game_chicken_fight',
    value: 'CHICKEN_FIGHT',
  },
  {
    label: 'game_crab_gourd',
    value: 'CRAB_GOURD',
  },
  {
    label: 'game_chinese_dice',
    value: 'CHINESE_DICE',
  },
  {
    label: 'game_disk_sock',
    value: 'DISK_SOCK',
  },
  {
    label: 'game_scratch_card',
    value: 'SCRATCH_CARD',
  },
];
const RESULT_GAME = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'win',
    value: 'WIN',
  },
  {
    label: 'lose',
    value: 'LOSE',
  },
];

const TRANSACTION_TOKEN_TYPE = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'deposit',
    value: 'DEPOSIT',
  },
  {
    label: 'withdraw',
    value: 'WITHDRAW',
  },
  {
    label: 'bet',
    value: 'BET',
  },
  {
    label: 'reward',
    value: 'REWARD',
  },
];
const REQUEST_STATUS = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'wait',
    value: 'PROCESSING',
  },
  {
    label: 'complete',
    value: 'SUCCESS',
  },
  {
    label: 'reject',
    value: 'FAILED',
  },
];
const STATUS_PLAY_GAME = [
  {
    label: 'all',
    value: 'ALL',
  },
  {
    label: 'playing',
    value: 'ONGOING',
  },
  {
    label: 'expired',
    value: 'FINISHED',
  },
];
export {
  GAME_TYPES,
  RESULT_GAME,
  TRANSACTION_TOKEN_TYPE,
  REQUEST_STATUS,
  STATUS_PLAY_GAME,
};
