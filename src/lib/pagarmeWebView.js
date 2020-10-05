import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default class PagarMeWebView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      card: null,
      key: Date.now(),
    };
  }

  // public method
  getCardHash = card => {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      this.setState({
        card,
        key: Date.now(), // create a unique key for each request
      });

      this.timeout = setTimeout(() => {
        this.onError('timeout');
      }, 30 * 1000);
    });
  };

  onSuccess = cardHash => {
    clearTimeout(this.timeout);
    this.timeout = null;

    if (this.resolve) {
      this.resolve(cardHash);
      this.resolve = null;
    }
  };

  onError = reason => {
    clearTimeout(this.timeout);
    this.timeout = null;

    if (this.reject) {
      this.reject(reason);
      this.reject = null;
    }
  };

  onMessage = async event => {
    const message = JSON.parse(event.nativeEvent.data);
    switch (message.type) {
      case 'success':
        this.onSuccess(message.data);
        break;
      case 'error':
        this.onError(message.error);
        break;
    }
  };

  onWebviewError = e => {
    this.onError(e.nativeEvent.description || 'webviewError');
  };

  render() {
    if (!this.state.card) {
      return null;
    }

    const cardString = JSON.stringify(this.state.card);
    return (
      <WebView
        key={this.state.key}
        originWhitelist={['*']}
        source={{
          html: `
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="https://assets.pagar.me/pagarme-js/4.5/pagarme.min.js"></script>
            <script>
              function sendMessage(message) {
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
              }
              pagarme.client
                .connect({ encryption_key: 'ek_test_NA3xJ9GOfZQylBmi0ifhbOE6rOfUkm' })
                .then(client => client.security.encrypt(${cardString}))
                .then(card_hash => sendMessage({ type: "success", data: card_hash }))
                .catch(error => sendMessage({ type: "error", error: error.response || error.message || 'error' }))
            </script>
        `,
        }}
        style={styles.webview}
        onError={this.onWebviewError}
        onHttpError={this.onWebviewError}
        onMessage={this.onMessage}
      />
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    position: 'absolute',
    height: 0,
    width: 0,
  },
});