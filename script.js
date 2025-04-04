async function handleForm(elem,e){
    e.preventDefault();
    let btnClicked = null;
     sf(elem);
    for(let i = 0; i < elem.children.length; i++){
          
          if(elem.children[i].getAttribute("clicked") == 1){
              btnClicked = elem.children[i];
              btnClicked.style.background = "green";
              btnClicked.textContent = "working...";
              btnClicked.disabled = true;
          }
      }
    const data = new FormData(elem);
    const payload = {};
    data.forEach((v,k)=>{
        payload[k] = v;
    });
    
    const req = await fetch(elem.action,{method:"POST",headers:{"token":window.localStorage.getItem("token")},body:JSON.stringify(payload)});
    const res = await req.json();
    console.log(res);
    if(res.status){
        if(elem.action.includes("signup") || elem.action.includes("signin")){
            window.localStorage.setItem("token",res.token);
            window.localStorage.setItem("user_acct_info",JSON.stringify(res.balance));
            window.location.href = "./dashboard.html";
        }
          Swal.fire({
            icon: "success",
            text: res.message
          });
    }else{
        Swal.fire({
            icon: "error",
            text: res.message
          });
    }

}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function sf(elem){
       for(let i = 0; i < elem.children.length; i++){
           
          elem.children[i].onclick = function(){
          elem.children[i].setAttribute("clicked",1);    
          } 
          elem.children[i].setAttribute("clicked",0);
      }
  }