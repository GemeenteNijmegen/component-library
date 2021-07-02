import '../vendor/js/aria.switch';

var selector = '[data-check-switch]';
var elList = document.querySelectorAll(selector);
var i;
for (i = 0; i < elList.length; i++) {
    var a11ySwitch = new A11YswitchCheck();
    a11ySwitch.init(elList[i]);
}
