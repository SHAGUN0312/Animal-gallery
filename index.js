const express = require("express")
const app = new express()
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.set("view engine", "ejs");

app.get("/", async(req, res) => {
	res.send("This is working.")
})

app.use("/time", async(req, res) => {
	res.send(`Date: ${new Date(Date.now()).toISOString().split('T').slice(0,1).join()}`)
})

const animals = [
  {
    id: 1,
    name: "CAT"
  },
  {
    id: 2,
    name: "DOG"
  },
  {
    id: 3,
    name: "DOLPHIN"
  },
  {
    id: 4,
    name: "PIG"
  },
  {
    id: 5,
    name: "ELEPHANT"
  },
  {
    id: 6,
    name: "LION"
  },
  {
    id: 7,
    name: "TIGER"
  },
  {
    id: 8,
    name: "SHARK"
  },
  {
    id: 9,
    name: "RAT"
  },
  {
    id: 10,
    name: "MOUSE"
  },
  {
    id: 11,
    name: "FROG"
  },
  {
    id: 12,
    name: "YAK"
  },
  {
    id: 13,
    name: "HORSE"
  },
  {
    id: 14,
    name: "DONKEY"
  },
  {
    id: 15,
    name: "KANGAROO"
  },
  {
    id: 16,
    name: "WHALE"
  },
  {
    id: 17,
    name: "CROCODILE"
  },
  {
    id: 18,
    name: "TURTLE"
  },
  {
    id: 19,
    name: "BUFFALO"
  },
  {
    id: 20,
    name: "OX"
  }
];

app.get("/animals", (req, res) => {
  res.json(animals);
});

app.get("/animals/paginate", paginatedResults(animals), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
	return (req, res, next) => {
		console.log(res)
		const page = parseInt(req.query.page);
		const page_size = parseInt(req.query.page_size);

		const startIndex = (page - 1) * page_size;
		const endIndex = page * page_size;

		const results = {};
		if(endIndex < model.length) {
			results.next = {
				page: page + 1,
				page_size: page_size
			};
		}

		if(startIndex > 0) {
			results.previous = {
				page: page - 1,
				page_size: page_size
			};
		}

		results.results = model.slice(startIndex, endIndex);

		res.paginatedResults = results;
		next();		
	};
}

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
});