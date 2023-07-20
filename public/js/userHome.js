// active class handler for card tabs

console.log('In user home');
// const cardTabs = document.querySelectorAll('.nav-link');
// cardTabs.forEach((tab) => {
//   tab.addEventListener('click', (event) => {
//     cardTabs.forEach((tab) => {
//       tab.classList.remove('active');
//     });
//     event.target.classList.add('active');
//   });
// });

const addCommentBTNModal = document.querySelectorAll('.addComentBtn-modal');

const addCommentBTN = document.querySelector('#addCommentSubmit');

addCommentBTNModal.forEach((element) => {
  console.log('1.- addComentModal trigerred');
  element.addEventListener('click', async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
      //console.log('holi');
      const post_id = event.target.getAttribute('data-id');
      console.log('2.-This is the post-id', post_id);

      addCommentBTN.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('3.- click');
        const content = document.querySelector('#addCommentInput').value.trim();
        console.log('Your comment : ', content);
        const response = await fetch('/api/user/addComment', {
          method: 'POST',
          body: JSON.stringify({ content, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.reload();
        } else {
          alert('There was an error while uploading with your comment');
        }
        // console.log('TARGET :', event.target);

        // if (event.target.hasAttribute('data-id')) {
        //   const post_id = event.target.getAttribute('data-id');
        //   console.log('POST ID : ', post_id);

        // }
      });
    }
  });
});
// const addCommentHandler = async (event) => {
//   event.PreventDefault();
//   console.log('addComment triggered');
// };

// addCommentBTN.forEach((element) => {
//   element.addEventListener('click', addCommentHandler);
// });
