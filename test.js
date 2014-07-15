var test = require("tap").test,
		through = require('through2'),
		pipeline = require('./');

test("pipeline equivalence test", function (t) {
	t.plan(1);

	var hello = str('Hello lovely world'),
			output1 = [], output2 = [], done = false;

	/**
	 * Repiped pipeline
	 **/

	var crypto1 = require('crypto').createCipher('aes-256-cbc', 'password');
	var gzip1 = require('zlib').createGzip();

	var line = pipeline(crypto1, gzip1);
	hello.pipe(line)
	.on('data', function (chunk) {
		output1.push(chunk.toString());
	})
	.on('end', function() {
		done = true;
	})

	/**
	 * Control pipeline
	 **/

	var crypto2 = require('crypto').createCipher('aes-256-cbc', 'password');
	var gzip2 = require('zlib').createGzip();

	hello.pipe(crypto2).pipe(gzip2)
	.on('data', function (chunk) {
		output2.push(chunk.toString());
	}).on('end', function() {
		if(done) {
			t.deepEqual(output1, output2);
		}
	})
})

function str(data) {
	var input = through();
	input.write(data);
	input.end();
	return input;
}
