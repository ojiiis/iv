async function putContent(file, place) {
    try {
        const req = await fetch(file);
        if (!req.ok) throw new Error(`HTTP error! Status: ${req.status}`);
        
        const res = await req.text();
       
        const targetElement = document.getElementsByTagName(place)[0];
        if (targetElement) {
            // Create a temporary container to parse the HTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = res;

            // Extract and execute script tags
            const scripts = tempDiv.getElementsByTagName("script");
            for (let script of scripts) {
                const newScript = document.createElement("script");
                if (script.src) {
                    // External script
                    newScript.src = script.src;
                    newScript.async = false; // Ensures scripts load in order
                } else {
                    // Inline script
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove(); // Remove script from tempDiv to avoid duplication
            }

            // Append the remaining content (excluding scripts)
            targetElement.insertAdjacentHTML("beforeend", tempDiv.innerHTML);
        } else {
            console.error(`Element <${place}> not found.`);
        }
    } catch (error) {
        console.error("Error loading content:", error);
    }
}

// Load header and main content
putContent("./app/head.jl", "head");
putContent("./app/header.jl", "body");
var content = "index.jl";
switch(window.location.href.toString().split("/")[window.location.href.toString().split("/").length - 1].split("?")[0]){
    case "dashboard.html":
        content = "dashboard.jl";
        if(windolocalStorage.getItem("token") == null || window.localStorage.getItem("token") == ""){
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
setTimeout(()=>{
    putContent("./app/"+content, "body");
},500);
setTimeout(()=>{
    putContent("./app/footer.jl", "body");
},1000);

// Load footer after the page has fully loaded
window.onload = () => {
    setTimeout(()=>{
        document.getElementsByClassName("preloader")[0].remove();
        document.querySelectorAll('.bg_img').forEach(img => {
            let bg = `url(${img.getAttribute('data-background')})`;
            img.style.backgroundImage = bg;
        });
        
   
    // Mobile menu JavaScript
document.querySelectorAll(".navbar-collapse > ul > li > a, .navbar-collapse ul.sub-menu > li > a")
  .forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault(); // Prevent default link behavior if needed
      
      const element = this.parentElement;

      if (element.classList.contains("open")) {
        element.classList.remove("open");
        element.querySelectorAll("li").forEach(li => li.classList.remove("open"));
      } else {
        element.classList.add("open");
        element.parentElement.querySelectorAll("li").forEach(sibling => {
          if (sibling !== element) {
            sibling.classList.remove("open");
            sibling.querySelectorAll("li").forEach(subLi => subLi.classList.remove("open"));
          }
        });
      }
    });
  });
  
    },2000);

};


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
            localStorage.addItem("token",res.token);
            alert(res.message);
            window.location.href = "./dashboard.html";
        }
    }else{
        alert(res.message);
    }
    console.log(res);
}


//https://lin.com.ng/iv/signup