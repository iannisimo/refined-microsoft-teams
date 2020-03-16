
# Hacking guide

## Get readable AngularJS code

1- Open Teams in Chrome.
2- Open the Chrome debugger console.
3- Refresh page
4- In the "Network" tab, search *-app.min.*.js JS files and copy them into /tmp
5- Uncompile those files with `js-beautify /tmp/app.min.1.js > /tmp/app.1.js`
6- Open those files into your IDE ;)

## Start hacking

A good start is to look for AngularJS services into this large code base. Example: search for "teamspace.teamMembershipService".

AngularJS services can be called in this way:

```js
const peopleService = window.angular.element(document.body).injector().get('peopleService');
peopleService.searchPeopleOnServer(email);

// attributes available into peopleService:
console.log(peopleService);
// functions available into peopleService:
console.log(peopleService.prototype);
```
