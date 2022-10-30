"use strict"

const scrollBtn = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector(".section-1");
const hamburgerBtn = document.querySelector(".btnBurger");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const slides = document.querySelectorAll(".slide")
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const spinner = document.querySelector(".loader")
const main = document.querySelector(".main");

const init = () => {
    setTimeout(()=> {
        spinner.style.display = `none`
        spinner.style.opacity = 0;
        main.style.display = `block`
        setTimeout(()=> main.style.opacity = 1, 500)
        
    }, 4000)
}
init()



scrollBtn.addEventListener("click",function(e) {
    e.preventDefault()
    section1.scrollIntoView({behavior: `smooth`})
})
////////////////////////////////////////////
document.querySelector(".nav-link").addEventListener("click",function (e) {
    e.preventDefault()
    // console.log(e.target);
    if(e.target.classList.contains("nav-links")){
        const id = e.target.getAttribute("href")
        document.querySelector(id).scrollIntoView({behavior: `smooth`})
    }
})
////////////////////////////////////////
hamburgerBtn.addEventListener("click", function(e){
    const parentEl = e.target.closest(".nav")
    const navEl = parentEl.querySelector(".nav-link")
    navEl.classList.toggle("hidden")
})
//////////////////////////////////////////////////
const navHeight = nav.getBoundingClientRect().height;

const headerobserverfun = function(entries,_){
    const [entry] = entries
    // if(entry.target === )
    if(entry.isIntersecting) nav.classList.remove("sticky")
    else nav.classList.add("sticky")
}

const headerObserver = new IntersectionObserver(headerobserverfun,{
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

/////////////////////////////////////
const allSections = document.querySelectorAll(".section");

const secObserverFunc = function(entries,observer){
    const [entry] = entries
    // console.log(entry);
    if(!entry.isIntersecting) return
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(secObserverFunc,{
    root: null,
    threshold: 0.1
})

allSections.forEach(section => {
    sectionObserver.observe(section)
    section.classList.add("section--hidden");
})
/////////////////////////////////////////////////


let curSlide = 0
const maxSlides = slides.length

const gotoSlide = function (slide){
    slides.forEach((s,i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}

gotoSlide(0)

btnRight.addEventListener("click",function (){
    if (curSlide === maxSlides - 1) curSlide = 0
    else curSlide++

    gotoSlide(curSlide)
})

btnLeft.addEventListener("click", function () {
    if (curSlide === 0) curSlide = maxSlides - 1
    else curSlide--

    gotoSlide(curSlide)
})