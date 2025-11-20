// we will add our JavaScript in this file like in the classes
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const inner = card.querySelector('.flip-card-inner');
    inner.classList.add('flipped');
  });

  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.flip-card-inner');
    inner.classList.remove('flipped');
  });
});