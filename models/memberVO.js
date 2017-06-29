
// VO 만들기
// 회원관리를 위한 MODEL선언

var mongoose = require('mongoose');
var vo =mongoose.Schema({
	
	strName : String,
	strAddr : String,
	strTel : String,
	intAge : Number //정수든 실수든 상관없음
	
})
// vo로 선언된 스키마를 이용해서 members Collection으로 생성
// db.members.find() 단수로 저장해도 복수로 저장됨!!!
module.exports = mongoose.model('member', vo);