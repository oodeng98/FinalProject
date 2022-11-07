# 인스타그램 게시물 필터링
# 프로젝트 배경
인스타그램에서 검색 기능을 이용하여 유용한 정보를 찾으려고 하면, 검색어와 전혀 관련 없는 게시물들이 빈번히 나타나곤 합니다. 이는 인스타그램을 활용한 정보 검색을 꺼리게 만드는 직접적인 요소가 된다고 생각하여 이러한 단점을 보완하는 기능을 구현하고자 합니다.
# 프로젝트 목표
인스타그램의 검색 메커니즘을 바꾸는 것은 무리가 있다고 판단하여  빠르게 정보를 얻고자 하는 사용자들을 위해 필터링 기능을 구현하는 것이 프로젝트의 목표입니다. 필터링 기능은 object detection 모델을 기반으로 제작되었으며, 학습에 필요한 데이터들은 모두 직접 라벨링하였습니다.
# 프로젝트 진행 과정
## 1, 타겟 해시태그 선정  
- 인스타그램 상위 해시태그 중 한국어로 이루어진 해시태그 100개를 선정  
- 100개를 몇 가지 키워드로 그룹화  
- Ex) 운동, 카페, 꽃, 음식점, 패션 등  
- 키워드들을 특정 이미지들의 조합으로 표현  
- Ex)카페 = (음식, 음료수), 패션 = (사람, 옷)  
## 2, 데이터 라벨링  
- 인스타그램에서 키워드별로 사진 크롤링  
- 크롤링한 사진에서 특정 이미지들이 포함되었는지 라벨링  
## 3, object detection 모델 학습  
- 라벨링된 데이터들을 기반으로 여러가지 object detection 모델 학습  
- 전이 학습과 비전이 학습의 모델 정확도 비교  
- 서비스 구현을 가정한 프로젝트이므로 모델의 결과값 도출 시간 또한 중요한 요소  
## 4, flask 구현 및 서비스 제공  
- 인스타그램의 레이아웃을 그대로 가져와서 필터링 선택 버튼 추가

# 프로젝트 결과
프로젝트 목표에서 밝혔듯 인스타그램의 기능을 모방하여 서비스 제공 환경을 구현하는 것까지 성공했다. 모델의 정확도도 90%이상으로 높게 나왔고, 필터링 기능을 추가한 경우와 그렇지 않은 경우의 속도를 비교해봐도 크게 체감되는 부분은 없었기에 성공적인 결과물을 도출했다고 볼 수 있겠다.  
하지만 보안해야하는 부분들이 몇가지 있었다.  
1, 비효율적인 데이터 라벨링  
- 일부 데이터를 사용하여 모델을 학습하고, 학습된 모델로 나머지 데이터들을 자동으로 라벨링 한 후, 검토하는 형식으로 데이터 라벨링을 진행했다면 더 빠르게 라벨링을 완료할 수 있었을 것이다.   

2, 장신구와 같은 작은 object detection의 한계  
3, 게시물이 정보로써의 가치를 지니는지를 판단하기 위해서는 게시물의 내용 또한 중요한 판단 요소가 된다. 하지만 텍스트 분석까지 진행하지는 못했다.  
4, 배경 검출 기능 부족  

 - 장소와 관련된 정보인지를 판단하기 위해서는 배경 이미지를 구분하는 것이 중요한데, 바다와 산, 헬스장만 구분할 수 있는 모델을 구현하는 것 까지가 한계였다.