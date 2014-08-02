var Stream = require('stream'),
		through = require('through2'),
		repipe = require('through2-repipe');

module.exports = pipeline;

function pipeline () {
	var streams = pipeline.prepare.apply(null, arguments);

  if(streams.length == 0) return through();
  if(streams.length > 1) streams.push(repipe(streams[0], streams[streams.length - 1]));

	return streams.reduce(function (previous, current) {
    return previous.pipe(current);
  });
}

pipeline.prepare = function () {
  return Array.prototype.concat.apply([], arguments).filter(function (stream) {
    return Boolean(stream) && Boolean(stream.pipe);
  });
}