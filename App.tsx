import React from 'react'
import {SafeAreaView} from 'react-native'
import {WebView, WebViewMessageEvent} from 'react-native-webview'

const jsCode = `
  function waitLoad() {
    try {
      document.body.style.visibility = 'hidden';

      var emailField = document.getElementsByName("xEmail")[0];
      var passwordField = document.getElementsByName("xPass")[0];
      var loginButton = document.getElementsByClassName("btn btn-primary btn-sm")[0];

      if (emailField && passwordField && loginButton) {
        emailField.value = "passenger@lakewood.com";
        passwordField.value="Passenger123)";
        setTimeout(() => {
          loginButton.click();
          setTimeout(() => {
            document.location.href = 'https://csoradio.curbsoft.com/nav/maps/'
          }, 1000)
        }, 500);
      } else {
        setTimeout(() => {
          document.body.style.visibility = 'visible';
        }, 1000)
      }

      // hide lake of passengers dropdown
      var lakeOfPassengers = document.getElementsByClassName("nav-item col-auto px-lg-3 py-lg-0 dropdown")
      if (lakeOfPassengers.length > 0) {
        lakeOfPassengers[0].style.display = "none";
      }

      // hide reports
      var reports = document.querySelectorAll('a[href="/nav/reports/"]');
      if (reports.length > 0) {
        reports[0].style.display = "none";
      }

      // hide devices
      var devices = document.querySelectorAll('a[href="/nav/devices/"]');
      if (devices.length > 0) {
        devices[0].style.display = "none";
      }

      // hide tickets
      var tickets = document.querySelectorAll('a[href="/nav/tickets/"]');
      if (tickets.length > 0) {
        tickets[0].style.display = "none";
      }
    } catch (e) {
      console.log(e)
    }
  }

  window.onload = waitLoad();
`

export default function App() {
  const onMessage = (payload: WebViewMessageEvent) => {
    let dataPayload
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data)
    } catch (e) {
      console.log(e)
    }

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`)
      } else {
        console.log(dataPayload)
      }
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1f2228'}}>
      <WebView
        source={{uri: 'https://csoradio.curbsoft.com/'}}
        originWhitelist={['*']}
        javaScriptEnabledAndroid
        javaScriptEnabled
        injectedJavaScript={jsCode}
        onMessage={onMessage}
        ref={() => {}}
        style={{backgroundColor: '#1f2228'}}
      />
    </SafeAreaView>
  )
}
