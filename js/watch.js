/* ===== Watch Vault (시계 컬렉션) =====
   - 가격은 고정 표시가입니다. 가격 변동·평가손익 기능은 없고, 구매 시 현금 차감·판매 시 현금 추가(수수료 없음), 보유 시계는 총자산(total)에 포함됩니다.
   - 보유 목록은 S.wv(시계 id 배열, 추가한 순서)에 저장되어 자동 백업에 함께 들어갑니다. */
const WBR={"ROLEX":"1905년 런던에서 시작해 제네바에 자리 잡은 롤렉스는 오이스터 케이스(1926)와 퍼페추얼 로터(1931)로 현대 손목시계의 기준을 세웠습니다.",
"AUDEMARS PIGUET":"1875년 르 브라쉬에서 설립된 오데마 피게는 독립 가족 경영을 이어온 하이엔드 제조사로, 1972년 로얄 오크로 럭셔리 스포츠 워치의 장르를 열었습니다.",
"CARTIER":"1847년 파리에서 출발한 까르띠에는 1917년 탱크를 선보이며 ‘형태’ 자체를 시계 디자인의 언어로 만든 메종입니다.",
"ROGER DUBUIS":"1995년 제네바에서 설립된 로저드뷔는 모든 무브먼트에 제네바 인증(Poinçon de Genève)을 받는 것으로 알려진 스켈레톤·투르비옹 전문 브랜드입니다.",
"HAMILTON":"1892년 미국 펜실베이니아에서 시작해 철도와 군용 시계로 이름을 알렸고, 현재는 스위스에 기반을 둔 브랜드입니다.",
"TISSOT":"1853년 스위스 르 로클에서 설립된 티쏘는 합리적인 가격에 스위스 시계 제작의 기본기를 담아온 브랜드입니다.",
"SEIKO":"1881년 도쿄에서 시작된 세이코는 1969년 쿼츠 시계 ‘아스트론’을 세상에 내놓았고, 쿼츠부터 기계식, 다이버까지 폭넓은 라인업을 가진 일본의 대표 제조사입니다.",
"SWATCH":"1983년 탄생한 스와치는 플라스틱 시계로 스위스 시계 산업을 되살린 브랜드이며, 최근에는 오메가·블랑팡과의 협업으로 큰 화제를 모았습니다.",
"CASIO":"1957년 설립된 카시오는 1970년대 디지털 시계를 대중화했고, 내구성과 실용성을 앞세운 일본의 국민 시계 브랜드로 자리 잡았습니다.",
"VERSACE":"1978년 밀라노에서 시작된 베르사체의 시계는 메두사 로고와 그리스 문양 등 브랜드 특유의 화려한 미학을 손목 위로 옮깁니다.",
"VIVIENNE WESTWOOD":"1971년 런던 킹스로드에서 시작한 비비안 웨스트우드는 오브(Orb) 로고로 펑크와 클래식을 엮어온 영국 패션 하우스입니다."};
const WORD=["ROLEX","AUDEMARS PIGUET","CARTIER","ROGER DUBUIS","HAMILTON","TISSOT","SEIKO","SWATCH","CASIO","VERSACE","VIVIENNE WESTWOOD"];
// [브랜드,모델,레퍼런스,가격,출시년도,케이스크기,소재,다이얼,스트랩,무브먼트,파워리저브,방수,설명,컬렉션노트]
const WL=[["CARTIER","Tank Must Small",null,6149000,"2021","29.5 × 22mm","스틸","실버 오팔린 · 로마 숫자","스틸 브레이슬릿","쿼츠",null,"30m","1917년 탱크의 직선적인 사각 케이스와 로마 숫자 다이얼, 블루 카보숑 크라운을 그대로 이어받은 현대적 해석입니다. 작은 사이즈로 손목에 얇게 올라앉아 정장과 캐주얼 모두에 어울립니다.","탱크는 까르띠에를 대표하는 아이콘이며, 탱크 머스트는 그 디자인을 가장 접근하기 쉬운 형태로 보여주는 모델입니다."],["ROGER DUBUIS","Excalibur 42 Skeleton","DBEX0861",103000000,null,"42mm","핑크 골드 톤 케이스 · 다이아몬드 세팅 베젤","스켈레톤","브레이슬릿","오토매틱 스켈레톤",null,null,"다이얼 전체를 비워 무브먼트의 구조를 그대로 드러내는 스켈레톤 시계로, 보석이 세팅된 베젤이 화려함을 더합니다. 엑스칼리버 특유의 별 모양 장식과 입체적인 구조가 특징입니다.","엑스칼리버는 로저드뷔를 대표하는 컬렉션이며, 스켈레톤 기술은 이 브랜드의 정체성입니다."],["ROLEX","Day-Date 36","18238",34125000,"1988~2000년경","36mm","18K 옐로 골드","샴페인 · 다이아몬드 인덱스","프레지던트 브레이슬릿","오토매틱 Cal.3155","약 48시간","100m","요일을 풀 스펠링으로 표기하는 데이데이트는 1956년 데뷔한 롤렉스의 플래그십입니다. 플루티드 베젤과 프레지던트 브레이슬릿이 클래식한 권위를 보여줍니다.","금통 데이데이트는 ‘대통령의 시계’로 불리며, 롤렉스에서 귀금속으로만 제작되는 유일한 라인입니다."],["ROLEX","Datejust 31","278274",24000000,"2018","31mm","오이스터스틸 · 18K 화이트 골드 플루티드 베젤","실버 · 다이아몬드 인덱스","쥬빌리 브레이슬릿","오토매틱 Cal.2236","약 55시간","100m","1945년 탄생한 데이트저스트의 31mm 사이즈입니다. 사이클롭스 렌즈 날짜창과 쥬빌리 브레이슬릿이 우아함을 더하며, 작은 손목에도 균형이 맞습니다.","데이트저스트는 롤렉스 컬렉션의 중심이며 최초의 자동 방수 날짜 표시 손목시계입니다."],["ROLEX","Datejust 36","126234",21800000,"2018","36mm","오이스터스틸 · 18K 화이트 골드 플루티드 베젤","브라이트 블랙","쥬빌리 브레이슬릿","오토매틱 Cal.3235","약 70시간","100m","브라이트 블랙 다이얼과 플루티드 베젤이 만드는 대비가 선명한 데이트저스트 36입니다. 3235 무브먼트로 파워리저브가 약 70시간까지 늘어났습니다.","가장 클래식한 롤렉스 드레스-스포츠 시계의 정석으로, 사이즈와 비율에서 높은 대표성을 갖습니다."],["ROLEX","Datejust 36","126234",19200000,"2018","36mm","오이스터스틸 · 18K 화이트 골드 플루티드 베젤","슬레이트 · 그린 로마 숫자","쥬빌리 브레이슬릿","오토매틱 Cal.3235","약 70시간","100m","슬레이트 그레이 다이얼에 그린 로마 숫자를 더해 차분하면서도 개성이 있는 구성입니다. 같은 126234 레퍼런스의 다른 얼굴을 보여줍니다.","같은 케이스에 다이얼만 바꿔 성격이 달라지는 롤렉스의 다이얼 전략을 잘 보여주는 모델입니다."],["ROLEX","Submariner Date","126613LB",29700000,"2020","41mm","오이스터스틸 · 18K 옐로 골드(롤레조)","로얄 블루","오이스터 브레이슬릿","오토매틱 Cal.3235","약 70시간","300m","블루 세라크롬 베젤과 블루 다이얼에 스틸·골드 콤비 브레이슬릿이 어우러진 서브마리너 데이트입니다. 300m 방수 다이버 워치의 기능성과 화려함을 함께 갖췄습니다.","1953년 이후 다이버 워치의 기준이 된 서브마리너 중에서도 ‘블루시’라 불리는 콤비 모델은 큰 인기를 가집니다."],["ROLEX","Submariner","124060",19200000,"2020","41mm","오이스터스틸","블랙","오이스터 브레이슬릿","오토매틱 Cal.3230","약 70시간","300m","날짜창을 없애 다이얼이 가장 정돈된 서브마리너입니다. 블랙 세라크롬 베젤과 매트 블랙 다이얼은 시계 디자인의 교과서로 불립니다.","서브마리너 노-데이트는 가장 순수한 형태의 다이버 워치로 평가됩니다."],["ROLEX","Oyster Perpetual 36","126000",25500000,"2020","36mm","오이스터스틸","터콰이즈 블루","오이스터 브레이슬릿","오토매틱 Cal.3230","약 70시간","100m","장식을 덜어낸 가장 기본적인 롤렉스 위에 선명한 터콰이즈 다이얼을 얹었습니다. 2020년 오이스터 퍼페추얼의 컬러 다이얼 라인업으로 큰 화제를 모았습니다.","가장 단순한 모델이지만 컬러 다이얼 하나로 컬렉터 사이에서 높은 인지도를 가지게 되었습니다."],["ROLEX","Explorer 36","124270",15999000,"2021","36mm","오이스터스틸","블랙 · 3-6-9","오이스터 브레이슬릿","오토매틱 Cal.3230","약 70시간","100m","3, 6, 9 아라비아 숫자가 큼직하게 박힌 다이얼이 특징입니다. 1953년 에베레스트 초등과 연결된 탐험의 유산을 담고 있으며 36mm로 다시 돌아왔습니다.","탐험 시계의 원형으로, 군더더기 없는 디자인 덕분에 롤렉스 입문과 컬렉션 모두에서 사랑받습니다."],["ROLEX","Datejust 36","16220",8740000,"1988년경~2000년대 초","36mm","스틸 · 엔진 터닝 베젤","화이트 · 로마 숫자","쥬빌리 브레이슬릿","오토매틱 Cal.3135","약 48시간","100m","엔진 터닝 베젤과 화이트 로마 다이얼이 인상적인 빈티지 계열 데이트저스트입니다. 사파이어 글라스와 3135 무브먼트를 갖춘 시기의 모델입니다.","현행 모델이 아닌 단종 레퍼런스로, 시대의 디자인 코드를 즐기려는 컬렉터가 찾는 모델입니다."],["ROLEX","GMT-Master II","126710BLNR",28000000,"2019","40mm","오이스터스틸","블랙 · 블루/블랙 베젤","쥬빌리 브레이슬릿","오토매틱 Cal.3285","약 70시간","100m","블루와 블랙이 반반인 세라크롬 베젤로 ‘배트맨’이라는 애칭이 붙은 모델입니다. 두 번째 시간대를 읽는 GMT 기능을 갖췄고 쥬빌리 브레이슬릿이 처음 매칭되었습니다.","1950년대 팬암 조종사를 위해 만들어진 GMT-마스터의 계보를 잇는 대표 모델입니다."],["VERSACE","Hellenyium Chrono","VE2U00522",1640000,null,null,"스테인리스 스틸 · 골드 톤","그린","투톤 브레이슬릿","쿼츠 크로노그래프",null,null,"그린 다이얼에 골드 톤 베젤과 메두사 로고를 더해 존재감이 큰 크로노그래프입니다. 투톤 브레이슬릿이 한층 화려한 인상을 줍니다.","메두사와 그리스 문양을 앞세운 베르사체 특유의 미학을 담은 시계입니다."],["VIVIENNE WESTWOOD","Limehouse Gold Green",null,330000,null,null,"골드 톤 스틸","그린","일체형 브레이슬릿","쿼츠",null,null,"케이스와 브레이슬릿이 하나로 이어진 구조에 딥 그린 다이얼을 더한 모델입니다. 오브 로고가 다이얼에 자리합니다.","패션 하우스의 개성을 시계 하나로 표현하고 싶은 사람에게 어울리는 모델입니다."],["VIVIENNE WESTWOOD","Fenchurch Silver Pink",null,255000,null,null,"스틸","핑크","스틸 브레이슬릿","쿼츠",null,null,"부드러운 핑크 다이얼과 실버 스틸이 어우러져 단정하면서도 사랑스러운 인상을 줍니다.","펑크 정신으로 출발한 브랜드가 보여주는 부드러운 면모입니다."],["SEIKO","Selection Chronograph","SBTR021",201000,null,"40mm","스테인리스 스틸","블랙","블랙 가죽 스트랩","쿼츠 크로노그래프",null,null,"블랙 다이얼과 세 개의 서브다이얼이 스포티한 대비를 이루는 크로노그래프입니다. 가죽 스트랩으로 단정한 느낌을 더했습니다.","세이코의 일본 내수 라인업 중 크로노그래프 입문용으로 인지도가 높습니다."],["SEIKO","Spirit Solar","SBPX083",183000,null,"37.4mm","스테인리스 스틸","블랙 · 요일/날짜","스틸 브레이슬릿","솔라 쿼츠",null,null,"블랙 다이얼과 요일·날짜창을 갖춘 실용적인 드레스 워치로, 빛으로 충전하는 솔라 방식이라 배터리 교체 부담이 적습니다.","세이코가 강점으로 삼는 실용 쿼츠 기술을 담았습니다."],["SEIKO","Spirit Chronograph","SBTR009",210000,null,"42mm","스테인리스 스틸","실버 · 타키미터","스틸 브레이슬릿","쿼츠 크로노그래프",null,null,"실버 다이얼과 타키미터 눈금으로 스포티함을 강조한 크로노그래프입니다.","넓은 다이얼과 시인성이 좋은 구성으로 일상용 크로노그래프로 꾸준히 찾는 모델입니다."],["SEIKO","Prospex 40mm","SPB453J1",1900000,null,"40mm","스테인리스 스틸","블랙","스틸 브레이슬릿","오토매틱 Cal.6R35","약 70시간","200m","200m 방수 다이버 워치로 일방향 회전 베젤과 큼직한 야광 인덱스를 갖췄습니다. 40mm로 손목 부담이 적은 사이즈입니다.","1965년 일본 최초의 다이버 워치를 만든 세이코의 프로스펙스 계보를 잇는 시계입니다."],["SEIKO","SBTH007",null,229000,null,null,"스틸","크림","스틸 브레이슬릿","쿼츠",null,null,"크림색 다이얼에 요일과 날짜창을 더해 실용성을 높인 모델입니다.","군더더기 없는 디자인으로 오래 사용하기 좋은 일본 쿼츠 시계입니다."],["SEIKO","SBTH011",null,243000,null,null,"스틸","블랙","스틸 브레이슬릿","쿼츠",null,null,"블랙 다이얼과 요일·날짜창을 갖춘 정통 드레스 워치입니다.","세이코의 쿼츠 기술과 단정한 디자인을 균형 있게 보여주는 모델입니다."],["SEIKO","Speedtimer Style Chronograph","SSB479",453000,null,"38.7mm","스테인리스 스틸","블랙 · 팬더 서브다이얼","스틸 브레이슬릿","쿼츠 크로노그래프",null,null,"블랙 다이얼에 밝은 서브다이얼 두 개가 대비를 이루는 팬더 스타일 크로노그래프입니다.","1960~70년대 레이싱 크로노그래프의 분위기를 현대적으로 풀어냈습니다."],["SEIKO","SUR307P1",null,230000,null,null,"스틸","실버","스틸 브레이슬릿","쿼츠",null,null,"실버 다이얼과 스틸 브레이슬릿이 만드는 깔끔한 드레스 워치입니다.","오래 쓰기 좋은 기본기를 갖춘 세이코 클래식입니다."],["SWATCH","× Blancpain Scuba Fifty Fathoms Ocean of Storms",null,649000,"2023","42.3mm","바이오세라믹","블랙","NATO 스트랩","오토매틱 System51","약 90시간","91m","블랑팡 피프티 패덤스를 스와치의 바이오세라믹과 오토매틱으로 재해석한 협업 모델입니다. 다이버 워치의 상징적인 디자인을 접근 가능한 가격으로 구현했습니다.","1953년 피프티 패덤스는 현대 다이버 워치의 원형으로 꼽히며, 이 협업은 큰 화제를 모았습니다."],["SWATCH","× Omega MoonSwatch Mission to the Moon","SO33M100",443000,"2022","42mm","바이오세라믹","블랙","벨크로 스트랩","쿼츠 크로노그래프",null,null,"오메가 스피드마스터 문워치의 디자인을 스와치의 바이오세라믹으로 재해석한 협업 모델입니다.","2022년 발표 당시 매장마다 긴 줄이 늘어설 정도로 화제를 일으킨 협업입니다."],["SWATCH","× Omega × Snoopy Mission to the Moonphase Full Moon",null,484000,null,"42mm","바이오세라믹","화이트 · 문페이즈","화이트 스트랩","쿼츠 문페이즈",null,null,"문페이즈 기능과 스누피가 어우러진 화이트 컬러의 협업 모델입니다.","오메가 스누피 어워드의 유산을 스와치로 풀어낸 협업입니다."],["AUDEMARS PIGUET","Royal Oak Jumbo Extra-Thin","16202ST",166860000,"2022","39mm","스테인리스 스틸","블루 · 그랑 타피스리","일체형 스틸 브레이슬릿","오토매틱 Cal.7121","약 55시간","50m","제럴드 젠타가 1972년 디자인한 팔각 베젤과 노출된 나사가 상징인 로얄 오크 ‘점보’입니다. 두께 약 8mm대의 울트라 씬 케이스와 타피스리 다이얼이 특징입니다.","럭셔리 스포츠 워치라는 장르를 개척한 모델로, 점보는 로얄 오크의 가장 대표적인 모습입니다."],["CASIO","A158WA-1",null,30000,null,null,"스테인리스 스틸","디지털","스틸 브레이슬릿","쿼츠 디지털",null,"생활방수","80년대 디지털 시계의 감성을 그대로 이어받은 클래식 모델로, 알람과 스톱워치 등 기본 기능을 갖췄습니다.","복고 디자인이 오히려 새롭게 읽히며 패션 아이템으로도 사랑받는 시계입니다."],["CASIO","LTP-V007D-7B",null,39000,null,null,"스틸","화이트 · 로마 숫자","스틸 브레이슬릿","쿼츠",null,null,"사각 케이스와 로마 숫자 다이얼이 클래식한 여성용 모델입니다.","클래식 사각 시계의 매력을 부담 없는 가격에 즐기게 해주는 모델입니다."],["CASIO","LTP-V007L-7B1",null,31000,null,null,"스틸","화이트 · 로마 숫자","블랙 가죽 스트랩","쿼츠",null,null,"사각 케이스에 가죽 스트랩을 더해 단정한 인상을 주는 여성용 모델입니다.","같은 디자인을 소재만 바꿔 즐길 수 있는 모델입니다."],["CASIO","Duro 200 MDV-106-1A","MDV-106",160000,null,null,"스틸 · 블랙 베젤","블랙","레진 스트랩","쿼츠",null,"200m","200m 방수의 쿼츠 다이버 워치로 일방향 회전 베젤을 갖췄습니다.","합리적인 가격에 진짜 다이버 스펙을 갖춘 모델로 인지도가 높습니다."],["CASIO","MTP-1183A-1ADF",null,40000,null,null,"스테인리스 스틸","블랙","스틸 브레이슬릿","쿼츠",null,"50m","블랙 다이얼과 날짜창을 갖춘 기본 아날로그 모델입니다.","군더더기 없는 디자인으로 오랫동안 사랑받는 카시오 스탠다드입니다."],["CASIO","MTP-1183A-7A",null,40000,null,null,"스테인리스 스틸","실버","스틸 브레이슬릿","쿼츠",null,"50m","실버 다이얼의 깔끔한 아날로그 모델로 날짜창을 갖췄습니다.","같은 케이스를 밝은 다이얼로 즐길 수 있는 모델입니다."],["CASIO","MTP-1302D-1A1",null,45000,null,null,"스테인리스 스틸","블랙","스틸 브레이슬릿","쿼츠",null,"50m","플루티드 느낌의 베젤과 블랙 다이얼로 드레스 워치의 분위기를 낸 모델입니다.","가격 대비 클래식한 디자인으로 인기가 높습니다."],["CASIO","MTP-1302DS-7AV",null,77000,null,null,"스테인리스 스틸","펄 질감 다이얼","스틸 브레이슬릿","쿼츠",null,"50m","빛에 따라 색이 달라지는 펄 질감의 다이얼이 특징입니다.","카시오 스탠다드 라인 중 다이얼의 개성이 돋보이는 모델입니다."],["CASIO","MTP-1370D-1A1",null,61000,null,null,"스테인리스 스틸","블랙 · 요일/날짜","스틸 브레이슬릿","쿼츠",null,"50m","요일과 날짜를 함께 보여주는 실용적인 드레스 워치입니다.","기능과 가격의 균형이 좋은 카시오 스탠다드입니다."],["CASIO","MTP-B145D-2A1V",null,178000,null,null,"스테인리스 스틸","터콰이즈 블루","일체형 스틸 브레이슬릿","쿼츠",null,null,"케이스와 브레이슬릿이 매끄럽게 이어지는 형태에 터콰이즈 다이얼을 더한 모델입니다.","컬러 다이얼이 큰 인상을 남기는 카시오의 모던 라인입니다."],["CASIO","MTP-B195D-3AV",null,116000,null,null,"스테인리스 스틸","그린","일체형 스틸 브레이슬릿","쿼츠",null,null,"팔각형 케이스와 그린 다이얼이 도회적인 인상을 주는 모델입니다.","팔각 케이스로 카시오 스탠다드와 다른 개성을 보여주는 모델입니다."],["TISSOT","PRX Powermatic 80","T137.407.11.351.00",870000,"2021","40mm","스테인리스 스틸","아이스 블루","일체형 스틸 브레이슬릿","오토매틱 Powermatic 80","약 80시간","100m","1978년 오리지널 PRX의 디자인을 되살린 일체형 브레이슬릿 시계로, 80시간 파워리저브를 갖춘 오토매틱 모델입니다. 은은한 아이스 블루 다이얼이 특징입니다.","1970년대 쿼츠 시대의 디자인을 오늘날 대중적으로 되살린 대표 사례입니다."],["TISSOT","PRX 35mm Quartz","T137.210.11.351.00",484000,"2021","35mm","스테인리스 스틸","라이트 블루","일체형 스틸 브레이슬릿","쿼츠",null,"100m","PRX의 디자인을 35mm로 줄여 작은 손목에도 어울리게 만든 쿼츠 모델입니다.","작은 사이즈로 PRX 라인업의 폭을 넓혔습니다."],["TISSOT","PRX 40mm Quartz","T137.410.11.041.00",504000,"2021","40mm","스테인리스 스틸","블루","일체형 스틸 브레이슬릿","쿼츠",null,"100m","블루 다이얼과 일체형 브레이슬릿으로 1970년대 감성을 현대적으로 풀어낸 PRX 쿼츠입니다.","PRX는 티쏘의 최근 대표작으로 손꼽힙니다."],["HAMILTON","Khaki Field Auto 38mm","H70455133",939000,null,"38mm","스테인리스 스틸","블랙","스틸 브레이슬릿","오토매틱 H-10","약 80시간","100m","군용 야전 시계에서 출발한 디자인을 오토매틱 무브먼트로 구현한 모델로, 큼직한 아라비아 숫자와 야광 처리로 시인성이 좋습니다.","해밀턴 카키 필드는 미군에 납품했던 야전 시계의 계보를 잇는 브랜드의 정체성입니다."],["HAMILTON","Khaki Field Quartz 38mm","H68201133",599000,null,"38mm","스테인리스 스틸","블랙","스틸 브레이슬릿","쿼츠",null,"100m","같은 카키 필드 디자인을 쿼츠 무브먼트로 구현해 관리 부담을 줄인 모델입니다.","오토매틱보다 가볍게 즐길 수 있는 카키 필드 입문 모델입니다."],["VIVIENNE WESTWOOD","Little Wallace 32mm Blue Silver",null,290000,null,"32mm","스틸","블루 · 크리스탈 베젤","스틸 브레이슬릿","쿼츠",null,null,"32mm의 작은 사이즈와 크리스탈 세팅 베젤, 블루 다이얼로 화사한 인상의 여성용 모델입니다.","브랜드의 오브 로고를 우아하게 담은 여성용 라인입니다."]];
/* ---- 상태 ---- */
S.wv=Array.isArray(S.wv)?S.wv.filter(i=>WL[i]):[];
let wvt='d',wbr='ALL',wso='def',wsel=null,wfresh=null;
const wimg=i=>`img/w${i}.jpg`,wown=i=>S.wv.includes(i);
// 보관함(여러 개): S.wb=[{n:이름, s:[칸 번호 -> 시계 id | null]}], S.wa=현재 보관함. 같은 시계를 여러 보관함에 둘 수 있고, 컬렉션(S.wv)에서 빠진 시계는 자동으로 모든 보관함에서 빠집니다.
// 이전 버전 데이터(S.ws 단일 배치)는 첫 번째 보관함으로 자동 이전됩니다.
function wbx(){
 if(!Array.isArray(S.wb)||!S.wb.length){const seen=new Set();let a=(Array.isArray(S.ws)?S.ws:[]).map(i=>{if(typeof i==='number'&&S.wv.includes(i)&&!seen.has(i)){seen.add(i);return i}return null});
  S.wv.forEach(i=>{if(!seen.has(i)){const k=a.indexOf(null);if(k<0)a.push(i);else a[k]=i;seen.add(i)}});S.wb=[{n:'보관함 1',s:a,c:Math.max(12,Math.ceil((a.length+1)/12)*12)}]}
 S.wb.forEach(b=>{const seen=new Set();b.s=(Array.isArray(b.s)?b.s:[]).map(i=>{if(typeof i==='number'&&S.wv.includes(i)&&!seen.has(i)){seen.add(i);return i}return null});
  while(b.s.length&&b.s[b.s.length-1]===null)b.s.pop();if(typeof b.n!=='string'||!b.n.trim())b.n='보관함';
  if(!(b.c>=1))b.c=Math.max(12,Math.ceil((b.s.length+1)/12)*12);b.c=Math.max(Math.min(Math.floor(b.c),48),b.s.length)});
 S.wa=Math.min(Math.max(Math.floor(+S.wa)||0,0),S.wb.length-1);return S.wb[S.wa]}
const wsync=()=>wbx().s,wfree=b=>{for(let k=0;k<b.c;k++)if(b.s[k]==null)return k;return -1},wcols=()=>innerWidth>=900?6:innerWidth>=600?4:2,wesc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function wlist(own){let a=own?wsync().filter(i=>i!==null):WL.map((_,i)=>i);
 if(wbr!=='ALL'&&!a.some(i=>WL[i][0]===wbr))wbr='ALL';
 a=a.filter(i=>wbr==='ALL'||WL[i][0]===wbr);
 const c=(p,q)=>WL[p][1].localeCompare(WL[q][1],'ko');
 if(wso==='brand')a.sort((p,q)=>WORD.indexOf(WL[p][0])-WORD.indexOf(WL[q][0])||c(p,q));
 else if(wso==='name')a.sort(c);else if(wso==='hi')a.sort((p,q)=>WL[q][3]-WL[p][3]);else if(wso==='lo')a.sort((p,q)=>WL[p][3]-WL[q][3]);
 return a}
function wchips(base){const n={};base.forEach(i=>n[WL[i][0]]=(n[WL[i][0]]||0)+1);
 return`<div class="wsc">${[['ALL','ALL · '+base.length],...WORD.filter(b=>n[b]).map(b=>[b,b+' · '+n[b]])].map(([k,l])=>`<button class="${wbr===k?'on':''}" onclick="wbr='${k}';render()">${l}</button>`).join('')}</div>`}
function wsort(own){return`<div class="wso"><select aria-label="정렬" onchange="wso=this.value;render()">${[['def',own?'내 배치 순서':'기본 순서'],['brand','브랜드순'],['name','이름순'],['hi','가격 높은순'],['lo','가격 낮은순']].map(([k,l])=>`<option value="${k}"${wso===k?' selected':''}>${l}</option>`).join('')}</select></div>`}
const wpad=n=>String(n).padStart(2,'0');
function wcard(i){const w=WL[i];
 return`<div class="card tap wc" onclick="wopen(${i})"><div class="wst"><img src="${wimg(i)}" alt="${w[0]} ${w[1]}" loading="lazy">${wown(i)?'<span class="wtag">보유 중</span>':''}</div><div class="wm"><div class="wb">${w[0]}</div><div class="wn">${w[1]}</div><div class="wr">${w[2]||'&nbsp;'}</div><div class="wp">${won(w[3])}</div></div></div>`}
function wopen(i){if(wdone)return;wsel=i;tab='wdetail';render();scrollTo(0,0)}
function wgo(){closeM();wvt='d';wbr='ALL';wso='def';render();scrollTo(0,0)}
// 슬롯 1칸: 쿠션 위에 놓인 실제 시계(배경만 투명 처리한 원본 사진). 탐색 케이스에서만 라벨 표시, 내 보관함은 시계만 보입니다.
function wslot(i,own,p){const w=WL[i],f=own&&wfresh===i;
 return`<div class="ws${f?' fr':''}"${own&&p!=null?` data-p="${p}" data-i="${i}"`:''} onclick="wopen(${i})"><div class="wcu"><img src="img/c/${i}.webp" alt="${w[0]} ${w[1]}" draggable="false" loading="lazy">${!own&&wown(i)?'<span class="wtag">IN VAULT</span>':''}</div>${own?'':`<div class="wlb"><b>${w[0]}</b><span>${w[1]}</span><i>${won(w[3])}</i></div>`}</div>`}
function whid(){return`<div class="ws em hid"><div class="wcu"></div></div>`}
function wempty(p){return`<div class="ws em" data-p="${p}" data-i="" onclick="wpick(${p})"><div class="wcu"></div></div>`}
// 쿠션 개수만큼 만들고 12구 트레이 단위로 쌓습니다. 칸 크기는 화면 폭 기준(모바일 2열 · 태블릿 4열 · 와이드 6열)으로 고정, 개수가 적으면 트레이가 작아집니다.
let wcl=null;
function wtrays(c){const cols=wcl=wcols();let o='';for(let k=0;k<c.length;k+=12){const t=c.slice(k,k+12),cc=Math.min(cols,t.length);while(t.length%cc)t.push('<div class="ws vd"></div>');o+=`<div class="wtray" style="--c:${cc};--k:${cols}">${t.join('')}</div>`}return o}
addEventListener('resize',()=>{if(typeof tab!=='undefined'&&tab==='watch'&&wvt==='v'&&!wdrag&&wcols()!==wcl)render()});
const whg='<span class="hg l"></span><span class="hg r"></span>';
function wvault(){const bx=wbx(),slots=bx.s,cap=bx.c,items=slots.filter(i=>i!==null),n=items.length,t=items.reduce((s,i)=>s+WL[i][3],0),b=new Set(items.map(i=>WL[i][0])).size,
 all=S.wv.reduce((s,i)=>s+WL[i][3],0);
 if(wbr!=='ALL'&&!items.some(i=>WL[i][0]===wbr))wbr='ALL';
 const arr=wso==='def',vis=i=>wbr==='ALL'||WL[i][0]===wbr;let cells;
 // 배치 순서 보기: 칸 위치는 그대로 두고, 선택한 브랜드가 아닌 시계만 보이지 않게 합니다.
 if(arr){cells=[];for(let p=0;p<cap;p++){const i=slots[p];cells.push(i==null?wempty(p):vis(i)?wslot(i,true,p):whid())}}
 else cells=wlist(true).map(i=>wslot(i,true));
 wfresh=null;
 const tabs=`<div class="wsc wbt">${S.wb.map((x,k)=>`<button class="${k===S.wa?'on':''}" onclick="wbsel(${k})">${wesc(x.n)} · ${x.s.filter(v=>v!==null).length}/${x.c}</button>`).join('')}<button onclick="wbnew()">＋ 새 보관함</button></div>`;
 const hint=!S.wv.length?`<div class="sub" style="margin:16px 2px 12px;text-align:center">아직 보유한 시계가 없습니다. 시계 탐색에서 마음에 드는 시계를 구매해 첫 번째 쿠션에 올려보세요.</div><button class="btn w" onclick="wgo()">시계 탐색하기</button>`
  :`<div class="sub" style="margin-top:14px;line-height:1.65">${arr?(wbr!=='ALL'?`${wesc(wbr)} 시계만 보이고 나머지는 가려져 있어요. 시계 위치는 그대로입니다. `:'')+'빈 쿠션을 누르면 보유한 시계를 골라 넣을 수 있어요. 시계를 길게 눌러(마우스는 그대로) 끌면 다른 칸으로 옮기거나 자리를 바꾸고, 화면 아래 ‘꺼내기’에 놓으면 이 보관함에서만 뺍니다.':'정렬을 사용 중에는 위치를 옮길 수 없어요. ‘내 배치 순서’로 돌아오면 옮길 수 있습니다.'}<br>전체 컬렉션 ${S.wv.length}점 · Collection Value ${won(all)} — 표시 가격의 합산이며 총자산에 포함됩니다.</div>`;
 return`<div style="margin-top:12px">${tabs}</div>`+(n?`<div style="margin-top:6px">${wchips(items)}${wsort(true)}</div>`:'')+
 `<div class="wbox${arr?' arr':''}"><div class="wlid">${whg}<button class="wgear" onclick="wbren()">관리</button><div class="wvt">${wesc(bx.n)}</div><div class="wvc">${n} WATCHES</div><div class="wvs"><div><span>Brands</span><b>${b}</b></div><div><span>Box Value</span><b>${won(t)}</b></div><div><span>Cushions</span><b>${n} / ${cap}</b></div></div></div>${wtrays(cells)}</div>`+hint}
// ---- 보관함 추가 · 이름 변경 · 삭제 · 선택 ----
function wbsel(k){S.wa=k;wbr='ALL';wso='def';save();render()}
function wform(title,val,cnt,fn,extra){return`<div style="font-weight:700;font-size:18px">${title}</div><div class="lab" style="margin:14px 0 6px">보관함 이름</div><input id="wbn" maxlength="16" value="${wesc(val)}" placeholder="보관함 이름" onkeydown="if(event.key==='Enter')${fn}"><div class="lab" style="margin:12px 0 6px">쿠션 개수 (1~48개)</div><input id="wbc" type="number" inputmode="numeric" min="1" max="48" value="${cnt}" onkeydown="if(event.key==='Enter')${fn}"><button class="btn w" style="margin-top:16px" onclick="${fn}">확인</button>${extra||''}`}
function wsheet(h){sheet(h);setTimeout(()=>{const e=document.getElementById('wbn');if(e)e.select()},60)}
function wcnt(){const c=parseInt(document.getElementById('wbc').value,10);if(!(c>=1&&c<=48)){toast('쿠션 개수는 1~48개로 입력해 주세요');return 0}return c}
function wbnew(){if(wbx()&&S.wb.length>=10)return toast('보관함은 최대 10개까지 만들 수 있어요');wsheet(wform('새 보관함','보관함 '+(S.wb.length+1),12,'wbadd()'))}
function wbadd(){const c=wcnt();if(!c)return;const v=(document.getElementById('wbn').value||'').trim()||'보관함 '+(S.wb.length+1);S.wb.push({n:v.slice(0,16),s:[],c});S.wa=S.wb.length-1;wbr='ALL';wso='def';save();closeM();render();toast('쿠션 '+c+'개짜리 보관함을 만들었습니다')}
function wbren(){const bx=wbx();wsheet(wform('보관함 관리',bx.n,bx.c,'wbrn()',S.wb.length>1?`<button class="btn s w" style="margin-top:8px;color:var(--up)" onclick="wbdel()">이 보관함 삭제</button><div class="sub" style="margin-top:8px;text-align:center">삭제해도 시계는 컬렉션에 그대로 남아요.</div>`:''))}
function wbrn(){const bx=wbx(),c=wcnt();if(!c)return;if(c<bx.s.length)return toast(bx.s.length+'번째 칸까지 시계가 있어서 그보다 적게 줄일 수 없어요');const v=(document.getElementById('wbn').value||'').trim();if(v)bx.n=v.slice(0,16);bx.c=c;save();closeM();render()}
function wbdel(){const bx=wbx();if(S.wb.length<2)return;if(!confirm(`‘${bx.n}’ 보관함을 삭제할까요?\n시계는 컬렉션에 그대로 남습니다.`))return;S.wb.splice(S.wa,1);S.wa=Math.max(0,S.wa-1);wbr='ALL';wso='def';save();closeM();render();toast('보관함을 삭제했습니다')}
// ---- 빈 쿠션을 눌러 보유 시계 선택 ----
function wpick(p){if(wdone)return;const bx=wbx(),have=new Set(bx.s),list=S.wv.filter(i=>!have.has(i)&&(wbr==='ALL'||WL[i][0]===wbr));
 const body=list.length?`<div class="wpg">${list.map(i=>`<button class="wpi" onclick="wput(${i},${p})"><span class="wpc"><img src="img/c/${i}.webp" alt="" draggable="false"></span><b>${WL[i][0]}</b><span class="wpn">${WL[i][1]}</span><i>${won(WL[i][3])}</i></button>`).join('')}</div>`
  :`<div class="sub" style="text-align:center;padding:22px 0 18px;line-height:1.7">${S.wv.length?(wbr==='ALL'?'보유한 시계가 모두 이 보관함에 들어 있어요.':wesc(wbr)+' 시계는 모두 이 보관함에 들어 있어요.'):'아직 보유한 시계가 없어요.'}<br>시계 탐색에서 새로 수집해 보세요.</div><button class="btn w" onclick="wgo()">시계 탐색하기</button>`;
 sheet(`<div style="font-weight:700;font-size:18px">시계 선택</div><div class="sub" style="margin:2px 0 14px">${wesc(bx.n)} · ${p+1}번째 칸에 넣을 시계를 골라주세요</div>${body}`)}
function wput(i,p){const a=wbx().s;while(a.length<p)a.push(null);a[p]=i;wfresh=i;save();closeM();render()}
// ---- 드래그로 칸 옮기기 (마우스: 바로 드래그 / 터치: 길게 눌러서 드래그) ----
let wdrag=null,wdone=false;
document.addEventListener('touchmove',e=>{if(wdrag&&wdrag.on&&e.cancelable)e.preventDefault()},{passive:false});
document.addEventListener('contextmenu',e=>{if(wdrag)e.preventDefault()});
function wdstart(){const d=wdrag;if(!d||d.on)return;d.on=true;d.cx=d.x;d.cy=d.y;
 const im=d.el.querySelector('.wcu img'),r=im.getBoundingClientRect(),g=document.createElement('div');
 g.className='wghost';g.style.width=r.width+'px';g.style.height=r.height+'px';g.innerHTML=`<img src="${im.src}" draggable="false">`;document.body.appendChild(g);
 const z=document.createElement('div');z.className='wout';z.textContent='여기로 끌어서 보관함에서 꺼내기';document.body.appendChild(z);
 d.g=g;d.z=z;d.gw=r.width;d.gh=r.height;d.el.classList.add('dg');document.body.classList.add('wdg-on');
 try{navigator.vibrate&&navigator.vibrate(12)}catch(e){}
 const loop=()=>{if(!wdrag||!wdrag.on)return;const top=70,bot=innerHeight-150;
  if(!d.out){if(d.cy<top)scrollBy(0,-Math.min(16,(top-d.cy)/4+2));else if(d.cy>bot)scrollBy(0,Math.min(16,(d.cy-bot)/4+2))}
  wdmove();d.raf=requestAnimationFrame(loop)};loop()}
function wdmove(){const d=wdrag;if(!d||!d.on)return;
 d.g.style.transform=`translate(${d.cx-d.gw/2}px,${d.cy-d.gh/2}px) scale(1.08)`;
 const t=document.elementFromPoint(d.cx,d.cy),out=!!(t&&t.closest&&t.closest('.wout')),el=!out&&t&&t.closest?t.closest('.wbox.arr .ws[data-p]'):null;
 d.out=out;d.z.classList.toggle('on',out);
 if(d.dov!==el){if(d.dov)d.dov.classList.remove('dov');if(el&&el!==d.el)el.classList.add('dov');d.dov=el}}
function wdend(drop){const d=wdrag;if(!d)return;wdrag=null;clearTimeout(d.t);cancelAnimationFrame(d.raf);
 if(!d.on)return;
 const to=drop&&d.dov?+d.dov.dataset.p:null,out=drop&&d.out;
 if(d.g)d.g.remove();if(d.z)d.z.remove();if(d.dov)d.dov.classList.remove('dov');d.el.classList.remove('dg');document.body.classList.remove('wdg-on');
 wdone=true;setTimeout(()=>wdone=false,350);
 const bx=wbx();
 if(out){const a=bx.s.slice();a[d.p]=null;while(a.length&&a[a.length-1]===null)a.pop();bx.s=a;save();render();toast('보관함에서 꺼냈습니다');return}
 if(to!==null&&to!==d.p){const a=bx.s.slice(),m=Math.max(d.p,to)+1;while(a.length<m)a.push(null);const x=a[d.p];a[d.p]=a[to];a[to]=x;
  while(a.length&&a[a.length-1]===null)a.pop();bx.s=a;save();render()}}
document.addEventListener('pointerdown',e=>{const el=e.target.closest?e.target.closest('.wbox.arr .ws[data-p]'):null;
 if(!el||el.dataset.i===''||(e.pointerType==='mouse'&&e.button!==0))return;
 wdrag={el,p:+el.dataset.p,x:e.clientX,y:e.clientY,on:false,id:e.pointerId,touch:e.pointerType!=='mouse'};
 if(wdrag.touch)wdrag.t=setTimeout(wdstart,280)});
document.addEventListener('pointermove',e=>{const d=wdrag;if(!d||e.pointerId!==d.id)return;
 if(!d.on){const m=Math.hypot(e.clientX-d.x,e.clientY-d.y);if(d.touch){if(m>9){clearTimeout(d.t);wdrag=null}}else if(m>5)wdstart();return}
 d.cx=e.clientX;d.cy=e.clientY;wdmove()});
document.addEventListener('pointerup',e=>{if(wdrag&&e.pointerId===wdrag.id)wdend(true)});
document.addEventListener('pointercancel',e=>{if(wdrag&&e.pointerId===wdrag.id)wdend(false)});
V.watch=function(){const all=wlist(false);
 return`<h1>WATCH VAULT</h1><div class="seg" style="margin-top:0">${[['d','시계 탐색'],['v','내 보관함 · '+S.wv.length]].map(([k,l])=>`<button class="${wvt===k?'on':''}" onclick="wvt='${k}';wbr='ALL';wso='def';render()">${l}</button>`).join('')}</div>`+
 (wvt==='v'?wvault():`${wchips(WL.map((_,i)=>i))}${wsort(false)}<div class="wcnt">총 <b>${all.length}</b>개의 시계</div><div class="grid wg">${all.map(wcard).join('')}</div><div class="sub" style="margin-top:16px;line-height:1.6">표시 가격은 고정값입니다. 시계를 눌러 상세 정보를 확인하고 구매하면 현금에서 가격만큼 차감되며, 구매한 시계는 내 보관함에 놓입니다. 보유 시계는 총자산에 포함됩니다.</div>`)};
// 구매: 현금에서 표시 가격만큼 차감 · 판매: 같은 가격만큼 현금 추가 (수수료 없음). 보유 시계는 총자산에 포함됩니다.
function wbuy(i){const w=WL[i];if(!w||wown(i))return;
 if(S.cash<w[3])return toast('현금이 부족합니다 (부족 '+won(w[3]-S.cash)+')');
 if(!confirm(`${w[0]} ${w[1]}\n${won(w[3])}에 구매할까요?\n구매 후 현금: ${won(S.cash-w[3])}`))return;
 S.cash-=w[3];S.wv.push(i);wfresh=i;addTx('watch',`${w[0]} ${w[1]} 구매`,-w[3]);
 const b=wbx(),a=b.s;let full=false;if(!a.includes(i)){const k=wfree(b);if(k>=0){while(a.length<k)a.push(null);a[k]=i}else full=true}
 wbx();snap();render();toast(full?'구매 완료 · 현재 보관함이 가득 차서 쿠션에는 놓지 못했어요':'구매 완료 · 보관함에 올려놓았어요')}
function wsell(i){const w=WL[i];if(!w||!wown(i))return;
 if(!confirm(`${w[0]} ${w[1]}\n${won(w[3])}에 판매할까요?\n판매 후 현금: ${won(S.cash+w[3])}`))return;
 S.cash+=w[3];S.wv=S.wv.filter(x=>x!==i);addTx('watch',`${w[0]} ${w[1]} 판매`,w[3]);
 wbx();snap();render();toast('판매 완료 · 현금 '+won(w[3])+' 추가')}
V.wdetail=function(){const i=wsel,w=WL[i];if(!w){tab='watch';return V.watch()}const has=wown(i),
 R=(a,b)=>b?`<div class="row dr"><span class="sub">${a}</span><span class="dv">${b}</span></div>`:'';
 return`<div class="sub" style="cursor:pointer;margin-bottom:14px" onclick="tab='watch';render()">‹ 시계</div><div class="wdg"><div class="wst big"><img src="${wimg(i)}" alt="${w[0]} ${w[1]}"></div><div>
 <div class="wb">${w[0]}</div><div style="font-weight:700;font-size:22px;line-height:1.3;margin:2px 0 4px">${w[1]}</div><div class="big" style="font-size:clamp(26px,8vw,32px)">${won(w[3])}</div><div class="sub" style="margin-top:2px">앱 표시 가격 (고정)</div>
 <div class="sub" style="margin-top:14px">보유 현금 <b style="color:var(--ink)">${won(S.cash)}</b></div>${has?`<div class="sub" style="margin-top:2px">현재 보유 중인 시계입니다. 총자산에 ${won(w[3])}로 포함됩니다.</div><button class="btn s w" style="margin-top:12px" onclick="wsell(${i})">판매하기 · ${won(w[3])}</button>`:`<button class="btn w" style="margin-top:12px" ${S.cash<w[3]?'disabled':`onclick="wbuy(${i})"`}>구매하기 · ${won(w[3])}</button>${S.cash<w[3]?`<div class="sub" style="margin-top:6px;color:var(--up)">현금이 ${won(w[3]-S.cash)} 부족합니다</div>`:''}`}
 <div class="lab">기본 정보</div><div class="card" style="padding:4px 18px">${R('브랜드',w[0])}${R('모델명',w[1])}${R('레퍼런스',w[2])}${R('가격',won(w[3]))}${R('출시년도',w[4])}</div>
 <div class="lab">제품 정보</div><div class="card" style="padding:4px 18px">${R('케이스 크기',w[5])}${R('케이스 소재',w[6])}${R('다이얼',w[7])}${R('브레이슬릿 / 스트랩',w[8])}${R('무브먼트',w[9])}${R('파워리저브',w[10])}${R('방수',w[11])}</div></div></div>
 <div class="lab">상세 설명</div><div class="card" style="line-height:1.75">${w[12]}</div>
 <div class="lab">COLLECTOR'S VALUE</div><div class="card wnote"><div style="line-height:1.75">${WBR[w[0]]}</div><div style="line-height:1.75;margin-top:10px">${w[13]}</div></div>
 <div class="sub" style="margin-top:14px;line-height:1.6">가격은 고정된 표시 가격이며 변동되지 않습니다. 구매·판매는 같은 가격으로 이루어지고 수수료는 없습니다. 확인되지 않은 사양은 표시하지 않았습니다.</div>`};
