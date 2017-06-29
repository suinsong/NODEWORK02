module.exports = function(app, mVO) {// mVO라고 이름이 달라고 값이 이동하는 거니깐 상관없음

	// insert는 폼을 보여준다음에 저장하기!!!!!

	app.get('/insert', function(req, res) {
		var vo = new mVO(); // 빈 데이터를 만들어서 input_form을 render함
		res.render('input_form', {
			item : vo,
			action : '/insert',
			pageTitle: '회원 가입' 
		});

	})

	// form에서 데이터를 입력하고, 저장 질의(명령)을 실행했을 떄 호출되는 부분
	app.post('/insert', function(req, res) {

		var vo = new mVO(req.body);
		vo.save(function(err, data) {
			// res.json(data); // json형태로 만들어서 res해라
			res.redirect('/list') // 무조건 화면 강제 전환

		})

	})

	// 리스트 보여주기
	app.get('/list', function(req, res) {
		// db.connection.find()
		mVO.find(function(err, data) {// 전체 파일인 data라고 이름붙이고 가져옴
			// res.json(data);
			// list라는 변수로 data를 가져와 "list(는 list.ejs)"로 입혀라
			// 그럼 render해서 결과를 클라이언트에서 넘겨줌
			res.render("list", {
				list : data
			})
		})
	})

	// 수정하기
	// 조회를 해서
	app.get('/update/:id', function(req, res) {
		var id = req.params.id;
		mVO.findOne({ // 한명만 조회
			_id : id
		}, function(err, data) {
			res.render('input_form', {
				item : data,
				action : '/update',
				pageTitle: '회원 정보 수정'
			});

		})

	})

	app.post('/update', function(req, res) {
		var id = req.body.id
		mVO.update({
			_id : id
		}, {
			$set : req.body
		}, function(err, data) {
			res.redirect('/list')

		})

	})

	// 삭제하기
	// 클라이언트에서 /delete질의를 하면서 _id값을 전달해주면
	// :id로 받음
	app.get('/delete/:id', function(req, res) {
		var id = req.params.id; // :id에 저장된 값을 추출하여 id변수에 담음
		mVO.remove({
			_id : id
		}, function(err, data) {
			res.redirect('/list'); // 삭제하고 바로 list보여줌
		})

	})

}
