const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// add box for copy-pasting user list
setInterval(() => {
  if ($('.ts-add-members-header').length == 0)
    return;
  if ($('#refined-bulk-add-team-members-form').length != 0)
    return;

  addFormBulkAddTeamMembers();
}, 1000);

function guestIsAllowed() {
  const guestAccessSettingsService = window.angular.element(document.body).injector().get('guestAccessSettingsService')
  return guestAccessSettingsService.isGuestAccessEnabled();
}

function addFormBulkAddTeamMembers() {
  const guestInvitationMessage = guestIsAllowed() ? '<p>You\'re not allowed to invite guests</p>' : ''

  const html = `
  <div id="refined-bulk-add-team-members-form">` + guestInvitationMessage + `
  <textarea placeholder="alice@acme.com ; bob@acme.com ;"></textarea>
  <input class="ts-btn ts-btn-fluent ts-btn-fluent-primary" type="submit" value="Bulk import">
  <small>Bulk import provided by browser extension: "Refined Microsoft Teams"</small>
  <div class="msgs"></div>
  </div>
  `;
  $(html).insertAfter('.ts-add-members-header');
  $('#refined-bulk-add-team-members-form input').click(onSubmitRefinedBulkAddTeamMembersForm);
}

function onSubmitRefinedBulkAddTeamMembersForm() {
  const value = $('#refined-bulk-add-team-members-form textarea').val();
  const emails = value
    .replace('\n', ';')
    .split(';')
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
  $('#refined-bulk-add-team-members-form textarea').val('');
  addMembersToTeam(emails);
}

function addMsg(msg) {
  $('#refined-bulk-add-team-members-form .msgs').prepend('<p>' + msg + '</p>');
}

function getMemberFromTenant(email) {
  const peopleService = window.angular.element(document.body).injector().get('peopleService');

  return peopleService.searchPeopleOnServer(email)
    .then((res) => {
      if (!!res && !!res.results && res.results.length > 0)
        return res.results[0];
      addMsg('User not found: ' + email);
      return null;
    })
    .catch((err) => null);
}

function inviteGuestToTenant(email) {
  const teamMembershipService = window.angular.element(document.body).injector().get('teamMembershipService');
  const channelService = window.angular.element(document.body).injector().get('channelService');
  const currentTeam = channelService.getCurrentTeamAndChannel().team;

  return teamMembershipService.inviteUserToTeam(email, email, currentTeam, 'Guest')
    .then((res) => {
      if (res['invitedMember'] == null)
        throw 'Failed to invite user';
      addMsg('Invited guest to team: ' + email);
      return res['invitedMember'];
    })
    .catch((err) => () => {
      addMsg('Failed to invite guest: ' + email);
      return null;
    });
}

function isEmailPartOfTenant(email) {
  const tenantService = window.angular.element(document.body).injector().get('tenantService');
  return tenantService.isEmailPartOfTenant(email).catch(() => false);
}

function addMembersToTeam(emails) {
  const channelService = window.angular.element(document.body).injector().get('channelService');
  const teamMembershipService = window.angular.element(document.body).injector().get('teamMembershipService');

  const currentTeam = channelService.getCurrentTeamAndChannel().team;

  addMsg('Please wait...');

  const getMembers = emails.map((email, i) => {
    return delay(i * 100)
      .then(() => isEmailPartOfTenant(email))
      .then((isInTenant) => {
        if (isInTenant)
          return getMemberFromTenant(email);
        return inviteGuestToTenant(email);
      })
  });


  Promise.all(getMembers)
    .then((members) => members.filter((m) => m != null))
    .then((members) => {
      return teamMembershipService.addTeamUsers(currentTeam, members);
    })
    .then((res) => {
      if (res.addedMembers == null)
        res.addedMembers == [];
      addMsg('Added ' + res.addedMembers.length + ' users from organisation.');
    })
    .catch((err) => {
      addMsg('Error: ' + err);
    });
}

// debug
function getMethods(obj) {
  var res = [];
  for (var m in obj) {
    if (typeof obj[m] == 'function') {
      res.push(m)
    }
  }
  return res;
}