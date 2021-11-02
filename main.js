// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show, updateResultScreen, createButtons } from './lib/ui.js';
import { computerPlay, checkGame } from './lib/rock-paper-scissors.js';

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound = 1;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

let totalGames = 1;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

show('start');

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  let computer = computerPlay();
  let result = checkGame(player, computer);
  if(result === 1) {
    playerWins++;
  }
  if(result === -1) {
    computerWins++;
  }

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer: computer.toString(),
    result: result,
    currentRound: currentRound,
    totalRounds: totalRounds,
    playerWins: playerWins,
    computerWins: computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if(result !== 0){
    currentRound++;
  }

  // Ákveðum hvaða takka skuli sýna
  const nextRound = document.querySelector('button.nextRound');
  const finishGame = document.querySelector('button.finishGame');
  nextRound.classList.add('hidden');
  finishGame.classList.add('hidden');
  if((playerWins < Math.ceil(totalRounds/2)) && (computerWins < Math.ceil(totalRounds/2))) {
    nextRound.classList.remove('hidden');
  } else {
    finishGame.classList.remove('hidden');
  }

  // Sýnum niðurstöðuskjá
  show('result');
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
export function round(e) {
  totalRounds = parseInt(e.target.textContent);
  show('play');
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
createButtons(MAX_BEST_OF, round);

// Event listeners fyrir skæri, blað, steinn takka
// TODO
document
  .querySelector('button.scissor')
  .addEventListener('click', () => playRound('1'));

document
  .querySelector('button.paper')
  .addEventListener('click', () => playRound('2'));

document
  .querySelector('button.rock')
  .addEventListener('click', () => playRound('3'));

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  // Bætum við nýjasta leik
  let win = false;
  if(playerWins > computerWins){
    win = true;
    totalWins++;
  }

  games.push({player: playerWins, computer: computerWins, win: win,})

  // Uppfærum stöðu
  const gamesPlayed = document.querySelector('.games__played');
  gamesPlayed.textContent = `${totalGames}`;

  const gamesWins = document.querySelector('.games__wins');
  gamesWins.textContent = `${totalWins}`;
  
  const gamesWinratio = document.querySelector('.games__winratio');
  gamesWinratio.textContent = `${(totalWins/totalGames*100).toFixed(2)}`;

  const gamesLosses = document.querySelector('.games__losses');
  gamesLosses.textContent = `${totalGames - totalWins}`

  const gamesLossratio = document.querySelector('.games__lossratio');
  gamesLossratio.textContent = `${((totalGames - totalWins)/totalGames*100).toFixed(2)}`;

  // Bætum leik við lista af spiluðum leikjum
  let newGameoList = document.querySelector('.games__list');
  let newGameList = document.createElement('li');
  if(win) {
    newGameList.innerHTML = `Þú vannst ${games[totalGames - 1].player}-${games[totalGames - 1].computer}`;
  } else {
    newGameList.innerHTML = `Tölva vann ${games[totalGames - 1].player}-${games[totalGames - 1].computer}`;
  }
  newGameoList.appendChild(newGameList);

  // Núllstillum breytur
  currentRound = 1;
  playerWins = 0;
  computerWins = 0;
  totalGames++;

  // Byrjum nýjan leik!
  show('start');
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
// TODO takki sem fer með í næstu umferð
document
  .querySelector('button.nextRound')
  .addEventListener('click', () => show('play'));
