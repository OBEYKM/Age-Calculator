
$('.divider > div').click(function (e) { 
    e.preventDefault();
    // console.log('clicked!');

    let data = [];

    data['day'] = $('#day').val();
    data['month'] = $('#month').val();
    data['year'] = $('#year').val();

    if (validate(data)) {
        console.log('lllllllllllvalide date....')

        const diffDate =  getDiffDate(data); 
        console.log($('.results > div:first-child > span').text(diffDate['year']));
        console.log($('.results > div:nth-child(2) > span').text(diffDate["month"]));
        console.log($('.results > div:nth-child(3) > span').text(diffDate['days']));

    }
});

const getDiffDate = (data)=>{

    let formatDate = data['year'] + '-' + data['month'] + '-' + data['day'];
    // console.log('date format : ' +formatDate);

    var userDate = new Date(formatDate);
    var currentDate = new Date();

// Calculate the difference in milliseconds
var differenceInMilliseconds = currentDate.getTime() - userDate.getTime();

var diffDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

// Extract the year, month, and day components
var diffYears = Math.floor(diffDays / 365);
var diffMonths = Math.floor((diffDays % 365) / 30);
var diffRemainingDays = (diffDays % 365) % 30;


// console.log("date :"+diffYears+"-"+diffMonths+"-"+diffRemainingDays+"");  // Output: 10

return {
    'year' : diffYears,
    'month' : diffMonths,
    'days' : diffRemainingDays
};

}

// console.log($('.inputs > div:first-child > label'));

const validate = (data)=>{

    resetCss();

    let valid = true;

    // ==================== null verification ========================
    valid = nullVerification(data);
    console.log('valid null : '+nullVerification(data));
    // ==================  day , month and year validation ================= 
    if (valid) {
        valid = validDataVerification(data);
        console.log('valid data : '+validDataVerification(data));
    }
    
    // ====================== date validation ============================
    if (valid) {
        valid = dateValidation(data);
        // console.log('valid data : '+vdateValidation(data));
    }

    return valid;
}

const dateValidation = (data) =>{

    let formatDate = data['year'] + '-' + data['month'] + '-' + data['day'];
    console.log('date format : ' +formatDate);

    var date = new Date(formatDate);
    isValid =  ( date.getFullYear() == data['year'] &&
    date.getMonth() == data['month'] - 1 &&
    date.getDate() == data['day']);
    
    console.log("Valid date : "+date);

    if (!isValid) {
        dateError('must be a valid date');
        return false;
    }else{
        return true;
    }

}

const validDataVerification = (data)=>{

    let valid = true;

    if (parseInt(data['day'])>31 || parseInt(data['day'])<1 ) {
        valid = false;
        dayError("must be a valid day");
    }

    if (parseInt(data['month']) > 12 || parseInt(data['month']) <1 ) {
        valid = false;
        monthError('must be a valid month');
    }

    // console.log(new Date().getFullYear());

    if (parseInt(data['year']) > parseInt( new Date().getFullYear()) ) {
        valid = false;
        yearError('must be in the past');
    }
    
    return valid;
}

const nullVerification = (data)=>{
    let valid = true;
    if (data['day']==''){
        valid = false;
        dayError('input required');
    }

    if (data['month']==''){
        valid = false;
        monthError('input required')
    }

    if (data['year']==''){
        valid = false;
        yearError('input required')
    }

    return valid;
}

const resetCss = ()=>{

    $('.inputs > div:first-child > label').removeClass('invalid-label');
    $('#day').removeClass('invalid-input');
    $('.inputs > div > span').removeClass('invalid')[0];
    $('.inputs > div:first-child > span').text('');


    $('.inputs > div:nth-child(2) > label').removeClass('invalid-label');
    $('#month').removeClass('invalid-input');
    $('.inputs > div > span').removeClass('invalid')[1];
    $('.inputs > div:nth-child(2) > span').text('');

    $('.inputs > div:nth-child(3) > label').removeClass('invalid-label');
    $('#year').removeClass('invalid-input');
    $('.inputs > div > span').removeClass('invalid')[1];
    $('.inputs > div:nth-child(3) > span').text('');

}

const dayError = (message)=>{
    $('.inputs > div:first-child > label').addClass('invalid-label');
    $('#day').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[0];
    $('.inputs > div:first-child > span').text(message);
    resetResult();
    
    setTimeout(()=>{
        resetCss();
    },2000);
    // $('.results > div:nth-child(3) > span').text('--');
}

const monthError = (message)=>{
    $('.inputs > div:nth-child(2) > label').addClass('invalid-label');
    $('#month').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[1];
    $('.inputs > div:nth-child(2) > span').text(message);
    resetResult();
    setTimeout(()=>{
        resetCss();
    },2000);
    // $('.results > div:nth-child(2) > span').text('--')
}

const yearError = (message)=>{
    $('.inputs > div:nth-child(3) > label').addClass('invalid-label');
    $('#year').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[1];
    $('.inputs > div:nth-child(3) > span').text(message);
    resetResult();
    setTimeout(()=>{
        resetCss();
    },2000);
    // $('.results > div:nth-child(1) > span').text('--');
}

const dateError = (message)=>{
    $('.inputs > div:first-child > label').addClass('invalid-label');
    $('#day').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[0];
    $('.inputs > div:first-child > span').text(message);

    $('.inputs > div:nth-child(2) > label').addClass('invalid-label');
    $('#month').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[1];

    $('.inputs > div:nth-child(3) > label').addClass('invalid-label');
    $('#year').addClass('invalid-input');
    $('.inputs > div > span').addClass('invalid')[1];

    resetResult();
    setTimeout(()=>{
        resetCss();
    },2000);
}

const resetResult = ()=>{
    $('.results > div:nth-child(1) > span').text('--')
    $('.results > div:nth-child(2) > span').text('--')
    $('.results > div:nth-child(3) > span').text('--')
}

