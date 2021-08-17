export const formatDate = (date) => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const modifiedDate = new Date(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const modifiedDateMonth = modifiedDate.getMonth();
    const modifiedDateMonthName = monthNames[modifiedDateMonth];
    const modifiedDateDay = modifiedDate.getDate();
    const modifiedDateHours = modifiedDate.getHours();
    const modifiedDateMinutes = modifiedDate.getMinutes();

    if (todayMonth === modifiedDateMonth && todayDay === modifiedDateDay) {
        return modifiedDateHours + ':' + modifiedDateMinutes;
    }
    return modifiedDateDay + ' ' + modifiedDateMonthName;
}