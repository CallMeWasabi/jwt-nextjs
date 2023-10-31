# Jwt-nextjs



### ความสามารถ
- ระบบ การยืนยันด้วย jsonwebtoken
- ระบบ Login และ Register เชื่อมต่อกับ mysql และใช้ ORM prisma ในการสื่อสาร
- API สำหรับการสร้าง user ใหม่และการ Login รวมถึงตรวจสอบสถานะของ user


### โครงสร้าง website
```base
|-app
|    |-api
|    |    |-login
|    |    |-register
|    |    |-users
|    |
|    |-home
|    |    |-page.tsx
|    |
|    |-login
|    |    |-FormSchema.ts
|    |    |-page.tsx
|    |
|    |-register
|    |    |-page.tsx
|    |
|    |-page.tsx
```

### เริ่มต้นโปรเจค
1. clone project จาก github
```cmd
$ git clone https://github.com/CallMeWasabi/jwt-nextjs.git
```
2. เข้าสู้ project
```cmd
$ cd jwt-nextjs
```
3. run project ด้วย nodejs
```cmd
$ npm run dev
```
4. เปิด [http://localhost:3000](http://localhost:3000) ใน Browser ของท่าน
```cmd
$ npm run dev
```
### คำเตือน !!!
ใน project นี้ท่าต้องมีการต่อ database เองเพื่อการใช้งาน โปรดตั้งต่า database ของท่านด้วย .env และ ตั้งค่า SECRET_KEY ใน .env.local