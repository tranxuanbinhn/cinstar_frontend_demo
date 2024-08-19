export const getDateFromDate= (value) => {
    if(value === null)
    {
        return null;
    }
    else{


    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}`;
}

}

export const getDayOfWeekFromDate= (value) => {
    const date = new Date(value);
    const dayofweek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
    const day = dayofweek[date.getDay()];
    return day;
    
}
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND' }).format(value);
}
export const getTimeFromTime = (value) => {
    if(value!=null)
    {
        const time = value.split(":");
        return time[0]+':'+time[1]
    }
    return null;
   
}