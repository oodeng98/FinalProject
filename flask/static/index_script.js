
// ---------------- search 페이지 ------------------------------------------------
// ------------------------------------------------------------------------------
const story_boxs = document.getElementsByClassName("story_box")
const story_viewer = document.getElementsByClassName('story_viewer')[0]
const story_left_button = document.getElementsByClassName('left_button')[0]
const story_right_button = document.getElementsByClassName('right_button')[0]

function heart_click(){
    alert("♥");
}


// 스토리 뷰어 길이 설정
story_viewer_width = Number(window.getComputedStyle(story_viewer).width.slice(0,-2));
if(story_viewer_width > 468){story_right_button.style.display = 'block'}

// 스토리 좌우 이동 버튼
let story_viewer_locate = 0;
story_right_button.onclick = function(){
    if(story_viewer_width - Math.abs(story_viewer_locate) - 425 <= 468){
        story_viewer_locate = 468 - story_viewer_width;
        story_right_button.style.display = "None"
    }else{story_viewer_locate = story_viewer_locate - 425;}
    story_viewer.style.left = String(story_viewer_locate) + "px"
    story_left_button.style.display = "block"
    
}
story_left_button.onclick = function(){
    if(story_viewer_locate + 425 >= 0){
        story_viewer_locate = 0;
        story_left_button.style.display = "None"
    }else{story_viewer_locate = story_viewer_locate + 425;}
    story_viewer.style.left = String(story_viewer_locate) + "px"
    story_right_button.style.display = "block"
}












        