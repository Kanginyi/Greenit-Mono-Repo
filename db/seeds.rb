puts "🌱 Seeding Users data..."

User.destroy_all
Blog.destroy_all
Comment.destroy_all

alan_cinsavich = User.create(username: "AlanCinsavich", password: "Pleasecomeback")
unclaimed_yeti = User.create(username: "UnclaimedYeti", password: "Ilovemydogs")
pashovski = User.create(username: "Pashovski", password: "Pushoffme")
uncle_sam = User.create(username: "UncleSam", password: "USAUSAUSA")
xinyeet = User.create(username: "Xinyeet", password: "Weakkneesy")
quankerooskies = User.create(username: "Quankerooskies", password: "TWICEBLACKPINK")
sri_lankan_prince = User.create(username: "SriLankanPrince", password: "Apictureaday")
adam_goatson = User.create(username: "AdamGOATson", password: "Broadwaydotcom")

puts "🌱 Seeding blogs data..."
# Post 1
baby_come_back = Blog.create(user_id: alan_cinsavich.id, title: "Baby Come Back", blog_post: "I have to leave and I'm sorry guys. I can't tell you why, but please remember me fondly. Alan L. Cinsavich signing out.", likes: 0, dislikes: 99999)

# Post 2
meet_rusty = Blog.create(user_id: unclaimed_yeti.id, title: "Meet Rusty!", blog_post: "Here's a picture of Rusty, one of my dogs!", image_url: "https://i.imgur.com/vmueRNt.jpg", likes: 123, dislikes: 0)

# Post 3
meet_freya = Blog.create(user_id: unclaimed_yeti.id, title: "Meet Freya!", blog_post: "Here's a picture of Freya, one of my dogs!", image_url: "https://i.imgur.com/Ie10zAv.jpg", likes: 321, dislikes: 0)

# Post 4
daughters_first_birthday = Blog.create(user_id: pashovski.id, title: "It's My Daughter's First Birthday!", blog_post: "Hey guys, my daughter turned 1 recently! She's growing so fast already and being her father is so rewarding. I can't wait to share more updates!", likes: 540, dislikes: 0)

# Post 5
i_want_you = Blog.create(user_id: uncle_sam.id, title: "I Want YOU, to Run a Marathon With Me", blog_post: "I'm training to run a marathon right now. Everyone should start training now and meet me at the starting line :)", image_url: "https://wmimg.azureedge.net/public/img/marathons/marathon-de-montpellier/marathon-de-montpellier_5_marathon-de-montpellier.jpg?c=1574936301", likes: 3, dislikes: 69)

# Post 6
moose = Blog.create(user_id: xinyeet.id, title: "MOOSE", blog_post: "M O O O O O O O O O S E", image_url: "https://c.tenor.com/ivjojL502eQAAAAC/office-work-work.gif", likes: 222, dislikes: 0)

# Post 7
elon_musk = Blog.create(user_id: quankerooskies.id, title: "Elon Musk is My Dad", blog_post: "Elon Musk is my favorite person in the entire world. I love spending time with him as we fly around the Earth on our secret spaceship. I wish he would love me as much as he loves robots, but I'll deal with it for now.", likes: 1, dislikes: 1)

# Post 8
css = Blog.create(user_id: sri_lankan_prince.id, title: "CSS is Fun", blog_post: "CSS is amazing and really fun to play around with. Let's learn a little bit about CSS right now.", likes: 21, dislikes: 2)

# Post 9
questions = Blog.create(user_id: adam_goatson.id, title: "Questions??", blog_post: "Can y'all please stop asking 'Can I ask you a question?' If you have a question, just ask the question. It really grinds my gears when I have to spend some extra time asking you what the question is. This is also really important for other people when you work in the real world. Just ask the damn question.", image_url:"https://i.kym-cdn.com/entries/icons/original/000/018/489/nick-young-confused-face-300x256-nqlyaa.jpg", likes: 420, dislikes: 0)

puts "🌱 Seeding comments data..."
# Post 1
post1_comment1 = Comment.create(blog_id: baby_come_back.id, user_id: unclaimed_yeti.id, comment_text: "We miss you", likes: 100, dislikes: 7)
post1_comment2 = Comment.create(blog_id: baby_come_back.id, user_id: pashovski.id, comment_text: "You're my whole world", likes: 200, dislikes: 6)
post1_comment3 = Comment.create(blog_id: baby_come_back.id, user_id: uncle_sam.id, comment_text: "I want YOU, to come back", likes: 300, dislikes: 5)
post1_comment4 = Comment.create(blog_id: baby_come_back.id, user_id: xinyeet.id, comment_text: "Please come back", likes: 400, dislikes: 4)
post1_comment5 = Comment.create(blog_id: baby_come_back.id, user_id: quankerooskies.id, comment_text: "Please add me back on LinkedIn", likes: 500, dislikes: 3)
post1_comment6 = Comment.create(blog_id: baby_come_back.id, user_id: sri_lankan_prince.id, comment_text: "Wait, what's going on??", likes: 600, dislikes: 2)
post1_comment7 = Comment.create(blog_id: baby_come_back.id, user_id: adam_goatson.id, comment_text: "Good luck with whatever you do next!", likes: 700, dislikes: 1)

# Post 2
post2_comment1 = Comment.create(blog_id: meet_rusty.id, user_id: pashovski.id, comment_text: "How cute!", likes: 113, dislikes: 76)
post2_comment2 = Comment.create(blog_id: meet_rusty.id, user_id: uncle_sam.id, comment_text: "I want YOU, to let me borrow Rusty to run a marathon with me", likes: 575, dislikes: 406)
post2_comment3 = Comment.create(blog_id: meet_rusty.id, user_id: xinyeet.id, comment_text: "I love dogs so much :D", likes: 187, dislikes: 32)
post2_comment4 = Comment.create(blog_id: meet_rusty.id, user_id: quankerooskies.id, comment_text: "Should I try to make a dog robot?...", likes: 139, dislikes: 18)
post2_comment5 = Comment.create(blog_id: meet_rusty.id, user_id: sri_lankan_prince.id, comment_text: "RUSTY!!!", likes: 161, dislikes: 421)
post2_comment6 = Comment.create(blog_id: meet_rusty.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 3
post3_comment1 = Comment.create(blog_id: meet_freya.id, user_id: pashovski.id, comment_text: "How adorable!", likes: 76, dislikes: 113)
post3_comment2 = Comment.create(blog_id: meet_freya.id, user_id: uncle_sam.id, comment_text: "I want YOU, to let me pet Freya on the head.", likes: 406, dislikes: 575)
post3_comment3 = Comment.create(blog_id: meet_freya.id, user_id: xinyeet.id, comment_text: "Moose and Freya should hang out!!", likes: 32, dislikes: 187)
post3_comment4 = Comment.create(blog_id: meet_freya.id, user_id: xinyeet.id, comment_text: "OOH, and Rusty too!", likes: 32, dislikes: 187)
post3_comment5 = Comment.create(blog_id: meet_freya.id, user_id: quankerooskies.id, comment_text: "Why did you name her Freya?", likes: 18, dislikes: 139)
post3_comment6 = Comment.create(blog_id: meet_freya.id, user_id: sri_lankan_prince.id, comment_text: "FREYA!!!", likes: 421, dislikes: 161)
post3_comment7 = Comment.create(blog_id: meet_freya.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 4
post4_comment1 = Comment.create(blog_id: daughters_first_birthday.id, user_id: pashovski.id, comment_text: "Love you, baby!", likes: 302, dislikes: 2)
post4_comment2 = Comment.create(blog_id: daughters_first_birthday.id, user_id: unclaimed_yeti.id, comment_text: "Happy birthday!!", likes: 402, dislikes: 207)
post4_comment3 = Comment.create(blog_id: daughters_first_birthday.id, user_id: uncle_sam.id, comment_text: "I want YOU, to enjoy your daughter's birthday", likes: 174, dislikes: 475)
post4_comment4 = Comment.create(blog_id: daughters_first_birthday.id, user_id: xinyeet.id, comment_text: "YAAAAAAAAAAY!", likes: 382, dislikes: 10)
post4_comment5 = Comment.create(blog_id: daughters_first_birthday.id, user_id: quankerooskies.id, comment_text: "I will send a spaceship to your house, hold on", likes: 301, dislikes: 356)
post4_comment6 = Comment.create(blog_id: daughters_first_birthday.id, user_id: sri_lankan_prince.id, comment_text: "Congratulations!", likes: 452, dislikes: 231)
post4_comment7 = Comment.create(blog_id: daughters_first_birthday.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 5
post5_comment1 = Comment.create(blog_id: i_want_you.id, user_id: unclaimed_yeti.id, comment_text: "My parents run marathons too!", likes: 160, dislikes: 223)
post5_comment2 = Comment.create(blog_id: i_want_you.id, user_id: pashovski.id, comment_text: "I only know about the NY Marathon", likes: 32, dislikes: 289)
post5_comment3 = Comment.create(blog_id: i_want_you.id, user_id: xinyeet.id, comment_text: "I run everyday, but no way am I running a marathon :(", likes: 2530, dislikes: 4)
post5_comment4 = Comment.create(blog_id: i_want_you.id, user_id: quankerooskies.id, comment_text: "What is running??", likes: 300, dislikes: 407)
post5_comment5 = Comment.create(blog_id: i_want_you.id, user_id: sri_lankan_prince.id, comment_text: "No.", likes: 331, dislikes: 73)
post5_comment6 = Comment.create(blog_id: i_want_you.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 6
post6_comment1 = Comment.create(blog_id: moose.id, user_id: unclaimed_yeti.id, comment_text: "DOG", likes: 246, dislikes: 199)
post6_comment2 = Comment.create(blog_id: moose.id, user_id: pashovski.id, comment_text: "CORGI", likes: 484, dislikes: 82)
post6_comment3 = Comment.create(blog_id: moose.id, user_id: uncle_sam.id, comment_text: "I want YOU, to take Moose to a dog park", likes: 145, dislikes: 43)
post6_comment4 = Comment.create(blog_id: moose.id, user_id: quankerooskies.id, comment_text: "Can I come hang out with your dog?", likes: 289, dislikes: 28)
post6_comment5 = Comment.create(blog_id: moose.id, user_id: sri_lankan_prince.id, comment_text: "MOOSE", likes: 456, dislikes: 57)
post6_comment6 = Comment.create(blog_id: moose.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 7
post7_comment1 = Comment.create(blog_id: elon_musk.id, user_id: unclaimed_yeti.id, comment_text: "Your dad's hella rich!", likes: 239, dislikes: 447)
post7_comment2 = Comment.create(blog_id: elon_musk.id, user_id: uncle_sam.id, comment_text: "I want YOUr dad, to take me to Mars", likes: 164, dislikes: 123)
post7_comment3 = Comment.create(blog_id: elon_musk.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 8
post8_comment1 = Comment.create(blog_id: css.id, user_id: unclaimed_yeti.id, comment_text: "Teach me about flexbox!", likes: 344, dislikes: 150)
post8_comment2 = Comment.create(blog_id: css.id, user_id: uncle_sam.id, comment_text: "I want YOU, to teach me more about CSS", likes: 185, dislikes: 487)
post8_comment3 = Comment.create(blog_id: css.id, user_id: xinyeet.id, comment_text: "Great article!!", likes: 443, dislikes: 450)
post8_comment4 = Comment.create(blog_id: css.id, user_id: quankerooskies.id, comment_text: "I miss being your partner", likes: 382, dislikes: 29)
post8_comment5 = Comment.create(blog_id: css.id, user_id: adam_goatson.id, comment_text: "I have a question.", likes: 0, dislikes: 419)

# Post 9
post9_comment1 = Comment.create(blog_id: questions.id, user_id: unclaimed_yeti.id, comment_text: "Can", likes: 24, dislikes: 3)
post9_comment2 = Comment.create(blog_id: questions.id, user_id: pashovski.id, comment_text: "I", likes: 48, dislikes: 1)
post9_comment3 = Comment.create(blog_id: questions.id, user_id: xinyeet.id, comment_text: "ask", likes: 621, dislikes: 3)
post9_comment4 = Comment.create(blog_id: questions.id, user_id: uncle_sam.id, comment_text: "YOU", likes: 861, dislikes: 3)
post9_comment5 = Comment.create(blog_id: questions.id, user_id: quankerooskies.id, comment_text: "a", likes: 12, dislikes: 1)
post9_comment6 = Comment.create(blog_id: questions.id, user_id: sri_lankan_prince.id, comment_text: "question?", likes: 252, dislikes: 8)
post9_comment7 = Comment.create(blog_id: questions.id, user_id: adam_goatson.id, comment_text: "I hate all of you.", likes: 419, dislikes: 0)


puts "✅ Done seeding!"