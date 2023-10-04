import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_key = "bb3ce0145772a14ef1c47caf";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let amount = 0;
let result = 0;
let chosen_currency = "";
let exchanged_currency = "";
let success = true;

app.get("/", (req, res) => {
    res.render("index.ejs", {currency_list: currency_list, amount: amount, result: result, chosen_currency: chosen_currency, exchanged_currency: exchanged_currency, success: success});
    amount = 0;
    result = 0;
    chosen_currency = "";
    exchanged_currency = "";
    success = true;
});

app.post("/submit", async (req, res) => {
    console.log(req.body);
    try {
        chosen_currency = req.body["chosen-currency"];
        exchanged_currency = req.body["exchanged-currency"];
        amount = req.body["amount"];
        if (chosen_currency == "" || exchanged_currency == "" || amount == 0) {
            success = false;
        } else {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_key}/latest/${chosen_currency}`);
            const preResult = response.data.conversion_rates[exchanged_currency] * parseFloat(amount);
            result = Math.round(preResult * 10) / 10.0;
            success = true;
        }
        res.redirect("/");
    } catch(error) {
        console.log(error.response.data);
        res.send(error.response.data);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const currency_list = [
    {code: "AUD", name: "Australian Dollar", country: "Australia"},
    {code: "CNY", name: "Chinese Renminbi", country: "China"},
    {code: "CZK", name: "Czech Koruna", country: "Czech Republic"},
    {code: "EUR", name: "Euro", country: "European Union"},
    {code: "GBP", name: "Pound Sterling", country: "United Kingdom"},
    {code: "INR", name: "Indian Rupee", country: "India"},
    {code: "JPY", name: "Japanese Yen", country: "Japan"},
    {code: "KRW", name: "South Korean Won", country: "South Korea"},
    {code: "KWD", name: "Kuwaiti Dinar", country: "Kuwait"},
    {code: "LAK", name: "Lao Kip", country: "Laos"},
    {code: "MYR", name: "Malaysian Ringgit", country: "Malaysia"},
    {code: "RUB", name: "Russian Ruble", country: "Russia"},
    {code: "SGD", name: "Singapore Dollar", country: "Singapore"},
    {code: "THB", name: "Thai Baht", country: "Thailand"},
    {code: "USD", name: "United States Dollar", country: "United States"},
    {code: "VND", name: "Vietnamese Đồng", country: "Vietnam"}
]