import qr from "qr-image";

import fs from "node:fs"

var qr_svg = qr.image('I love QR!', { type: 'png' });
qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));