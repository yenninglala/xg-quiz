/* ─────────────────────────────────────
   main.js — entry point, wires buttons
   Must load LAST (after all other JS)
───────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // Boot the quiz
  Quiz.init();

  // Share buttons
  document.getElementById('btn-line').addEventListener('click',    () => Share.toLine());
  document.getElementById('btn-copy').addEventListener('click',    () => Share.copyLink());
  document.getElementById('btn-dl').addEventListener('click',      () => Share.downloadCard());
  document.getElementById('btn-restart').addEventListener('click', () => Quiz.restart());

});
