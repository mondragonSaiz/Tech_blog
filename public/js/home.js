const signUpBTN = document.querySelector('#signUpSubmit');

signUpBTN.addEventListener('click', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#signupInputUserName').value.trim();
  const email = document.querySelector('#signupInputEmail').value.trim();
  const password = document.querySelector('#signupInputPassword').value.trim();
  const confirmPassword = document
    .querySelector('#signupInputConfirmPassword')
    .value.trim();

  if (username && email && password && password === confirmPassword) {
    const response = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/user');
    } else {
      alert('Bad Response : SignUp Failed');
    }
  } else {
    alert('Please double check your password!');
  }
});

const loginBTN = document.querySelector('#loginSubmit');

loginBTN.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#loginInputEmail').value.trim();
  const password = document.querySelector('#loginInputPassword').value.trim();

  if (email && password) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/user');
    } else {
      alert('Failed to log in');
    }
  } else {
    alert('Please enter your email and password');
    return;
  }
});
