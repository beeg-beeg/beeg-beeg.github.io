export const H = [
  {c:'あ',r:'a'},{c:'い',r:'i'},{c:'う',r:'u'},{c:'え',r:'e'},{c:'お',r:'o'},
  {c:'か',r:'ka'},{c:'き',r:'ki'},{c:'く',r:'ku'},{c:'け',r:'ke'},{c:'こ',r:'ko'},
  {c:'さ',r:'sa'},{c:'し',r:'shi'},{c:'す',r:'su'},{c:'せ',r:'se'},{c:'そ',r:'so'},
  {c:'た',r:'ta'},{c:'ち',r:'chi'},{c:'つ',r:'tsu'},{c:'て',r:'te'},{c:'と',r:'to'},
  {c:'な',r:'na'},{c:'に',r:'ni'},{c:'ぬ',r:'nu'},{c:'ね',r:'ne'},{c:'の',r:'no'},
  {c:'は',r:'ha'},{c:'ひ',r:'hi'},{c:'ふ',r:'fu'},{c:'へ',r:'he'},{c:'ほ',r:'ho'},
  {c:'ま',r:'ma'},{c:'み',r:'mi'},{c:'む',r:'mu'},{c:'め',r:'me'},{c:'も',r:'mo'},
  {c:'や',r:'ya'},{c:'ゆ',r:'yu'},{c:'よ',r:'yo'},
  {c:'ら',r:'ra'},{c:'り',r:'ri'},{c:'る',r:'ru'},{c:'れ',r:'re'},{c:'ろ',r:'ro'},
  {c:'わ',r:'wa'},{c:'を',r:'wo'},{c:'ん',r:'n'},
];

export const K = [
  {c:'ア',r:'a'},{c:'イ',r:'i'},{c:'ウ',r:'u'},{c:'エ',r:'e'},{c:'オ',r:'o'},
  {c:'カ',r:'ka'},{c:'キ',r:'ki'},{c:'ク',r:'ku'},{c:'ケ',r:'ke'},{c:'コ',r:'ko'},
  {c:'サ',r:'sa'},{c:'シ',r:'shi'},{c:'ス',r:'su'},{c:'セ',r:'se'},{c:'ソ',r:'so'},
  {c:'タ',r:'ta'},{c:'チ',r:'chi'},{c:'ツ',r:'tsu'},{c:'テ',r:'te'},{c:'ト',r:'to'},
  {c:'ナ',r:'na'},{c:'ニ',r:'ni'},{c:'ヌ',r:'nu'},{c:'ネ',r:'ne'},{c:'ノ',r:'no'},
  {c:'ハ',r:'ha'},{c:'ヒ',r:'hi'},{c:'フ',r:'fu'},{c:'ヘ',r:'he'},{c:'ホ',r:'ho'},
  {c:'マ',r:'ma'},{c:'ミ',r:'mi'},{c:'ム',r:'mu'},{c:'メ',r:'me'},{c:'モ',r:'mo'},
  {c:'ヤ',r:'ya'},{c:'ユ',r:'yu'},{c:'ヨ',r:'yo'},
  {c:'ラ',r:'ra'},{c:'リ',r:'ri'},{c:'ル',r:'ru'},{c:'レ',r:'re'},{c:'ロ',r:'ro'},
  {c:'ワ',r:'wa'},{c:'ヲ',r:'wo'},{c:'ン',r:'n'},
];

export const VOCAB = {
  'Приветствия': [
    {jp:'こんにちは',r:'konnichiwa',ru:'Привет / Добрый день'},
    {jp:'おはよう',r:'ohayou',ru:'Доброе утро'},
    {jp:'こんばんは',r:'konbanwa',ru:'Добрый вечер'},
    {jp:'さようなら',r:'sayounara',ru:'До свидания'},
    {jp:'ありがとう',r:'arigatou',ru:'Спасибо'},
    {jp:'すみません',r:'sumimasen',ru:'Извините'},
    {jp:'はい',r:'hai',ru:'Да'},
    {jp:'いいえ',r:'iie',ru:'Нет'},
    {jp:'どうぞ',r:'douzo',ru:'Пожалуйста'},
    {jp:'わかりました',r:'wakarimashita',ru:'Я понял(а)'},
  ],
  'Числа': [
    {jp:'いち',r:'ichi',ru:'1'},{jp:'に',r:'ni',ru:'2'},{jp:'さん',r:'san',ru:'3'},
    {jp:'し／よん',r:'shi/yon',ru:'4'},{jp:'ご',r:'go',ru:'5'},{jp:'ろく',r:'roku',ru:'6'},
    {jp:'しち／なな',r:'shichi/nana',ru:'7'},{jp:'はち',r:'hachi',ru:'8'},
    {jp:'きゅう',r:'kyuu',ru:'9'},{jp:'じゅう',r:'juu',ru:'10'},
    {jp:'ひゃく',r:'hyaku',ru:'100'},{jp:'せん',r:'sen',ru:'1000'},
  ],
  'Местоимения': [
    {jp:'わたし',r:'watashi',ru:'Я'},{jp:'あなた',r:'anata',ru:'Ты / Вы'},
    {jp:'かれ',r:'kare',ru:'Он'},{jp:'かのじょ',r:'kanojo',ru:'Она'},
    {jp:'わたしたち',r:'watashitachi',ru:'Мы'},{jp:'これ',r:'kore',ru:'Это (близко)'},
    {jp:'それ',r:'sore',ru:'То (у тебя)'},{jp:'あれ',r:'are',ru:'Вон то'},
  ],
  'Глаголы': [
    {jp:'います',r:'imasu',ru:'Есть / Быть (одуш.)'},{jp:'あります',r:'arimasu',ru:'Есть / Быть (неодуш.)'},
    {jp:'たべます',r:'tabemasu',ru:'Есть / Кушать'},{jp:'のみます',r:'nomimasu',ru:'Пить'},
    {jp:'いきます',r:'ikimasu',ru:'Идти'},{jp:'きます',r:'kimasu',ru:'Приходить'},
    {jp:'みます',r:'mimasu',ru:'Смотреть'},{jp:'ききます',r:'kikimasu',ru:'Слушать'},
    {jp:'かきます',r:'kakimasu',ru:'Писать'},{jp:'よみます',r:'yomimasu',ru:'Читать'},
  ],
  'Предметы': [
    {jp:'ほん',r:'hon',ru:'Книга'},{jp:'みず',r:'mizu',ru:'Вода'},
    {jp:'ごはん',r:'gohan',ru:'Рис / Еда'},{jp:'でんしゃ',r:'densha',ru:'Поезд'},
    {jp:'がっこう',r:'gakkou',ru:'Школа'},{jp:'いえ',r:'ie',ru:'Дом'},
    {jp:'てがみ',r:'tegami',ru:'Письмо'},{jp:'えんぴつ',r:'enpitsu',ru:'Карандаш'},
  ],
};

// Returns a pool of kana items tagged with their alphabet type.
// kanaMode: 'h' | 'k' | 'both'
export function qPool(kanaMode) {
  if (kanaMode === 'h') return H.map(x => ({...x, t: 'h'}));
  if (kanaMode === 'k') return K.map(x => ({...x, t: 'k'}));
  return [...H.map(x => ({...x, t: 'h'})), ...K.map(x => ({...x, t: 'k'}))];
}

// Accepts romanization aliases (si=shi, ti=chi, tu=tsu, hu=fu and vice-versa).
export function checkTypeAnswer(rawVal, correct) {
  const val = rawVal.trim().toLowerCase();
  if (!val) return false;
  const aliases = {
    shi: ['si'], chi: ['ti'], tsu: ['tu'], fu: ['hu'],
    si: ['shi'], ti: ['chi'], tu: ['tsu'], hu: ['fu'],
  };
  return [correct, ...(aliases[correct] || [])].includes(val);
}

export function streakMsg(streak, base) {
  return streak > 2 ? `${base} 🔥 Серия: ${streak}` : base;
}

// Circular index arithmetic for flashcard navigation.
export function getNextIdx(currentIdx, dir, length) {
  return (currentIdx + dir + length) % length;
}

// Returns a new Set with idx toggled (added if absent, removed if present).
export function toggleLearnSet(learned, idx) {
  const next = new Set(learned);
  if (next.has(idx)) next.delete(idx);
  else next.add(idx);
  return next;
}
