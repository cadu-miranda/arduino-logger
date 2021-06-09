const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const http = require('http')
const fs = require('fs')

const portaServidor = 3000
const portaSerial = '/dev/ttyUSB0'

try {

    const index = fs.readFileSync('index.html')

    const serial = new SerialPort(portaSerial, {

        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1
    })

    const parser = serial.pipe(new Readline({

        delimiter: '\r\n'
    }))

    const app = http.createServer((req, res) => {

        res.writeHead(200)
        res.end(index)
    })

    const io = require('socket.io')(app)

    io.on('connection', socket => {

        console.log('Node.js está escutando.')
    })

    parser.on('data', data => {

        // console.log(data)
        io.emit('data', data)

        const timestamps = new Date()

        fs.appendFile('log.txt', `${data}, ${timestamps}\n`, (err) => {

            if (err)

                return console.log(err)
        })
    })

    app.listen(portaServidor)

} catch (error) {

    console.log(error)
}