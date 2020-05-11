document.addEventListener('DOMContentLoaded', () => {

  const twoColumnsCheckbox = document.getElementById('2-columns-enabled');
  const submitBtn = document.querySelector('button');
  const msg = document.getElementById('msg');

  function onSave() {
    const enabled = twoColumnsCheckbox.checked;
    localStorage.setItem('2-columns-enabled', enabled ? 'yes' : 'no');
    msg.innerHTML = 'Please reload Teams page';
  }

  if (!!submitBtn)
    submitBtn.addEventListener('click', onSave);

  // default values
  twoColumnsCheckbox.checked = localStorage.getItem('2-columns-enabled') != 'no';
});