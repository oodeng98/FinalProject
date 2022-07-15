// 크기 조정 해야함
var old_container_width = Number(window.getComputedStyle(keyword_profile_container).width.slice(0,-2));
window.onresize = function(){
    var new_container_width = Number(window.getComputedStyle(keyword_profile_container).width.slice(0,-2));
    var container_height = Number(window.getComputedStyle(keyword_profile_container).height.slice(0,-2));
    ratio = new_container_width/old_container_width
    document.getElementById("keyword_profile_container").style.height = container_height*ratio
    console.log(new_container_width/old_container_width)
    console.log(new_container_width)
    console.log(container_height)
}