CookieLaw = function (opts) {

    this.options = {};

    this.defaultOptions = {
        name: 'cookieLaw',
        html : '',
        html_en: '<div class="container"><img class="info" width="15" height="15" align="absmiddle" src="' + CookieLaw.icons.info + '"/>By using this website, you consent to our use of cookies. For more information on cookies see our <a href="https://www.diasite.fr/files/3/protection_vie_privee_cookies_public.pdf" target="_blank" onclick="CookieLaw.o.confirmUsage()">Cookie Policy</a>. <a class="cookieuclose" onclick="CookieLaw.o.confirmUsage()"><img src="' + CookieLaw.icons.close + '" width="13" height="13"/></a></div>',
        html_fr: '<div class="container"><img class="info" width="15" height="15" align="absmiddle" src="' + CookieLaw.icons.info + '"/>En poursuivant votre navigation, vous acceptez l\'utilisation de cookies &agrave; des fins statistiques et de personnalisation dans le respect de notre politique de <a href="https://www.diasite.fr/files/3/protection_vie_privee_cookies_public.pdf" target="_blank" onclick="CookieLaw.o.confirmUsage()">protection de votre vie priv&eacute;e</a>. <a class="cookieuclose" onclick="CookieLaw.o.confirmUsage()"><img src="' + CookieLaw.icons.close + '" width="13" height="13"/></a></div>',
        expireDays: 365 + 31 ,
        parentNodeId: null,
        onDisplay: null,
        onHide: null
    };

    this.init = function () {
      CookieLaw.o = this;
      this.options = {};

      for (var key in this.defaultOptions) {
        if (opts !== undefined && opts[key]) {
          this.options[key] = opts[key];
        } else {
          this.options[key] = this.defaultOptions[key];
        }
      }
      if (!this.options.html.length) {
        if (typeof navigator.language != 'undefined')
          lang = (navigator.language.substring(0,2)=='fr')?'fr':'en';
        else
          if (typeof navigator.browserLanguage != 'undefined')
          lang = (navigator.browserLanguage.substring(0,2)=='fr')?'fr':'en';
        this.options.html = this.options['html_'+lang];
      }
      this.displayCookieAlert();
    };

    this.addStyle = function() {
      /*
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '#' + this.getHeaderId() + '  { background: none repeat scroll 0 0 rgba(192, 192, 192, 0.75); bottom: 0; color: #000000; padding: 3px 6px; position: fixed; width: 100%; z-index: 99999; } ' +
                        '#' + this.getHeaderId() + ' .container { font-family: Arial; font-size: 11px; font-weight: normal; line-height: 18px; margin: 0 auto; overflow: hidden; }' +
                        '#' + this.getHeaderId() + ' img { padding: 0 12px; vertical-align: middle; }' +
                        '#' + this.getHeaderId() + ' .container a { border: 0 none; color: #000000; cursor: pointer; font-family: Arial; font-size: 11px; font-weight: bold; text-decoration: none;}';
      document.getElementsByTagName('head')[0].appendChild(style);
      */
      var txtStyle = '<style type="text/css">' +
                 '  #' + this.getHeaderId() + '  { background: none repeat scroll 0 0 rgba(192, 192, 192, 0.75); bottom: 0; color: #000000; padding: 3px 6px; position: fixed; width: 100%; z-index: 99999; } ' +
                 '  #' + this.getHeaderId() + ' .container { font-family: Arial; font-size: 11px; font-weight: normal; line-height: 18px; margin: 0 auto; overflow: hidden; }' +
                 '  #' + this.getHeaderId() + ' img { padding: 0 12px; vertical-align: middle; }' +
                 '  #' + this.getHeaderId() + ' .container a { border: 0 none; color: #000000; cursor: pointer; font-family: Arial; font-size: 11px; font-weight: bold; text-decoration: none;}' +
                 '</style>';
      document.write(txtStyle);
    };


    this.getParentNode = function () {
      if (this.options.parentNodeId) {
        return document.getElementById(this.options.parentNodeId);
      }
      return document.body;
    };

    this.getExpireDate = function () {
      var currentDate = new Date();
      return new Date(currentDate.setTime(currentDate.getTime() + this.options.expireDays*24*60*60*1000));
    };

    this.confirmUsage = function () {
      this.addConfirmation();
      this.hideAlert();
    };

    this.hasConfirmation = function () {
      return document.cookie.indexOf(this.options.name) != -1;
    };

    this.removeConfirmation = function () {
      return document.cookie = this.options.name + '=;path=/;max-age=0';
    };

    this.addConfirmation = function () {
      return document.cookie = this.options.name + '=' + this.options.name + ';path=/;expires=' + this.getExpireDate().toUTCString();
    };



    this.createAlert = function () {
      var cAlert  = document.createElement('div');
      cAlert.innerHTML = this.options.html;

      var attribute = document.createAttribute('id');
      attribute.nodeValue = this.getHeaderId();

      cAlert.setAttributeNode(attribute);

      return cAlert;
    };

    this.displayCookieAlert = function () {
      if (!this.hasConfirmation()) {
        this.addStyle();
        this.getParentNode().insertBefore(this.createAlert(), this.getParentNode().firstChild);

        if (this.options.onDisplay) {
          this.options.onDisplay();
        }
      }
    };

    this.hideAlert = function () {
      var cAlert = document.getElementById(this.getHeaderId());
      this.getParentNode().removeChild(cAlert);

      if (this.options.onHide) {
          this.options.onHide();
      }
    };

    this.getHeaderId = function () {
      return this.options.name + '_cAlert';
    };

    this.init();
};

CookieLaw.icons = {
    info: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAThJREFUeNqk07tKQ0EQxvFEvJuIEBt9AttgLGKleAGrFBYaEAQLIVVAsdRCRLGzUrCwEAWbI/gEXipFfAJFSCfES4iCYGKO/4UZGZZT6cAvkN39dnN2TuJhGMb+Ws3uY2//QL+3YQIzyCCFd1zhGBeou4WFxYVYk9moB9s4xRwGUMUT8jjDGro0oOF2rKOIFrNhAZMI0IlVrOgv1vC4LPTLBcfQZ8aWkLXhvO4m9YUbjOAQo2YuiWkbHvROjOMEs3JRfg3ZcNKbdM+dxiPuIsLdNlyJWHCPVj3Fq1cbvvUmq9JT176piPC1DR/h00y+oIQ3PMgF2rnAhi+xYxb0S8+H5Zm/ZbyBTb0HbU9NBt0Jy0hIP+fl8jrwjC3s6ma2tx/YwDly8iL0oizvdiAnNn77+Z9/1Y8AAwDPyUK2+0sSjAAAAABJRU5ErkJggg==',
    close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARlJREFUeNqUkrFqhEAQhvckWCVduMIi2BpQwcLCpDyuy2PcvYCN+CiB9BZqpcUR0gUEWx9CkRzkimtUnMxu3GVPr0gGPtjZnZ+Z/XdXAED+Gzez/BbZIxtkjXwh78gb8i2qaKeJJ6SB69EiG17LBY/IiZ72fX9RPQwDX54RSxYd6G4cx2DbNjTNb8O2bcFxHIiiiAs/uUhDRrqTZRmoqgqGYUBVVWBZFsuTJJGbP5BpVhFcqCjKNQGNF2Vup+u6RNd1Mo4j0TSNeJ639Fwej97BNE3WIQgCMWpd14vxhBFhGLLCNE3ZaZ7nLPd9f2GEsJzaWxTFxQXKsoSu67jltiyiPP/1cVezv3eH7JAtco8ckQ/kVf5GPwIMAFhkkB5Ap5/mAAAAAElFTkSuQmCC'
};
CookieLaw.o = {};
