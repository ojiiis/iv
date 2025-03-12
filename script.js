async function handleForm(elem,e){
    e.preventDefault();
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
            window.location.href = "./dashboard.html";
            window.localStorage.setItem("balance",JSON.stringify(res.balance));
        }
        alert(res.message);
    }else{
        alert(res.message);
    }
    console.log(res);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}