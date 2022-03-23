const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var data = [
  {
    "id": 1,
    "name": "Jolee Murkus",
    "email": "jmurkus0@jiathis.com",
    "gender": "Male",
    "phone": "109-650-8849",
    "address": "6705 Kropf Way"
  },
  {
    "id": 2,
    "name": "Morey Jopling",
    "email": "mjopling1@si.edu",
    "gender": "Female",
    "phone": "300-137-6154",
    "address": "82885 Texas Avenue"
  },
  {
    "id": 3,
    "name": "Garnette Nial",
    "email": "gnial2@hugedomains.com",
    "gender": "Male",
    "phone": "855-814-5249",
    "address": "1 Marquette Point"
  },
  {
    "id": 4,
    "name": "Janith Pelling",
    "email": "jpelling3@rambler.ru",
    "gender": "Female",
    "phone": "151-544-7028",
    "address": "126 Thierer Pass"
  },
  {
    "id": 5,
    "name": "Roxanne Blaiklock",
    "email": "rblaiklock4@cbsnews.com",
    "gender": "Female",
    "phone": "736-434-0147",
    "address": "8239 Eastlawn Way"
  },
  {
    "id": 6,
    "name": "Brok Rieger",
    "email": "brieger5@tinyurl.com",
    "gender": "Male",
    "phone": "221-807-7138",
    "address": "3845 La Follette Avenue"
  },
  {
    "id": 7,
    "name": "Camella Tenbrug",
    "email": "ctenbrug6@baidu.com",
    "gender": "Male",
    "phone": "917-201-0993",
    "address": "18 Goodland Avenue"
  },
  {
    "id": 8,
    "name": "Eal Toupe",
    "email": "etoupe7@canalblog.com",
    "gender": "Female",
    "phone": "894-459-9545",
    "address": "2 Gina Way"
  },
  {
    "id": 9,
    "name": "Dew Scotchmor",
    "email": "dscotchmor8@list-manage.com",
    "gender": "Female",
    "phone": "290-573-2266",
    "address": "57 Lien Street"
  },
  {
    "id": 10,
    "name": "Minetta Carss",
    "email": "mcarss9@t.co",
    "gender": "Male",
    "phone": "524-911-4968",
    "address": "00 Roth Plaza"
  },
  {
    "id": 11,
    "name": "Rolf Perin",
    "email": "rperina@hibu.com",
    "gender": "Male",
    "phone": "600-917-4112",
    "address": "13 Mifflin Avenue"
  },
  {
    "id": 12,
    "name": "Davon Ambrus",
    "email": "dambrusb@sfgate.com",
    "gender": "Male",
    "phone": "222-498-6483",
    "address": "4 Messerschmidt Center"
  },
  {
    "id": 13,
    "name": "Fayina Aymes",
    "email": "faymesc@domainmarket.com",
    "gender": "Male",
    "phone": "883-878-8148",
    "address": "24734 Milwaukee Place"
  },
  {
    "id": 14,
    "name": "Marrissa Hulcoop",
    "email": "mhulcoopd@sciencedaily.com",
    "gender": "Male",
    "phone": "148-876-4014",
    "address": "4317 Basil Parkway"
  },
  {
    "id": 15,
    "name": "Zorah Graysmark",
    "email": "zgraysmarke@macromedia.com",
    "gender": "Female",
    "phone": "631-245-1361",
    "address": "4 Novick Street"
  },
  {
    "id": 16,
    "name": "Stavros Pieter",
    "email": "spieterf@google.com.au",
    "gender": "Female",
    "phone": "648-183-2147",
    "address": "1125 Harper Terrace"
  },
  {
    "id": 17,
    "name": "Obidiah Cafferty",
    "email": "ocaffertyg@ow.ly",
    "gender": "Male",
    "phone": "838-945-4502",
    "address": "57277 Darwin Parkway"
  },
  {
    "id": 18,
    "name": "Bank Shearston",
    "email": "bshearstonh@ifeng.com",
    "gender": "Female",
    "phone": "532-113-6188",
    "address": "6 Del Mar Lane"
  },
  {
    "id": 19,
    "name": "Thalia Crabtree",
    "email": "tcrabtreei@slashdot.org",
    "gender": "Male",
    "phone": "918-351-4344",
    "address": "6525 Shasta Alley"
  },
  {
    "id": 20,
    "name": "Ingaberg Broscombe",
    "email": "ibroscombej@reverbnation.com",
    "gender": "Male",
    "phone": "290-634-2976",
    "address": "54 Waxwing Parkway"
  }
]
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/emr', (req, res) => res.send(JSON.stringify(data)))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .post('/emr', (req, res) => {
    new_record = {
      "id": data.length + 1,
      "name": req.body.name,
      "email": req.body.email,
      "gender": req.body.gender,
      "phone": req.body.phone,
      "address": req.body.address
    }
    if (new_record.name && new_record.email && new_record.gender && new_record.phone && new_record.address) {
      data.push(new_record)
      console.log(new_record)
      res.sendStatus(200)
    } else
      res.sendStatus(400)
  })
  .get('/emr/:id', (req, res) => {
    const id = req.params.id;
    res.send(JSON.stringify(data[id - 1]))
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}` + data))
