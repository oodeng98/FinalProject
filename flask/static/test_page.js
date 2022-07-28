// 이미지를 누르면
const img_box = document.getElementsByClassName('recently_img_box')
for(var i = 0; i < img_box.length; i++){
    img_box[i].onclick = function(){
        alert("..");
    };
};

// profile 이미지 비율 조정
var profile_img_set = document.getElementsByClassName("keyword_profile_img_img")[0]
img_width = Number(window.getComputedStyle(profile_img_set).getPropertyValue('width').slice(0,-2))
img_height =Number(window.getComputedStyle(profile_img_set).getPropertyValue('height').slice(0,-2))

if( img_width!=img_height ) {
    profile_img_set.style.width = String(img_height) + "px"
}

// 초기 이미지 표출
var img_container = document.getElementsByClassName("recently_img_container")[0]
for(var i = 0; i < img_names.length; i+=2){
    if(i % 3 == 0){
        if(i!=0){
            img_container.appendChild(div1)
        }
        var div1 = document.createElement("div");
        div1.className = "recently_img_row_box";
    }
        var div2 = document.createElement("div");
        var img1 = document.createElement("img");
        div2.className = "recently_img_box";
        img1.src = "./static/test_img/" + img_names[i] + "?q=" + mtime
        if(img_names[i + 1] == "f"){
            var img2 = document.createElement("img");
            img1.style.opacity = "0.7"
            img2.src = "../static/img/x-button.png"
            img2.className = "x_button"
            div2.append(img1, img2)
        }else{div2.appendChild(img1);}
        div1.appendChild(div2);
        for(var j = 0; j < 100000000; j ++){
            j * 13 / 13
        }
    if(i == img_names.length-2){
        img_container.appendChild(div1)
    }
}




// 스크롤 내리면 로딩
window.addEventListener("scroll", function(){
	var top =  window.scrollY // 모든 브라우저 지원
			 || window.pageYOffset // explorer9 미만에서 지원x
			 || document.documentElement.scrollTop // explorer8이하에서 지원 but chrome에서 사용 x
			 || document.body.scrollTop; // chrome, safari, opera, edge 사용 가능
    var main = this.document.getElementsByTagName('html')[0]
    var height = Number(main.scrollHeight)
    var height2 = Number(main.scrollTop)
    var height3 = Number(main.clientHeight)
    if(height - height2 <= height3){
        var spinner = document.getElementsByClassName('spinning')[0]
        var recently_img_box = document.getElementsByClassName('recently_img_box')
        var keyword_profile_name_keyword = this.document.getElementById('keyword_profile_name_keyword')
        var num = String(recently_img_box.length)
        // data = {'keyword':keyword_profile_name_keyword.innerText.slice(1)}
        // data = {'keyword':keyword_profile_name_keyword.innerText.slice(1), 'num': num}
        data = {'keyword':keyword, 'num': num}
        spinner.style.display = 'flex'
        $.ajax({
            type:"POST",
            contentType: "application/json; charset=utf-8",
            url:"/test_append",
            data:JSON.stringify(data),
            dataType : "json",
            success: function(image_names){
                if(Object.keys(image_names).length == 0){alert("모든 이미지를 표출했습니다.")}
                // 검색어 갯수만큼 div 박스 생성, 검색한 텍스트 넣어주기
                var recently_img_container = document.getElementsByClassName('recently_img_container')[0]
                for(i = 0; i < Object.keys(image_names).length; i++){
                    if(i%3 == 0){
                        if(i != 0){
                            recently_img_container.appendChild(row_box);
                         }
                        var row_box = document.createElement("div")
                        row_box.className = "recently_img_row_box"
                    }
                    var img_box = document.createElement("div")
                    var img_ = document.createElement("img")
                    img_box.className = 'recently_img_box'
                    img_.src = "../static/test_img/" + Object.keys(image_names)[i]
                    if(Object.values(image_names)[i] == "f"){
                        var img2 = document.createElement('img')
                        img2.src = "../static/img/x-button.png"
                        img_.style.opacity = "0.7"
                        img2.className = "x_button"
                        img_box.append(img_, img2)
                    }else{img_box.appendChild(img_)}
                    row_box.appendChild(img_box)
                    for(var j = 0; j < 100000000; j ++){
                        j * 13 / 13
                    }
                    if(i == Object.keys(image_names).length - 1 ){
                        recently_img_container.appendChild(row_box);
                    }
                }
                spinner.style.display = 'none'
            },
            error: function(result){
                console.log("failed")
                spinner.style.display = 'none'
            }
            })
    }
})
