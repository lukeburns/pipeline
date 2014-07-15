## pipe(line)

For laying pipelines. Built on [repipe](https://github.com/lukeburns/repipe).

```
var line = pipeline(cipher, decipher, process.stdout);
fs.createReadStream('README.md').pipe(line);
```
becomes
```
fs.createReadStream('README.md').pipe(cipher).pipe(decipher).pipe(process.stdout)
```