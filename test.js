var test = require("tap").test,
		fs = require('fs'),
		through = require('through2'),
		pipeline = require('./');

test("pipeline equivalence test", function (t) {
	t.plan(1);

	var hello = str('Hello lovely world'),
			output1 = [], output2 = [];

	/**
	 * Pipeline
	 **/

	var crypto1 = require('crypto').createCipher('aes-256-cbc', 'password');
	crypto1.name = 'crypto1';
	var gzip1 = require('zlib').createGzip();
	gzip1.name = 'gzip1';

	var line = pipeline(crypto1, gzip1);
	hello.pipe(line)
	.on('data', function (chunk) {
		output1.push(chunk.toString());
	})

	/**
	 * Control
	 **/

	var crypto2 = require('crypto').createCipher('aes-256-cbc', 'password');
	var gzip2 = require('zlib').createGzip();

	hello.pipe(crypto2).pipe(gzip2)
	.on('data', function (chunk) {
		output2.push(chunk.toString());
	}).on('end', function() {
			t.deepEqual(output1, output2);
	})
});

function str(data) {
	var input = through();
	input.write(data);
	input.end();
	return input;
}

// REMOVED: use through2-pass
// test("pass through non-readable streams in the pipeline", function (t) {
// 	t.plan(1);

// 	var line = pipeline(null, [through()], fs.createWriteStream('test.md'));
// 	fs.createReadStream('README.md').pipe(line).pipe(handle(function (data) {
// 		var contents = fs.readFileSync('test.md', 'utf8');
// 		t.equal(contents, data);
// 		fs.unlinkSync('test.md');
// 	}));
// });

// function handle(callback) {
// 	var all = [];
// 	var stream = through();
// 	stream
// 	.on('data', function(data) { 
// 		all.push(data); 
// 	})
// 	.on('end', function() { 
// 		callback(all.join('').toString());
// 	});
// 	return stream;
// }