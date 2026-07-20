/* ===========================================
        GET RECEIPT DATA
=========================================== */

const receipt = JSON.parse(sessionStorage.getItem("receipt"));

if (!receipt) {

    window.location.href = "index.html";

}

/* ===========================================
        ELEMENTS
=========================================== */

const receiptAmount = document.getElementById("receiptAmount");
const receiptDate = document.getElementById("receiptDate");

const receiptRecipient = document.getElementById("receiptRecipient");
const receiptSender = document.getElementById("receiptSender");

const receiptBank = document.getElementById("receiptBank");
const receiptAccount = document.getElementById("receiptAccount");

const receiptTransaction = document.getElementById("receiptTransaction");
const receiptReference = document.getElementById("receiptReference");
const receiptSession = document.getElementById("receiptSession");

const downloadBtn = document.getElementById("downloadBtn");
const backHome = document.getElementById("backHome");

const receiptCard = document.getElementById("receiptCard");

/* ===========================================
        FORMAT DATE
=========================================== */

function formatDate(dateString){

    const date = new Date(dateString);

    return date.toLocaleString("en-NG",{

        weekday:"short",

        day:"numeric",

        month:"long",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit"

    });

}

/* ===========================================
        DISPLAY DATA
=========================================== */

receiptAmount.textContent =
"₦" +
Number(receipt.amount.replace(/,/g,""))
.toLocaleString("en-NG",{

minimumFractionDigits:2

});

receiptDate.textContent =
formatDate(receipt.date);

receiptRecipient.textContent =
receipt.recipient;

receiptSender.textContent =
receipt.sender;

receiptBank.textContent =
receipt.bank;

receiptAccount.textContent =
receipt.account;

receiptTransaction.textContent =
receipt.transaction;

if (receiptReference) {
    receiptReference.textContent = receipt.reference || "";
}

if (receiptSession) {
    receiptSession.textContent = receipt.session || "";
}

/* ===========================================
        DOWNLOAD IMAGE
=========================================== */

downloadBtn.onclick = () => {

    html2canvas(receiptCard,{
    scale: window.devicePixelRatio * 6,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    allowTaint: true
}).then(canvas=>{

        const link = document.createElement("a");

        link.download =
        "OPay_Receipt_" +
        receipt.transaction +
        ".png";

        link.href =
        canvas.toDataURL("image/png");

        link.click();

    });

};

/* ===========================================
        SHARE IMAGE (If Supported)
=========================================== */

async function shareReceipt(){

    if(!navigator.share){

        return;

    }

    try{

        const canvas =
        await html2canvas(receiptCard,{

            scale:3,

            useCORS:true

        });

        canvas.toBlob(async(blob)=>{

            const file =
            new File(

                [blob],

                "receipt.png",

                {

                    type:"image/png"

                }

            );

            await navigator.share({

                title:"Transaction Receipt",

                files:[file]

            });

        });

    }

    catch(e){

        console.log(e);

    }

}

receiptCard.addEventListener(

"dblclick",

shareReceipt

);

/* ===========================================
        NEW RECEIPT
=========================================== */

backHome.onclick = () => {

    sessionStorage.removeItem("receipt");

    window.location.href =
    "index.html";

};
