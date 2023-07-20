console.log('IN DASHBOARD');
const addPostMainDashboardBTN = document.querySelector('#addPost');

addPostMainDashboardBTN.addEventListener('click', () => {
  const titleInput = document.querySelector('#postTitleInput');
  const contentInput = document.querySelector('#postContentInput');
  titleInput.value = '';
  contentInput.value = '';
  if (
    titleInput.classList.contains('is-invalid') &&
    contentInput.classList.contains('is-invalid')
  ) {
    titleInput.classList.remove('is-invalid');
    contentInput.classList.remove('is-invalid');
  } else if (titleInput.classList.contains('is-invalid')) {
    titleInput.classList.remove('is-invalid');
  } else if (contentInput.classList.contains('is-invalid')) {
    contentInput.classList.remove('is-invalid');
  }
});
const addPostBTN = document.querySelector('#addPostSubmit');

addPostBTN.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('ADD POST TRIGERRED');
  const title = document.querySelector('#postTitleInput').value.trim();
  const content = document.querySelector('#postContentInput').value.trim();
  if (title && content) {
    console.log('POST CONTENT', content);
    const response = await fetch('/api/user/addPost', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('There was an error while creating your post');
    }
  } else if (
    (title === '' && content === '') ||
    (title === null && content === null)
  ) {
    document.querySelector('#postTitleInput').classList.add('is-invalid');
    document.querySelector('#postContentInput').classList.add('is-invalid');
  } else if (title === '' || title === null) {
    document.querySelector('#postTitleInput').classList.add('is-invalid');
  } else if (content === '' || content === null) {
    document.querySelector('#postContentInput').classList.add('is-invalid');
  }
});

const deletePostBTN = document.querySelectorAll('.deletePost-btn');

const delButtonHandler = async (event) => {
  console.log('delete');
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/user/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete project');
    }
  }
};

deletePostBTN.forEach((element) => {
  element.addEventListener('click', delButtonHandler);
});

const updatePostHandler = async (event) => {
  event.preventDefault();
  console.log(' 1.- updating...');
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const updatePostSubmitBTN = document.querySelector('#updatePostSubmit');
    updatePostSubmitBTN.addEventListener('click', async (event) => {
      event.preventDefault();
      console.log(' 2.- updating...');
      const title = document
        .querySelector('#updatePostTitleInput')
        .value.trim();
      const content = document
        .querySelector('#updatePostContentInput')
        .value.trim();
      console.log('update post title : ', title);
      console.log('update post content : ', content);
      const response = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update post');
      }
    });
  }
};

const updatePostBTN = document.querySelectorAll('.updatePost-btn');
updatePostBTN.forEach((element) => {
  element.addEventListener('click', updatePostHandler);
});
