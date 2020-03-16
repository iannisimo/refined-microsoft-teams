const twoColumnsCheckbox = document.getElementById('2-columns-enabled');

function onSave() {
  const enabled = twoColumnsCheckbox.checked;
  localStorage.setItem('2-columns-enabled', enabled ? 'yes' : 'no');
}

document.getElementById('submit').addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();

  onSave();
});

// default values
if (localStorage.getItem('2-columns-enabled') != 'no')
  twoColumnsCheckbox.checked = true;