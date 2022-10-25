const express = require('express');
const path = require('path');
const app = express();

// Import files
const sql = require('./sql')

app.use(express.static(path.join(__dirname + '/src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/index.html");
})

// Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/login.html');
})

app.get('/login/:username/:password/:email', (req, res) => {
    var userName = req.params['username'];
    var password = req.params['password'];
    var email = req.params['email'];

    sql.conSQL(`INSERT INTO Login (username, password, email) VALUES ('${userName}', '${password}', '${email}')`, (recordset) => {
        res.send(recordset)
    })
})
app.get('/api/login', (req, res) => {
    sql.conSQL("Select * From Login", (recordset) => {
        res.send(recordset)
    })
})

// Category & Product
app.get('/category', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/category.html')
})

app.get('/api/product', (req, res) => {
    sql.conSQL("Select * from Product", (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/product/add/:name/:pic/:describe/:price/:page/:category/:gender/:sale/:material/:manufacture/:color/:content1/:content2', (req, res) => {
    var name = req.params['name'];
    var pic = req.params['pic'];
    var describe = req.params['describe'];
    var price = req.params['price'];
    var page = req.params['page'];
    var category = req.params['category'];
    var gender = req.params['gender'];
    var sale = req.params['sale'];
    var material = req.params['material'];
    var manufacture = req.params['manufacture'];
    var color = req.params['color'];
    var content1 = req.params['content1'];
    var content2 = req.params['content2'];

    sql.conSQL(`INSERT INTO Product(P_Name, P_Picture, P_Describe, P_Price, P_Page, P_Category, P_Gender, P_Sales, P_Material, P_Manufacture, P_Color, Content_1, Content_2) VALUES(${name},${pic},${describe},${price},${page},${category},${gender},${sale},${material},${manufacture},${color},${content1},${content2})`, (recordset) => {
        res.send(recordset);
    })
})

// Detail
app.get('/detail', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/detail.html')
})

app.get('/api/detail/:id', (req, res) => {
    var id = req.params['id'];
    sql.conSQL(`SELECT * FROM PRODUCT WHERE Id_Product = ${id}`, (recordset) => {
        res.send(recordset);
    })
})

// Shopping Cart
app.get('/cart', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/cart.html')
})

app.get('/api/shoppingcart/:client', (req, res) => {
    var client = req.params['client']
    sql.conSQL(`select * from ShoppingCart S 
                Left join Product P 
                on S.Id_Product = P.Id_Product
                where S.Id_Client = ${client}
                order by S.Id_Product ASC`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/shoppingcart/add/:client/:product/:quantity/:size', (req, res) => {
    var idClient = req.params['client'];
    var idProduct = req.params['product'];
    var quantity = req.params['quantity'];
    var size = req.params['size'];
    sql.conSQL(`Insert into ShoppingCart(Id_Client,Id_Product,Quantity,Size) Values (${idClient},${idProduct},${quantity},'${size}')`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/shoppingcart/update/quantity/:client/:product/:quantity/:size', (req, res) => {
    var idClient = req.params['client'];
    var idProduct = req.params['product'];
    var quantity = req.params['quantity'];
    var size = req.params['size'];
    sql.conSQL(`update ShoppingCart 
        set Quantity = ${quantity}, Size ='${size}'
        Where Id_Product = ${idProduct} AND Id_Client = ${idClient}`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/shoppingcart/remove/:product/:client', (req, res) => {
    var idProduct = req.params['product'];
    var idClient = req.params['client'];
    sql.conSQL(`DELETE FROM ShoppingCart WHERE Id_Product = ${idProduct} AND Id_Client = ${idClient}`, (recordset) => {
        res.send(recordset)
    })
})

// Bills
app.get('/api/bill/showApi', (req, res) => {
    sql.conSQL("Select * From Bills", (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/bill/info', (req, res) => {
    sql.conSQL("Select * From Bills_Info", (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/bill/add/:client/:date/:discount/:delivery/:price', (req, res) => {
    var idClient = req.params['client'];
    var date = req.params['date'];
    var discount = req.params['discount'];
    var delivery = req.params['delivery'];
    var price = req.params['price'];

    sql.conSQL(`Insert into Bills(Id_Client,B_BuyDate, B_Discount, B_Delivery, B_SumPrice) Values (${idClient}, '${date}', '${discount}', '${delivery}',${price})`, (recordset) => {
        res.send(recordset)
    })
})

app.get('/api/bill/info/add/:idBill/:product/:sumPrice/:quantity/:discount/:delivery', (req, res) => {
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

// Contact
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/contact.html')
})

app.get('/api/contact', (req, res) => {
    sql.conSQL("Select * FROM Contact", (recordset) => {
        res.send(recordset)
    })
})

// User
app.get('/user/profile', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/profile.html');
})

app.get('/api/profile/update/:idClient/:username/:fullname/:email/:password', (req, res) => {
    var idClient = req.params['idClient'];
    var userName = req.params['username'];
    var fullName = req.params['fullname'];
    var email = req.params['email'];
    var password = req.params['password'];

    sql.conSQL(`UPDATE Login SET UserName = '${userName}', Email = '${email}', Password = '${password}', FullName = '${fullName}' WHERE Id_Login = ${idClient}`, (recordset) => {
        res.send(recordset);
    })
})

app.get('/api/user/delete/:idClient', (req, res) => {
    var idClient = req.params['idClient'];
    sql.conSQL(`DELETE FROM Login Where Id_Login = ${idClient}`, (recordset) => {
        res.send(recordset);
    })
})

app.get('/user/history', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/history.html');
})

app.get('/user/setting', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/setting.html');
})

app.get('/admin/user_management', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/admin_login.html');
})

app.get('/admin/user_management/add/:username/:fullname/:email/:password', (req, res) => {
    var userName = req.params['username'];
    var password = req.params['password'];
    var email = req.params['email'];
    var fullName = req.params['fullname'];
    sql.conSQL(`INSERT INTO Login(UserName, Password, FullName, Email) VALUES('${userName}','${password}','${email}','${fullName}')`, recordset => {
        res.send(recordset);
    })
})

app.get('/admin/user_management/delete/:idClient', (req, res) => {
    var idClient = req.params['idClient'];
    sql.conSQL(`DELETE FROM Login Where Id_Login = ${idClient}`, recordset => {
        res.send(recordset);
    })
})

app.get('/admin/product_management', (req, res) => {
    res.sendFile(__dirname + '/src/HTML/admin_product.html');
})

app.listen(3000, () => {
    console.log("listening on 3000")
})
