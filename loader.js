async function putContent(file, place) {
    try {
        const targetElement = document.getElementsByTagName(place)[0];
        const req = await fetch(file);
        if (!req.ok) throw new Error(`HTTP error! Status: ${req.status}`);
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
        if (!req.ok) throw new Error(`HTTP error! Status: ${req.status}`);
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
        if(windolocalStorage.getItem("token") == null || window.localStorage.getItem("token") == ""){
            window.location = "./";
        }else{
     setTimeout(()=>{
        document.getElementsByClassName("preloader")[0].remove(); 
     },10000);
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
alert(content);
const App = new AppLoader();
App.load("./app/head.jl", "head")
   .load("./app/header.jl", "body")
   .load("./app/"+content,"body");
   .script("script.js")
   .finally(() => alert("All content loaded"));