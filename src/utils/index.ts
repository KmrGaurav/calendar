export const getDateNumber = (date: Date) => {
    return Number(
        date.getFullYear().toString() +
            date.getMonth().toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0')
    );
};

export const getDateString = (date: string) => {
    const dateString = date.toString();
    return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
};
