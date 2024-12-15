function persian_number_to_english(elem) {
    var val = elem.value;
    var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    var arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if(typeof val === 'string') {
        for(var i=0; i<10; i++)
        {
            val = val.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    elem.value = val;
}

function digits_login_1_btn() {
    document.getElementById("digits-login-1").classList.remove("active");
    document.getElementById("digits-login-2").classList.add("active");
}

function digits_register_1_btn() {
    document.getElementById("digits-register-1").classList.remove("active");
    document.getElementById("digits-register-2").classList.add("active");
}


// start javascript event listener on class change
let dig_lo_resend_otp_btn = document.getElementById('dig_lo_resend_otp_btn'),
    dig_lo_resend_otp_btn_options = {
        attributes: true,
        attributeFilter: ['style']
    },
    dig_lo_resend_otp_btn_observer = new MutationObserver(dig_lo_resend_otp_btn_Callback);

function dig_lo_resend_otp_btn_Callback(mutations) {
    for (let mutation of mutations) {
        if (dig_lo_resend_otp_btn.style.display === 'block') {
            // console.log("Display changed to: ", dig_lo_resend_otp_btn.style.display);
            document.getElementById('mobmail').style.display = 'none';
            document.getElementById("digits-login-2-tite").innerHTML = "ورود با کد تایید";
            let dig_lo_resend_otp_btn_mob = document.getElementById('dig_lo_resend_otp_btn').getAttribute("mob");
            document.getElementById("digits-login-2-des").innerHTML = "کد تایید به شماره " + dig_lo_resend_otp_btn_mob + " ارسال شده است.";
            document.getElementById("digit-1").select();
        }
    }
}

dig_lo_resend_otp_btn_observer.observe(dig_lo_resend_otp_btn, dig_lo_resend_otp_btn_options);
// end javascript event listener on class change


// start javascript event listener on class change
let dig_register_resend_otp_btn = document.getElementsByClassName("dig_register_resend_otp_btn")[0],
    dig_register_resend_otp_btn_options = {
        attributes: true,
        attributeFilter: ['style']
    },
    dig_register_resend_otp_btn_observer = new MutationObserver(dig_register_resend_otp_btn_Callback);

function dig_register_resend_otp_btn_Callback(mutations) {
    for (let mutation of mutations) {
        if (dig_register_resend_otp_btn.style.display === 'block') {
            // console.log("Display changed to: ", dig_register_resend_otp_btn.style.display);
            document.getElementById('digits_register_fields_box').style.display = 'none';
            document.getElementById("digits-register-2-title").innerHTML = "تایید کد";
            let dig_register_resend_otp_btn_mob = document.getElementsByClassName("dig_register_resend_otp_btn")[0].getAttribute("mob");
            document.getElementById("digits-register-2-des").innerHTML = "کد تایید به شماره " + dig_register_resend_otp_btn_mob + " ارسال شده است.";
            document.getElementById("register-digit-1").select();
        }
    }
}

dig_register_resend_otp_btn_observer.observe(dig_register_resend_otp_btn, dig_register_resend_otp_btn_options);
// end javascript event listener on class change


// start javascript otp 5 box for login
(function( $ ) {
    $('.digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());

            if(e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));

                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));

                if(next.length) {
                    $(next).select();
                } else {
                    if(parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });
})( jQuery );
// end javascript otp 5 box for login


// start javascript otp 5 box for register
(function( $ ) {
    $('.register-digit-group').find('input').each(function() {
        $(this).attr('maxlength', 1);
        $(this).on('keyup', function(e) {
            var parent = $($(this).parent());

            if(e.keyCode === 8 || e.keyCode === 37) {
                var prev = parent.find('input#' + $(this).data('previous'));

                if(prev.length) {
                    $(prev).select();
                }
            } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                var next = parent.find('input#' + $(this).data('next'));

                if(next.length) {
                    $(next).select();
                } else {
                    if(parent.data('autosubmit')) {
                        parent.submit();
                    }
                }
            }
        });
    });
})( jQuery );
// end javascript otp 5 box for register


// start put in login otp
function put_in_otp_input(elem) {
    var chr = elem.value;
    if (chr.length == 0) {
        chr = '0';
    }
    var str = document.getElementById('dig_otp').value;
    var index = elem.getAttribute("data-otp-index");

    str = str.replaceAt(index,chr);

    document.getElementById('dig_otp').value = str;
}
// end put in login otp

// start put in register otp
function put_in_register_otp_input(elem) {
    var chr = elem.value;
    if (chr.length == 0) {
        chr = '0';
    }
    var str = document.getElementById('register_dig_otp').value;
    var index = elem.getAttribute("data-otp-index");

    str = str.replaceAt(index,chr);

    document.getElementById('register_dig_otp').value = str;
}
// end put in register otp

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}