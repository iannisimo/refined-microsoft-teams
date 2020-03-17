# Chrome Extension

## Install from Chrome web store

[Go!](https://chrome.google.com/webstore/detail/refined-microsoft-teams/bipffdldhfhcecjhcgklheahpkocojfk)

## Install from Firefox web store

[Go!](https://addons.mozilla.org/en-US/firefox/addon/refined-microsoft-teams/)

## Test Chrome Extension

To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

Need more information about Chrome Extension? Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html)

## Contribute

## Hacking guide

[Here.](../HACKING-GUIDE.md)

### Build

Requires node <= 10.

```
npm install -g gulp gulp-cli
```

```bash
gulp watch
```

```bash
gulp build
```

```bash
gulp package
```

### Release

Increase version into manifest.json.

```
rm -rf dist package
rm -f refined-microsoft-teams.zip
gulp clean
gulp build
gulp package
```

Upload to Firefix Addon first, in order to pass check-list.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
