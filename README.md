## pipe(line)

For laying pipelines. Built on [repipe](https://github.com/lukeburns/repipe).

### Usage
```
var line = pipeline(cipher, decipher, process.stdout);
fs.createReadStream('README.md').pipe(line);
```
becomes
```
fs.createReadStream('README.md').pipe(cipher).pipe(decipher).pipe(process.stdout)
```

### Installation
```
npm install through2-pipeline
```
