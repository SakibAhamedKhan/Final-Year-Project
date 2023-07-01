function converttime({date}) {
     
    var dateFormat = new Date(date);
    console.log(dateFormat.toLocaleString());
    
    return ( <p className="text-sm text-gray-500 inline">
        {dateFormat.toLocaleString()}
    </p> );
}

export default converttime;