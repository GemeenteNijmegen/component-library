module.exports = dateString => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${date.getFullYear()}-${month}`;
};
