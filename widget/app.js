const flags = {};

const setFlags = () => {
  flags.isWeb = (buildfire.context.device.platform == 'web');
  flags.isLiveMode = buildfire.context.liveMode;
  flags.isNotCP = (flags.isLiveMode === 1 || !flags.isWeb);
};

const render = (content) => {

  const handleWindow = (openWindow, displaySuccessMessage) => {
    if (openWindow) {
      setTimeout(() => buildfire.navigation.goBack(), 750);
      buildfire.navigation.openWindow(content.formUrl, "_blank");
      return;
    }
    if (displaySuccessMessage) {
      window.document.getElementById('successMessage').style.display = 'block';
      window.document.getElementById('targetUrl').href = content.formUrl;
      return;
    }
  };

  setFlags();
  const openWindow = flags.isNotCP; //on the device and open in pop up or native brow
  const displaySuccessMessage = content.formUrl && flags.isWeb && !flags.isLiveMode;

  handleWindow(openWindow, displaySuccessMessage);

};

buildfire.spinner.show();
buildfire.datastore.onUpdate(event => render(event.data.content));
buildfire.datastore.get("googleFormInfo", (err, result) => {
  if (err) {
    console.error("error: ", err);
    buildfire.spinner.hide();
    return;
  }

  if (!result.data || !result.data.content) {
    buildfire.spinner.hide();
    return;
  }

  const { content } = result.data;

  render(content);

  buildfire.spinner.hide();

  try {
    buildfire.appearance.ready();
  } catch (err) {
    console.log('appearance.ready() failed. Is sdk up to date?');
  }
});