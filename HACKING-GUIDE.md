
# Hacking guide

1- Open Teams in Chrome.
2- Open the Chrome debugger console.
3- Refresh page
4- In the "Network" tab, search *-app.min.*.js JS files and copy them into /tmp
5- Uncompile those files with `js-beautify /tmp/app.min.1.js > /tmp/app.1.js`
6- Open those files into your IDE ;)
