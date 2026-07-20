/* =====================================
        INPUT ELEMENTS
===================================== */

const recipientName = document.getElementById("recipientName");
const bank = document.getElementById("bank");
const accountNumber = document.getElementById("accountNumber");
const amount = document.getElementById("amount");
const senderName = document.getElementById("senderName");
const dateTime = document.getElementById("dateTime");

const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");

/* =====================================
        SET TODAY'S DATE
===================================== */

window.onload = () => {

    const now = new Date();

    const offset = now.getTimezoneOffset();

    const local = new Date(
        now.getTime() - (offset * 60000)
    );

    dateTime.value = local
        .toISOString()
        .slice(0,16);

};

/* =====================================
        FORMAT AMOUNT
===================================== */

amount.addEventListener("input", function(){

    let value = this.value.replace(/,/g,"");

    if(value === "") return;

    if(isNaN(value)){

        value = value.replace(/\D/g,"");

    }

    this.value = Number(value).toLocaleString("en-NG");

});

/* =====================================
    ACCOUNT NUMBER
===================================== */

accountNumber.addEventListener("input",function(){

    this.value = this.value.replace(/\D/g,"");

    if(this.value.length > 10){

        this.value = this.value.slice(0,10);

    }

});

/* =====================================
        RANDOM NUMBER
===================================== */

function randomNumbers(length){

    let result = "";

    for(let i = 0; i < length; i++){

        result += Math.floor(Math.random()*10);

    }

    return result;

}

/* =====================================
    GENERATE TRANSACTION
===================================== */

function generateReceipt(){

    if(

        recipientName.value.trim() === "" ||

        bank.value === "" ||

        accountNumber.value.length !== 10 ||

        amount.value.trim() === "" ||

        senderName.value.trim() === ""

    ){

        alert("Please complete all fields.");

        return;

    }

    const transactionNumber = randomNumbers(16);

    const referenceNumber =

        "TRX" +

        randomNumbers(12);

    const sessionID =

        randomNumbers(12);

    const receipt = {

        recipient:recipientName.value,

        bank:bank.value,

        account:accountNumber.value,

        amount:amount.value,

        sender:senderName.value,

        date:dateTime.value,

        transaction:transactionNumber,

        reference:referenceNumber,

        session:sessionID,

        paymentMethod:"OWealth",

        status:"Successful"

    };

    sessionStorage.setItem(

        "receipt",

        JSON.stringify(receipt)

    );

    loading.classList.add("active");

    setTimeout(()=>{

        window.location.href="details.html";

    },1500);

}

generateBtn.addEventListener(

"click",

generateReceipt

);