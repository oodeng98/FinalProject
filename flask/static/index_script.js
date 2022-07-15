const search_box = document.getElementById("search_box")
        const keyword_box = document.getElementsByClassName("keyword_box")[0]
        const search_cancle = document.getElementsByClassName("search_cancle")[0]
        const story_boxs = document.getElementsByClassName("story_box")
        const story_viewer = document.getElementsByClassName('story_viewer')[0]
        const story_left_button = document.getElementsByClassName('left_button')[0]
        const story_right_button = document.getElementsByClassName('right_button')[0]
        
        function heart_click(){
            alert("♥");
        }

        // 검색 부분
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
            },100)
        }
        search_box.oninput = function(){
            // 검색 박스에 값이 없다면 종료
            if(search_box.value =="") return;
            // 글씨 칠 때 마다 검색 박스 초기화
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
                        if(Object.keys(keywords) ==0){return}
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
                            a.href = "/search?keyword=바다"
                            // a.href = keywords[String(i+1)]
                            sharp.src = "../static/img/sharp.png"
                            span1.innerText = keywords[String(i+1)]
                            span2.innerText = "게시물"+ String(1000000) + "개"
                            // span2.innerText = keywords["게시물"+ keywords[i+1] + "개"]

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
        