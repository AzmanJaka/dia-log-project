$(function () {
    var startDate = new Date('1985-01-01'),
        endDate = new Date('1995-01-01');
    $('#from-datepicker').datetimepicker({
        //other option
        startDate: startDate, //set start date
        endDate: endDate //set end date
    });
});