const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const port = process.env.PORT || 4000;
require('./Database/config');
const Products = require('./Database/ProductSchema');
const User = require('./Database/RegSchema');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const multer = require('multer');

/*
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dp2exjpd5',
    api_key: '316518569685867',
    api_secret: 'SgGAXDguhnjO_hLofSS7ztOZfyY',
    secure: true
});

const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
}).single("photo");

app.use('/uploads', express.static('uploads'));
*/


app.post('/register', jsonParser, async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        res.send("Email already registered");
    } else if (req.body.email == "") {
        res.send("Email Required");
    }
    else {
        let data = new User({

            _id: Math.floor(Math.random() * 1000000000),
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            image: "",
        })
        let user = await data.save();
        user = user.toObject();
        delete user.password;
        res.send(user)
    }
})

app.post('/login', jsonParser, async (req, res) => {

    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select('-password');
        if (user) {
            res.send(user);
        } else {
            res.send("Please signup");
        }
    } else {
        res.send("Enter correct Email and Password");
    }
})

app.get('/getID/:email', async (req, res) => {

    const allData = await User.findOne({ email: req.params.email });

    if (allData) {
        res.json(allData._id);
    } else {
        res.json("Invalid Email Id")
    }
})

app.put('/forgotPass/:_id', jsonParser, async (req, res) => {

    let data = await User.updateOne(
        { _id: req.params._id }, { $set: req.body }
    );
    res.send(data);
})

app.put('/changePass/:_id', jsonParser, async (req, res) => {

    let data = await User.updateOne(
        { _id: req.params._id }, { $set: req.body }
    );
    res.send(data);
})


app.delete('/:email', async (req, res) => {

    const user = await User.findOne({ email: req.params.email });
    const data = await User.deleteOne({ email: req.params.email });

    if (user) {
        res.send(data);
    } else {
        res.send("Already deleted");
    }
})

/////////////Images/////////////
/*
app.put('/upload/:_id',upload, async (req, res) => {

    let result = await cloudinary.uploader.upload(req.file.path);

    let data = await User.updateOne(
        { _id: req.params._id }, { image:result.url }
    );
    res.send(data)
})


app.get('/:_id', async (req, res) => {

    const allData = await User.find({ _id: req.params._id });
    res.json(allData);
})


app.put('/remove/:_id', async (req, res) => {

    let data = await User.updateOne(
        { _id: req.params._id }, { image: "" }
    );
    res.send(data);

})
*/

///////////////List/////////////

app.post('/add-Product', jsonParser, async (req, res) => {
    let data = new Products(req.body);
    let products = await data.save();
    res.send(products)

})


app.get('/list-Product', async (req, res) => {

    let data = await Products.find({});

    if (data.length > 0) {
        res.send(data)
    } else {
        res.send("No data found");
    }

})


app.get('/update-Product/:_id', async (req, res) => {

    let data = await Products.find({ _id: req.params._id });

    if (data.length > 0) {
        res.send(data)
    } else {
        res.send("No data found");
    }

})

app.put('/update-Product/:_id', jsonParser, async (req, res) => {

    let result = await Products.updateOne(
        { _id: req.params._id },
        { $set: req.body }
    )
    res.send(result);
})

app.delete('/delete-Product/:_id', async (req, res) => {

    let data = await Products.deleteOne({ _id: req.params._id });
    res.send(data);


})

app.get('/search/:key', async (req, res) => {

    const data = await Products.find({

        '$or': [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
        ]
    });
    res.send(data);
})



////////////extra == register candidate list

app.get('/userRegister', async (req, res) => {
    const allData = await User.find({});

    if (allData.length > 0) {
        res.json(allData);
    } else {
        res.send("No data found");
    }

})


app.listen(port, () => {
    console.log(`from port ${port}`)

})