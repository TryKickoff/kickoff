const iconsDir = './assets/src/img/icons';
const fs = require('fs');
const icons = fs.readdirSync(iconsDir);

// loop through img/icons and require each
// any icons you add will be included in the webpack build automatically
icons.forEach((icon) => {
  if (icon.match(/\.(svg|gif|png|jpe?g)$/)) {
    require(iconsDir + '/' + icon);
  }
});
