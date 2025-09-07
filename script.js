const URL = "https://latest.currency-api.pages.dev/v1/currencies";

const fromdropDown = document.querySelector(".from select");
const todropDown = document.querySelector(".to select");

const flag2 = document.querySelector(".img2");
const flag1 = document.querySelector(".img1");

const btn = document.querySelector(".btn");

const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
        
    newOption.value = currCode;
    // console.log(newOption.innerText);
    fromdropDown.append(newOption);
    if(currCode === "USD" ){
        newOption.selected = true;
    }

    let newOption1 = document.createElement("option");
    newOption1.innerText = currCode;
        
    newOption1.value = currCode;
    // console.log(newOption1.innerText);
    todropDown.append(newOption1)
    if(currCode === "INR" ){
        newOption1.selected = true;
    }

}

fromdropDown.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })

const updateFlag = (element) =>{
    let currCode = element.value;
    let curCode = countryList[currCode];
    flag1.src = `https://flagsapi.com/${curCode}/flat/64.png`
}

todropDown.addEventListener("change" , (evt) => {
        updateFlag1(evt.target);
    });
    
    const updateFlag1 = (element) =>{
    let currCode = element.value;
    let curCode = countryList[currCode];
    flag2.src = `https://flagsapi.com/${curCode}/flat/64.png`
}

btn.addEventListener("click" ,async (evt)=>{
    evt.preventDefault();
    let amt  = document.querySelector("form input");
    let amtVal = amt.value;
    if(amtVal < 1 || amtVal ===""){
        amtVal = 1;
        amt.value = "1";
    }
    const url = `${URL}/${from.value.toLowerCase()}.json`;
    try{
    const response = await fetch(url);
    let data =  await response.json();
    // console.log(data);
    const rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    const amt1 = rate*amtVal;
    msg.innerText = `${amtVal} ${from.value} = ${amt1} ${to.value}`;
    }catch(error){
        console.error("Error fetching exchange rate: ",error);
        msg.innerText = "⚠️ Failed to fetch data. Please check your internet.";
    }
});

