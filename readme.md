```
npm install --save rework-image-set-plus
```

## Usage

```javascript
var fs = require('fs')
var rework = require('rework')
var imageSet = require('rework-image-set-plus')

var css = fs.readFileSync('css/my-file.css', 'utf8').toString()
var out = rework(css).use(imageSet()).toString()
```

### Input

```css
.bg-img {
  background-image: image-set(url('my-img.png') 4x);
}
```

### Output

```css
.bg-img {
  background-image: url('my-img@1x.png');
  background-image: image-set(url('my-img@1x.png') 1x,url('my-img@2x.png') 2x, url('my-img@3x.png') 3x, url('my-img.png') 4x);
}
```
