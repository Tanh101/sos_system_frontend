const formatDate = (date) => {
    if (!date) return;
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

const formatHHmm = (date) => {
    if (!date) return;
    const d = new Date(date);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = d.toLocaleTimeString('en-GB', options);
    return formattedTime;
}

export {
    formatDate,
    formatHHmm,
};
