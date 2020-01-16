'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const answer = document.querySelector('#answer > p');
  const questionCount = document.querySelector('#questionCount > p');

  const quizSet = shuffle([
    {q: 'ドリュウズ', c:['110 135 60 50 65 88','100 130 50 60 65 87','110 130 50 55 60 89']},
    {q: 'ドラパルト', c:['88 120 75 100 75 142','88 100 75 120 75 142','86 110 75 100 75 142']},
    {q: 'ミミッキュ', c:['55 90 80 50 105 96','65 90 80 50 95 86','65 80 90 50 95 90']},
    {q: 'アーマーガア', c:['98 87 105 53 85 67','87 98 105 58 85 77','85 87 105 58 85 67']},
    {q: 'トゲキッス', c:['85 50 95 120 115 80','75 50 95 115 120 70','85 50 95 120 105 75']},
    {q: 'サザンドラ', c:['92 105 90 125 90 98','98 105 80 135 90 92','92 105 90 130 85 98']},
    {q: 'バンギラス', c:['100 134 110 95 100 61','100 134 105 95 105 61','100 134 110 85 110 61']},
    {q: 'ギャラドス', c:['95 125 79 60 100 81','90 130 79 55 105 81','95 120 79 60 105 81']},
    {q: 'ロトム（ヒート）', c:['50 65 107 105 107 86','50 68 106 104 106 86','60 65 108 106 108 84']},
    {q: 'ヒヒダルマ（ガラル）', c:['105 140 55 30 55 95','100 145 55 35 60 90','95 140 55 40 55 100']},
    {q: 'オーロンゲ', c:['95 120 65 95 75 60','90 100 65 90 70 75','85 110 65 95 75 70']},
    {q: 'ニンフィア', c:['95 65 65 110 130 60','95 55 55 110 130 80','90 65 65 110 130 65']},
    {q: 'ドヒドイデ', c:['50 63 152 53 142 35','60 63 142 63 142 30','50 63 147 58 147 35']},
    {q: 'エースバーン', c:['80 116 75 65 75 119','70 116 70 65 70 119','80 116 80 55 80 119']},
    {q: 'カバルドン', c:['108 112 118 68 72 47','108 112 108 58 77 42','108 112 118 58 72 42']},
    {q: 'パッチラゴン', c:['90 100 90 80 70 75','90 110 90 80 70 60','90 120 90 70 70 65']},
    {q: 'リザードン', c:['78 84 78 109 85 100','88 84 78 119 75 100','83 88 78 114 80 100']},
    {q: 'パルシェン', c:['50 95 180 85 45 70','60 90 180 80 50 60','60 95 180 85 45 60']},
    {q: 'ヌオー', c:['95 85 85 65 65 35','105 85 95 55 55 45','95 75 85 55 65 35']},
    {q: 'カビゴン', c:['160 110 65 65 110 30','150 110 75 75 110 35','140 110 75 75 100 30']},
    {q: 'ナットレイ', c:['74 94 131 54 116 20','84 94 131 64 116 20','84 94 131 54 106 20']},
    {q: 'トリトドン', c:['111 83 68 92 82 39','111 73 78 82 92 39','111 63 78 92 92 39']},
    {q: 'ラプラス', c:['130 85 80 85 95 60','135 70 80 85 105 50','130 80 85 95 95 50']},
    {q: 'ウオノラゴン', c:['90 90 100 70 80 75','90 100 90 70 70 75','90 90 110 60 80 70']},
    {q: 'アイアント', c:['58 109 112 48 48 109','68 109 112 43 43 109','58 119 112 58 58 109']},
    {q: 'ジュラルドン', c:['70 95 115 120 50 85','80 85 115 130 60 75','70 85 115 130 50 65']},
    {q: 'サニーゴ（ガラル）', c:['60 55 100 65 100 30','65 55 95 65 95 35','50 55 110 60 110 30']},
  ]);
  // 今何門目かを把握するもの
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  

  // フィッシャーイェーツ〜〜
  function shuffle(arr) {
    let i = arr.length - 1;
    for (let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j],arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score ++ ;
    }else {
      li.classList.add('wrong');
      // alert(quizSet[currentNum].c[0]);
      answer.innerHTML = quizSet[currentNum].q +"の種族値は... " + quizSet[currentNum].c[0] +" です";
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

// choicesの最初の要素が有る限り最初の要素を消す
// 最初の要素とは今表示されている問題
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

  // ...[]で配列のコピーを作り、大元の配列をいじることなくシャッフルされた配列が作られる
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      // if(quizSet.length < 2) break;
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    if(currentNum === 6){
      btn.textContent = 'Show score';
    }
  }

    setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled')
    if(currentNum === 6){
      scoreLabel.textContent = `スコア:${score} / 7`
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
    }
    answer.innerHTML = "";
    questionCount.innerHTML = currentNum + 1 +"問目";
  });
}
