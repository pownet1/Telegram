let is_list_open = false;

$(document).ready(function() {

	var active = null;
	var active_code = null;
	var skip_events = false;

	$('#sign-in-phone-code').focus(function(event){
		showList();
		skip_events = true
	}).blur(function(event){
		hideList();
		skip_events = true
	});

	$('.css-icon-down').click(function(event){
		skip_events = true
		if(is_list_open)
			hideList();
		else
			showList();
	});

	$(document).click(function(event){
		if(!skip_events)
			hideList();
		else
			skip_events = false;
	});

	$('.MenuItem').click(function(event){
		if(active)
		{
			$(active).removeClass('selected compact');
			$(active).addClass('compact');
		}
		
		$(this).removeClass('compact');
		$(this).addClass('selected compact');
		
		active = $(this);

		var country = $(this).find('.country-name').text();
		var code = $(this).find('.country-code').text();

		active_code = code.replace('+', '');

		$('#sign-in-phone-number').val(code);
		$('#sign-in-phone-code').val(country);
		$('.next').css('display', 'none');
	});

	$('#sign-in-phone-code').on('keyup', function() {
		var input, filter, country_name_div, country_name, country_code_div, country_code;
		
		input = $(this);
		filter = input.val().toUpperCase();
		
		list = $('.bubble.menu-container.custom-scroll.top.left.opacity-transition.fast');
		elements = list.find('div');
		
		for (var i = 0; i < elements.length; i++) {
			country_name_div = elements[i].getElementsByTagName('span')[1];
			country_name = country_name_div.innerText;
			
			country_code_div = elements[i].getElementsByTagName('span')[2];
			country_code = country_code_div.innerText;

			if (country_code.toUpperCase().indexOf(filter) > -1 || country_name.toUpperCase().indexOf(filter) > -1) {
				elements[i].style.display = '';
			} else {
				elements[i].style.display = 'none';
			}
		}
  });

	$('#sign-in-phone-number').on("keyup", function(){
		var input_value = $(this).val().replace('+', '');
		var ok = false;

		if(input_value && active_code && input_value.toString().startsWith(active_code.toString()))
			ok = true;

		console.log(ok, input_value.length, active_code)

		if(active_code && input_value.length > 4)
		{
			try
			{
				const phoneNumber = $(this).val();
				const code = getCountryCode(active_code);
				const formattedPhoneNumber = formatPhoneNumber(phoneNumber, code);
				const phone_obj = libphonenumber.parsePhoneNumber(phoneNumber, code)

				if(phone_obj.isValid())
					$('.next').css('display', 'block');
				else
					$('.next').css('display', 'none');

				$(this).val(formattedPhoneNumber);
			}
			catch (e) { }
		}
		else if (input_value.length < 5 && input_value.length > 0)
		{
			var input, filter, country_name_div, country_name, country_code_div, country_code;
		
			input = $(this);

			filter = input_value;

			list = $('.bubble.menu-container.custom-scroll.top.left.opacity-transition.fast');
			elements = list.find('div');

			for (var i = 0; i < elements.length; i++) {

				country_name_div = elements[i].getElementsByTagName('span')[1];
				country_name = country_name_div.innerText;
				
				country_code_div = elements[i].getElementsByTagName('span')[2];
				country_code = country_code_div.innerText;

				if (country_code.replace('+', '').indexOf(filter) > -1 && (country_code.length-1) < 2) {
					active_code = country_code.replace('+', '');

					$('#sign-in-phone-number').val(country_code);
					$('#sign-in-phone-code').val(country_name);
					$('.next').css('display', 'none');
					ok = true;
				}
				else if (country_code.replace('+', '').indexOf(filter) > -1 && (country_code.length-1) > 1 && input_value.length == (country_code.length-1))
				{
					active_code = country_code.replace('+', '');

					$('#sign-in-phone-number').val(country_code);
					$('#sign-in-phone-code').val(country_name);
					$('.next').css('display', 'none');

					ok = true;
				}
			}
		}
		else if($(this).val().length <= 2 && $(this).val().length != 1 && $(this).val()[0] != '+')
		{
			$('#sign-in-phone-number').val('');
			$('#sign-in-phone-code').val('');
		}
		else if($(this).val().length == 1 && $(this).val()[0] == '+')
		{
			$('#sign-in-phone-code').val('');
		}
		if(!ok && input_value.length > 0 && active_code)
		{
			$('#sign-in-phone-code').val('');
			$('.next').css('display', 'none');
			active_code = null;
		}
	});

	$('.next').click(function(event){
		$(this).text('PLEASE WAIT...');
		$(this).append("<img src = \"static/images/loading.svg\">")
	});

	$('form').submit(function(event) {
		event.preventDefault();

		if ($('.next').css('display') == 'block')
		{
			setTimeout(function(){
				$('form').get(0).submit()
			}, 2000)
		}
	});
});

function formatPhoneNumber(phoneNumber, countryCode) {
	let numberObj = libphonenumber.parsePhoneNumber(phoneNumber, countryCode);
	return numberObj.format('INTERNATIONAL')
}

function getCountryCode(number_code)
{
	country_codes = {
	    "1": "US",
	    "7": "RU",
	    "20": "EG",
	    "27": "ZA",
	    "30": "GR",
	    "31": "NL",
	    "32": "BE",
	    "33": "FR",
	    "34": "ES",
	    "36": "HU",
	    "39": "IT",
	    "40": "RO",
	    "41": "CH",
	    "43": "AT",
	    "44": "GB",
	    "45": "DK",
	    "46": "SE",
	    "47": "NO",
	    "48": "PL",
	    "49": "DE",
	    "51": "PE",
	    "52": "MX",
	    "53": "CU",
	    "54": "AR",
	    "55": "BR",
	    "56": "CL",
	    "57": "CO",
	    "58": "VE",
	    "60": "MY",
	    "61": "AU",
	    "62": "ID",
	    "63": "PH",
	    "64": "NZ",
	    "65": "SG",
	    "66": "TH",
	    "81": "JP",
	    "82": "KR",
	    "84": "VN",
	    "86": "CN",
	    "90": "TR",
	    "91": "IN",
	    "92": "PK",
	    "93": "AF",
	    "94": "LK",
	    "95": "MM",
	    "98": "IR",
	    "211": "SS",
	    "212": "MA",
	    "213": "DZ",
	    "216": "TN",
	    "218": "LY",
	    "220": "GM",
	    "221": "SN",
	    "222": "MR",
	    "223": "ML",
	    "224": "GN",
	    "225": "CI",
	    "226": "BF",
	    "227": "NE",
	    "228": "TG",
	    "229": "BJ",
	    "230": "MU",
	    "231": "LR",
	    "232": "SL",
	    "233": "GH",
	    "234": "NG",
	    "235": "TD",
	    "236": "CF",
	    "237": "CM",
	    "238": "CV",
	    "239": "ST",
	    "240": "GQ",
	    "241": "GA",
	    "242": "CG",
	    "243": "CD",
	    "244": "AO",
	    "245": "GW",
	    "246": "IO",
	    "248": "SC",
	    "249": "SD",
	    "250": "RW",
	    "251": "ET",
	    "252": "SO",
	    "253": "DJ",
	    "254": "KE",
	    "255": "TZ",
	    "256": "UG",
	    "257": "BI",
	    "258": "MZ",
	    "260": "ZM",
	    "261": "MG",
	    "262": "RE",
	    "263": "ZW",
	    "264": "NA",
	    "265": "MW",
	    "266": "LS",
	    "267": "BW",
	    "268": "SZ",
	    "269": "KM",
	    "290": "SH",
	    "291": "ER",
	    "297": "AW",
	    "298": "FO",
	    "299": "GL",
		"350": "GI",
		"351": "PT",
		"352": "LU",
		"353": "IE",
		"354": "IS",
		"355": "AL",
		"356": "MT",
		"357": "CY",
		"358": "FI",
		"359": "BG",
		"370": "LT",
		"371": "LV",
		"372": "EE",
		"373": "MD",
		"374": "AM",
		"375": "BY",
		"376": "AD",
		"377": "MC",
		"378": "SM",
		"379": "VA",
		"380": "UA",
		"381": "RS",
		"382": "ME",
		"385": "HR",
		"386": "SI",
		"387": "BA",
		"389": "MK",
		"420": "CZ",
		"421": "SK",
		"423": "LI",
		"500": "FK",
		"501": "BZ",
		"502": "GT",
		"503": "SV",
		"504": "HN",
		"505": "NI",
		"506": "CR",
		"507": "PA",
		"508": "PM",
		"509": "HT",
		"590": "GP",
		"591": "BO",
		"592": "GY",
		"593": "EC",
		"594": "GF",
		"595": "PY",
		"596": "MQ",
		"597": "SR",
		"598": "UY",
		"599": "CW",
		"670": "TL",
		"672": "NF",
		"673": "BN",
		"674": "NR",
		"675": "PG",
		"676": "TO",
		"677": "SB",
		"678": "VU",
		"679": "FJ",
		"680": "PW",
		"681": "WF",
		"682": "CK",
		"683": "NU",
		"685": "WS",
		"686": "KI",
		"687": "NC",
		"688": "TV",
		"689": "PF",
		"690": "TK",
		"691": "FM",
		"692": "MH",
		"850": "KP",
		"852": "HK",
		"853": "MO",
		"855": "KH",
		"856": "LA",
		"880": "BD",
		"886": "TW",
		"960": "MV",
		"961": "LB",
		"962": "JO",
		"963": "SY",
		"964": "IQ",
		"965": "KW",
		"966": "SA",
		"967": "YE",
		"968": "OM",
		"970": "PS",
		"971": "AE",
		"972": "IL",
		"973": "BH",
		"974": "QA",
		"975": "BT",
		"976": "MN",
		"977": "NP",
		"992": "TJ",
		"993": "TM",
		"994": "AZ",
		"995": "GE",
		"996": "KG",
		"998": "UZ",
	    "1242": "BS",
	    "1264": "AI",
	    "1268": "AG",
	    "1284": "VG",
	    "1340": "VI",
	    "1345": "KY",
	    "1441": "BM",
	    "1473": "GD",
	    "1649": "TC",
	    "1664": "MM",
	    "1670": "MP",
	    "1684": "AS",
	    "1721": "SX",
	    "1767": "DM",
	    "1784": "VC",
	    "1787": "PR",
	    "1809": "MF",
	    "1829": "CU",
	    "1849": "DO",
	    "1868": "TT",
	    "1869": "KN",
	    "1876": "JM",
	    "1939": "PR"
	}
	return country_codes[number_code]
}

function hideList()
{
	setTimeout(function(){
		$('#sign-in-phone-code').removeClass('focus');
		$('.css-icon-down') .removeClass('open');
		$('.backdrop').remove();
		$('.bubble.menu-container.custom-scroll.top.left.opacity-transition.fast').removeClass('open shown');
		is_list_open = false;
	}, 200);
}

function showList()
{
	$('#sign-in-phone-code').addClass('focus');
	$('.css-icon-down') .addClass('open');

	$('.Menu.no-selection.compact.CountryCodeInput').prepend('<div class="backdrop"></div>');
	$('.bubble.menu-container.custom-scroll.top.left.opacity-transition.fast').addClass('open shown');
	is_list_open = true;
}