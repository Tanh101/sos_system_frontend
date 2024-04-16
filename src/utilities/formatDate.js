const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export {
    formatDate,
};
