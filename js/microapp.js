/*
A stub microapp for ayoba that implements a stub interface and debug logging to the page
*/
var debug = false;
var context;
var appcontext
window.onload = function afterpagedLoad(){
    context = getURLParameter("context");
    debug = ("true"===getURLParameter("debug"));
    if (debug) {
        console.log("Debug mode: "+debug);
        document.getElementById("log-container").hidden = false;
    }
};
//This function ensures that the console output is visible to the user on the page for debugging purposes
(function (logger) {
    console.old = console.log;
    console.log = function () {
        var output = "", arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            output += "<span class=\"log-" + (typeof arg) + "\">";

            if (
                typeof arg === "object" &&
                typeof JSON === "object" &&
                typeof JSON.stringify === "function"
            ) {
                output += JSON.stringify(arg);   
            } else {
                output += arg;   
            }

            output += "</span>&nbsp;";
        }

        logger.innerHTML += output + "<br>";
        console.old.apply(undefined, arguments);
    };
})(document.getElementById("logger"));

console.log("Starting...");
var Ayoba = getAyoba();
import * as AyobaStub from './ayobastub.js';
if (Ayoba === null) {
    console.log("Looks like we're not inside ayoba, stubbinng the situation...");
    Ayoba = AyobaStub;
};
console.log("List of methods available:");
Object.getOwnPropertyNames(Ayoba).forEach((value) => {
    console.log(value);
})
console.log(Object.getOwnPropertyNames(Ayoba));
//Let's try them all
console.log("Let's try them..")
if (Object.getOwnPropertyNames(Ayoba).includes("getSelfJid")) {
    console.log("JID: "+Ayoba.getSelfJid());
};
if (Object.getOwnPropertyNames(Ayoba).includes("getMsisdn")) {
    console.log("MSISDN: "+Ayoba.getMsisdn());
};
if (Object.getOwnPropertyNames(Ayoba).includes("getCountry")) {
    console.log("Country: "+Ayoba.getCountry());
};
if (Object.getOwnPropertyNames(Ayoba).includes("getLanguage")) {
    console.log("Language: "+Ayoba.getLanguage());
};
const closeButton = document.getElementById("btn_close");
closeButton.addEventListener('click', () => {
    console.log(Ayoba.close());
});
/**
 * Determine the mobile operating system and returns the 
 * proper javascript interface
 */
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        try {
             return Android;
        } catch (error) {
           return null; 
        }
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo 
    }

    return "unknown";
}

function finish() {
    Ayoba.finish();
}

function sendMessage() {
    Ayoba.sendMessage(document.getElementById("summary").innerHTML);
    Ayoba.finish();
}

function copyMessage(theIndex) {
    var strInputCode = document.getElementById("result_"+theIndex).innerHTML;
    var cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "\n");
    const el = document.createElement('textarea');
    el.value = cleanText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function composeMessage() {
    Ayoba.composeMessage(document.getElementById("inputText").value);
    Ayoba.finish();
}

function sendMedia() {
    Ayoba.sendMedia('https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg', 'image/jpg');
}

function sendLocation() {
    Ayoba.sendLocation(document.getElementById("inputTextLat").value, document.getElementById("inputTextLon").value);
}

function getCountry() {
    var country = Ayoba.getCountry();
    document.getElementById("inputText").value = country
    return country
}

function getMsisdn() {
    var msisdn = Ayoba.getMsisdn();
    document.getElementById("inputText").value = msisdn
    return msisdn
}

function getCanSendMessage() {
    var canSendMessage = Ayoba.getCanSendMessage();
    document.getElementById("inputText").value = canSendMessage
    return canSendMessage
}

function getLanguage() {
    var language = Ayoba.getLanguage();
    document.getElementById("inputText").value = language
    return language
}

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function getSelfJidFromUrl() {
    var selfJid = getURLParameter("jid")
    document.getElementById("inputText").value = selfJid
    return selfJid
}

/*
 * The Ayoba native interface calls this method every time
 * the app receives a new location event.
 * 
 * Remember this listener will only be called when the native
 * permission is accepted by the user. 
 * 
 * In some border cases, also can receive lat=0.0, lon=0.0. Most of
 * cases, will mean Ayoba cannot retrieve the GPS coordinates.
 */
function onLocationChanged(lat, lon) {
    document.getElementById("locationInputText").value = lat.concat(", ").concat(lon)
}

/*
 * The Ayoba native interface calls this method every time
 * the user profile changes (nickname or avatar)
 */
function onProfileChanged(nickname, avatarPath) {
    document.getElementById("nicknameInputText").value = nickname
    document.getElementById("avatarImage").src = avatarPath
}

/*
 * The Ayoba native interface calls this method every time
 * the user presence changes (infact, always online)
 */
function onPresenceChanged(presence) {
    document.getElementById("presenceInputText").value = presence
}

/*
 * This method should be implemented to retrieve the "sendMedia(...)" result
 * 
 * @param {int} responseCode: result code
 *  0: the location could not be sent
 *  1: the location has been sent successfully
 * @param encodedUrl: Base64 encoded media file’s url
 */
function onMediaSentResponse(responseCode, encodedUrl) {
    document.getElementById("inputText").value = responseCode.concat(" - ").concat(encodedUrl)
}

/*
 * This method should be implemented to retrieve the "sendLocation(...)" result
 *
 * @param {int} responseCode: result code
 *  0: the location could not be sent
 *  1: the location has been sent successfully
 */
function onLocationSentResponse(responseCode) {
    document.getElementById("inputText").value = responseCode
}