// // add box for copy-pasting user list
// setInterval(() => {
//   if (document.querySelectorAll('#multitenant-panel').length > 0)
//     return;

//   loadMultitenantBar();
// }, 1000);

// function loadMultitenantBar() {
//   return;

//   const tenantService = window.angular.element(document.body).injector().get('tenantService');
//   tenantService.getTenants()
//     .then((res) => {
//       const urls = res.map((t) => `<li><a href="https://teams.microsoft.com/_?tenantId=${t.tenantId}">${t.tenantName}</a></li>`);
//       const html = `
//         <nav id="multitenant-panel">
//             <ul>${urls}</ul>
//         </nav>
//         `;
//       $(html).insertBefore('app-bar');
//     });
// }