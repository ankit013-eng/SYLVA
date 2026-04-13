gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {
  gsap.to("#loader", {
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
    }
  });
});

setTimeout(() => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
}, 4000);
gsap.from(".hero h1",{
y:80,
opacity:0,
duration:1,
ease:"power3.out"
})

gsap.from(".hero p",{
y:40,
opacity:0,
duration:1,
delay:0.3
})

gsap.utils.toArray(".problem-card").forEach(card=>{
gsap.from(card,{
scrollTrigger:{
trigger:card,
start:"top 85%",
once:true
},
y:40,
opacity:0,
duration:0.6
})
})

gsap.utils.toArray(".ingredient").forEach(ing=>{
gsap.from(ing,{
scrollTrigger:{
trigger:ing,
start:"top 90%",
once:true
},
y:30,
opacity:0,
duration:0.5
})
})

document.querySelectorAll(".faq-question").forEach(btn=>{
btn.addEventListener("click",()=>{
let ans = btn.nextElementSibling

if(ans.style.maxHeight){
ans.style.maxHeight = null
} else {
ans.style.maxHeight = ans.scrollHeight + "px"
}
})
})

window.addEventListener("scroll",()=>{

let scrollTop=document.documentElement.scrollTop
let height=document.documentElement.scrollHeight-document.documentElement.clientHeight

let progress=(scrollTop/height)*100

document.getElementById("progress").style.width=progress+"%"

})
gsap.utils.toArray(".gallery img").forEach(img=>{
gsap.from(img,{
scrollTrigger:{
trigger:img,
start:"top 90%",
once:true
},
y:40,
opacity:0,
duration:0.6
})
})

gsap.utils.toArray(".reel-card").forEach(card=>{
gsap.from(card,{
scrollTrigger:{
trigger:card,
start:"top 85%",
once:true
},
y:40,
opacity:0,
duration:0.6
})
})

gsap.registerPlugin(ScrollTrigger)

// ---------------- LOADER ---------------- 
gsap.to(".parallax-track",{
x:-400,
duration:12,
repeat:-1,
ease:"linear"
})



setTimeout(function(){
document.getElementById("luxPopup").classList.add("show");
},3000)

function closeLux(){
document.getElementById("luxPopup").classList.remove("show")
}