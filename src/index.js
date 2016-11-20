import canonize from './canonize';
import express from 'express';
import corsAccess from 'cors';


let app = express();
app.use(corsAccess());
app.get('/', (req, res) => {


//
//    const arUrl = [
//        'username=https://vk.com/skillbranch',
//        'username=//vk.com/skillbranch',
//        'username=skillbranch',
//        'username=https://vk.com/skillbranch?w=wall-117903599_1076'
//    ];
//
//
//    arUrl.forEach((url) => {
//        let un = canonize(url);
//        if (!!un) {
//            console.log('@' + un);
//        }
//        else {
//            console.log('Invalid username');
//        }
//    });


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

app.get('/2a/', (req, res) => {

    // res.sendStatus(200);

    let a = +(!!req.query && 'a' in req.query ? req.query.a : 0);
    let b = +(!!req.query && 'b' in req.query ? req.query.b : 0);
    let r = a + b;

    console.log(`a = ${a} & b = ${b} result = ${r}`);
    return res.send('' + r);

});

app.get('/2b/', (req, res) => {

    // res.sendStatus(200);

    let r = 'Invalid fullname';
    let fullname = ('query' in req && !!req.query.fullname ? req.query.fullname : '');
    let m = fullname.split(' ');

    //ИОФ , ИФ, Ф  => ФИО
    switch (m.length) {
        case 3:
        {
            r = m[2] + ' ' + m[0].substr(0, 1) + '. ' + m[1].substr(0, 1) + '.';
            break;
        }
        case 2:
        {
            r = m[1] + ' ' + m[0].substr(0, 1) + '.';
            break;
        }
        case 1:
        {
            if (m[0].length) {
                r = m[0];
            }
            break;
        }
    }

    var bOk = true;
    m.forEach((i) => {
        if(/\d+/.test(i))
        {
            bOk = false;
        }
    });
    if(!bOk)
    {
        r = 'Invalid fullname';
    }
    

    console.log(`${r} => ${fullname}`);
    return res.send(r);

});

app.listen(3000);