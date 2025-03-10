var content = "index";
switch(window.location.href.toString().split("/")[window.location.href.toString().split("/").length - 1].split("?")[0]){
    case "dashboard.html":
        content = "dashboard";
       // alert("dashboard block");
        if(window.localStorage.getItem("token") == null || window.localStorage.getItem("token") == ""){
            window.location = "./";
        }
        
    break;
    case "contact.html":
        content = "contact";
    break;
    case "about.html":
        content = "about";
    break;
    case "login.html":
        content = "login";
    break;
    case "registration.html":
        content = "registration";
    break;
    
}



App("app").head("./app/head")
   .body("./app/header")
   .body("./app/"+content,"body")
   .script("./app/script")
   .run(() => console.log("All content loaded"));
   
  
 

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