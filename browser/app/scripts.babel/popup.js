const twoColumnsCheckbox = document.getElementById('2-columns-enabled');
const submitBtn = document.getElementById('submit');
const msg = document.getElementById('msg');

function onSave() {
  const enabled = twoColumnsCheckbox.checked;
  localStorage.setItem('2-columns-enabled', enabled ? 'yes' : 'no');
  msg.innerHTML = 'Please reload Teams page';
}

if (!!submitBtn)
  submitBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();

    onSave();
  });

// default values
if (localStorage.getItem('2-columns-enabled') != 'no')
  twoColumnsCheckbox.checked = true;