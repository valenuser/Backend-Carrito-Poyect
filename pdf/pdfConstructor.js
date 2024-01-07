const { createWriteStream } = require('fs');

const env = require('dotenv')

const  PDFDocument  = require('pdfkit')

const buildPDF = (datos,username) =>{
    const doc = new PDFDocument();
    doc.pipe(createWriteStream(__dirname+'/receive.pdf'))  


    const precioFinal = datos[datos.length-1].precioFinal

    datos.pop()

    const routeImg = env.config().parsed.routeImg

    doc.image(routeImg, 250, 1, {width: 100, height: 100})
    doc.moveDown()
    doc.moveDown()
    doc.moveDown()
    doc.fontSize(25).text(`Summary of your purchase: ${username}`,{
        width:410,
        align:'center'
    })

    doc.moveDown()
    datos.forEach(el =>{
        doc.fontSize(15).text(`Product: ${el.product_name}   -   Quantity: ${el.quantity}   -   Price: ${el.precio}€`,{
            width:600,
            align:'start'
        })
        doc.moveDown()
    })

    doc.moveDown()
    doc.fontSize(15).text(`Final Price: ${precioFinal}€`,{
        width:410,
        align:'start'
    })

    doc.moveDown()
    doc.moveDown()
    doc.fontSize(18).text(`Thanks for trusting us!`,{
        width:410,
        align:'start'
    })

    doc.end()
}

module.exports = buildPDF