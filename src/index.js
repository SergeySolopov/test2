import canonize from './canonize';
import express from 'express';
import corsAccess from 'cors';

//
const arUrl = [
    'username=https://vk.com/skillbranch',
    'username=//vk.com/skillbranch',
    'username=skillbranch',
    'username=https://vk.com/skillbranch?w=wall-117903599_1076'
];


arUrl.forEach((url) => {
    let un = canonize(url);
    if (!!un) {
        console.log('@' + un);
    }
    else {
        console.log('Invalid username');
    }
});

let app = express();
app.use(corsAccess());
app.get('/', (req, res) => {

    let url = req.query.username;
    let un = canonize(url);
    let username = 'Invalid username';
    if (!!un) {
        username = '@' + un;
    }

    console.log(`${username} from ${url}`);

    //return res.json({
    //    "url": url,
    //    "username": username
    //});
     return res.send(username);

});

app.listen(3000);