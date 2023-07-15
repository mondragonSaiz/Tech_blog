console.log('IN DASHBOARD');

const addPostBTN = document.querySelector('#addPostSubmit');

addPostBTN.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('ADD POST TRIGERRED');
  const content = document.querySelector('#postContentInput').value.trim();
  console.log('POST CONTENT', content);
  const response = await fetch('/api/user/addPost', {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('There was an error while creating your post');
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
