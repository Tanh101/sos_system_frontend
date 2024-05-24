const formatDate = (date) => {
    if (!date) return;
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export {
    formatDate,
};