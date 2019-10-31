# Chrome Extension

## Test Chrome Extension

To test, go to: chrome://extensions, enable Developer mode and load app as an unpacked extension.

Need more information about Chrome Extension? Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html)

## Contribute

### Build

```bash
gulp build
```

```bash
# equals to 'gulp build' + compression
gulp package
```

```bash
nodemon -i dist/ -i app/scripts --exec gulp build
```

### Release

```
rm -rf dist
rm -f refined-microsoft-teams.zip
gulp package
cd dist/
zip -r ../refined-microsoft-teams.zip *
```

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)