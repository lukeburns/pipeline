## pipe(line)

For laying pipelines. Built on [repipe](https://github.com/lukeburns/repipe).

```
var line = pipeline(cipher, decipher);
fs.createReadStream('README.md').pipe(line).pipe(process.stdout);
```
becomes
```
fs.createReadStream('README.md').pipe(cipher).pipe(decipher).pipe(process.stdout)
```