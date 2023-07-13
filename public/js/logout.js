const logout = async () => {
  console.log('click logout logout.js');
  const response = await fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    console.log('response ok');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout-btn').addEventListener('click', logout);
