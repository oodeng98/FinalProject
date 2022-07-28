// 검색 부분
const search_box = document.getElementById("search_box")
const keyword_box = document.getElementsByClassName("keyword_box")[0]
const search_cancle = document.getElementsByClassName("search_cancle")[0]


search_cancle.onclick = function(){ // input에 text 있을 때 취소 버튼 누르면 초기화
            search_box.value = '';
        }    
search_box.onfocus = function(){ // input에 포커스 있을 경우 모양 변화
            this.style.backgroundImage = "None"
            search_cancle.style.opacity = "100"
            search_cancle.style.display = "block"
        } 
search_box.onblur = function(){// input에 포커스 사라질 경우 모양 변화
            search_cancle.style.opacity = "0"
            search_box.style.backgroundImage = "url(../static/img/glass.png)"
            setTimeout(function(){
                search_cancle.style.display = "none"
                // input에 포커스 사라질 시, 검색어 박스 사라지도록
                keyword_box.style.display = "none"
            },200)
        }

    search_box.oninput = search_box.onkeydown = search_box.onclick = function(){
        // 검색 박스에 값이 없다면 종료
        // if(search_box.value =="") return;
        // 글씨 칠 때 마다 검색 박스 초기화
        if(document.getElementsByClassName("keyword_a").length != 0){
            for(var i = 0; i <  document.getElementsByClassName("keyword_a").length; i++){
                document.getElementsByClassName("keyword_outer")[0].removeChild(document.getElementsByClassName("keyword_a")[0])
            }
        }
        keyword_box.removeChild(document.getElementsByClassName("keyword_outer")[0])
        var new_box = document.createElement('div')
        new_box.className = 'keyword_outer'
        keyword_box.appendChild(new_box)
        // 검색박스 드러내기
        keyword_box.style.display = "flex"
        // 비동기 통신(관련 검색어 가져오기)
        $.ajax({
                type:"POST",
                url:"/keywords",
                data:{'keyword':search_box.value},
                dataType : "json",
                success: function(keywords){
                    if(Object.keys(keywords).length ==0){return}
                    // 검색어 갯수만큼 div 박스 생성, 검색한 텍스트 넣어주기
                    for(i = 0; i < Object.keys(keywords).length; i++){
                        var keyword_outer = document.getElementsByClassName('keyword_outer')[0]
                        var a = document.createElement("a");
                        var div1 = document.createElement("div");
                        var div2 = document.createElement("div");
                        var div3 = document.createElement("div");
                        var div4 = document.createElement("div");
                        var div5 = document.createElement("div");
                        var span1 = document.createElement("span");
                        var span2 = document.createElement("span");
                        var sharp = document.createElement("img")
    
                        // 검색페이지 링크 설정 
                        a.href = "/search?keyword=" + keywords[String(i)][0] + "&status=filtering"
                        a.className = "keyword_a"
                        sharp.src = "../static/img/sharp.png"
                        span1.innerText = keywords[String(i)][0]
                        span2.innerText = "게시물"+ keywords[String(i)][1] + "개"
    
                        div1.className = "keywords"
                        div2.className = "sharp_img"
                        div3.className = "key_text_box"
                        div4.className = "keywords_name"
                        div5.className = "keywords_counts"
                        
                        div4.appendChild(span1)
                        div5.appendChild(span2)
                        div3.appendChild(div4)
                        div3.appendChild(div5)
                        div2.append(sharp)
                        div1.append(div2)
                        div1.append(div3)
                        a.append(div1)
                        div1.href = "/"
                        keyword_outer.appendChild(a)
                    }
                },
                error: function(result){
                    console.log("failed")
                }
            })
        }
    



// 크기에 따라 nav 조정
var $nav_box = $(".nav_box.box_2")[0]
var nav_small_container = document.getElementById("nav_small_container")
window.onresize = function(){
if(Number($("#nav_container").css("width").slice(0,-2)) < 930){
    $nav_box.style.display ="none";
    nav_small_container.style.justifyContent = "space-between";
} else{
    $nav_box.style.display ="flex"
    nav_small_container.style.justifyContent = "center";
}
}