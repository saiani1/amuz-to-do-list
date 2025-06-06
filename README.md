# To Do List
- 배포URL: [https://amuz-to-do-list.vercel.app](https://amuz-to-do-list.vercel.app/)
- 사용기술: React.js, TypeScript, Tailwind.css, Recoil, Supabase(DB)
### 사용법
1. 로그인/회원가입
- 로그인: email/password를 입력하여 로그인 (email: saiani@naver.com / password: 123456으로 접속이 가능함)<br />
<img width="396" alt="스크린샷 2025-06-06 오후 10 25 30" src="https://github.com/user-attachments/assets/9d0c4153-eb58-40aa-b2f8-ff69164fadb7" /><br />
- 회원가입: email/password/닉네임/프로필 이미지를 업로드하고 회원가입<br />
<img width="395" alt="스크린샷 2025-06-06 오후 10 25 48" src="https://github.com/user-attachments/assets/1ee40624-4bd6-4dff-bfa1-8726f6997fa1" /><br />
2. 메인페이지
- 상단에 업로드한 프로필이미지, 닉네임이 표시되고 완료 task / 전체 task가 도넛차트로 표시됨
- 하단에는 카테고리 리스트가 표시되며 우측하단의 플러스 버튼을 클릭하여 카테고리 추가가 가능함
<img width="395" alt="스크린샷 2025-06-06 오후 10 24 35" src="https://github.com/user-attachments/assets/8c9e5f4e-bfe6-46bd-a62b-92bc21aef4a9" /> <br />
3. 카테고리 생성 페이지
- 카테고리명과 카테고리에 사용할 이미지를 업로드 하여 카테고리 생성
- 기존 생성한 카테고리명과 중복되면 toast메시지를 띄움<br />
<img width="377" alt="스크린샷 2025-06-06 오후 10 26 15" src="https://github.com/user-attachments/assets/6b810738-1a63-4149-9701-c06c1de83848" /><br />
4. ToDoList 페이지
- ToDo는 우선순위순으로 정렬되며, check된 ToDo는 진행중인 ToDo의 아래에 정렬됨 <br />
<img width="379" alt="스크린샷 2025-06-06 오후 10 26 39" src="https://github.com/user-attachments/assets/88dfa063-85ea-40de-a712-f1ac87ea6089" /><br />
- 간단한 내용수정은 ToDo내용을 클릭하여 수정 후 세번째 버튼 클릭하여 수정 가능함<br />
<img width="376" alt="스크린샷 2025-06-06 오후 10 26 57" src="https://github.com/user-attachments/assets/557f76ce-5aa6-4078-8ec0-2c65c7306f86" /><br />
- 첫번째 버튼을 누르면 해당 ToDo의 수정화면이 나오며, 내용/시간/중요표시 전부 수정이 가능함<br />
<img width="375" alt="스크린샷 2025-06-06 오후 10 37 03" src="https://github.com/user-attachments/assets/89d90ccb-5589-4f1e-8c85-1bfaac668bc6" /><br />
- 두번째 버튼을 누르면 ToDo를 삭제할 수 있음 <br />
<img width="377" alt="스크린샷 2025-06-06 오후 10 38 20" src="https://github.com/user-attachments/assets/c7133d2b-9840-4fb7-b9f1-7b374d0b8da6" /><br />
- 검색어를 입력하면 검색이 가능하고, 검색어를 지우고 다시 검색을 하면 전체 목록을 볼 수 있음 <br />
<img width="377" alt="스크린샷 2025-06-06 오후 10 41 10" src="https://github.com/user-attachments/assets/14f092a6-0282-4e89-9e52-b4a03a4ee40f" /><br />


5. CreateToDo 페이지
- ToDoList페이지의 우측하단 플러스버튼을 클릭하여 ToDo생성이 가능함<br />
<img width="378" alt="스크린샷 2025-06-06 오후 10 26 48" src="https://github.com/user-attachments/assets/a3da07b0-7294-44f1-8635-3bba6ddfcdcb" /><br />
