gsap.registerPlugin(ScrollTrigger)

window.addEventListener("load",()=>{

gsap.to("#loader",{
opacity:0,
duration:0.8,
delay:0.5,
onComplete:()=>document.getElementById("loader").style.display="none"
})

})

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
let ans=btn.nextElementSibling
ans.style.display=ans.style.display==="block"?"none":"block"
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

/* Bottle slow movement */

gsap.to(".bottle",{
y:-120,
rotation:3,
ease:"none",
scrollTrigger:{
trigger:".hero-parallax",
start:"top bottom",
end:"bottom top",
scrub:1
}
})

/* Leaf 1 floating */

gsap.to(".leaf1",{
y:-200,
x:80,
rotation:20,
ease:"none",
scrollTrigger:{
trigger:".hero-parallax",
start:"top bottom",
end:"bottom top",
scrub:1
}
})

/* Leaf 2 opposite direction */

gsap.to(".leaf2",{
y:180,
x:-80,
rotation:-20,
ease:"none",
scrollTrigger:{
trigger:".hero-parallax",
start:"top bottom",
end:"bottom top",
scrub:1
}
})

/* Flower movement */

gsap.to(".flower",{
y:-150,
x:40,
rotation:10,
ease:"none",
scrollTrigger:{
trigger:".hero-parallax",
start:"top bottom",
end:"bottom top",
scrub:1
}
})

