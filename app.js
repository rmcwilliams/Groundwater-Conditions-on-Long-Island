$(document).ready(function () {

    var initYear = "2016";

    function getAllUrlParams() {

        // get query string from url (optional) or window
        var queryString = window.location.search.slice(1);
    
        // we'll store the parameters here
        var obj = {};
    
        // if query string exists
        if (queryString) {
    
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
    
            // split our query string into its component parts
            var arr = queryString.split('&');
    
            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
    
                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });
    
                // set parameter value (use 'true' if empty)
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
    
                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                paramValue = paramValue.toLowerCase();
    
                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }
        return obj;
        // return obj;
    }

    //check if the user entered a url param
    var urlParam = getAllUrlParams();
    
    if (urlParam.year) {
        initYear = urlParam.year;
        document.getElementById('mySelect').value=initYear;
    }

    $('#mobile-main-menu').click(function () {
        $('body').toggleClass('isOpenMenu');
    });

    //set default iframe
    $("#theIframe").attr("src", initYear + ".html");


    $('#yearDropdown').change(
        function() {
            var val = $('#yearDropdown option:selected').val();
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?year=' + val;
            window.history.pushState({ path: newurl }, '', newurl);

            $("#theIframe").attr("src", val + ".html");
        }
    );

});