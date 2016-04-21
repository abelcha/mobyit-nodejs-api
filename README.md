# Mobyt sms api
Send SMS with mobyt api
### Installation

```sh
npm install mobyt --save
```

### Usage

```js
var mobyt = require('mobyt')

var mobyt = new Mobyt("user", "password", "my-company");

mobyt.send({
  text:'this is a message',
  to:'+33612345667'
}).then(function(resp) {
    console.log('OK', resp);
}, function(err) {
    console.log('ERR', err);
})

```


License
----

MIT


**Free Software FTW**
