export function close(){
  return "This api call close the ayoba microApp";
}

export function sendMessage(){
  return "message has been send..!"
}

export function composeMessage(){
  return "This Api will open the chat"
}

export function sendMedia(){
  return ("https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg , image/jpg");
}

export function sendLocation(){
  return "Latitude: -26.185357775567436" + " " + "Longitude: 28.019023561909993";
}

export function getCountry(){
  var country = "South Africa";
  return country;
}

export function getContacts(){
  var jsonContacts = "087 324 1313";
  return jsonContacts
}

export function getMsisdn(){
  var msisdn = "087 324 1313";
  return msisdn;
}

export function getCanSendMessage(){
  var canSendMessage = "1";
  return canSendMessage;
}

export function getLanguage(){
  var language = "en";
  return language
}

export function getSelfJid(){
  var selfJid = "65c3kdflfc5c7c3hb30lc7615beda57031p2d2df@dev.ayoba.me";

  return selfJid;
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
export function onLocationChanged(){
  return "Latitude: -26.185357775567436" + " " + "Longitude: 28.019023561909993";
}

/*
* The Ayoba native interface calls this method every time
* the user profile changes (nickname or avatar)
*/
export function onProfileChanged(){
  return
}

/*
* The Ayoba native interface calls this method every time
* the user presence changes (infact, always online)
*/
export function onPresenceChanged(){
  return "1";
}

/*
* This method should be implemented to retrieve the "sendMedia(...)" result
* 
* @param {int} responseCode: result code
*  0: the location could not be sent
*  1: the location has been sent successfully
* @param encodedUrl: Base64 encoded media file’s url
*/
export function onMediaSentResponse(){
  return "1";
}

/*
* This method should be implemented to retrieve the "sendLocation(...)" result
*
* @param {int} responseCode: result code
*  0: the location could not be sent
*  1: the location has been sent successfully
*/
export function onLocationSentResponse(){
  return "1";
}
