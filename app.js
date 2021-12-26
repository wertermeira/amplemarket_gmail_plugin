const APP_URL = 'https://werter-amplemarket-react.herokuapp.com'

const appIframe = () => {
  const iframe = document.createElement('iframe')
  iframe.src = APP_URL
  iframe.id = 'inbox-iframe'
  iframe.height = '565px'
  return iframe
};

InboxSDK.load(2, 'sdk_werter_am_c995e5a97e').then(sdk => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    composeView.addButton({
      title: "Add Snippets",
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2581/2581104.png',
      hasDropdown: true,
      onClick: event => {
        sdk.Widgets.showMoleView({
          el: appIframe(),
          showCloseButton: true,
          title: 'List of Snippets'
        })
      },
    });

    window.onmessage = (event) => {
      if (event.origin !== APP_URL) {
        return;
      }
      console.log(event.origin);
      composeView.setBodyText(event.data);
    }
  });
});