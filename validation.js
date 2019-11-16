/* validation  */
// version 1.0

/* Start Common validation function  */
// Required
function ValidateRequired(data)
{		
	if(data.trim() == "")
	{
		return false;
	}
	return true;
}

// Number only
function ValidateNumberOnly(data)
{
	var expression = /^\d+$/;
	if(!expression.test(data) && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

// Alpha only
function ValidateAlphaOnly(data)
{
	var expression = /^[a-zA-Z '.-]+$/;
	if(!expression.test(data) && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

// Max length
function ValidateMaxLenght(data,maxLength)
{	
	if(data.length > maxLength && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

// Min length
function ValidateMinLenght(data,minLength)
{	
	if(data.length < minLength && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

// Max Value
function ValidateMaxValue(data,maxValue)
{	
	if(data > maxValue && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

// Max Value
function ValidateMinValue(data,minValue)
{	
	if(data < minValue && data.trim() != "") 
	{
		return false;
	}	
	return true;
}

//PhoneNumber 10 digit
function ValidatePhoneNumber(data)  
{  
	var expression = /^[6789]\d{9}$/;  
	if(!expression.test(data) && data.trim() != "") 
	{
		return false;
	}	
	return true;
}



//Email validate
function ValidateEmailId(data)  
{  
	//var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   //hangs
	var expression = /^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(!expression.test(data)  && data.trim() != "") 
	{
		return false;
	}	
	return true;
} 

/* start Date validation */  
//dateformat validate
function ValidateDateFormat(data)  
{  
	var expression = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
	//var expression = /^\d{1,2}\/\d{1,2}\/\d{4}$/;    //working expression same as above
	if(!expression.test(data)  && data.trim() != "")
	{
		return false;
	}	
	return true;
}

//validate isdate
function ValidateIsDate(data)  
{  
	if( data.trim() != "")
	{
		var bits = data.split('/');
		var d = new Date(bits[2], bits[1] - 1, bits[0]);
		return d && (d.getMonth() + 1) == bits[1];
	}
	return true;
}

// date range validate
function ValidateDateRange(data,minDate,maxDate)
{  
	if(data.trim() != "")
	{
		if(minDate == null)
		{
			minDate = "01/09/2016";
		}
		
		if(maxDate == null)
		{
			maxDate = "31/12/9999";
		}
		
		/*if(!ValidateDateFormat(data) || !ValidateDateFormat(minDate) || !ValidateDateFormat(maxDate))
		{
			console.log("Passed parameter date format is wrong");
			return false;
		}
		else if(!ValidateIsDate(data) || !ValidateIsDate(minDate) || !ValidateIsDate(maxDate))
		{
			console.log("Passed parameter date is invalid");
			return false;
		}
		else
		{*/
			var dataDate = new Date(data.split("/").reverse().join("/"));
			var minDateDate = new Date(minDate.split("/").reverse().join("/"));
			var maxDateDate = new Date(maxDate.split("/").reverse().join("/"));
			if ( dataDate < minDateDate || dataDate > maxDateDate ) {
				return false;
			}
			return true;
		/*}*/
	}
	return true;
}

/* End Common validation function  */
/* end Date validation */  

/* Show error message in sweet alert */
function ErrorMessage(ctrl,message)
{	
	if(ctrl != null)
	{
		ctrl.focus();
		ctrl.val("");
	}
	swal(message);
}
/* Show error message in sweet alert */


/* start common onchange validation*/
$(document).ready(function() {
	
	// Age Validation
	/*$(".vld_age").change(function () {				
		if(!ValidateNumberOnly($(this).val()))
		{			
			ErrorMessage($(this),"Age must be number only");
		}
		else if(!ValidateMaxValue($(this).val(),200))
		{			
			ErrorMessage($(this),"Age must be smaller than 200");
		}		
    });	*/
	
	// contact no
	$(".vld_phoneno").change(function () {
		if($(this).hasClass('vld_phoneno'))
		{
			if(!ValidatePhoneNumber($(this).val()))
			{			
				ErrorMessage($(this),"Phone number must be 10 digits and starts with 6,7,8,9 only");
			}
		}
    });
	
	$(".vld_pincode").change(function () {
		if($(this).hasClass('vld_pincode'))
		{
			if(!ValidateMaxLenght($(this).val(),6) || !ValidateMinLenght($(this).val(),6)) 
			{
				ErrorMessage($(this),"Pincode must be 6 digits only");			
			}
		}
	});
	
	$(".vld_aadhar").change(function () {
		if($(this).hasClass('vld_aadhar'))
		{
			if(!ValidateMaxLenght($(this).val(),12) || !ValidateMinLenght($(this).val(),12)) 
			{
				ErrorMessage($(this),"Aadhar must be 12 digits Only");			
			}
		}
    });
	
	//Email Id validate
	$(".vld_email").change(function () {				
		if(!ValidateEmailId($(this).val()))
		{			
			ErrorMessage($(this),"Invalid Email Id format");
		}			
    });
	
	//Date Validate
	$(".vld_date").change(function (e) {	
		if (e.originalEvent !== undefined)
		{
			var curDate = new Date();
			curDate = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' +  curDate.getFullYear();
			if(!ValidateDateFormat($(this).val()))
			{		
				ErrorMessage($(this),"Wrong date format. date format must be dd/mm/yyyyy");
			}
			else if(!ValidateIsDate($(this).val()))
			{
				ErrorMessage($(this),"Invalid Date");
			}
			else if(!ValidateDateRange($(this).val(),'01/09/2016',curDate))
			{
				ErrorMessage($(this),"Minimum date should be 01/09/2016 and maximum date should be today");
			}
		}
    });
	
	//Date Validate with no max limit if want max validate in the form itselft
	$(".vld_date_follow_up").change(function (e) {
		if (e.originalEvent !== undefined)
		{
			var curDate = new Date();
			curDate = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' +  curDate.getFullYear();
			if(!ValidateDateFormat($(this).val()))
			{		
				ErrorMessage($(this),"Wrong date format. date format must be dd/mm/yyyyy");
			}
			else if(!ValidateIsDate($(this).val()))
			{
				ErrorMessage($(this),"Invalid Date");
			}
		}
    });
	
	//Month And Year Validator
	$(".vld_month_year").change(function (e) {	
		if (e.originalEvent !== undefined)
		{
			var curDate = new Date();
			curDate = curDate.getDate() + '/' + (curDate.getMonth() + 1) + '/' +  curDate.getFullYear();
			var selectedDate = '01/'+$(this).val();
			if(!ValidateDateFormat(selectedDate))
			{		
				ErrorMessage($(this),"Wrong date format. date format must be dd/mm/yyyyy");
			}
			else if(!ValidateIsDate(selectedDate))
			{
				ErrorMessage($(this),"Invalid Date");
			}
			else if(!ValidateDateRange(selectedDate,'01/09/2016',curDate))
			{
				ErrorMessage($(this),"Minimum date should be 01/09/2016 and Maximum date should be today");
			}
		}
    });
	
	//Digits Validate because if user paste from somewhere
	/*$(".onlydigits").change(function () {				
		console.log("Test");
		if(!ValidateNumberOnly($(this).val()))
		{		
			ErrorMessage($(this),"Please enter only numbers");
		}	
    });*/
	
	/* Alpha Validate because if user paste from somewhere */
	/*$(".onlyalpha").change(function () {				
		if(!ValidateAlphaOnly($(this).val()))
		{					
			ErrorMessage($(this),"Please enter Character only");
		}	
    });*/
	
	/* maxlength Validate because if user paste from somewhere */
	/*$('.vld_maxlength').change(function (event) {
		if(!ValidateMaxLenght($(this).val(),$(this).attr('data-maxlength')))
		{
			ErrorMessage($(this),"maximum "+ $(this).attr('data-maxlength') + " character");			
		}		
	});	*/
	
});
/* end common onchange validation*/


/* start common keypress validation*/
$(document).ready(function() {		
	$(".onlydigits , .vld_age, .vld_weight").keypress(function (event) {
		if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)  && !$(this).is('[readonly]')) {
            event.preventDefault();			
			ErrorMessage(null,"Please enter only numbers");			
        }
    });
	
	$(".vld_age").keyup(function () {			
		if(!ValidateNumberOnly($(this).val())  && !$(this).is('[readonly]'))
		{			
			ErrorMessage($(this),"Age must be number only");
		}
		else if(!ValidateMinValue($(this).val(),1) || !ValidateMaxValue($(this).val(),120)  && !$(this).is('[readonly]'))
		{			
			ErrorMessage($(this),"Age must be 1 - 120");
		}
    });
	
	$(".vld_weight").keyup(function () {			
		if(!ValidateNumberOnly($(this).val()))
		{			
			ErrorMessage($(this),"Weight must be number only");
		}
		else if(!ValidateMinValue($(this).val(),1) || !ValidateMaxValue($(this).val(),150)  && !$(this).is('[readonly]'))
		{			
			ErrorMessage($(this),"Weight must be 1 - 150");
		}
    });
	
	$(".onlyalpha").keypress(function(event){
        var inputValue = event.charCode;
        if(!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 97 && inputValue <= 122) && (inputValue != 32 && inputValue != 0) && !$(this).is('[readonly]')){			
            event.preventDefault();			
			ErrorMessage(null,"Please enter alphabets only");
        }		
    });
	
	$('.vld_maxlength').keypress(function (event) {	
		if(!ValidateMaxLenght($(this).val(),$(this).attr('data-maxlength') - 1))
		{
			event.preventDefault();
			//ErrorMessage(null,"maximum "+ $(this).attr('data-maxlength') + " character");	
		}		
	});
	
	$(".vld_phoneno").keypress(function (event) {		
		if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)  && !$(this).is('[readonly]')) {			
            event.preventDefault();
			$(this).removeClass("vld_phoneno");
			ErrorMessage(null,"Please enter only numbers");
			$(this).addClass("vld_phoneno");
        }
		else if ($(this).val().length === 0 && (event.which !== 54 && event.which !== 55 && event.which !== 56 && event.which !== 57)  && !$(this).is('[readonly]'))
		{
			event.preventDefault();
			$(this).removeClass("vld_phoneno");
			ErrorMessage(null,"Must start with 6,7,8,9");
			$(this).addClass("vld_phoneno");
		}
		else if(!ValidateMaxLenght($(this).val(),10 - 1)   && !$(this).is('[readonly]'))
		{
			event.preventDefault();
			$(this).removeClass("vld_phoneno");
			//ErrorMessage(null,"Must be 10 digits only");
			$(this).addClass("vld_phoneno");
		}
    });	
	
	$(".vld_pincode").keypress(function (event) {
		if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)  && !$(this).is('[readonly]')) {			
            event.preventDefault();
			$(this).removeClass("vld_pincode");
			ErrorMessage(null,"Please enter only numbers");
			$(this).addClass("vld_pincode");
        }
		else if(!ValidateMaxLenght($(this).val(),6 - 1))
		{
			event.preventDefault();
			$(this).removeClass("vld_pincode");
			ErrorMessage(null,"Must be 6 digits only");
			$(this).addClass("vld_pincode");
		}
	});
	
	$(".vld_aadhar").keypress(function (event) {
		if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)  && !$(this).is('[readonly]')) {			
            event.preventDefault();
			$(this).removeClass("vld_aadhar");
			ErrorMessage(null,"Please enter only numbers");
			$(this).addClass("vld_aadhar");
        }
		else if(!ValidateMaxLenght($(this).val(),12 - 1))
		{
			event.preventDefault();
			$(this).removeClass("vld_aadhar");
			ErrorMessage(null,"Must be 12 digits only");
			$(this).addClass("vld_aadhar");
		}
    });
	
});
/* end common onkeydown validation*/

/* start disable paste option */
$(document).ready(function() {	
	/* 
	$("input[type='text']").bind("paste",function(e) {
		e.preventDefault();
	}); 
	*/
	
	/* First Value should not take space */
	$("input[type='text']").keydown(function(event) {
		if ($(this).val().length === 0 && event.which === 32) {
			event.preventDefault();
		}
		
	});
	
	//drop shoul not work
	$("input[type='text'],textarea").on("drop",function(event) {		
			event.preventDefault();		
	});
	
	$(".up").keyup(function(){
        $(this).val($(this).val().toUpperCase());
    });
	
	$(".lw").keyup(function(){
       // $(this).val($(this).val().toLowerCase());
		$(this).val($(this).val());
    });
	
	$(document).ready(function(){
		$("form").attr('autocomplete', 'off');
	});
	
});
/* end disable paste option */