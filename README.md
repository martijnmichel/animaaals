# animaaals

Create animal avatars by seed!

## How to use

```html
<img id="animal" />
```

```js
import Animal from "animaaals";
const avatar = new Animal();
const base64 = avatar.create();
document.querySelector("#animal").src = base64;
```
