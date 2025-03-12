async function handleForm(elem,e){
    e.preventDefault();
    const data = new FormData(elem);
    const payload = {};
    data.forEach((v,k)=>{
        payload[k] = v;
    });
    
    const req = await fetch(elem.action,{method:"POST",headers:{"token":window.localStorage.getItem("token")},body:JSON.stringify(payload)});
    const res = await req.json();
    if(res.status){
        if(elem.action.includes("signup")){
            localStorage.setItem("token",res.token);
            alert(res.message);
            window.location.href = "./dashboard.html";
        }
    }else{
        alert(res.message);
    }
    console.log(res);
}