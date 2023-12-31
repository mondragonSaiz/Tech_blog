const addCommentBTNModal = document.querySelectorAll('.addComentBtn-modal');

const addCommentBTN = document.querySelector('#addCommentSubmit');

addCommentBTNModal.forEach((element) => {
  element.addEventListener('click', async (event) => {
    event.preventDefault();
    if (
      document
        .querySelector('#addCommentInput')
        .classList.contains('is-invalid')
    ) {
      document.querySelector('#addCommentInput').classList.remove('is-invalid');
    }

    if (event.target.hasAttribute('data-id')) {
      //console.log('holi');
      const post_id = event.target.getAttribute('data-id');

      addCommentBTN.addEventListener('click', async (event) => {
        event.preventDefault();

        const commentInput = document
          .querySelector('#addCommentInput')
          .value.trim();
        if (commentInput) {
          const content = commentInput;

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
        } else if (commentInput === '' || commentInput === null) {
          document
            .querySelector('#addCommentInput')
            .classList.add('is-invalid');
          return;
        }
      });
    }
  });
});
