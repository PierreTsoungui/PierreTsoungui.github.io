let isHome=true;
let myMap= new Map([
    ["#home","Startseite"],
    ["#about","Über mich"],
    ["#Portfolio","Portfolio"],
    ["#certificate","Zertifikate"],
    ["#contact","Kontakt"],
    ["#cv","Resume"]
])
const texts = ["Willkommen auf meiner Webseite!", "Viel Spaß beim Stöbern!"];
let currentText = 0;
let currentChar = 0;
let typing = true;

const el = document.getElementById("typed-text");
let bodyId= document.getElementById("pageBody");
function type() {
    let delay = Math.random() * 150 + 50; // zufällige Geschwindigkeit für natürlicheres Tippen
 if (!isHome) {
        if(bodyId.classList.contains("bg-white")){
                 bodyId.classList.replace("bg-white", "bg-body-secondary");
        }
        return; // sofort abbrechen, wenn wir nicht auf Home sind
    }
     document.getElementById("particles-js").classList.remove("d-none");
        if(bodyId.classList.contains("bg-body-secondary")){
             bodyId.classList.replace("bg-body-secondary", "bg-white");
        }
    if (typing) {
        if (currentChar < texts[currentText].length) {
            el.textContent += texts[currentText][currentChar];
            currentChar++;
            setTimeout(type, delay);
        } else {
            typing = false;
            setTimeout(type, 1000); // Pause bevor gelöscht wird
        }
    } else {
        if (currentChar > 0) {
            el.textContent = texts[currentText].substring(0, currentChar - 1);
            currentChar--;
            setTimeout(type, delay / 2); // Löschen etwas schneller
        } else {
            typing = true;
            currentText = (currentText + 1) % texts.length; // nächster Text
            setTimeout(type, 500);
        }
    }
}

type();


document.querySelectorAll(".nav-link").forEach(link=>{
    link.addEventListener("click",function(e){
        e.preventDefault();
        let target=this.getAttribute('href')
        localStorage.setItem("ActiveSection",target);
         if (!targetSection) return;

    
        document.querySelectorAll(".page-section").forEach(sec=>sec.classList.remove("active"));
         if (target === "#home") {
            isHome = true;
            document.getElementById("particles-js").classList.remove("d-none");
           
            type(); // Typing wieder starten, falls Home
        } else {
            isHome = false;
             currentText = 0;
             currentChar = 0;
            el.textContent = ""; // optional: Text leeren
           
            document.getElementById("particles-js").classList.add("d-none");
        }
        
        document.querySelector(target).classList.add("active");
         //Text Aktualiessieren
    document.querySelector(".navbar-brand").textContent=myMap.get(target);
    });
   
  // Offcanvas schließen (Bootstrap)
    let offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasDarkNavbar'));
    if(offcanvas) offcanvas.hide();
})

document.getElementById("phone").addEventListener("click", function (e) {
    e.preventDefault();
    
     let target=this.getAttribute('href')
        isHome = false;
             currentText = 0;
             currentChar = 0;
            el.textContent = ""; // optional: Text leeren
           
            document.getElementById("particles-js").classList.add("d-none");
    document.querySelectorAll(".page-section").forEach(sec=>sec.classList.remove("active")); 
    document.querySelector(target).classList.add("active");
         //Text Aktualiessieren
    document.querySelector(".navbar-brand").textContent=myMap.get(target);
})

let lastTarget=localStorage.getItem("ActiveSection");

if(lastTarget){
    document.querySelectorAll(".page-section").forEach(sec=>sec.classList.remove("active"));
   document.querySelector(lastTarget).classList.add("active");
    if(lastTarget==="#home"){
        isHome = true;
        type(); 
    }else{
        type();
    }
}  
window.addEventListener("beforeunload", function () {
  localStorage.removeItem("ActiveSection");
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.certCard').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('show'), 10);
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }, 300);
    });


