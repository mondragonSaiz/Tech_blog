// active class handler for card tabs
const cardTabs = document.querySelectorAll('.nav-link');
cardTabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    cardTabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    event.target.classList.add('active');
  });
});
