/**
 * Ajax.Fetch
 * A simple Ajax wrapper
 * @author Zayn Ali [https://www.facebook.com/zaynali53]
 * @link   [https://github.com/zaynali53/Ajax.fetch]
 */
var Ajax = (function (Ajax) {

    "use strict";

    Ajax.fetch = function (url, callback, format) {
        if (
            ( typeof callback === 'function' || typeof callback != 'undefined' ) &&
            ( typeof format === 'string' || typeof format != 'undefined' )
        ) {
            return Ajax._makeRequest(url, callback, format);
        }
        else if ( typeof callback === 'function' || typeof callback != 'undefined') {
            return Ajax._makeRequest(url, callback);
        }
    };

    Ajax._makeRequest = function (url, callback, format) {
        var xhr = Ajax._createXhr();
        if (xhr.readyState === 0 || xhr.readyState === 4) {
            xhr.open("GET", url, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = Ajax._makeFormat(xhr, format);
                    if ( typeof callback === "function") {
                        callback(response);
                    }
                }
            };
        }
    };

    Ajax._makeFormat = function (xhr, format) {
        if (format === 'json') {
            return JSON.parse(xhr.responseText);
        }
        else if (format === 'xml') {
            return xhr.responseXML;
        }
        else if (format === 'undefined') {
            return xhr.responseText;
        }
        else {
            console.log("'" + format + "' is not a valid file format!");
        }
    };

    Ajax._createXhr = function () {
        var object;

        if (window.ActiveXObject) {
            try {
                object = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                object = false;
            }
        } else {
            try {
                object = new XMLHttpRequest();
            } catch(e) {
                object = false;
            }
        }

        if ( ! object) {
            console.log("Your browser does not support AJAX!");
        } else {
            return object;
        }
    };

    return Ajax;

}) ( Ajax || {} );
