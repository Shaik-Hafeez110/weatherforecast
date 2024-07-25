
module.exports.getDate = getDate;

function getDate(){
var today = new Date();
var options={
  weekday:"long",
  day:"numeric",
  month:"long"
};

var date=today.toLocaleDateString("en-Us",options);
return date;
}

module.exports.getDay = getDay;

function getDay(){
var today = new Date();
var options={
  weekday:"long"
};
var day=today.toLocaleDateString("en-Us",options);
return day;
}
