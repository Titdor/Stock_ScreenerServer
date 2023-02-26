const axios = require('axios');
const ScreenerData = require("../models/screenerData");
const graphData = require("../models/graphData")
//API_KEY_AVTANGE=BT5N10468PSOCERA;
//API_KEY_TWELVE_DATA=11b97b8226cd4e7b9551b488439f4193;

/* POST FOR FETCHING TABLE DATA */
exports.createDailyDataPost = async (req,res,next) => {
    const word = req.body.search;
    console.log(word);
    await Promise.all([axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${word}&apikey=BT5N10468PSOCERA`),
    axios.get(`https://api.twelvedata.com/logo?symbol=${word}&apikey=11b97b8226cd4e7b9551b488439f4193`),
    axios.get(`https://api.polygon.io/v3/reference/tickers/${word}?apiKey=lGJoJklPo8D1i5s1SQcynN8uP9h5fjZt`)])
    .then( results => {
      console.log(results[2].data);
        const data = new ScreenerData({
            symbol: results[0].data['Global Quote']['01. symbol'],
            date: results[0].data['Global Quote']['07. latest trading day'],
            open: results[0].data['Global Quote']['02. open'],
            high: results[0].data['Global Quote']['03. high'],
            low: results[0].data['Global Quote']['04. low'],
            volume: results[0].data['Global Quote']['06. volume'],
            price: results[0].data['Global Quote']['05. price'],
            change: results[0].data['Global Quote']['09. change'],
            changePercent:results[0].data['Global Quote']['10. change percent'],
            logo: results[1].data.url,
            name: results[2].data.results.name,
            industry: results[2].data.results.sic_description,
            currency: results[2].data.results.currency_name
        }); 
        data.save();
        res.send(data);
    });
}

/* POST FOR FETCHING GRAPH DATA */
exports.createGraphDataPost = async (req,res,next) => {
    const word = req.body.search
    console.log(word);
    await axios.get(`https://api.twelvedata.com/time_series?symbol=${word}&interval=1day&apikey=11b97b8226cd4e7b9551b488439f4193`)
    .then(results => {
        const data = new graphData({
            symbol: results.data.meta.symbol,
            values: results.data.values
        });
        data.save();
        res.send(data);
    })
}

exports.createDefaultGraphDataPost = async (req,res,next) => {
    await axios.get("https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=11b97b8226cd4e7b9551b488439f4193")
    .then(results => {
        const data = new graphData({
            symbol: results.data.meta.symbol,
            values: results.data.values
        });
        data.save();
        res.send(data);
    });
}

exports.createDefaultDailyDataPost = async (req,res,next) => {
    await Promise.all([axios.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=BT5N10468PSOCERA"),
    axios.get(`https://api.polygon.io/v3/reference/tickers/AAPL?apiKey=lGJoJklPo8D1i5s1SQcynN8uP9h5fjZt`)])
    .then( results => {
      console.log(results[1].data);
        const data = new ScreenerData({
            symbol: results[0].data['Global Quote']['01. symbol'],
            date: results[0].data['Global Quote']['07. latest trading day'],
            open: results[0].data['Global Quote']['02. open'],
            high: results[0].data['Global Quote']['03. high'],
            low: results[0].data['Global Quote']['04. low'],
            volume: results[0].data['Global Quote']['06. volume'],
            price: results[0].data['Global Quote']['05. price'],
            change: results[0].data['Global Quote']['09. change'],
            changePercent: results[0].data['Global Quote']['10. change percent'],
            name: results[1].data.results.name,
            industry: results[1].data.results.sic_description,
            currency: results[1].data.results.currency_name
        }); 
        data.save();
        res.send(data);
    });
}


/* GET FOR FETCHING TABLE DATA */
exports.getDailyDataPost = async (req,res,next) => {
     const data= await ScreenerData.findOne().sort({createdAt:-1});
     console.log(data);
     res.send(data);
 }


/* GET FOR FETCHING GRAPH DATA */
 exports.getGraphDataPost = async (req,res,next) => {
     const data = await graphData.findOne().sort({createdAt:-1});
    console.log(data);
     res.send(data);
 }

// exports.getDefaultDailyDataPost = async (req,res,next) => {
//     const data= await ScreenerData.findOne().sort({createdAt:-1});
//     res.json(data);
    
// }

// exports.getDefaultGraphDataPost = async (req,res,next) => {
//     const data = await graphData.findOne().sort({createdAt:-1});
// }

