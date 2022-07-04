module.exports = (changes, options) =>
    (changes || []).some(change =>
        change.what.some(
            what => ['css', 'js'].includes(what.toLowerCase())
        )
    )
    ? options.fn(this)
    : options.inverse(this);
