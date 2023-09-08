const qrcode = require('qrcode-terminal');
const util = require('util')
const { Client, LocalAuth } = require('whatsapp-web.js');
const moment = require('moment')

const client = new Client({
    authStrategy: new LocalAuth()
});
const iterasi = async () => {
    const tanggal = moment().utc().format('YYYY-MM-DD HH:mm:ss')
    if(tanggal == '2023-09-09 00:00:00'){
        // client.sendMessage('62nomor@c.us', 'pesan')
        client.sendMessage('62nomor@c.us', `Nama lengkap: MAHERZA ALFARIZKI ATHARRAZKA
Tanggal lahir: 13-09-2023
Jenis terapi: OT/TW
Nama terapis: Pak Faishal
Terapi ke: 1`)
    }

}
let interval = null

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('disconnected', (reason) => {
    clearInterval(interval);
    interval = null
})

client.on('ready', async () => {
    console.log('Client is ready!!');
    interval = setInterval(iterasi, 1000)
    // await client.sendMessage('6281281190887@c.us', 'tes kirim pesan')
    // console.log(util.inspect(myObject, false, null, true /* enable colors */))
});

client.on('message', msg => {
    // console.log('message: ',msg.body);
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();