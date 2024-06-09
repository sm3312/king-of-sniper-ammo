const apiReq = new Request ( "https://api.perpheads.com/v2/city/info" );
let salesTax = 10;
const taxrate = document.getElementById("taxrate");
const st = document.getElementById("subtotal");
const tf = document.getElementById("taxfee");
const cf = document.getElementById("chestfee");
const cft = document.getElementById("cftax");
const gt = document.getElementById("grandtotal");
const ammo = document.getElementById("ammo");

fetch(apiReq)
    .then((response) => response.json())
    .then((res) => {
        salesTax = res.salesTax
        taxrate.textContent = "(" + salesTax + "%)";
        calculateCost();
    });

function calculateCost() {
    if (ammo.value < 1 || ammo.value > 200) return;
    const xbreakpoints = [1, 10, 25, 50, 100, 200];
    const ybreakpoints = [4700, 4200, 4100, 4000, 3800, 3750];

    if (xbreakpoints.includes(ammo.value)) {
        var price = ybreakpoints[xbreakpoints.findIndex((x) => x == ammo.value)];
    } else {
        let highprice = xbreakpoints.findIndex((x) => x > ammo.value);
        let lowprice = highprice - 1;
        let highbreak = xbreakpoints[highprice];
        let lowbreak = xbreakpoints[lowprice];
        highprice = ybreakpoints[highprice];
        lowprice = ybreakpoints[lowprice];

        let diff = ammo.value - lowbreak;
        let range = highbreak - lowbreak;
        let pricediff = highprice - lowprice;
        let customdiff = pricediff * (diff/range);
        var price = lowprice + customdiff;
    }

    let subtotal = price * ammo.value;
    let taxamount = subtotal * (salesTax/100);
    if (ammo.value > 12) {
        var chestamount = 6000;
        var cftax = 6000 * salesTax/100;
    } else {
        var chestamount = 0;
        var cftax = 0;
    }
    let grandtotal = subtotal + taxamount + cftax + chestamount;



    seps = (x) => Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    st.textContent = seps(subtotal) + "$";
    tf.textContent = seps(taxamount) + "$";
    cf.textContent = seps(chestamount) + "$";
    cft.textContent = seps(cftax) + "$";
    gt.textContent = seps(grandtotal) + "$";
    
}

addEventListener("change", (e) => calculateCost());

calculateCost();