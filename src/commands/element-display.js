const elementDisplay = (browser, cssPath, hide) => {
  return browser.execute(function (hide, cssPath) {
    if (hide) {
      document.querySelector(cssPath).style.display = 'none';
    } else {
      document.querySelector(cssPath).style.display = '';
    }
  }, hide, cssPath);
}

export default elementDisplay

