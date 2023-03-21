
// var Gym_Project = "";
$(document).ready(function () {
    sessionStorage.removeItem('trainer_data');
    sessionStorage.removeItem('gympayment');
  });
  

var trainer_list1 = '';
// //////////////////////////////////////////////  Login Page JS  ///////////////////////////////////////////////

function login_btn() {

    var login_email = document.getElementById('login_email').value;
    var login_password = document.getElementById('login_password').value;

    var email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if ((login_email == '') || (login_password == '') || email_pattern.test(login_email) == false
        || password_pattern.test(login_password) == false) {
        alert('Please fill up all the fields correctly');
    }
    else {
        alert('successfully');
        window.location.href = "\index.html";
    }
}

// //////////////////////////////////////////////  Signup Page JS  ///////////////////////////////////////////////

function signup_btn() {

    var signup_email = document.getElementById('signup_email').value;
    var signup_password = document.getElementById('signup_password').value;
    var signup_name = document.getElementById('signup_name').value;
    var signup_phone = document.getElementById('signup_phone').value;

    var email_pattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    var password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    var name_pattern = /[a-zA-Z][a-zA-Z ]+/;
    var phone_pattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;

    if ((signup_email == '') || (signup_password == '') || (signup_name == '') || (signup_phone == '') ||
        email_pattern.test(signup_email) == false || password_pattern.test(signup_password) == false || name_pattern.test(signup_name) == false ||
        phone_pattern.test(signup_phone) == false) {
        alert('Please fill up all the fields correctly');
    }
    else {
        alert('successfully');
        window.location.href = "\index.html";
    }
}

// ///////////////////////////////////// Forgot Page JS ////////////////////////////////////

function forgot_btn() {

    var forgot_email = document.getElementById('forgot_email').value;
    var email_pattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

    if ((forgot_email == '') || email_pattern.test(forgot_email) == false) {
        alert('Please fill up all the fields correctly');
    }
    else {
        alert('successfully');
        window.location.href = "\index.html";
    }

}

// ///////////////////////////////////////  Search button /////////////////////////////////////////////////////

function Seacrh() {
    const member_seacrh = document.getElementById('search').value;
    const Search_member = trainer_data.find(obj => obj.CNIC === member_seacrh);

    if (Search_member == undefined) {
        alert('Member not Found');
    }
    else if (Search_member.CNIC != '') {
        alert('Member Found');
    }
}


// //////////////////////////////////////////////  Trainer Page JS  //////////////////////////////////////

var trainer_data = [{
    id: '',
    email: '',
    number: '',
    CNIC: '',
    gender: '',
    experience: '',
}];

var id = 0;
function Trainer_data_submit() {
    trainer_email = document.getElementById('trainer_email').value;
    trainer_number = document.getElementById('trainer_number').value;
    trainer_CNIC = document.getElementById('trainer_CNIC').value;
    trainer_gender = document.getElementById('trainer_gender').value;
    trainer_experience = document.getElementById('trainer_experience').value;

    var phone_pattern = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    var email_pattern = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    var CNIC_pattern = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;

    id = id + 1;

    if ((trainer_email == '') || (trainer_number == '') || (trainer_CNIC == '') || (trainer_gender == '') ||
        (trainer_experience == '') || email_pattern.test(trainer_email) == false ||
        phone_pattern.test(trainer_number) == false || CNIC_pattern.test(trainer_CNIC) == false) {
        alert('Please fill up all the fields correctly');
    }
    else {
        if (sessionStorage.getItem('trainer_data') != null && sessionStorage.getItem('trainer_data') != undefined) {
            trainer_data = JSON.parse(sessionStorage.getItem('trainer_data'));
            // alert('session');
        }

        trainer_data.push({
            'id': id,
            'email': trainer_email, 'number': trainer_number,
            'CNIC': trainer_CNIC, 'gender': trainer_gender, 'experience': trainer_experience
        });

        sessionStorage.setItem('trainer_data', JSON.stringify(trainer_data));

        var trainer_list = '';

        for (var i = 1; i < trainer_data.length; i++) {

            var get_CNIC = trainer_data[i].CNIC;
            var get_Email = trainer_data[i].email;
            var get_Number = trainer_data[i].number;
            var get_Gender = trainer_data[i].gender;
            var get_Experience = trainer_data[i].experience;

            var Update = [get_Email, get_CNIC, get_Number, get_Gender, get_Experience];

            trainer_list += '<div class="row datadiv"><div class="col-1 title">' + i
                + '</div><div class="col-2 title">' + trainer_data[i].email + '</div><div class="col-2 title">'
                + trainer_data[i].number + '</div><div class="col-2 title">' + trainer_data[i].CNIC
                + '</div><div class="col-2 title">' + trainer_data[i].gender + '</div><div class="col-1 title">'
                + trainer_data[i].experience
                + '</div><div class="col-1 title"><button class=' + get_CNIC + ' onclick="remove_member(this)" style="background-color: red ; color:white;border: red;">Remove</button></div><div class="col-1 title"><button  data-toggle="modal" data-target="#exampleModal1" class=' + Update + ' onclick="update_member(this)" style="background-color: green ; color:white;border: green;">Update</button></div></div>'

        }
        document.getElementById('trainer_list').innerHTML = trainer_list;


        document.getElementById('trainer_email').value = '';
        document.getElementById('trainer_number').value = '';
        document.getElementById('trainer_CNIC').value = '';
        document.getElementById('trainer_gender').value = '';
        document.getElementById('trainer_experience').value = '';
    }
}

//  ////////////////////////////////////// Delete Member  ///////////////////////////////////////////////////

function remove_member(remove_member) {
    var CNIC = remove_member.className;
    trainer_data = trainer_data.filter(x => x.CNIC !== CNIC);
    sessionStorage.setItem('trainer_data', JSON.stringify(trainer_data));

    var trainer_list1 = '';
    for (var i = 1; i < trainer_data.length; i++) {

        var get_CNIC = trainer_data[i].CNIC;
        var get_Email = trainer_data[i].email;
        var get_Number = trainer_data[i].number;
        var get_Gender = trainer_data[i].gender;
        var get_Experience = trainer_data[i].experience;

        var Update = [get_Email, get_CNIC, get_Number, get_Gender, get_Experience];

        trainer_list1 += '<div class="row datadiv"><div class="col-1 title">' + i
            + '</div><div class="col-2 title">' + trainer_data[i].email + '</div><div class="col-2 title">'
            + trainer_data[i].number + '</div><div class="col-2 title">' + trainer_data[i].CNIC
            + '</div><div class="col-2 title">' + trainer_data[i].gender + '</div><div class="col-1 title">'
            + trainer_data[i].experience
            + '</div><div class="col-1 title"><button class=' + get_CNIC + ' onclick="remove_member(this)" style="background-color: red ; color:white;border: red;">Remove</button></div><div class="col-1 title"><button  data-toggle="modal" data-target="#exampleModal1" class=' + Update + '  onclick="update_member(this)" style="background-color: green ; color:white;border: green;">Update</button></div></div>'

    }
    document.getElementById('trainer_list').innerHTML = trainer_list1;
}

//  ////////////////////////////////////// Update Member  ///////////////////////////////////////////////////

var dummy_array = [];

function update_member(update_member) {
    var Get_current_Value = update_member.className;
    var length_of_array = Get_current_Value.length;

    var p = 0;
    var Concatenate = '';

    for (var i = 0; i < Get_current_Value.length; i++) {
        if (Get_current_Value[i] == ',') {
            dummy_array[p] = Concatenate;
            Concatenate = '';
            p++;
        }
        else {
            Concatenate = Concatenate + Get_current_Value[i];
        }
    }

    /////////////////    For last value becuase at the end there is no comma    /////////////////////////////////

    var f = 3;
    var Concatenate1 = '';

    for (var h = 0; h < 3; h++) {
        if (Get_current_Value[length_of_array - f] == '0' || Get_current_Value[length_of_array - f] == '1' ||
            Get_current_Value[length_of_array - f] == '2' || Get_current_Value[length_of_array - f] == '3' ||
            Get_current_Value[length_of_array - f] == '4' || Get_current_Value[length_of_array - f] == '5' ||
            Get_current_Value[length_of_array - f] == '6' || Get_current_Value[length_of_array - f] == '7' ||
            Get_current_Value[length_of_array - f] == '8' || Get_current_Value[length_of_array - f] == '9') {
            Concatenate1 = Concatenate1 + Get_current_Value[length_of_array - f];
            f--;
        }
        else {
            f--;
        }
    }

    var obj = JSON.parse(sessionStorage.getItem('trainer_data')).find(x => x.CNIC == dummy_array[1])
    var Email = obj.email;
    var CNIC = obj.CNIC;
    var Number = obj.number;
    var Gender = obj.gender;
    var Experience = obj.experience;

    document.getElementById('Utrainer_email').value = Email;
    document.getElementById('Utrainer_CNIC').value = CNIC;
    document.getElementById('Utrainer_number').value = Number;
    document.getElementById('Utrainer_gender').value = Gender;
    document.getElementById('Utrainer_experience').value = Experience;

}

///////////////////////////////////////////// Edit Member js /////////////////////////////////////////////////////

function Save_Updated_Data() {

    var Email = document.getElementById('Utrainer_email').value;
    var CNIC = document.getElementById('Utrainer_CNIC').value;
    var Number = document.getElementById('Utrainer_number').value;
    var Gender = document.getElementById('Utrainer_gender').value;
    var Experience = document.getElementById('Utrainer_experience').value;

    // alert(dummy_array[1]);
    // alert(trainer_data[1].CNIC);
    // alert(CNIC);

    for (var r = 0; r < trainer_data.length; r++) {
        if (trainer_data[r].CNIC == dummy_array[1]) {
            trainer_data[r].email = Email;
            trainer_data[r].CNIC = CNIC;
            trainer_data[r].number = Number;
            trainer_data[r].gender = Gender;
            trainer_data[r].experience = Experience;

            sessionStorage.setItem('trainer_data', JSON.stringify(trainer_data));
        }
    }

    var trainer_list2 = '';
    for (var i = 1; i < trainer_data.length; i++) {

        var get_CNIC = trainer_data[i].CNIC;
        var get_Email = trainer_data[i].email;
        var get_Number = trainer_data[i].number;
        var get_Gender = trainer_data[i].gender;
        var get_Experience = trainer_data[i].experience;

        var Update = [get_Email, get_CNIC, get_Number, get_Gender, get_Experience];

        trainer_list2 += '<div class="row datadiv"><div class="col-1 title">' + i
            + '</div><div class="col-2 title">' + trainer_data[i].email + '</div><div class="col-2 title">'
            + trainer_data[i].number + '</div><div class="col-2 title">' + trainer_data[i].CNIC
            + '</div><div class="col-2 title">' + trainer_data[i].gender + '</div><div class="col-1 title">'
            + trainer_data[i].experience
            + '</div><div class="col-1 title"><button class=' + get_CNIC + ' onclick="remove_member(this)" style="background-color: red ; color:white;border: red;">Remove</button></div><div class="col-1 title"><button data-toggle="modal" data-target="#exampleModal1" class=' + Update + ' onclick="update_member(this)" style="background-color: green ; color:white;border: green;">Update</button></div></div>'

    }
    document.getElementById('trainer_list').innerHTML = trainer_list2;
}


// //////////////////////////////////////////  Payment JS /////////////////////////////////////////////////////////

var GYMPayment_array = [{
    GYMPaymentID: '',
    MemberID: '',
    MemberName: '',
    Amount: '',
    GYMPaymentTime: '',
    GYMPaymentDate: '',
}]

function GYM_Payment() 
{
    var GYMPaymentID = document.getElementById('PaymentID').value;
    var MemberID = document.getElementById('MemberID').value;
    var MemberName = document.getElementById('MemberName').value;
    var Amount = document.getElementById('Amount').value;
    var GYMPaymentTime = document.getElementById('PaymentTime').value;
    var GYMPaymentDate = document.getElementById('PaymentDate').value;

    if (sessionStorage.getItem('gympayment') != null && sessionStorage.getItem('gympayment') != undefined) {
        GYMPayment_array = JSON.parse(sessionStorage.getItem('gympayment'));
    }

    GYMPayment_array.push({'GYMPaymentID':GYMPaymentID , 'MemberID' : MemberID , 'MemberName' : MemberName ,
       'Amount' : Amount , 'GYMPaymentTime' : GYMPaymentTime , 'GYMPaymentDate' : GYMPaymentDate
    });
    alert('inner');

    sessionStorage.setItem('gympayment', JSON.stringify(GYMPayment_array));
}
