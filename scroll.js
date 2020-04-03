const pixelsTag = document.querySelector("div.pixels")
const bodyTag = document.querySelector("body")
const sections = document.querySelectorAll("section")
const pageTag = document.querySelector("div.page")
const headerTag = document.querySelector("header")

// when we scroll the page, update the pixels tag to be how far we've scrolled




// when we scroll the page, make things parallax
// we want to move certain tags, based on how far they are from an anchor point
// what is the anchor? well its the middle of the section
// how far should we parallax? well, it's a ratio of the middle distance scrolled to the middle point of the anchor
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight / 2)
  
  sections.forEach(section => {
    const topSection = section.offsetTop
    const midSection = topSection + (section.offsetHeight / 2)
    
    const distanceToSection = midViewport - midSection
    
    const parallaxTags = section.querySelectorAll(`[data-parallax]`)
    
    // loop over each parallaxed tag
    parallaxTags.forEach(tag => {
      const speed = parseFloat(tag.getAttribute("data-parallax"))
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`
    })
  })
})
