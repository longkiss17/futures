var typeList = [
	{
		typeName: 'BossMon_Appear',
		typeDesc: '보스몬스터가 생성'
	},
	{
		typeName: 'BossMon_Disappear',
		typeDesc: '보스몬스터가 소멸'
	},
	{
		typeName: 'Char_AccessDisconnect',
		typeDesc: '캐릭터가 접속 종료'
	},
	{
		typeName: 'Char_CashShopEnter',
		typeDesc: '캐릭터가 캐시샵 입장'
	},
	{
		typeName: 'Char_CashShopLeave',
		typeDesc: '캐릭터가 캐시샵 퇴장'
	},
	{
		typeName: 'Char_ChannelMove',
		typeDesc: '캐릭터가 채널 이동'
	},
	{
		typeName: 'Char_CharacterAttack',
		typeDesc: '캐릭터가 캐릭터 공격'
	},
	{
		typeName: 'Char_CharacterHeal',
		typeDesc: '캐릭터가 캐릭터 힐'
	},
	{
		typeName: 'Char_CharacterKill',
		typeDesc: '캐릭터가 캐릭터 킬'
	},
	{
		typeName: 'Char_Chat',
		typeDesc: '대화 (채팅 로그)'
	},
	{
		typeName: 'Char_CoupleEnd',
		typeDesc: '캐릭터가 커플 종료'
	},
	{
		typeName: 'Char_CoupleStart',
		typeDesc: '캐릭터가 커플 시작'
	},
	{
		typeName: 'Char_Dead',
		typeDesc: '캐릭터가 사망'
	},
	{
		typeName: 'Char_DungeonEnd',
		typeDesc: '캐릭터가 던전 종료'
	},
	{
		typeName: 'Char_DungeonStart',
		typeDesc: '캐릭터가 던전 시작'
	},
	{
		typeName: 'Char_ExpGet',
		typeDesc: '캐릭터가 경험치 획득'
	},
	{
		typeName: 'Char_FieldMove',
		typeDesc: '캐릭터가 필드 이동'
	},
	{
		typeName: 'Char_FriendEnd',
		typeDesc: '캐릭터가 친구 종료'
	},
	{
		typeName: 'Char_FriendStart',
		typeDesc: '캐릭터가 친구 시작'
	},
	{
		typeName: 'Char_GuildCreate',
		typeDesc: '캐릭터가 길드 생성'
	},
	{
		typeName: 'Char_GuildDestroy',
		typeDesc: '캐릭터가 길드 해체'
	},
	{
		typeName: 'Char_GuildEntrust',
		typeDesc: '캐릭터가 길드 위임'
	},
	{
		typeName: 'Char_GuildJoin',
		typeDesc: '캐릭터가 길드 가입'
	},
	{
		typeName: 'Char_GuildLeave',
		typeDesc: '캐릭터가 길드 탈퇴'
	},
	{
		typeName: 'Char_HousingComplete',
		typeDesc: '캐릭터가 하우징 완료'
	},
	{
		typeName: 'Char_ItemEquip',
		typeDesc: '캐릭터가 아이템 장착'
	},
	{
		typeName: 'Char_ItemGet',
		typeDesc: '캐릭터가 아이템 획득'
	},
	{
		typeName: 'Char_ItemRepair',
		typeDesc: '캐릭터가 아이템 수리'
	},
	{
		typeName: 'Char_LevelUp',
		typeDesc: '캐릭터가 레벨업'
	},
	{
		typeName: 'Char_MailDestroy',
		typeDesc: '캐릭터가 편지 삭제'
	},
	{
		typeName: 'Char_MailKeep',
		typeDesc: '캐릭터가 편지 보관'
	},
	{
		typeName: 'Char_MailRead',
		typeDesc: '캐릭터가 편지 읽음'
	},
	{
		typeName: 'Char_MailReceive',
		typeDesc: '캐릭터가 편지 받음'
	},
	{
		typeName: 'Char_MailSend',
		typeDesc: '캐릭터가 편지 보냄'
	},
	{
		typeName: 'Char_MarketEnter',
		typeDesc: '캐릭터가 거래소 입장'
	},
	{
		typeName: 'Char_MarketLeave',
		typeDesc: '캐릭터가 거래소 퇴장'
	},
	{
		typeName: 'Char_NameChange',
		typeDesc: '캐릭터가 이름 변경'
	},
	{
		typeName: 'Char_NPCInteract',
		typeDesc: '캐릭터가 NPC와 대화'
	},
	{
		typeName: 'Char_PartyCreate',
		typeDesc: '캐릭터가 파티 생성'
	},
	{
		typeName: 'Char_PartyDestroy',
		typeDesc: '캐릭터가 파티 해체'
	},
	{
		typeName: 'Char_PartyJoin',
		typeDesc: '캐릭터가 파티 가입'
	},
	{
		typeName: 'Char_PartyLeave',
		typeDesc: '캐릭터가 파티 탈퇴'
	},
	{
		typeName: 'Char_ProfileChange',
		typeDesc: '캐릭터가 프로필 변경'
	},
	{
		typeName: 'Char_QuestAccept',
		typeDesc: '캐릭터가 퀘스트 수락'
	},
	{
		typeName: 'Char_QuestComplete',
		typeDesc: '캐릭터가 퀘스트 완료'
	},
	{
		typeName: 'Char_QuestReset',
		typeDesc: '캐릭터가 퀘스트 리셋'
	},
	{
		typeName: 'Char_Report',
		typeDesc: '캐릭터가 신고'
	},
	{
		typeName: 'Char_Revive',
		typeDesc: '캐릭터가 부활'
	},
	{
		typeName: 'Char_SkillGet',
		typeDesc: '캐릭터가 스킬 습득'
	},
	{
		typeName: 'Char_SkillUse',
		typeDesc: '캐릭터가 스킬 사용'
	},
	{
		typeName: 'Char_TitleEquip',
		typeDesc: '캐릭터가 칭호 적용'
	},
	{
		typeName: 'Char_TitleGet',
		typeDesc: '캐릭터가 칭호 획득'
	},
	{
		typeName: 'Cheat_Use',
		typeDesc: '치트 사용'
	},
	{
		typeName: 'Field_Create',
		typeDesc: '필드 생성'
	},
	{
		typeName: 'Field_Destroy',
		typeDesc: '필드 삭제'
	},
	{
		typeName: 'InMatch_End',
		typeDesc: '매치 종료 (유저 단위)'
	},
	{
		typeName: 'InMatch_Start',
		typeDesc: '매치 시작 (유저 단위)'
	},
	{
		typeName: 'Match_End',
		typeDesc: '매치 종료 (매치 단위)'
	},
	{
		typeName: 'Match_Start',
		typeDesc: '매치 시작 (매치 단위)'
	},
	{
		typeName: 'User_AccessConnect',
		typeDesc: '유저(NPSN 단위)가 접속'
	},
	{
		typeName: 'User_AccessDisconnect',
		typeDesc: '유저가 접속 종료'
	},
	{
		typeName: 'User_AutoMatchingEnd',
		typeDesc: '유저가 자동매칭 종료'
	},
	{
		typeName: 'User_AutoMatchingStart',
		typeDesc: '유저가 자동매칭 시작'
	},
	{
		typeName: 'User_CashMoneyGet',
		typeDesc: '유저가 현금화폐 획득'
	},
	{
		typeName: 'User_CashMoneyUse',
		typeDesc: '유저가 현금화폐 사용'
	},
	{
		typeName: 'User_CashShopEnter',
		typeDesc: '유저가 캐시샵 입장'
	},
	{
		typeName: 'User_CashShopLeave',
		typeDesc: '유저가 캐시샵 퇴장'
	},
	{
		typeName: 'User_ChannelMove',
		typeDesc: '유저가 채널 이동'
	},
	{
		typeName: 'User_CharacterCreate',
		typeDesc: '유저가 캐릭터 생성'
	},
	{
		typeName: 'User_CharacterDestroy',
		typeDesc: '유저가 캐릭터 삭제'
	},
	{
		typeName: 'User_CharacterEnchant',
		typeDesc: '유저가 캐릭터 강화'
	},
	{
		typeName: 'User_CharacterGet',
		typeDesc: '유저가 캐릭터 획득'
	},
	{
		typeName: 'User_CharacterUnlock',
		typeDesc: '유저가 캐릭터 구매'
	},
	{
		typeName: 'User_Chat',
		typeDesc: '대화 (채팅 로그)'
	},
	{
		typeName: 'User_DungeonEnd',
		typeDesc: '유저가 던전 종료'
	},
	{
		typeName: 'User_DungeonStart',
		typeDesc: '유저가 던전 시작'
	},
	{
		typeName: 'User_ExpGet',
		typeDesc: '유저가 경험치 획득'
	},
	{
		typeName: 'User_FieldMove',
		typeDesc: '유저가 필드 이동'
	},
	{
		typeName: 'User_FriendEnd',
		typeDesc: '유저가 친구 종료'
	},
	{
		typeName: 'User_FriendStart',
		typeDesc: '유저가 친구 시작'
	},
	{
		typeName: 'User_GameMoneyGet',
		typeDesc: '유저가 게임머니 획득'
	},
	{
		typeName: 'User_GameMoneyUse',
		typeDesc: '유저가 게임머니 사용'
	},
	{
		typeName: 'User_GuildCreate',
		typeDesc: '유저가 길드 생성'
	},
	{
		typeName: 'User_GuildDestroy',
		typeDesc: '유저가 길드 해체'
	},
	{
		typeName: 'User_GuildEntrust',
		typeDesc: '유저가 길드 위임'
	},
	{
		typeName: 'User_GuildInvited',
		typeDesc: '유저가 길드 초대받음'
	},
	{
		typeName: 'User_GuildJoin',
		typeDesc: '유저가 길드 가입'
	},
	{
		typeName: 'User_GuildLeave',
		typeDesc: '유저가 길드 탈퇴'
	},
	{
		typeName: 'User_GuildLevelUp',
		typeDesc: '길드 레벨업(등급 업)'
	},
	{
		typeName: 'User_HobbyEnd',
		typeDesc: '유저가 취미활동 종료'
	}
];
