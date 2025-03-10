async function putContent(file, place) {
    try {
        const targetElement = document.getElementsByTagName(place)[0];
        const req = await fetch(file);
        if (!req.ok) throw new Error(`HTTP error! Status: ${req.status}, File: ${file}`);
        const res = await req.text();
        targetElement.insertAdjacentHTML("beforeend", res);
    } catch (e) {
        alert(e);
        console.error(e);
    }
}

async function putScript(file) {
    try {
        const req = await fetch(file);
        if (!req.ok) throw new Error(`HTTP error! Status: ${req.status}, File: ${file}`);
        const res = await req.text();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = res;

        const scripts = tempDiv.getElementsByTagName("script");
        for (let script of scripts) {
            const newScript = document.createElement("script");
            if (script.src) {
                newScript.src = script.src;
                newScript.async = false; // Ensures scripts execute in order
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
        }
    } catch (e) {
        alert(e);
        console.error(e);
    }
}

class AppLoader {
    constructor() {
        this.queue = Promise.resolve();
    }

    load(file, place) {
        this.queue = this.queue.then(() => putContent(file, place));
        return this;
    }

    script(file) {
        this.queue = this.queue.then(() => putScript(file));
        return this;
    }

    finally(callback) {
        this.queue.finally(callback);
    }
}


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

const App = new AppLoader();
App.load("./app/head.jl", "head")
   .load("./app/header.jl", "body")
   .load("./app/"+content,"body")
   .script("./app/script.jl")
   .finally(() => alert("All content loaded"));
   
  
 

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