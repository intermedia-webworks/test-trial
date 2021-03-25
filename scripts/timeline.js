
function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while(element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}

function clear_active() {
  const active = document.getElementsByClassName("timeline__item_active");
  for(let i=0; i < active.length; i++) {
    item = active[i];
    item.classList.remove("timeline__item_active")
  }
}

function timeline_mobile_scroll(e) {
  const items = document.getElementsByClassName("timeline__item");
  let nearest = 0;
  let nearestDist = 1000;
  for(let i=0; i < items.length; i++) {
    item = items[i];
    let dist = Math.abs(getPosition(item).y - window.pageYOffset);
    if(dist < nearestDist){
      nearestDist = dist;
      nearest = i;
    }
  }
  clear_active();
  items[nearest].classList.add("timeline__item_active");
}

function detectMob() {
  return (window.innerWidth <= 800);
}

function resizeEventListener(){
  if (detectMob()) {
    window.addEventListener('scroll', timeline_mobile_scroll)
  }else{
    window.removeEventListener('scroll', timeline_mobile_scroll);
    clear_active();
  }
}

window.addEventListener('resize', resizeEventListener);
resizeEventListener();
