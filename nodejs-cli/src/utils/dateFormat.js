
const { format, isToday, isYesterday, isTomorrow, parseISO } = require('date-fns');

const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    if (isToday(date)) {
        return `Today, ${format(date, 'hh:mm a')}`;
    } else if (isYesterday(date)) {
        return `Yesterday, ${format(date, 'hh:mm a')}`;
    } else if (isTomorrow(date)) {
        return `Tomorrow, ${format(date, 'hh:mm a')}`;
    } else {
        return format(date, 'dd MMM yyyy, hh:mm a');
    }
};

module.exports = {
    formatDate
};