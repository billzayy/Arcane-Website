const express = require('express');
const path = require('path');
const app = express();

// Import files
const sql = require('./sql')

app.use(express.static(path.join(__dirname + '/src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/login.html');
})

app.get('/login/:username/:password/:email', (req, res) => {
    var userName = req.params['username'];
    var password = req.params['password'];
    var email = req.params['email'];

    sql.conSQL(`INSERT INTO Login (username, password, email) VALUES ('${userName}', '${password}', '${email}')`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/category', (req, res) => {
    res.sendFile(__dirname + '/src/category.html')
})

app.get('/detail', (req, res) => {
    res.sendFile(__dirname + '/src/detail.html')
})

app.get('/api/detail/:id', (req, res) => {
    var id = req.params['id'];
    sql.conSQL(`SELECT * FROM PRODUCT WHERE Id_Product = ${id}`, (recordset) => {
        res.send(recordset);
    })
})

app.get('/api/product', (req, res) => {
    sql.conSQL("Select * from Product", (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/login', (req, res) => {
    sql.conSQL("Select * From Login", (recordset) => {
        res.send(recordset)
    })
})

app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/src/cart.html')
})

app.get('/api/cart', (req, res) => {
    sql.conSQL("Select * From Bills", (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/cart/:product/:client/:date', (req, res) => {
    var idProduct = req.params['product'];
    var idClient = req.params['client'];
    var date = req.params['date'];

    sql.conSQL(`Insert into Bills(Id_Product, Id_Client,B_BuyDate) Values (${idProduct},${idClient}, '${date}')`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/cart/info/:idBill/:product/:sumPrice/:quantity/:discount/:delivery', (req, res) => {
    var idBill = req.params['idBill'];
    var idProduct = req.params['product'];
    var sumPrice = req.params['sumPrice'];
    var quantity = req.params['quantity'];
    var discount = req.params['discount'];
    var delivery = req.params['delivery'];

    sql.conSQL(`Insert into Bills_Info(Id_Bill, Id_Product, P_SumPrice, B_Quantity, B_Discount, B_Delivery) Values (${idBill},${idProduct},${sumPrice},${quantity},${discount},'${delivery}')`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/shoppingcart/:client', (req, res) => {
    var client = req.params['client']
    sql.conSQL(`select * from ShoppingCart S 
                Left join Product P 
                on S.Id_Product = P.Id_Product
                where S.Id_Client = ${client}`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/shoppingcart/add/:client/:product', (req, res) => {
    var idClient = req.params['client'];
    var idProduct = req.params['product'];
    sql.conSQL(`Insert into ShoppingCart Values (${idClient},${idProduct})`, (recordset) => {
        res.send(recordset)
    })
})

app.listen(3000, () => {
    console.log("listening on 3000")
})
