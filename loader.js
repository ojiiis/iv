var content = "index.jl";
switch(window.location.href.toString().split("/")[window.location.href.toString().split("/").length - 1].split("?")[0]){
    case "dashboard.html":
        content = "dashboard.jl";
       // alert("dashboard block");
        if(window.localStorage.getItem("token") == null || window.localStorage.getItem("token") == ""){
            window.location = "./";
        }
        
    break;
    case "contact.html":
        content = "contact.jl";
    break;
    case "about.html":
        content = "about.jl";
    break;
    case "login.html":
        content = "login.jl";
    break;
    case "registration.html":
        content = "registration.jl";
    break;
    
}


App("app").head("./app/head.jl")
   .body("./app/header.jl")
   .body("./app/"+content,"body")
   .script("./app/script.jl")
   .run(() => alert("All content loaded"));
   
  
 

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