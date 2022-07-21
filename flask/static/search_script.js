// 이미지를 누르면
const img_box = document.getElementsByClassName('recently_img_box')
for(var i = 0; i < img_box.length; i++){
    img_box[i].onclick = function(){
        alert("바보");
    };
};

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
    if(height - height2 < height3+20){
        var recently_img_box = document.getElementsByClassName('recently_img_box')
        var keyword_profile_name_keyword = this.document.getElementById('keyword_profile_name_keyword')
        var num = String(recently_img_box.length)
        data = {'keyword':keyword_profile_name_keyword.innerText.slice(1), 'num': num}
        $.ajax({
            type:"POST",
            contentType: "application/json; charset=utf-8",
            url:"/image_append",
            data:JSON.stringify(data),
            dataType : "json",
            success: function(image_names){
                if(Object.keys(image_names) ==0){return}
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
                    img_.src = "../static/img/"+Object.values(image_names[i])
                    img_box.appendChild(img_)
                    row_box.appendChild(img_box)
                }
            },
            error: function(result){
                console.log("failed")
            }
            })
    }
})
