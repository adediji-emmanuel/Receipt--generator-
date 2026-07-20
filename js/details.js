/* ==========================================
            GET RECEIPT DATA
========================================== */

const receipt = JSON.parse(sessionStorage.getItem("receipt"));

if (!receipt) {

    window.location.href = "index.html";

}

/* ==========================================
            ELEMENTS
========================================== */

const recipientNameText = document.getElementById("recipientNameText");
const amountText = document.getElementById("amountText");

const recipientDetails = document.getElementById("recipientDetails");
const bankText = document.getElementById("bankText");
const accountText = document.getElementById("accountText");

const transactionText = document.getElementById("transactionText");
const referenceText = document.getElementById("referenceText");
const sessionText = document.getElementById("sessionText");

const dateText = document.getElementById("dateText");

const backBtn = document.getElementById("backBtn");
const shareBtn = document.getElementById("shareBtn");

/* ==========================================
            FORMAT DATE
========================================== */

function formatDate(dateString){

    const date = new Date(dateString);

    return date.toLocaleString("en-NG",{

        weekday:"short",

        day:"numeric",

        month:"short",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit"

    });

}

/* ==========================================
            DISPLAY DATA
========================================== */

recipientNameText.textContent = receipt.recipient;

amountText.textContent =
"₦" +
Number(receipt.amount.replace(/,/g,""))
.toLocaleString("en-NG",{

minimumFractionDigits:2

});

recipientDetails.textContent =
receipt.recipient;

bankText.textContent =
receipt.bank;

accountText.textContent =
receipt.account;

transactionText.textContent =
receipt.transaction;

referenceText.textContent =
receipt.reference;

sessionText.textContent =
receipt.session;

dateText.textContent =
formatDate(receipt.date);

/* ==========================================
        COPY TRANSACTION NUMBER
========================================== */

transactionText.style.cursor = "pointer";

transactionText.title = "Tap to copy";

transactionText.onclick = () => {

navigator.clipboard.writeText(receipt.transaction);

alert("Transaction number copied.");

};

/* ==========================================
            BUTTONS
========================================== */

backBtn.onclick = () => {

window.location.href = "index.html";

};

shareBtn.onclick = () => {

window.location.href = "receipt.html";

};